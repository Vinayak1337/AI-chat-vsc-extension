# VS Code AI Chat Assistant - Implementation Guide

A React-based AI chat interface integrated directly into Visual Studio Code with workspace awareness, file attachment capabilities, and multimodal AI support.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- VS Code 1.74.0 or later
- API key for your chosen provider (OpenAI or Google Gemini)

### Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/Vinayak1337/AI-chat-vsc-extension.git
   cd AI-chat-vsc-extension
   npm install
   ```

2. **Build the Extension**
   ```bash
   npm run compile
   ```

3. **Run in Development Mode**
   - Press `F5` in VS Code to launch Extension Development Host
   - Or use `Run > Start Debugging`

4. **Open the Chat Panel**
   - Look for "AI Chat Assistant" in the Activity Bar (left sidebar)
   - Click to open the chat interface

5. **Configure API Key**
   - Click the ⚙️ button in the chat header
   - Select your preferred AI provider (OpenAI or Google Gemini)
   - Select your preferred AI model
   - Enter your API key
   - Click "Save Configuration"

## Features

### Core Functionality
- **AI Chat Interface**: Full conversational AI powered by OpenAI and Google Gemini models
- **File Attachments**: Use `@filename` syntax to attach workspace files
- **Image Analysis**: Support for multimodal AI with image attachments and copy-paste
- **Workspace Integration**: Browse and attach any file from your workspace
- **Model Selection**: Choose from multiple AI providers and models
- **Rate Limit Display**: See usage limits for each model
- **Syntax Highlighting**: Code blocks are properly highlighted with copy buttons
- **Markdown Support**: Rich text formatting in responses
- **Live Model Display**: Current provider and model shown in header

### Available Models

#### OpenAI Models
- **GPT-4.1** (10K TPM, 3 RPM, 200 RPD, 900K TPD) - Latest GPT-4 model with improved capabilities
- **GPT-4.1 Mini** (60K TPM, 3 RPM, 200 RPD, 200K TPD) - Faster, more cost-effective GPT-4.1 variant
- **GPT-4.1 Nano** (60K TPM, 3 RPM, 200 RPD, 200K TPD) - Ultra-fast, lightweight GPT-4.1 variant
- **GPT-4o** (10K TPM, 3 RPM, 200 RPD, 90K TPD) - Optimized GPT-4 for better performance
- **GPT-4o Mini** (60K TPM, 3 RPM, 200 RPD, 200K TPD) - Compact version of GPT-4o
- **GPT-4o Mini TTS** (200 RPD) - GPT-4o Mini with text-to-speech capabilities
- **GPT-3.5 Turbo (Legacy)** (90K TPM, 3.5K RPM, Unlimited RPD) - Previous generation model
- **GPT-4 (Legacy)** (10K TPM, 500 RPM, Unlimited RPD) - Previous generation GPT-4 model

#### Google Gemini Models
- **Gemini 2.5 Pro** (1M TPM, 360 RPM, 10K RPD) - Most advanced reasoning model with thinking capabilities
- **Gemini 2.5 Flash** (1M TPM, 1K RPM, 50K RPD) - Best price-performance with thinking capabilities
- **Gemini 2.0 Flash** (1M TPM, 1K RPM, 50K RPD) - Next-gen features with superior speed and tool use
- **Gemini 2.0 Flash-Lite** (1M TPM, 1K RPM, 50K RPD) - Cost-efficient and fast Flash model
- **Gemini 1.5 Pro (Legacy)** (1M TPM, 360 RPM, 10K RPD) - Previous generation Pro model
- **Gemini 1.5 Flash (Legacy)** (1M TPM, 1K RPM, 50K RPD) - Previous generation Flash model

*TPM = Tokens Per Minute, RPM = Requests Per Minute, RPD = Requests Per Day, TPD = Tokens Per Day*

### Image Support
- **Supported Formats**: PNG, JPG/JPEG, GIF, BMP, WebP, SVG
- **File Attachments**: Use `@image.png` syntax to attach images from workspace
- **Copy-Paste**: Direct clipboard image pasting with automatic detection
- **Vision AI**: Both OpenAI GPT-4 and Gemini 2.5 models support image analysis
- **Smart Detection**: Images automatically show 🖼️ icon, files show 📄 icon

## Project Structure

```
AI-chat-vsc-extension/
├── package.json                 # Extension manifest and dependencies
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Build configuration
├── src/
│   ├── extension.ts            # Main extension entry point
│   ├── providers/
│   │   └── ChatProvider.ts     # Webview provider
│   ├── services/
│   │   ├── AIService.ts        # OpenAI and Gemini integration
│   │   └── WorkspaceService.ts # File system operations
│   └── webview/                # React frontend
│       ├── index.tsx           # React entry point
│       ├── App.tsx             # Main app component
│       ├── components/
│       │   ├── ChatInterface.tsx    # Chat UI with image support
│       │   ├── ConfigPanel.tsx      # Multi-provider configuration
│       │   ├── MessageBubble.tsx    # Message display with copy buttons
│       │   └── FileAttachment.tsx   # File/image attachment display
│       ├── hooks/
│       │   └── useChat.ts      # Chat state management
│       └── styles/
│           └── global.css      # All styles with VS Code theming
└── dist/                       # Built output
    ├── extension.js            # Extension bundle
    └── webview.js             # React bundle
