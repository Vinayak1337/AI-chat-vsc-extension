import * as vscode from 'vscode';
import * as path from 'path';
import { AIService } from '../services/AIService';
import { WorkspaceService } from '../services/WorkspaceService';

export class ChatProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'aiChatView';
	private _view?: vscode.WebviewView;
	private _aiService: AIService;
	private _workspaceService: WorkspaceService;

	constructor(private readonly _extensionUri: vscode.Uri) {
		this._aiService = new AIService();
		this._workspaceService = new WorkspaceService();
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(
			async message => {
				switch (message.type) {
					case 'sendMessage':
						await this._handleSendMessage(message.content, message.attachments);
						break;
					case 'getWorkspaceFiles':
						await this._handleGetWorkspaceFiles();
						break;
					case 'getFileContent':
						await this._handleGetFileContent(message.filePath);
						break;
					case 'saveConfig':
						await this._handleSaveConfig(
							message.apiKey,
							message.apiKeyField,
							message.provider,
							message.model
						);
						break;
					case 'getConfig':
						await this._handleGetConfig();
						break;
				}
			},
			undefined,
			[]
		);
	}

	public show() {
		if (this._view) {
			this._view.show?.(true);
		}
	}

	private async _handleSendMessage(content: string, attachments: any[]) {
		try {
			const processedAttachments = await Promise.all(
				attachments.map(async attachment => {
					if (attachment.content) {
						return attachment;
					}

					if (attachment.type === 'file' || attachment.type === 'image') {
						const fileContent = await this._workspaceService.getFileContent(
							attachment.path
						);
						return {
							...attachment,
							content: fileContent
						};
					}
					return attachment;
				})
			);

			const response = await this._aiService.sendMessage(
				content,
				processedAttachments
			);

			this._view?.webview.postMessage({
				type: 'aiResponse',
				content: response
			});
		} catch (error) {
			console.error('Error handling message:', error);
			this._view?.webview.postMessage({
				type: 'error',
				message:
					error instanceof Error ? error.message : 'Unknown error occurred'
			});
		}
	}

	private async _handleGetWorkspaceFiles() {
		try {
			const files = await this._workspaceService.getWorkspaceFiles();
			this._view?.webview.postMessage({
				type: 'workspaceFiles',
				files: files
			});
		} catch (error) {
			console.error('Error getting workspace files:', error);
		}
	}

	private async _handleGetFileContent(filePath: string) {
		try {
			const content = await this._workspaceService.getFileContent(filePath);
			this._view?.webview.postMessage({
				type: 'fileContent',
				filePath: filePath,
				content: content
			});
		} catch (error) {
			console.error('Error getting file content:', error);
		}
	}

	private async _handleSaveConfig(
		apiKey: string,
		apiKeyField: string,
		provider: string,
		model?: string
	) {
		try {
			const config = vscode.workspace.getConfiguration('aiChat');

			console.log('Saving configuration:', {
				provider: provider,
				apiKeyField: apiKeyField,
				apiKeyLength: apiKey.length,
				apiKeyStart: apiKey.substring(0, 3),
				model: model
			});

			await config.update(
				apiKeyField,
				apiKey,
				vscode.ConfigurationTarget.Global
			);

			await config.update(
				'provider',
				provider,
				vscode.ConfigurationTarget.Global
			);

			if (model) {
				await config.update('model', model, vscode.ConfigurationTarget.Global);
			}

			const savedApiKey = config.get<string>(apiKeyField);
			const savedProvider = config.get<string>('provider');
			const savedModel = config.get<string>('model');
			console.log('Verification - Saved values:', {
				apiKeySaved: savedApiKey
					? `${savedApiKey.substring(0, 3)}***${savedApiKey.slice(-4)}`
					: 'Not found',
				providerSaved: savedProvider,
				modelSaved: savedModel
			});

			this._view?.webview.postMessage({
				type: 'configSaved',
				success: true
			});
		} catch (error) {
			console.error('Error saving configuration:', error);
			this._view?.webview.postMessage({
				type: 'configSaved',
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	private async _handleGetConfig() {
		try {
			const config = vscode.workspace.getConfiguration('aiChat');

			const provider = config.get<string>('provider') || 'openai';
			const model = config.get<string>('model') || 'gpt-4.1-mini';
			const openaiApiKey = config.get<string>('openaiApiKey') || '';
			const geminiApiKey = config.get<string>('geminiApiKey') || '';

			this._view?.webview.postMessage({
				type: 'currentConfig',
				config: {
					provider,
					model,
					openaiApiKey,
					geminiApiKey
				}
			});
		} catch (error) {
			console.error('Error getting configuration:', error);
			this._view?.webview.postMessage({
				type: 'error',
				message: 'Failed to load configuration'
			});
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview): string {
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.js')
		);

		const nonce = this._getNonce();

		return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource}; img-src ${webview.cspSource} data:;">
                
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <title>AI Chat Assistant</title>
            </head>
            <body>
                <div id="root"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
	}

	private _getNonce(): string {
		let text = '';
		const possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 32; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}
