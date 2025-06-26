# AI Chat Assistant - VS Code Extension

A powerful Visual Studio Code extension that integrates a React-based AI chat interface directly into your workspace. Chat with AI models while having full context of your codebase, attach files using `@filename` syntax, analyze images, and generate code seamlessly.

![AI Chat Assistant](https://img.shields.io/badge/VS%20Code-Extension-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-82.2%25-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![License](https://img.shields.io/badge/License-MIT-green)

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

## 🖼️ Image Support

Both OpenAI and Gemini models support multimodal image analysis:

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

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "AI Chat Assistant"
4. Click Install

### From Source
1. Clone this repository:
   ```bash
   git clone https://github.com/Vinayak1337/AI-chat-vsc-extension.git
   cd AI-chat-vsc-extension
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the extension:
   ```bash
   npm run compile
   ```
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
- **GPT-4.1** - Latest GPT-4 model with improved capabilities (10K TPM, 3 RPM, 200 RPD, 900K TPD)
- **GPT-4.1 Mini** - Faster, more cost-effective GPT-4.1 variant (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- **GPT-4.1 Nano** - Ultra-fast, lightweight GPT-4.1 variant (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- **GPT-4o** - Optimized GPT-4 for better performance (10K TPM, 3 RPM, 200 RPD, 90K TPD)
- **GPT-4o Mini** - Compact version of GPT-4o (60K TPM, 3 RPM, 200 RPD, 200K TPD)
- **GPT-4o Mini TTS** - GPT-4o Mini with text-to-speech capabilities (200 RPD)
- **GPT-3.5 Turbo (Legacy)** - Previous generation model (90K TPM, 3.5K RPM, Unlimited RPD)
- **GPT-4 (Legacy)** - Previous generation GPT-4 model (10K TPM, 500 RPM, Unlimited RPD)

**Google Gemini Models:**
- **Gemini 2.5 Pro** - Most advanced reasoning model with thinking capabilities (1M TPM, 360 RPM, 10K RPD)
- **Gemini 2.5 Flash** - Best price-performance with thinking capabilities (1M TPM, 1K RPM, 50K RPD)
- **Gemini 2.0 Flash** - Next-gen features with superior speed and tool use (1M TPM, 1K RPM, 50K RPD)
- **Gemini 2.0 Flash-Lite** - Cost-efficient and fast Flash model (1M TPM, 1K RPM, 50K RPD)
- **Gemini 1.5 Pro (Legacy)** - Previous generation Pro model (1M TPM, 360 RPM, 10K RPD)
- **Gemini 1.5 Flash (Legacy)** - Previous generation Flash model (1M TPM, 1K RPM, 50K RPD)

*TPM = Tokens Per Minute, RPM = Requests Per Minute, RPD = Requests Per Day, TPD = Tokens Per Day*

## 🏗️ Architecture

### Project Structure
```
src/
├── extension.ts              # Main extension entry point
├── providers/
│   └── ChatProvider.ts       # WebView provider
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
git clone https://github.com/Vinayak1337/AI-chat-vsc-extension.git
cd AI-chat-vsc-extension

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

- **API Keys**: Stored securely in VS Code's configuration using `vscode.ConfigurationTarget.Global`
- **Data Privacy**: Your code and conversations never leave your machine except for API calls
- **No Telemetry**: Extension doesn't collect or transmit usage data
- **Local Processing**: All file reading and workspace operations happen locally
- **Persistent Storage**: Keys persist between VS Code sessions and reloads
- **Auto-detection**: Extension automatically detects saved keys on startup

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

- **Issues**: [GitHub Issues](https://github.com/Vinayak1337/AI-chat-vsc-extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Vinayak1337/AI-chat-vsc-extension/discussions)

## 🗺️ Roadmap

### MVP (Current) ✅
- ✅ Basic chat interface
- ✅ OpenAI and Google Gemini integration
- ✅ File attachment with @syntax
- ✅ Image analysis (multimodal AI)
- ✅ Copy-paste image support
- ✅ Code block copy buttons
- ✅ Live model display
- ✅ VS Code theming

### Phase 2 🚧
- [ ] Additional AI providers (Anthropic Claude, Azure OpenAI)
- [ ] Code generation with direct insertion
- [ ] Chat history persistence
- [ ] Custom prompts and templates
- [ ] Workspace indexing for better context

### Phase 3 🔮
- [ ] Code refactoring assistance
- [ ] Project-wide analysis
- [ ] Integration with Git for commit message generation
- [ ] Plugin system for custom AI providers
- [ ] Voice input support

### Phase 4 🤖 (AI Agents & Visualization)
- [ ] **MCP (Model Context Protocol) Support** - Integration with external tools and data sources
- [ ] **Project Dependency Visualization** - Interactive browser-based tree showing component/file relationships
- [ ] **Context Window Visualization** - Graphical representation of token usage and context management
- [ ] **Advanced Agentic Workflows** - Multi-step AI agents using MCP tools for complex tasks
- [ ] **Background Task Agents** - Autonomous agents that incrementally work on features/UI development with browser testing

### Phase 5 🔍 (Code Analysis & Generation)
- [ ] **Automated Code Review** - AI-powered PR analysis and suggestions
- [ ] **Smart Test Generation** - Automatic unit/integration test creation based on code changes
- [ ] **Documentation Generator** - Auto-generated docs from code and comments
- [ ] **Architecture Advisor** - AI recommendations for project structure and design patterns

### Phase 6 🚀 (Advanced Integrations)
- [ ] **Performance Profiler** - Real-time performance analysis and optimization suggestions
- [ ] **Security Scanner** - Automated vulnerability detection and remediation
- [ ] **Multi-Language Translation** - Code translation between programming languages
- [ ] **Voice-to-Code** - Speech recognition for hands-free coding
- [ ] **Collaborative AI** - Shared AI sessions for team development
- [ ] **CI/CD Integration** - AI-powered build and deployment automation

## 🙏 Acknowledgments

- [VS Code Extension API](https://code.visualstudio.com/api) documentation
- [OpenAI](https://openai.com/) for providing powerful language models
- [Google Gemini](https://ai.google.dev/) for advanced multimodal AI capabilities
- React and TypeScript communities
- All contributors and users of this extension

---

**Made with ❤️ for developers who want AI assistance right in their editor.**