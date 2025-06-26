import * as vscode from 'vscode';
import { ChatProvider } from './providers/ChatProvider';

export function activate(context: vscode.ExtensionContext) {
	const provider = new ChatProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ChatProvider.viewType, provider)
	);

	const openChatCommand = vscode.commands.registerCommand(
		'aiChat.openChat',
		() => {
			vscode.commands.executeCommand(
				'workbench.view.extension.aiChatContainer'
			);
		}
	);

	context.subscriptions.push(openChatCommand);
}

export function deactivate() {}
