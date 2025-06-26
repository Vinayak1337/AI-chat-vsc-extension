import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import FileAttachment from './FileAttachment';

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
	content?: string;
}

interface WorkspaceFile {
	name: string;
	path: string;
	relativePath: string;
	type: 'file' | 'directory';
}

interface ChatInterfaceProps {
	messages: Message[];
	isLoading: boolean;
	onSendMessage: (content: string, attachments: FileAttachmentData[]) => void;
	workspaceFiles: WorkspaceFile[];
	disabled?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
	messages,
	isLoading,
	onSendMessage,
	workspaceFiles,
	disabled = false
}) => {
	const [inputValue, setInputValue] = useState('');
	const [attachments, setAttachments] = useState<FileAttachmentData[]>([]);
	const [showFileSuggestions, setShowFileSuggestions] = useState(false);
	const [fileSuggestions, setFileSuggestions] = useState<WorkspaceFile[]>([]);
	const [cursorPosition, setCursorPosition] = useState(0);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		const handlePaste = (e: ClipboardEvent) => {
			if (!inputRef.current || document.activeElement !== inputRef.current) {
				return;
			}

			const items = e.clipboardData?.items;
			if (!items) return;

			for (let i = 0; i < items.length; i++) {
				const item = items[i];

				if (item.type.indexOf('image/') === 0) {
					e.preventDefault();

					const file = item.getAsFile();
					if (file) {
						const reader = new FileReader();
						reader.onload = event => {
							const base64Data = event.target?.result as string;
							if (base64Data) {
								const timestamp = Date.now();
								const fileName = `pasted-image-${timestamp}.${
									item.type.split('/')[1]
								}`;

								setAttachments(prev => [
									...prev,
									{
										name: fileName,
										path: '',
										type: 'image',
										content: base64Data
									}
								]);
							}
						};
						reader.readAsDataURL(file);
					}
					break;
				}
			}
		};

		document.addEventListener('paste', handlePaste);
		return () => document.removeEventListener('paste', handlePaste);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		const cursorPos = e.target.selectionStart;

		setInputValue(value);
		setCursorPosition(cursorPos);

		const beforeCursor = value.substring(0, cursorPos);
		const atMatch = beforeCursor.match(/@([^@\s]*)$/);

		if (atMatch) {
			const searchTerm = atMatch[1];
			const matchingFiles = workspaceFiles
				.filter(
					file =>
						file.type === 'file' &&
						(file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							file.relativePath
								.toLowerCase()
								.includes(searchTerm.toLowerCase()))
				)
				.slice(0, 10);

			setFileSuggestions(matchingFiles);
			setShowFileSuggestions(true);
		} else {
			setShowFileSuggestions(false);
		}
	};

	const isImageFile = (filename: string): boolean => {
		const imageExtensions = [
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.bmp',
			'.webp',
			'.svg'
		];
		const ext = filename.toLowerCase().split('.').pop();
		return ext ? imageExtensions.includes(`.${ext}`) : false;
	};

	const handleFileSelect = (file: WorkspaceFile) => {
		const beforeCursor = inputValue.substring(0, cursorPosition);
		const afterCursor = inputValue.substring(cursorPosition);
		const atMatch = beforeCursor.match(/@([^@\s]*)$/);

		if (atMatch) {
			const beforeAt = beforeCursor.substring(0, atMatch.index);
			const newValue = beforeAt + `@${file.name} ` + afterCursor;
			setInputValue(newValue);

			if (!attachments.find(att => att.path === file.path)) {
				const fileType = isImageFile(file.name) ? 'image' : 'file';
				setAttachments(prev => [
					...prev,
					{
						name: file.name,
						path: file.path,
						type: fileType
					}
				]);
			}
		}

		setShowFileSuggestions(false);
		inputRef.current?.focus();
	};

	const removeAttachment = (index: number) => {
		setAttachments(prev => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!inputValue.trim() || disabled) return;

		onSendMessage(inputValue.trim(), attachments);
		setInputValue('');
		setAttachments([]);
		setShowFileSuggestions(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<div className='chat-interface'>
			<div className='messages-container'>
				{messages.map(message => (
					<MessageBubble key={message.id} message={message} />
				))}
				{isLoading && (
					<div className='loading-indicator'>
						<div className='typing-animation'>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<span>AI is thinking...</span>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className='input-container'>
				{attachments.length > 0 && (
					<div className='attachments-preview'>
						{attachments.map((attachment, index) => (
							<FileAttachment
								key={index}
								file={attachment}
								onRemove={() => removeAttachment(index)}
							/>
						))}
					</div>
				)}

				{showFileSuggestions && fileSuggestions.length > 0 && (
					<div className='file-suggestions'>
						{fileSuggestions.map((file, index) => (
							<div
								key={index}
								className='file-suggestion'
								onClick={() => handleFileSelect(file)}>
								<span className='file-icon'>
									{isImageFile(file.name) ? '🖼️' : '📄'}
								</span>
								<div className='file-info'>
									<div className='file-name'>{file.name}</div>
									<div className='file-path'>{file.relativePath}</div>
								</div>
							</div>
						))}
					</div>
				)}

				<form onSubmit={handleSubmit} className='input-form'>
					<textarea
						ref={inputRef}
						value={inputValue}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						placeholder={
							disabled
								? 'Please configure your API key first...'
								: 'Type your message... Use @filename to attach files or paste images directly'
						}
						className='message-input'
						disabled={disabled}
						rows={3}
					/>
					<button
						type='submit'
						className='send-button'
						disabled={disabled || !inputValue.trim()}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatInterface;
