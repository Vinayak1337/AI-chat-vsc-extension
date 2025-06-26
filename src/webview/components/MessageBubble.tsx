import React, { useEffect } from 'react';
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

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const addCopyButtons = () => {
		const messageElement = document.querySelector(
			`[data-message-id="${message.id}"]`
		);
		if (!messageElement) return;

		const codeBlocks = messageElement.querySelectorAll('pre > code');

		codeBlocks.forEach(codeBlock => {
			const preElement = codeBlock.parentElement as HTMLPreElement;
			if (preElement && !preElement.querySelector('.copy-button')) {
				const copyButton = document.createElement('button');
				copyButton.className = 'copy-button';
				copyButton.innerHTML = '📋';
				copyButton.title = 'Copy code';

				copyButton.addEventListener('click', e => {
					e.preventDefault();
					const codeText = codeBlock.textContent || '';
					copyToClipboard(codeText);

					copyButton.innerHTML = '✅';
					setTimeout(() => {
						copyButton.innerHTML = '📋';
					}, 1000);
				});

				preElement.style.position = 'relative';
				preElement.appendChild(copyButton);
			}
		});
	};

	useEffect(() => {
		const timer = setTimeout(addCopyButtons, 100);
		return () => clearTimeout(timer);
	}, [message.content]);

	return (
		<div
			className={`message-bubble ${message.sender}`}
			data-message-id={message.id}>
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
