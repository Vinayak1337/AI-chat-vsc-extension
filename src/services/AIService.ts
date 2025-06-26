import * as vscode from 'vscode';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface MessageAttachment {
	type: 'file' | 'image';
	name: string;
	path: string;
	content?: string;
}

export class AIService {
	private _openaiClient?: OpenAI;
	private _geminiClient?: GoogleGenerativeAI;

	constructor() {
		this._initializeClient();

		vscode.workspace.onDidChangeConfiguration(e => {
			if (
				e.affectsConfiguration('aiChat.openaiApiKey') ||
				e.affectsConfiguration('aiChat.geminiApiKey') ||
				e.affectsConfiguration('aiChat.provider')
			) {
				this._initializeClient();
			}
		});
	}

	private _initializeClient() {
		const config = vscode.workspace.getConfiguration('aiChat');
		const provider = config.get<string>('provider') || 'openai';

		this._openaiClient = undefined;
		this._geminiClient = undefined;

		if (provider === 'openai') {
			const apiKey = config.get<string>('openaiApiKey');
			console.log(
				'Initializing OpenAI client with API key:',
				apiKey ? `sk-***${apiKey.slice(-4)}` : 'Not found'
			);

			if (apiKey && apiKey.trim()) {
				this._openaiClient = new OpenAI({
					apiKey: apiKey.trim()
				});
				console.log('OpenAI client initialized successfully');
			} else {
				console.log('No OpenAI API key found, client not initialized');
			}
		} else if (provider === 'gemini') {
			const apiKey = config.get<string>('geminiApiKey');
			console.log(
				'Initializing Gemini client with API key:',
				apiKey ? `***${apiKey.slice(-4)}` : 'Not found'
			);

			if (apiKey && apiKey.trim()) {
				this._geminiClient = new GoogleGenerativeAI(apiKey.trim());
				console.log('Gemini client initialized successfully');
			} else {
				console.log('No Gemini API key found, client not initialized');
			}
		}
	}

	public async sendMessage(
		content: string,
		attachments: MessageAttachment[] = []
	): Promise<string> {
		const config = vscode.workspace.getConfiguration('aiChat');
		const provider = config.get<string>('provider') || 'openai';

		if (provider === 'openai') {
			return this._sendOpenAIMessage(content, attachments);
		} else if (provider === 'gemini') {
			return this._sendGeminiMessage(content, attachments);
		} else {
			throw new Error(
				`Unsupported AI provider: ${provider}. Please configure a supported provider.`
			);
		}
	}

