import React, { useState } from 'react';

interface ConfigPanelProps {
	onSave: () => void;
	onCancel: () => void;
	vscode: any;
}

interface ModelInfo {
	id: string;
	name: string;
	tpm: string;
	rpm: string;
	rpd: string;
	tpd?: string;
	description?: string;
}

interface LLMProvider {
	id: string;
	name: string;
	description: string;
	models: ModelInfo[];
}

const PROVIDERS: LLMProvider[] = [
	{
		id: 'openai',
		name: 'OpenAI',
		description: 'GPT-4 and GPT-4o models',
		models: [
			{
				id: 'gpt-4.1',
				name: 'GPT-4.1',
				tpm: '10,000',
				rpm: '3',
				rpd: '200',
				tpd: '900,000',
				description: 'Latest GPT-4 model with improved capabilities'
			},
			{
				id: 'gpt-4.1-mini',
				name: 'GPT-4.1 Mini',
				tpm: '60,000',
				rpm: '3',
				rpd: '200',
				tpd: '200,000',
				description: 'Faster, more cost-effective GPT-4.1 variant'
			},
			{
				id: 'gpt-4.1-nano',
				name: 'GPT-4.1 Nano',
				tpm: '60,000',
				rpm: '3',
				rpd: '200',
				tpd: '200,000',
				description: 'Ultra-fast, lightweight GPT-4.1 variant'
			},
			{
				id: 'gpt-4o',
				name: 'GPT-4o',
				tpm: '10,000',
				rpm: '3',
				rpd: '200',
				tpd: '90,000',
				description: 'Optimized GPT-4 for better performance'
			},
			{
				id: 'gpt-4o-mini',
				name: 'GPT-4o Mini',
				tpm: '60,000',
				rpm: '3',
				rpd: '200',
				tpd: '200,000',
				description: 'Compact version of GPT-4o'
			},
			{
				id: 'gpt-4o-mini-tts',
				name: 'GPT-4o Mini TTS',
				tpm: 'N/A',
				rpm: 'N/A',
				rpd: '200',
				description: 'GPT-4o Mini with text-to-speech capabilities'
			},
			{
				id: 'gpt-3.5-turbo',
				name: 'GPT-3.5 Turbo (Legacy)',
				tpm: '90,000',
				rpm: '3,500',
				rpd: 'Unlimited',
				description: 'Previous generation model - still supported'
			},
			{
				id: 'gpt-4',
				name: 'GPT-4 (Legacy)',
				tpm: '10,000',
				rpm: '500',
				rpd: 'Unlimited',
				description: 'Previous generation GPT-4 model'
			}
		]
	}
];

const ConfigPanel: React.FC<ConfigPanelProps> = ({
	onSave,
	onCancel,
	vscode
}) => {
	const [selectedProvider, setSelectedProvider] = useState('openai');
	const [apiKey, setApiKey] = useState('');
	const [selectedModel, setSelectedModel] = useState('gpt-4.1-mini');
	const [isLoading, setSaving] = useState(false);
	const [error, setError] = useState('');

	const currentProvider = PROVIDERS.find(p => p.id === selectedProvider);
	const currentModel = currentProvider?.models.find(
		m => m.id === selectedModel
	);

	const handleSave = async () => {
		if (!apiKey.trim()) {
			setError('Please enter an API key');
			return;
		}

		setSaving(true);
		setError('');

		try {
			vscode.postMessage({
				type: 'saveApiKey',
				apiKey: apiKey.trim(),
				provider: selectedProvider,
				model: selectedModel
			});

			const handleMessage = (event: MessageEvent) => {
				const message = event.data;
				if (message.type === 'apiKeySaved') {
					if (message.success) {
						onSave();
					} else {
						setError(message.error || 'Failed to save API key');
						setSaving(false);
					}
					window.removeEventListener('message', handleMessage);
				}
			};

			window.addEventListener('message', handleMessage);

			setTimeout(() => {
				window.removeEventListener('message', handleMessage);
				setSaving(false);
				setError('Timeout saving configuration');
			}, 5000);
		} catch (err) {
			setError('Failed to save configuration');
			setSaving(false);
		}
	};

	const handleProviderChange = (providerId: string) => {
		setSelectedProvider(providerId);
		const provider = PROVIDERS.find(p => p.id === providerId);
		if (provider && provider.models.length > 0) {
			setSelectedModel(provider.models[0].id);
		}
	};

	return (
		<div className='config-panel'>
			<div className='config-header'>
				<h3>🔧 Configure AI Chat Assistant</h3>
				<p>Set up your AI provider to start chatting</p>
			</div>

			<div className='config-content'>
				<div className='form-group'>
					<label htmlFor='provider'>AI Provider:</label>
					<select
						id='provider'
						value={selectedProvider}
						onChange={e => handleProviderChange(e.target.value)}
						className='form-control'>
						{PROVIDERS.map(provider => (
							<option key={provider.id} value={provider.id}>
								{provider.name} - {provider.description}
							</option>
						))}
					</select>
				</div>

				{currentProvider && (
					<>
						<div className='form-group'>
							<label htmlFor='model'>Model:</label>
							<select
								id='model'
								value={selectedModel}
								onChange={e => setSelectedModel(e.target.value)}
								className='form-control'>
								{currentProvider.models.map(model => (
									<option key={model.id} value={model.id}>
										{model.name}
									</option>
								))}
							</select>

							{currentModel && (
								<div className='model-info'>
									<div className='model-description'>
										{currentModel.description}
									</div>
									<div className='rate-limits'>
										<strong>Rate Limits:</strong>
										<div className='rate-grid'>
											<span>TPM: {currentModel.tpm}</span>
											<span>RPM: {currentModel.rpm}</span>
											<span>RPD: {currentModel.rpd}</span>
											{currentModel.tpd && <span>TPD: {currentModel.tpd}</span>}
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='form-group'>
							<label htmlFor='apiKey'>
								API Key:
								<span className='required'>*</span>
							</label>
							<input
								type='password'
								id='apiKey'
								value={apiKey}
								onChange={e => setApiKey(e.target.value)}
								placeholder={`Enter your ${currentProvider.name} API key`}
								className='form-control'
							/>
							<div className='form-help'>
								{selectedProvider === 'openai' && (
									<>
										Get your API key from{' '}
										<a
											href='https://platform.openai.com/api-keys'
											target='_blank'
											rel='noopener noreferrer'>
											OpenAI Platform
										</a>
									</>
								)}
							</div>
						</div>
					</>
				)}

				{error && <div className='error-message'>❌ {error}</div>}

				<div className='config-actions'>
					<button
						className='btn btn-secondary'
						onClick={onCancel}
						disabled={isLoading}>
						Cancel
					</button>
					<button
						className='btn btn-primary'
						onClick={handleSave}
						disabled={isLoading || !apiKey.trim()}>
						{isLoading ? 'Saving...' : 'Save Configuration'}
					</button>
				</div>
			</div>

			<div className='config-footer'>
				<div className='security-note'>
					🔒 Your API key is stored securely in VS Code's configuration and
					never leaves your machine.
				</div>
			</div>
		</div>
	);
};

export default ConfigPanel;
