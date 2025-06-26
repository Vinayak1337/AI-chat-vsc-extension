import * as vscode from 'vscode';
import OpenAI from 'openai';

export interface MessageAttachment {
	type: 'file' | 'image';
	name: string;
	path: string;
	content?: string;
}

export class AIService {
	private _openaiClient?: OpenAI;

	constructor() {
		this._initializeClient();

		vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('aiChat.openaiApiKey')) {
				this._initializeClient();
			}
		});
	}

	private _initializeClient() {
		const config = vscode.workspace.getConfiguration('aiChat');
		const apiKey = config.get<string>('openaiApiKey');

		console.log(
			'Initializing AI client with API key:',
			apiKey ? `sk-***${apiKey.slice(-4)}` : 'Not found'
		);

		if (apiKey && apiKey.trim()) {
			this._openaiClient = new OpenAI({
				apiKey: apiKey.trim()
			});
			console.log('OpenAI client initialized successfully');
		} else {
			console.log('No API key found, client not initialized');
		}
	}

	public async sendMessage(
		content: string,
		attachments: MessageAttachment[] = []
	): Promise<string> {
		if (!this._openaiClient) {
			throw new Error(
				'OpenAI API key not configured. Please set your API key in the configuration panel.'
			);
		}

		try {
			let messageContent = content;

			if (attachments.length > 0) {
				messageContent += '\n\n**Attached Files:**\n';
				for (const attachment of attachments) {
					if (attachment.type === 'file' && attachment.content) {
						messageContent += `\n**${attachment.name}:**\n\`\`\`\n${attachment.content}\n\`\`\`\n`;
					}
				}
			}

			const config = vscode.workspace.getConfiguration('aiChat');
			const model = config.get<string>('model') || 'gpt-3.5-turbo';

			console.log('Making OpenAI request with:', {
				model: model,
				messageLength: messageContent.length,
				hasAttachments: attachments.length > 0
			});

			const response = await this._openaiClient.chat.completions.create({
				model: model,
				messages: [
					{
						role: 'system',
						content: `You are an AI coding assistant integrated into VS Code. You help users with:
                        - Code generation and modification
                        - Code explanation and debugging
                        - Best practices and optimization
                        - File analysis when provided
                        
                        When generating code, always specify the language and provide clear, well-commented examples.
                        If you're modifying existing code, explain what changes you're making and why.`
					},
					{
						role: 'user',
						content: messageContent
					}
				],
				max_tokens: 2000,
				temperature: 0.7
			});

			console.log('OpenAI request successful, response received');
			return (
				response.choices[0]?.message?.content ||
				'No response received from AI service.'
			);
		} catch (error) {
			console.error('AI Service Error:', error);

			if (error instanceof Error) {
				console.error('Full error details:', {
					message: error.message,
					name: error.name,
					stack: error.stack
				});

				if (
					error.message.includes('401') ||
					error.message.includes('Unauthorized')
				) {
					throw new Error(
						'Invalid API key. Please check your OpenAI API key configuration.'
					);
				} else if (
					error.message.includes('403') ||
					error.message.includes('Forbidden')
				) {
					throw new Error(
						'Access forbidden. Your API key may not have the necessary permissions.'
					);
				} else if (
					error.message.includes('quota') ||
					error.message.includes('exceeded') ||
					error.message.includes('billing')
				) {
					throw new Error(
						'API quota exceeded. Please check your OpenAI account billing.'
					);
				} else if (error.message.includes('429')) {
					throw new Error(
						'Rate limit exceeded. Please wait a moment and try again.'
					);
				} else if (
					error.message.includes('404') ||
					error.message.includes('model')
				) {
					const config = vscode.workspace.getConfiguration('aiChat');
					const model = config.get<string>('model') || 'gpt-3.5-turbo';
					throw new Error(
						`Model "${model}" not found or not available. Please check your model selection.`
					);
				} else if (
					error.message.includes('500') ||
					error.message.includes('502') ||
					error.message.includes('503')
				) {
					throw new Error(
						'OpenAI service is temporarily unavailable. Please try again later.'
					);
				} else {
					throw new Error(`AI service error: ${error.message}`);
				}
			}

			throw new Error(
				'Unknown error occurred while communicating with AI service.'
			);
		}
	}

	public isConfigured(): boolean {
		return !!this._openaiClient;
	}
}
