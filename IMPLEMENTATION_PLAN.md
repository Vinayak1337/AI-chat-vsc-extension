# VS Code AI Chat Assistant - Implementation Guide

A React-based AI chat interface integrated directly into Visual Studio Code with workspace awareness and file attachment capabilities.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- VS Code 1.74.0 or later
- OpenAI API key

### Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd VSC-extension
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
   - Select your preferred AI model
   - Enter your OpenAI API key
   - Click "Save Configuration"

## Features

### Core Functionality
- **AI Chat Interface**: Full conversational AI powered by OpenAI models
- **File Attachments**: Use `@filename` syntax to attach workspace files
- **Workspace Integration**: Browse and attach any file from your workspace
- **Model Selection**: Choose from multiple GPT models including GPT-4.1, GPT-4o variants
- **Rate Limit Display**: See usage limits for each model
- **Syntax Highlighting**: Code blocks are properly highlighted
- **Markdown Support**: Rich text formatting in responses

### Available Models
- GPT-4.1 (10K TPM, 3 RPM, 200 RPD, 900K TPD)
- GPT-4.1 Mini (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- GPT-4.1 Nano (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- GPT-4o (10K TPM, 3 RPM, 200 RPD, 90K TPD)
- GPT-4o Mini (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- GPT-4o Mini TTS (200 RPD)
- GPT-3.5 Turbo (Legacy)
- GPT-4 (Legacy)

## Project Structure

```
VSC-extension/
├── package.json                 # Extension manifest and dependencies
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Build configuration
├── src/
│   ├── extension.ts            # Main extension entry point
│   ├── providers/
│   │   └── ChatProvider.ts     # Webview provider
│   ├── services/
│   │   ├── AIService.ts        # OpenAI integration
│   │   └── WorkspaceService.ts # File system operations
│   └── webview/                # React frontend
│       ├── index.tsx           # React entry point
│       ├── App.tsx             # Main app component
│       ├── components/
│       │   ├── ChatInterface.tsx
│       │   ├── ConfigPanel.tsx
│       │   ├── MessageBubble.tsx
│       │   └── FileAttachment.tsx
│       ├── hooks/
│       │   └── useChat.ts      # Chat state management
│       └── styles/
│           └── global.css      # All styles
└── dist/                       # Built output
    ├── extension.js            # Extension bundle
    └── webview.js             # React bundle
```

## Architecture

### Extension Architecture
- **Extension Host**: Node.js environment running the VS Code extension
- **Webview**: Sandboxed browser environment running the React app
- **Communication**: Message passing between extension and webview

### Data Flow
1. User interacts with React interface
2. Webview sends messages to extension host
3. Extension processes requests (API calls, file operations)
4. Extension sends responses back to webview
5. React updates UI with new data

### Security
- Content Security Policy prevents XSS attacks
- API keys stored in VS Code's secure configuration
- File access restricted to workspace directories
- Process polyfill for browser compatibility

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
- `aiChat.openaiApiKey`: Your OpenAI API key
- `aiChat.model`: Selected AI model

### Environment Setup
- All dependencies are managed via npm
- TypeScript compilation via webpack
- Separate bundles for extension and webview
- Process polyfill for Node.js compatibility in browser

## Usage Examples

### Basic Chat
1. Open the AI Chat Assistant panel
2. Type any coding question
3. Get AI-powered responses with syntax highlighting

### File Attachments
1. Type `@` followed by filename
2. Select from autocomplete suggestions
3. File content is automatically attached to your message
4. AI can analyze and provide insights about your code

### Model Selection
1. Click the configuration button (⚙️)
2. Choose from available models based on your needs
3. View rate limits and capabilities
4. Save configuration

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
- Check OpenAI account billing and limits
- Try switching to a legacy model (GPT-3.5 Turbo)

**File attachment issues**
- Ensure files are within workspace
- Check file permissions
- Verify workspace is properly opened in VS Code

### Debug Mode
1. Enable VS Code Developer Tools: `Help > Toggle Developer Tools`
2. Check console for detailed error logs
3. Look for API request/response details
4. Monitor configuration save/load operations

## Deployment

### Package Extension
```bash
npm run package
```

### Install Locally
1. Build the extension
2. Package as .vsix file
3. Install via `Extensions: Install from VSIX`

### Publish to Marketplace
1. Set up publisher account
2. Use `vsce` to publish
3. Follow VS Code extension guidelines

## Contributing

### Code Style
- TypeScript for all source code
- React functional components with hooks
- CSS using VS Code theme variables
- Consistent error handling patterns

### Adding New Features
1. Update interfaces and types
2. Implement backend service logic
3. Create React components
4. Add appropriate styling
5. Test thoroughly in development host

### Testing
- Manual testing in Extension Development Host
- Unit tests for service classes
- Integration tests for webview communication
- Cross-platform compatibility testing

## License

[Add your license information here] 