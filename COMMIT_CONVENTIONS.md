# Commit Message Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to ensure consistent and meaningful commit messages.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
- **ci**: Changes to our CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies
- **revert**: Reverts a previous commit

## Examples

### Good Examples
```
feat(auth): Add user authentication system
fix(api): Resolve 500 error in user endpoint
docs(readme): Update installation instructions
style(components): Format code with prettier
refactor(utils): Extract common validation logic
perf(database): Optimize user query performance
test(auth): Add unit tests for login function
chore(deps): Update dependencies to latest versions
ci(github): Add automated testing workflow
build(webpack): Update webpack configuration
revert: Revert "feat(auth): Add user authentication system"
```

### Bad Examples
```
❌ add feature
❌ fixed bug
❌ update stuff
❌ WIP
❌ changes
```

## Rules

1. **Type is required** and must be one of the allowed types
2. **Type must be lowercase**
3. **Subject is required** and must be sentence case (first letter capitalized)
4. **Subject must not end with a period**
5. **Header must not exceed 100 characters**
6. **Body and footer are optional** but recommended for complex changes

## Tools

- **Commitlint**: Validates commit messages against conventional commit format
- **Husky**: Git hooks to run commitlint on every commit
- **Git Template**: Pre-configured commit message template

## Usage

1. Use the git template: `git commit` (opens editor with template)
2. Or commit directly: `git commit -m "feat: Add new feature"`
3. Commitlint will automatically validate your message

## Benefits

- **Consistent History**: Easy to read and understand commit history
- **Automated Changelogs**: Tools can generate changelogs from commit messages
- **Better Collaboration**: Team members can quickly understand changes
- **Release Management**: Easy to identify breaking changes and new features
