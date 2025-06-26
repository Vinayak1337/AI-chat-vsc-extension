import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import ConfigPanel from './components/ConfigPanel';
import { useChat } from './hooks/useChat';

interface AppProps {
	vscode: any;
}

const App: React.FC<AppProps> = ({ vscode }) => {
	const [showConfig, setShowConfig] = useState(false);
	const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

	const {
		messages,
		isLoading,
		sendMessage,
		workspaceFiles,
		loadWorkspaceFiles
	} = useChat(vscode);

	useEffect(() => {
		const checkApiKey = () => {
			setApiKeyConfigured(false);
		};

		checkApiKey();
		loadWorkspaceFiles();
	}, [loadWorkspaceFiles]);

	const handleConfigSaved = () => {
		setApiKeyConfigured(true);
		setShowConfig(false);
	};

	if (showConfig) {
		return (
			<ConfigPanel
				onSave={handleConfigSaved}
				onCancel={() => setShowConfig(false)}
				vscode={vscode}
			/>
		);
	}

	return (
		<div className='app'>
			<div className='app-header'>
				<h2>AI Chat Assistant</h2>
				<div className='header-actions'>
					<button
						className='config-button'
						onClick={() => setShowConfig(true)}
						title='Configure API Key'>
						⚙️
					</button>
					{!apiKeyConfigured && (
						<span className='status-indicator warning'>API Key Required</span>
					)}
					{apiKeyConfigured && (
						<span className='status-indicator success'>Ready</span>
					)}
				</div>
			</div>

			<ChatInterface
				messages={messages}
				isLoading={isLoading}
				onSendMessage={sendMessage}
				workspaceFiles={workspaceFiles}
				disabled={!apiKeyConfigured}
			/>
		</div>
	);
};

export default App;
