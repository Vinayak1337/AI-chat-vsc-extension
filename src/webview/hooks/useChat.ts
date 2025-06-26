import { useState, useCallback, useEffect } from 'react';

interface Message {
	id: string;
	content: string;
	sender: 'user' | 'ai';
	timestamp: Date;
	attachments?: FileAttachmentData[];
}

interface FileAttachmentData {
	name: string;
	path: string;
	type: 'file' | 'image';
}

interface WorkspaceFile {
	name: string;
	path: string;
	relativePath: string;
	type: 'file' | 'directory';
}

export const useChat = (vscode: any) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			content:
				'👋 Hello! I\'m your AI coding assistant. I can help you with:\n\n- **Code generation** and modification\n- **Code explanation** and debugging\n- **Best practices** and optimization\n- **File analysis** when you attach files using `@filename`\n\nTo get started, try asking me something like:\n- "Create a React component for a todo list"\n- "Explain this code: @filename.ts"\n- "How can I optimize this function?"\n\nWhat would you like to work on today?',
			sender: 'ai',
			timestamp: new Date()
		}
	]);

	const [isLoading, setIsLoading] = useState(false);
	const [workspaceFiles, setWorkspaceFiles] = useState<WorkspaceFile[]>([]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const message = event.data;

			switch (message.type) {
				case 'aiResponse':
					setMessages(prev => [
						...prev,
						{
							id: Date.now().toString(),
							content: message.content,
							sender: 'ai',
							timestamp: new Date()
						}
					]);
					setIsLoading(false);
					break;

				case 'workspaceFiles':
					setWorkspaceFiles(message.files);
					break;

				case 'error':
					setMessages(prev => [
						...prev,
						{
							id: Date.now().toString(),
							content: `❌ **Error**: ${message.message}`,
							sender: 'ai',
							timestamp: new Date()
						}
					]);
					setIsLoading(false);
					break;
			}
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	const sendMessage = useCallback(
		(content: string, attachments: FileAttachmentData[] = []) => {
			const userMessage: Message = {
				id: Date.now().toString(),
				content,
				sender: 'user',
				timestamp: new Date(),
				attachments: attachments.length > 0 ? attachments : undefined
			};

			setMessages(prev => [...prev, userMessage]);
			setIsLoading(true);

			vscode.postMessage({
				type: 'sendMessage',
				content,
				attachments
			});
		},
		[vscode]
	);

	const loadWorkspaceFiles = useCallback(() => {
		vscode.postMessage({
			type: 'getWorkspaceFiles'
		});
	}, [vscode]);

	const clearChat = useCallback(() => {
		setMessages([
			{
				id: '1',
				content: '👋 Chat cleared! How can I help you?',
				sender: 'ai',
				timestamp: new Date()
			}
		]);
	}, []);

	return {
		messages,
		isLoading,
		sendMessage,
		workspaceFiles,
		loadWorkspaceFiles,
		clearChat
	};
};
