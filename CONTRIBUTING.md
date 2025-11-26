# Contributing to Valuation.AI

First off, thank you for considering contributing to Valuation.AI! It's people like you that make this tool amazing.

## 🌟 Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- ⚡ Optimize performance
- ✅ Write tests
- 🔧 Fix issues

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Git
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/valuation-ai.git
   cd valuation-ai
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original/valuation-ai.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run the app
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add currency conversion feature"
git commit -m "fix: resolve PDF export issue"
git commit -m "docs: update README with new features"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit!

## 📝 Pull Request Guidelines

### PR Title

Use conventional commit format:
```
feat: add dark mode toggle
fix: resolve calculation error for negative values
docs: improve installation instructions
```

### PR Description

Include:
- **What** - What does this PR do?
- **Why** - Why is this change needed?
- **How** - How does it work?
- **Screenshots** - If UI changes
- **Testing** - How was it tested?

Example:
```markdown
## What
Adds a dark mode toggle to the navigation bar.

## Why
Users requested a dark mode option for better viewing at night.

## How
- Added theme context provider
- Created toggle component
- Updated CSS variables
- Persisted preference in localStorage

## Screenshots
[Before/After images]

## Testing
- Tested on Chrome, Firefox, Safari
- Verified localStorage persistence
- Checked all pages in both modes
```

## 🎨 Code Style

### JavaScript/React

- Use functional components with hooks
- Prefer `const` over `let`
- Use arrow functions
- Destructure props
- Use meaningful variable names

```javascript
// Good ✅
const ValuationDisplay = ({ result, metrics }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleExport = async () => {
    // ...
  };
  
  return <div>...</div>;
};

// Bad ❌
function ValuationDisplay(props) {
  var loading = false;
  
  function export() {
    // ...
  }
  
  return <div>...</div>;
}
```

### CSS

- Use CSS variables
- Follow BEM naming convention
- Mobile-first approach
- Avoid `!important`

```css
/* Good ✅ */
.button-primary {
  background: var(--accent-primary);
  padding: var(--space-md);
}

.button-primary:hover {
  background: var(--accent-secondary);
}

/* Bad ❌ */
.btn {
  background: #E65100 !important;
  padding: 16px;
}
```

## 🧪 Testing

Before submitting:

- [ ] App runs without errors
- [ ] All features work as expected
- [ ] No console errors/warnings
- [ ] Responsive on mobile
- [ ] Works in Chrome, Firefox, Safari
- [ ] PDF export works
- [ ] Save/load works
- [ ] Keyboard shortcuts work

## 📚 Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Adding dependencies
- Modifying API

Files to update:
- `README.md` - Main documentation
- `CHANGELOG.md` - Version history
- Code comments - Complex logic
- JSDoc - Function documentation

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try latest version
3. Clear cache/localStorage
4. Test in incognito mode

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or references.
```

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in commits
- Invited to maintainer team (for significant contributions)

## 📞 Questions?

- 💬 [Discord Community](#)
- 📧 Email: dev@valuation-ai.com
- 🐦 Twitter: [@ValuationAI](#)

## 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

**Thank you for contributing! 🎉**
