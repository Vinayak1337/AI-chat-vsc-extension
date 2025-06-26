# AI Chat Assistant - VS Code Extension

A powerful Visual Studio Code extension that integrates a React-based AI chat interface directly into your workspace. Chat with AI models while having full context of your codebase, attach files using `@filename` syntax, and generate code seamlessly.

![AI Chat Assistant Demo](media/demo.gif)

## 🚀 Features

### 💬 **Intelligent Chat Interface**
- Clean, modern React-based UI integrated into VS Code
- Support for markdown formatting and syntax-highlighted code blocks
- Real-time chat with AI models (OpenAI GPT-3.5, GPT-4)
- Persistent chat history during your session

### 📎 **Smart File Attachment**
- Use `@filename` syntax to attach files from your workspace
- Auto-complete suggestions as you type
- Support for multiple file attachments per message
- Contextual code analysis with attached files

### 🔧 **Easy Configuration**
- Built-in API key management with secure storage
- Support for multiple AI providers (OpenAI, with more coming)
- Model selection (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo)
- One-click configuration panel

### 🎨 **VS Code Integration**
- Seamless integration with VS Code's native theming
- Responsive design that works in side panels
- Follows VS Code UI/UX patterns
- Command palette integration

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "AI Chat Assistant"
4. Click Install

### From Source
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch extension in Development Host

## 🛠️ Setup

### 1. Configure API Key
1. Open the AI Chat panel from the Explorer sidebar
2. Click the ⚙️ configuration button
3. Select your AI provider (OpenAI)
4. Enter your API key
5. Choose your preferred model
6. Click "Save Configuration"

### 2. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
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

| Setting               | Description         | Default           |
| --------------------- | ------------------- | ----------------- |
| `aiChat.openaiApiKey` | Your OpenAI API key | `""`              |
| `aiChat.model`        | AI model to use     | `"gpt-3.5-turbo"` |

### Supported Models
- **GPT-3.5 Turbo** - Fast and cost-effective
- **GPT-4** - More capable, slower
- **GPT-4 Turbo** - Latest and most capable

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
- **AI Integration**: OpenAI API
- **Build System**: Webpack + TypeScript
- **Styling**: CSS with VS Code theming

## 🚧 Development

### Prerequisites
- Node.js 16+
- VS Code 1.74+
- OpenAI API key

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
- [ ] Multiple AI provider support (Anthropic Claude, etc.)
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