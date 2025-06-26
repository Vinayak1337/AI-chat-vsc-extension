# AI Chat Assistant - VS Code Extension

A powerful Visual Studio Code extension that integrates a React-based AI chat interface directly into your workspace. Chat with AI models while having full context of your codebase, attach files using `@filename` syntax, and generate code seamlessly.

![AI Chat Assistant Demo](media/demo.gif)

## 🚀 Quick Start

1. **Install the Extension**: Search for "AI Chat Assistant" in VS Code Extensions
2. **Configure API Key**: Click the ⚙️ configuration button in the chat panel
3. **Choose Your Provider**: Select OpenAI or Google Gemini
4. **Add Your API Key**: Get your key from the respective platform
5. **Start Chatting**: Type your questions or use `@filename` to attach files

**API Key Storage**: Your API keys are securely stored in VS Code's configuration and persist between sessions. They never leave your machine.

## 💬 Features

### Chat with AI
- **Natural conversation** with your chosen AI model
- **Code generation** and explanation
- **Best practices** and optimization suggestions
- **Error debugging** and troubleshooting
- **Copy code blocks** - One-click copy button on all code snippets
- **Model display** - See current AI provider and model in the header

### File Attachments
- **Attach any file** using `@filename` syntax
- **Auto-complete** suggestions as you type
- **Multiple file support** in a single message
- **Image analysis** - attach images (PNG, JPG, GIF, BMP, WebP, SVG) for AI to analyze
- **Copy-paste images** - paste screenshots or images directly from clipboard
- **Smart file detection** - images show with 🖼️ icon, files with 📄 icon

### Examples:
```
Can you explain this code? @app.js

What's in this image? @screenshot.png

Help me optimize these files: @config.json @utils.ts

Analyze this UI mockup @design.png and suggest improvements

[Paste a screenshot] Explain what's happening in this error
```

### Code Interaction
- **📋 Copy buttons** automatically appear on all code blocks
- **One-click copying** - Click the clipboard icon to copy entire code snippets
- **Visual feedback** - Button shows ✅ checkmark when copied
- **Smart positioning** - Copy button floats in the top-right of each code block

### Multi-Provider Support
- **OpenAI Models**: GPT-4.1, GPT-4.1 Mini, GPT-4o series, GPT-3.5 Turbo
- **Google Gemini**: 2.5 Pro, 2.5 Flash, 2.0 Flash series with native vision capabilities
- **Automatic switching** between providers
- **Model-specific rate limits** and capabilities displayed
- **Live model display** - Current provider and model shown in the chat header
- **Real-time updates** - Model info updates when you change configuration

## 🚀 Features

### 💬 **Intelligent Chat Interface**
- Clean, modern React-based UI integrated into VS Code
- Support for markdown formatting and syntax-highlighted code blocks
- Real-time chat with AI models (OpenAI GPT-4, Google Gemini 2.5)
- Persistent chat history during your session
- Multi-provider support with seamless switching

### 📎 **Smart File Attachment**
- Use `@filename` syntax to attach files from your workspace
- Auto-complete suggestions as you type
- Support for multiple file attachments per message
- Contextual code analysis with attached files

### 🔧 **Easy Configuration**
- Built-in API key management with secure storage
- Support for multiple AI providers (OpenAI and Google Gemini)
- Comprehensive model selection including latest Gemini 2.5 models
- One-click configuration panel with provider switching

### 🎨 **VS Code Integration**
- Seamless integration with VS Code's native theming
- Responsive design that works in side panels
- Follows VS Code UI/UX patterns
- Command palette integration

## 📦 Installation


### From Source
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch extension in Development Host

## 🛠️ Setup

### 1. Configure API Key
1. Open the AI Chat panel from the Explorer sidebar
2. Click the ⚙️ configuration button
3. Select your AI provider (OpenAI or Google Gemini)
4. Enter your API key for the selected provider
5. Choose your preferred model
6. Click "Save Configuration"

### 2. Get API Keys
**For OpenAI:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy and paste it into the extension

**For Google Gemini:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an account or sign in
3. Generate a new API key
4. Copy and paste it into the extension

## 🎯 Usage

### Basic Chat
Simply type your questions or requests in the chat input and press Enter or click Send.

**Examples:**
- "Create a React component for a todo list"
- "Explain how async/await works in JavaScript"
- "What are the best practices for error handling?"

### File Attachment
Use the `@` syntax to attach files from your workspace:

1. Type `@` followed by the filename
2. Select from the auto-complete suggestions
3. The file content will be included in your message
4. Ask questions about the specific code

**Examples:**
- `@components/Button.tsx can you add prop validation?`
- `@utils/api.js how can I improve error handling here?`
- `@package.json what dependencies should I update?`

### Code Generation
Ask the AI to generate or modify code:

**Examples:**
- "Create a TypeScript interface for a user profile"
- "Generate a REST API endpoint for user authentication"
- "Write unit tests for the attached component"

## 🔧 Commands

- `AI Chat: Open Chat` - Opens the chat panel
- Access via Command Palette (Ctrl+Shift+P)

## ⚙️ Configuration

### Extension Settings

| Setting               | Description                 | Default          |
| --------------------- | --------------------------- | ---------------- |
| `aiChat.provider`     | AI provider (openai/gemini) | `"openai"`       |
| `aiChat.openaiApiKey` | Your OpenAI API key         | `""`             |
| `aiChat.geminiApiKey` | Your Google Gemini API key  | `""`             |
| `aiChat.model`        | AI model to use             | `"gpt-4.1-mini"` |

