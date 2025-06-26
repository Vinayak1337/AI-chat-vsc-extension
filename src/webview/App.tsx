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
	const [currentModel, setCurrentModel] = useState<string>('');
	const [currentProvider, setCurrentProvider] = useState<string>('');

	const {
		messages,
		isLoading,
		sendMessage,
		workspaceFiles,
		loadWorkspaceFiles
	} = useChat(vscode);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const message = event.data;
			if (message.type === 'currentConfig') {
				const config = message.config;
				const provider = config.provider || 'openai';
				const model = config.model || 'gpt-4.1-mini';
				const hasApiKey =
					(provider === 'openai' && config.openaiApiKey) ||
					(provider === 'gemini' && config.geminiApiKey);

				setApiKeyConfigured(!!hasApiKey);
				setCurrentProvider(provider);
				setCurrentModel(model);
				window.removeEventListener('message', handleMessage);
			}
		};

		const checkApiKey = () => {
			window.addEventListener('message', handleMessage);

			vscode.postMessage({
				type: 'getConfig'
			});

			setTimeout(() => {
				window.removeEventListener('message', handleMessage);
			}, 3000);
		};

		checkApiKey();
		loadWorkspaceFiles();
	}, [loadWorkspaceFiles, vscode]);

	const handleConfigSaved = () => {
		setApiKeyConfigured(true);
		setShowConfig(false);

		setTimeout(() => {
			const handleMessage = (event: MessageEvent) => {
				const message = event.data;
				if (message.type === 'currentConfig') {
					const config = message.config;
					const provider = config.provider || 'openai';
					const model = config.model || 'gpt-4.1-mini';

					setCurrentProvider(provider);
					setCurrentModel(model);
					window.removeEventListener('message', handleMessage);
				}
			};

			window.addEventListener('message', handleMessage);
			vscode.postMessage({ type: 'getConfig' });

			setTimeout(() => {
				window.removeEventListener('message', handleMessage);
			}, 3000);
		}, 100);
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
				<div className='header-title'>
					<h2>AI Chat Assistant</h2>
					{currentModel && (
						<div className='model-info'>
							<span className='model-provider'>
								{currentProvider === 'openai' ? 'OpenAI' : 'Gemini'}
							</span>
							<span className='model-name'>{currentModel}</span>
						</div>
					)}
				</div>
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