	private async _sendOpenAIMessage(
		content: string,
		attachments: MessageAttachment[] = []
	): Promise<string> {
		if (!this._openaiClient) {
			throw new Error(
				'OpenAI API key not configured. Please set your API key in the configuration panel.'
			);
		}

		try {
			const config = vscode.workspace.getConfiguration('aiChat');
			const model = config.get<string>('model') || 'gpt-4.1-mini';

			console.log('Making OpenAI request with:', {
				model: model,
				messageLength: content.length,
				hasAttachments: attachments.length > 0,
				attachmentTypes: attachments.map(a => a.type)
			});

			const messageContentArray: any[] = [{ type: 'text', text: content }];

			if (attachments.length > 0) {
				for (const attachment of attachments) {
					if (attachment.type === 'image' && attachment.content) {
						if (attachment.content.startsWith('data:image/')) {
							messageContentArray.push({
								type: 'image_url',
								image_url: {
									url: attachment.content,
									detail: 'high'
								}
							});
							messageContentArray.push({
								type: 'text',
								text: `\n[Attached Image: ${attachment.name}]`
							});
						}
					} else if (attachment.type === 'file' && attachment.content) {
						messageContentArray.push({
							type: 'text',
							text: `\n\n**Attached File: ${attachment.name}**\n\`\`\`\n${attachment.content}\n\`\`\`\n`
						});
					}
				}
			}

			const response = await this._openaiClient.chat.completions.create({
				model: model,
				messages: [
					{
						role: 'system',
						content: `You are an AI coding assistant integrated into VS Code. You help users with:
                        - Code generation and modification
                        - Code explanation and debugging
                        - Best practices and optimization
                        - File analysis when provided (including images)
                        
                        When generating code, always specify the language and provide clear, well-commented examples.
                        If you're modifying existing code, explain what changes you're making and why.
                        When analyzing images, provide detailed descriptions and any relevant technical insights.`
					},
					{
						role: 'user',
						content: messageContentArray
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
			console.error('OpenAI Service Error:', error);
			return this._handleOpenAIError(error);
		}
	}

	private async _sendGeminiMessage(
		content: string,
		attachments: MessageAttachment[] = []
	): Promise<string> {
		if (!this._geminiClient) {
			throw new Error(
				'Gemini API key not configured. Please set your API key in the configuration panel.'
			);
		}

		try {
			const config = vscode.workspace.getConfiguration('aiChat');
			const model = config.get<string>('model') || 'gemini-2.5-flash';

			console.log('Making Gemini request with:', {
				model: model,
				messageLength: content.length,
				hasAttachments: attachments.length > 0,
				attachmentTypes: attachments.map(a => a.type)
			});

			const systemPrompt = `You are an AI coding assistant integrated into VS Code. You help users with:
- Code generation and modification
- Code explanation and debugging
- Best practices and optimization
- File analysis when provided (including images)

When generating code, always specify the language and provide clear, well-commented examples.
If you're modifying existing code, explain what changes you're making and why.
When analyzing images, provide detailed descriptions and any relevant technical insights.`;

			const geminiModel = this._geminiClient.getGenerativeModel({
				model: model
			});

			const parts: any[] = [{ text: `${systemPrompt}\n\nUser: ${content}` }];

			if (attachments.length > 0) {
				for (const attachment of attachments) {
					if (attachment.type === 'image' && attachment.content) {
						if (attachment.content.startsWith('data:image/')) {
							const [mimeType, base64Data] = attachment.content.split(',');
							const mimeTypeMatch = mimeType.match(/data:([^;]+)/);

							if (mimeTypeMatch) {
								parts.push({
									inlineData: {
										mimeType: mimeTypeMatch[1],
										data: base64Data
									}
								});
								parts.push({
									text: `\n\n[Attached Image: ${attachment.name}]`
								});
							}
						}
					} else if (attachment.type === 'file' && attachment.content) {
						parts.push({
							text: `\n\n**Attached File: ${attachment.name}**\n\`\`\`\n${attachment.content}\n\`\`\`\n`
						});
					}
				}
			}

			const result = await geminiModel.generateContent(parts);
			const response = await result.response;
			const text = response.text();

			console.log('Gemini request successful, response received');
			return text || 'No response received from AI service.';
		} catch (error) {
			console.error('Gemini Service Error:', error);
			return this._handleGeminiError(error);
		}
	}

	private _handleOpenAIError(error: any): never {
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
				throw new Error(`OpenAI service error: ${error.message}`);
			}
		}

		throw new Error(
			'Unknown error occurred while communicating with OpenAI service.'
		);
	}

	private _handleGeminiError(error: any): never {
		if (error instanceof Error) {
			console.error('Full error details:', {
				message: error.message,
				name: error.name,
				stack: error.stack
			});

			if (
				error.message.includes('401') ||
				error.message.includes('API_KEY_INVALID') ||
				error.message.includes('Unauthorized')
			) {
				throw new Error(
					'Invalid API key. Please check your Gemini API key configuration.'
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
				error.message.includes('RESOURCE_EXHAUSTED')
			) {
				throw new Error(
					'API quota exceeded. Please check your Gemini API usage.'
				);
			} else if (error.message.includes('429')) {
				throw new Error(
					'Rate limit exceeded. Please wait a moment and try again.'
				);
			} else if (
				error.message.includes('404') ||
				error.message.includes('model') ||
				error.message.includes('NOT_FOUND')
			) {
				const config = vscode.workspace.getConfiguration('aiChat');
				const model = config.get<string>('model') || 'gemini-2.0-flash-exp';
				throw new Error(
					`Model "${model}" not found or not available. Please check your model selection.`
				);
			} else if (
				error.message.includes('500') ||
				error.message.includes('502') ||
				error.message.includes('503') ||
				error.message.includes('INTERNAL')
			) {
				throw new Error(
					'Gemini service is temporarily unavailable. Please try again later.'
				);
			} else {
				throw new Error(`Gemini service error: ${error.message}`);
			}
		}

		throw new Error(
			'Unknown error occurred while communicating with Gemini service.'
		);
	}

	public isConfigured(): boolean {
		const config = vscode.workspace.getConfiguration('aiChat');
		const provider = config.get<string>('provider') || 'openai';

		if (provider === 'openai') {
			return !!this._openaiClient;
		} else if (provider === 'gemini') {
			return !!this._geminiClient;
		}

		return false;
	}
}
