import React from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';

interface FileAttachmentData {
	name: string;
	path: string;
	type: 'file' | 'image';
}

interface Message {
	id: string;
	content: string;
	sender: 'user' | 'ai';
	timestamp: Date;
	attachments?: FileAttachmentData[];
}

interface MessageBubbleProps {
	message: Message;
}

// Configure marked for syntax highlighting
marked.setOptions({
	highlight: function (code: string, lang: string) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(code, { language: lang }).value;
			} catch (err) {
				console.error('Highlight error:', err);
			}
		}
		return hljs.highlightAuto(code).value;
	},
	breaks: true,
	gfm: true
});

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	const renderContent = (content: string) => {
		try {
			const html = marked(content);
			return { __html: html };
		} catch (error) {
			console.error('Markdown parsing error:', error);
			return { __html: content };
		}
	};

	return (
		<div className={`message-bubble ${message.sender}`}>
			<div className='message-header'>
				<span className='sender'>
					{message.sender === 'user' ? 'You' : 'AI Assistant'}
				</span>
				<span className='timestamp'>{formatTime(message.timestamp)}</span>
			</div>

			{message.attachments && message.attachments.length > 0 && (
				<div className='message-attachments'>
					<div className='attachments-label'>📎 Attached files:</div>
					{message.attachments.map((attachment, index) => (
						<div key={index} className='attachment-tag'>
							<span className='attachment-icon'>
								{attachment.type === 'image' ? '🖼️' : '📄'}
							</span>
							<span className='attachment-name'>{attachment.name}</span>
						</div>
					))}
				</div>
			)}

			<div
				className='message-content'
				dangerouslySetInnerHTML={renderContent(message.content)}
			/>
		</div>
	);
};

export default MessageBubble;
