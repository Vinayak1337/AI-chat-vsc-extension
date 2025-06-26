import React from 'react';

interface FileAttachmentData {
	name: string;
	path: string;
	type: 'file' | 'image';
	content?: string;
}

interface FileAttachmentProps {
	file: FileAttachmentData;
	onRemove: () => void;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ file, onRemove }) => {
	const getFileIcon = (type: string) => {
		switch (type) {
			case 'image':
				return '🖼️';
			default:
				return '📄';
		}
	};

	const getFileExtension = (filename: string) => {
		return filename.split('.').pop()?.toLowerCase() || '';
	};

	const truncateFileName = (name: string, maxLength: number = 25) => {
		if (name.length <= maxLength) return name;
		const ext = getFileExtension(name);
		const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
		const maxNameLength = maxLength - ext.length - 4; // -4 for "..." and "."
		return `${nameWithoutExt.substring(0, maxNameLength)}...${ext}`;
	};

	const isPastedImage = file.content && !file.path;
	const tooltipText = isPastedImage ? `${file.name} (Pasted image)` : file.name;

	return (
		<div className='file-attachment'>
			<span className='file-icon'>{getFileIcon(file.type)}</span>
			<span className='file-name' title={tooltipText}>
				{truncateFileName(file.name)}
				{isPastedImage && <small> (pasted)</small>}
			</span>
			<button
				className='remove-button'
				onClick={onRemove}
				title='Remove attachment'>
				×
			</button>
		</div>
	);
};

export default FileAttachment;
