# Contributing to AI Chat Assistant

Thank you for your interest in contributing to the AI Chat Assistant VS Code extension! We welcome contributions from developers of all skill levels.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **VS Code**: Version 1.74.0 or higher
- **Git**: For version control
- **API Keys**: For testing (OpenAI or Google Gemini)

### First Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-chat-vsc-extension.git
   cd AI-chat-vsc-extension
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Vinayak1337/AI-chat-vsc-extension.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the project**:
   ```bash
   npm run compile
   ```

## Development Setup

### Running the Extension

1. **Open in VS Code**:
   ```bash
   code .
   ```

2. **Start debugging**:
   - Press `F5` or go to `Run > Start Debugging`
   - This opens a new VS Code window with the extension loaded
   - Look for "AI Chat Assistant" in the Activity Bar

3. **Live development**:
   - Use `npm run watch` for automatic compilation on file changes
   - Reload the Extension Development Host window (`Ctrl+R`/`Cmd+R`) after changes

### Environment Configuration

Create a `.env` file in the root directory for testing (optional):
```env
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
```

**Note**: Never commit API keys. They should be configured through the extension's UI.

## Project Structure

```
src/
├── extension.ts              # Main extension entry point
├── providers/
│   └── ChatProvider.ts       # WebView provider and message handling
├── services/
│   ├── AIService.ts          # AI provider integration (OpenAI/Gemini)
│   └── WorkspaceService.ts   # VS Code workspace operations
└── webview/                  # React frontend
    ├── App.tsx               # Main React application
    ├── components/           # React components
    │   ├── ChatInterface.tsx # Main chat UI
    │   ├── ConfigPanel.tsx   # Settings configuration
    │   ├── MessageBubble.tsx # Individual message display
    │   └── FileAttachment.tsx # File/image attachment display
    ├── hooks/
    │   └── useChat.ts        # Chat state management
    └── styles/
        └── global.css        # All styling with VS Code theming
```

## Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Keep your branch updated**:
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

3. **Make your changes** following the coding standards below

4. **Test your changes** thoroughly

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add support for Claude AI provider
fix: resolve image attachment display issue
docs: update API configuration guide
style: format code according to prettier rules
refactor: extract common AI service logic
```

## Coding Standards

### TypeScript

- **Strict mode**: Use TypeScript strict mode
- **Interfaces**: Define clear interfaces for all data structures
- **Type safety**: Avoid `any` types when possible
- **Naming**: Use PascalCase for classes/interfaces, camelCase for variables/functions

### React

- **Functional components**: Use functional components with hooks
- **Props typing**: Always type component props with interfaces
- **State management**: Use appropriate hooks (`useState`, `useEffect`, `useCallback`)
- **Key props**: Always provide keys for list items

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

**Key principles:**
- **Consistent indentation**: 2 spaces (tabs for some files to match VS Code conventions)
- **Semicolons**: Required
- **Quotes**: Single quotes for strings, double quotes for JSX attributes
- **No console.logs**: Remove before committing (except for intentional debugging)

### VS Code Extension Patterns

- **Configuration**: Use VS Code's configuration system for settings
- **Commands**: Register commands properly in `package.json`
- **Webview communication**: Use proper message passing patterns
- **Error handling**: Provide meaningful error messages to users
- **Performance**: Avoid blocking the main thread

## Testing

### Manual Testing

1. **Extension Loading**: Ensure extension loads without errors
2. **Configuration**: Test API key setup for both providers
3. **Chat Functionality**: Test basic chat with different models
4. **File Attachments**: Test `@filename` syntax with various file types
5. **Image Support**: Test image attachments and copy-paste functionality
6. **UI Responsiveness**: Test in different VS Code themes and panel sizes
7. **Error Handling**: Test with invalid API keys, network issues, etc.

### Testing Checklist

Before submitting a PR, verify:

- [ ] Extension loads without console errors
- [ ] Configuration panel works for both providers
- [ ] Chat works with at least one AI provider
- [ ] File attachment functionality works
- [ ] Image attachment and copy-paste works
- [ ] Copy buttons appear on code blocks
- [ ] Model display shows current selection
- [ ] No TypeScript compilation errors
- [ ] No ESLint warnings
- [ ] Cross-platform compatibility (if possible)

### Automated Tests

We welcome contributions to add automated testing:

- Unit tests for service classes
- Integration tests for webview communication
- E2E tests for user workflows

## Submitting Changes

### Pull Request Process

1. **Ensure your branch is up to date**:
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots/GIFs for UI changes
   - Testing instructions
   - Link to any related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All providers tested (OpenAI/Gemini)
- [ ] Cross-platform testing (if applicable)

## Screenshots
[Include screenshots for UI changes]

## Related Issues
Fixes #[issue number]
```

### Review Process

1. **Automated checks**: PRs must pass linting and compilation
2. **Code review**: At least one maintainer will review your code
3. **Testing**: Changes will be tested in development environment
4. **Feedback**: Address any feedback or requested changes
5. **Merge**: Once approved, your PR will be merged

## Issue Guidelines

### Reporting Bugs

Use the bug report template and include:

- **VS Code version**: Help > About
- **Extension version**: From Extensions panel
- **Operating system**: Windows/macOS/Linux version
- **API provider**: OpenAI/Gemini
- **Reproduction steps**: Clear step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Console logs**: Any error messages from Developer Tools
- **Screenshots**: If UI-related

### Performance Issues

Include:
- **Actions that trigger slowness**
- **File types and sizes being processed**
- **System specifications**
- **Network conditions**

## Feature Requests

When requesting features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** clearly
3. **Explain the expected behavior**
4. **Consider implementation complexity**
5. **Discuss alternatives** you've considered

### Feature Categories

- **AI Provider Support**: New providers or models
- **UI/UX Improvements**: Interface enhancements
- **Functionality**: New capabilities or workflows
- **Performance**: Optimization improvements
- **Developer Experience**: Development and debugging tools

## Documentation

### Code Documentation

- **JSDoc comments** for public methods and complex logic
- **README updates** for new features
- **Configuration documentation** for new settings
- **API documentation** for service methods

### User Documentation

- **Feature documentation** in README.md
- **Setup instructions** for new providers
- **Troubleshooting guides** for common issues
- **Examples** of usage patterns

## Development Tips

### Debugging

1. **Extension Host**: Use VS Code's debugger for extension code
2. **Webview**: Use Developer Tools for React debugging
3. **API Calls**: Console.log API requests/responses during development
4. **State Management**: Use React Developer Tools

### Common Pitfalls

- **Message passing**: Ensure proper cleanup of event listeners
- **API rate limits**: Test with actual rate limits in mind
- **File permissions**: Handle file access errors gracefully
- **Cross-platform**: Test file paths on different OS
- **VS Code theming**: Ensure UI works with different themes

### Useful Commands

```bash
# Development
npm run watch          # Watch mode compilation
npm run compile        # One-time compilation
npm run package        # Production build

# Code Quality
npm run lint           # Run ESLint
npm run lint -- --fix  # Fix ESLint issues

# VS Code
F5                     # Start debugging
Ctrl+R (Cmd+R)        # Reload extension host
F12                    # Open Developer Tools
```

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Code Review**: Tag maintainers in PRs for review

## Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Credit for significant features
- **GitHub**: Contributor graph and statistics

---

Thank you for contributing to AI Chat Assistant! 🚀 