```

## Architecture

### Extension Architecture
- **Extension Host**: Node.js environment running the VS Code extension
- **Webview**: Sandboxed browser environment running the React app
- **Communication**: Message passing between extension and webview
- **Multi-Provider**: Support for OpenAI and Google Gemini APIs
- **Multimodal**: Image processing for both providers

### Data Flow
1. User interacts with React interface (text input or image paste/attachment)
2. Webview sends messages to extension host
3. Extension processes requests (API calls, file/image operations)
4. AI service handles provider-specific formatting and API calls
5. Extension sends responses back to webview
6. React updates UI with new data and copy buttons

### Security
- Content Security Policy prevents XSS attacks
- API keys stored in VS Code's secure configuration with `ConfigurationTarget.Global`
- File access restricted to workspace directories
- Process polyfill for browser compatibility
- No telemetry or data collection

## Development Commands

```bash
# Build for development
npm run compile

# Build for production
npm run package

# Watch mode for development
npm run watch

# Lint code
npm run lint

# Run tests
npm run test
```

## Configuration

### VS Code Settings
The extension adds these configuration options:
- `aiChat.provider`: Selected AI provider ('openai' or 'gemini')
- `aiChat.openaiApiKey`: Your OpenAI API key
- `aiChat.geminiApiKey`: Your Google Gemini API key
- `aiChat.model`: Selected AI model

### Environment Setup
- All dependencies are managed via npm
- TypeScript compilation via webpack
- Separate bundles for extension and webview
- Process polyfill for Node.js compatibility in browser
- Support for both text and image file handling

## Usage Examples

### Basic Chat
1. Open the AI Chat Assistant panel
2. Type any coding question
3. Get AI-powered responses with syntax highlighting and copy buttons

### File Attachments
1. Type `@` followed by filename
2. Select from autocomplete suggestions
3. File content is automatically attached to your message
4. AI can analyze and provide insights about your code

### Image Analysis
1. **File Attachment**: Type `@image.png` and select from suggestions
2. **Copy-Paste**: Copy any image and paste with Ctrl+V/Cmd+V
3. Ask questions about UI mockups, diagrams, screenshots, or charts
4. Get detailed analysis from vision-enabled AI models

### Model Selection
1. Click the configuration button (⚙️)
2. Choose your preferred AI provider (OpenAI or Google Gemini)
3. Select from available models based on your needs
4. View rate limits and capabilities
5. Save configuration with persistent storage

## Troubleshooting

### Common Issues

**Extension doesn't load**
- Check VS Code version (requires 1.74.0+)
- Ensure all dependencies are installed
- Try rebuilding with `npm run compile`

**Blank webview**
- Check browser console for errors
- Verify Content Security Policy settings
- Ensure process polyfill is working

**API errors**
- Verify API key is correct and active
- Check account billing and limits for your provider
- Try switching to a different model
- Ensure provider is correctly selected

**File attachment issues**
- Ensure files are within workspace
- Check file permissions
- Verify workspace is properly opened in VS Code

**Image issues**
- Ensure image formats are supported (PNG, JPG, GIF, BMP, WebP, SVG)
- Check if model supports vision (GPT-4 variants, Gemini 2.5/2.0)
- Verify clipboard permissions for paste functionality

### Debug Mode
1. Enable VS Code Developer Tools: `Help > Toggle Developer Tools`
2. Check console for detailed error logs
3. Look for API request/response details
4. Monitor configuration save/load operations
5. Check webview console for React errors

## Deployment

### Package Extension
```bash
npm run package
```

### Install Locally
1. Package the extension using the command above
2. Install the generated `.vsix` file in VS Code
3. Or publish to VS Code Marketplace

### Publishing
1. Install `vsce` globally: `npm install -g vsce`
2. Package: `vsce package`
3. Publish: `vsce publish`

## Contributing

1. Fork the repository on GitHub
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 