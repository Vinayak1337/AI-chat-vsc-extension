import * as vscode from 'vscode';
import * as path from 'path';

export interface WorkspaceFile {
	name: string;
	path: string;
	relativePath: string;
	type: 'file' | 'directory';
}

export class WorkspaceService {
	public async getWorkspaceFiles(): Promise<WorkspaceFile[]> {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders || workspaceFolders.length === 0) {
			return [];
		}

		const files: WorkspaceFile[] = [];

		for (const folder of workspaceFolders) {
			const folderFiles = await this._getFilesRecursively(
				folder.uri,
				folder.uri
			);
			files.push(...folderFiles);
		}

		return files.sort((a, b) => {
			if (a.type !== b.type) {
				return a.type === 'directory' ? -1 : 1;
			}
			return a.name.localeCompare(b.name);
		});
	}

	public async getFileContent(filePath: string): Promise<string> {
		try {
			const uri = vscode.Uri.file(filePath);

			if (this.isImageFile(filePath)) {
				return await this.getImageAsBase64(uri);
			}

			const document = await vscode.workspace.openTextDocument(uri);
			return document.getText();
		} catch (error) {
			console.error('Error reading file:', error);
			throw new Error(`Could not read file: ${filePath}`);
		}
	}

	public isImageFile(filePath: string): boolean {
		const imageExtensions = [
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.bmp',
			'.webp',
			'.svg'
		];
		const ext = path.extname(filePath).toLowerCase();
		return imageExtensions.includes(ext);
	}

	private async getImageAsBase64(uri: vscode.Uri): Promise<string> {
		try {
			const imageData = await vscode.workspace.fs.readFile(uri);
			const base64 = Buffer.from(imageData).toString('base64');
			const ext = path.extname(uri.fsPath).toLowerCase();

			let mimeType = 'image/png';
			switch (ext) {
				case '.jpg':
				case '.jpeg':
					mimeType = 'image/jpeg';
					break;
				case '.gif':
					mimeType = 'image/gif';
					break;
				case '.bmp':
					mimeType = 'image/bmp';
					break;
				case '.webp':
					mimeType = 'image/webp';
					break;
				case '.svg':
					mimeType = 'image/svg+xml';
					break;
			}

			return `data:${mimeType};base64,${base64}`;
		} catch (error) {
			console.error('Error reading image file:', error);
			throw new Error(`Could not read image file: ${uri.fsPath}`);
		}
	}

	public async findFilesMatching(pattern: string): Promise<WorkspaceFile[]> {
		const allFiles = await this.getWorkspaceFiles();
		const lowerPattern = pattern.toLowerCase();

		return allFiles.filter(
			file =>
				file.name.toLowerCase().includes(lowerPattern) ||
				file.relativePath.toLowerCase().includes(lowerPattern)
		);
	}

	public async getCurrentFileContent(): Promise<{
		path: string;
		content: string;
	} | null> {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			return null;
		}

		return {
			path: activeEditor.document.fileName,
			content: activeEditor.document.getText()
		};
	}

	public async insertCodeAtCursor(code: string): Promise<void> {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			throw new Error('No active editor found');
		}

		const position = activeEditor.selection.active;
		await activeEditor.edit(editBuilder => {
			editBuilder.insert(position, code);
		});
	}

	public async replaceSelection(code: string): Promise<void> {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			throw new Error('No active editor found');
		}

		await activeEditor.edit(editBuilder => {
			editBuilder.replace(activeEditor.selection, code);
		});
	}

	private async _getFilesRecursively(
		uri: vscode.Uri,
		rootUri: vscode.Uri
	): Promise<WorkspaceFile[]> {
		const files: WorkspaceFile[] = [];

		try {
			const entries = await vscode.workspace.fs.readDirectory(uri);

			for (const [name, type] of entries) {
				if (
					name.startsWith('.') ||
					['node_modules', 'dist', 'out', 'build'].includes(name)
				) {
					continue;
				}

				const entryUri = vscode.Uri.joinPath(uri, name);
				const relativePath = path.relative(rootUri.fsPath, entryUri.fsPath);

				files.push({
					name,
					path: entryUri.fsPath,
					relativePath,
					type: type === vscode.FileType.Directory ? 'directory' : 'file'
				});

				if (
					type === vscode.FileType.Directory &&
					relativePath.split(path.sep).length < 5
				) {
					const subFiles = await this._getFilesRecursively(entryUri, rootUri);
					files.push(...subFiles);
				}
			}
		} catch (error) {
			console.error('Error reading directory:', error);
		}

		return files;
	}
}
