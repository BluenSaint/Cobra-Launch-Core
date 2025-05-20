# Cobra Unit GitHub Actions Automation

This directory contains GitHub Actions workflows for automating the deployment process of the Cobra Unit project.

## Workflows

### 1. Agent Fixer (`autofix-vercel.yml`)

This workflow automatically detects and fixes Vercel deployment failures, particularly focusing on module resolution errors.

**Trigger:**
- Push to the `main` branch
- Manual trigger via GitHub Actions UI

**Actions:**
- Attempts to build the project
- If build fails, analyzes error logs for module resolution issues
- Creates placeholder files for missing modules
- Updates configuration files if necessary
- Creates a PR with the fixes

### 2. Agent Reviewer (`review-autofix.yml`)

This workflow reviews and potentially merges PRs created by the Agent Fixer.

**Trigger:**
- PR opened, labeled, or synchronized with:
  - Title containing `[Needs Review]`
  - Labels containing `needs-review` or `automated-pr`
- Manual trigger via GitHub Actions UI

**Actions:**
- Verifies that the fixes resolve the build issues
- Approves and merges the PR if successful
- Provides feedback if issues remain

## Setting Up

1. Clone this repository
2. Ensure GitHub Actions is enabled for your repository
3. Add the required secrets in GitHub repository settings:
   - `GITHUB_TOKEN`: For performing Git operations and creating PRs
   - `VERCEL_TOKEN`: For Vercel deployment interactions (if needed)

## Environment Variables

See `.github/env.example` for a complete list of environment variables used by the automation system.

## Maintenance

If you encounter any issues with the automation, check the GitHub Actions logs for details. The system is designed to be self-healing for common deployment issues. 