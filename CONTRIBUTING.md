# Contributing to Project Cobra

We're excited that you're interested in contributing to Project Cobra! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template when creating a new issue
- Include detailed steps to reproduce the bug
- Include screenshots if applicable
- Specify the browser/environment where the bug occurs

### Suggesting Features

- Check if the feature has already been suggested in the Issues section
- Use the feature request template when creating a new issue
- Provide a clear description of the feature
- Explain why this feature would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch from `dev` (not `main`)
3. Make your changes
4. Run tests to ensure they pass
5. Submit a pull request to the `dev` branch

## Development Setup

Follow the setup instructions in the README.md file to get your development environment ready.

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the existing code style and patterns
- Add comments for complex logic
- Keep functions small and focused

### Frontend (Next.js)

- Follow React best practices
- Use functional components with hooks
- Use TypeScript for type safety
- Follow the Tailwind CSS class naming conventions
- Use Framer Motion for animations

### Backend (NestJS)

- Follow NestJS architectural patterns
- Use TypeScript decorators appropriately
- Write comprehensive unit tests
- Document all API endpoints

### Rust (FCRA Compliance)

- Follow Rust idioms and best practices
- Write comprehensive unit tests
- Document public functions and types

### Python (ML Scripts)

- Follow PEP 8 style guide
- Use type hints
- Document functions with docstrings

## Commit Messages

- Use clear and meaningful commit messages
- Start with a verb in the present tense (e.g., "Add feature" not "Added feature")
- Reference issue numbers when applicable

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation if you're changing functionality
3. The PR must pass all CI checks
4. The PR requires approval from at least one maintainer
5. Once approved, a maintainer will merge your PR

## Release Process

The project follows a continuous deployment model:

1. Changes are merged into `dev` branch
2. After testing, `dev` is merged into `main`
3. Releases are tagged following semantic versioning

Thank you for contributing to Project Cobra!