### Supported Models

**OpenAI Models:**
- **GPT-4.1** - Latest GPT-4 model with improved capabilities
- **GPT-4.1 Mini** - Faster, more cost-effective GPT-4.1 variant
- **GPT-4o** - Optimized GPT-4 for better performance
- **GPT-4o Mini** - Compact version of GPT-4o
- **GPT-3.5 Turbo (Legacy)** - Previous generation model

**Google Gemini Models:**
- **Gemini 2.5 Pro** - Most advanced reasoning model with thinking capabilities
- **Gemini 2.5 Flash** - Best price-performance with thinking capabilities
- **Gemini 2.0 Flash** - Next-gen features with superior speed and tool use
- **Gemini 2.0 Flash-Lite** - Cost-efficient and fast Flash model
- **Gemini 1.5 Pro/Flash (Legacy)** - Previous generation models

## 🏗️ Architecture

### Project Structure
```
src/
├── extension.ts              # Main extension entry point
├── providers/
│   ├── ChatProvider.ts       # WebView provider
│   └── FileProvider.ts       # File attachment handler
├── services/
│   ├── AIService.ts          # AI model integration
│   └── WorkspaceService.ts   # VS Code workspace integration
└── webview/
    ├── App.tsx               # Main React app
    ├── components/           # React components
    ├── hooks/                # Custom React hooks
    └── styles/               # CSS styling
```

### Technology Stack
- **Extension**: TypeScript + VS Code Extension API
- **WebView**: React 18 + TypeScript
- **AI Integration**: OpenAI API + Google Generative AI
- **Build System**: Webpack + TypeScript
- **Styling**: CSS with VS Code theming

## 🚧 Development

### Prerequisites
- Node.js 16+
- VS Code 1.74+
- API key for your chosen provider (OpenAI or Google Gemini)

### Setup Development Environment
```bash
# Clone the repository
git clone <repository-url>
cd vscode-ai-chat-extension

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Run tests
npm test
```

### Building
```bash
# Development build
npm run compile

# Production build
npm run package
```

## 🔒 Security & Privacy

- **API Keys**: Stored securely in VS Code's configuration
- **Data Privacy**: Your code and conversations never leave your machine except for API calls
- **No Telemetry**: Extension doesn't collect or transmit usage data
- **Local Processing**: All file reading and workspace operations happen locally

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@your-domain.com

## 🗺️ Roadmap

### MVP (Current)
- ✅ Basic chat interface
- ✅ OpenAI integration
- ✅ File attachment with @syntax
- ✅ VS Code theming

### Phase 2
- [x] Multiple AI provider support (OpenAI and Google Gemini)
- [ ] Additional providers (Anthropic Claude, etc.)
- [ ] Code generation with direct insertion
- [ ] Chat history persistence
- [ ] Custom prompts and templates

### Phase 3
- [ ] Code refactoring assistance
- [ ] Project-wide analysis
- [ ] Integration with Git for commit message generation
- [ ] Plugin system for custom AI providers

## 🙏 Acknowledgments

- VS Code Extension API documentation
- OpenAI for providing powerful language models
- React and TypeScript communities
- All contributors and users of this extension

---

**Made with ❤️ for developers who want AI assistance right in their editor.**

## 🖼️ Image Support

Both OpenAI and Gemini models support image analysis:

### Supported Image Formats
- PNG, JPG/JPEG, GIF, BMP, WebP, SVG

### How to Use
**File Attachments:**
1. Type `@` followed by your image filename
2. Select the image from the autocomplete dropdown  
3. The image will appear with a 🖼️ icon
4. Send your message with the image attached

**Copy-Paste Images:**
1. Copy an image to your clipboard (screenshot, browser image, etc.)
2. Click in the chat input field
3. Press `Ctrl+V` (or `Cmd+V` on Mac) to paste
4. The image will automatically appear as an attachment with "(pasted)" label
5. Send your message with the pasted image

### Example Use Cases
- **UI/UX Analysis**: "What improvements can you suggest for this design? @mockup.png"
- **Code Screenshots**: "What's wrong with this error? @error-screenshot.png"  
- **Diagrams**: "Explain this architecture diagram @system-design.png"
- **Data Visualization**: "Analyze the trends in this chart @sales-chart.png"

### Vision Capabilities
- **OpenAI GPT-4**: Advanced image understanding with detailed analysis
- **Gemini 2.5 Pro/Flash**: Native multimodal capabilities with excellent visual reasoning
- **Automatic processing**: Images are automatically converted to the optimal format for each provider

## 🔧 Configuration

### API Keys
Your API keys are stored securely in VS Code's workspace configuration using `vscode.ConfigurationTarget.Global`. This means:
- ✅ **Persistent storage** - Keys persist between VS Code sessions and reloads
- ✅ **Secure** - Keys are stored in VS Code's encrypted configuration
- ✅ **Local only** - Keys never leave your machine
- ✅ **Per-provider** - Separate keys for OpenAI and Gemini
- ✅ **Auto-detection** - Extension automatically detects saved keys on startup

**Note**: If the extension shows "API Key Required" after restart, wait a moment for auto-detection or click the ⚙️ settings icon to verify your saved configuration.

### Getting API Keys

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy and paste into the extension configuration

#### Google Gemini  
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into the extension configuration 