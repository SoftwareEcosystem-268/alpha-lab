/# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static HTML website for "Alpha App" - a multi-page website with no build process or dependencies. The project consists of two main HTML files:

- `index.html` - Landing page with hero, features, about, and CTA sections
- `login.html` - Authentication page with login form

## Architecture

- **Multi-page Application**: Each page is a self-contained HTML file with embedded CSS in the `<style>` tag
- **No Build Process**: Direct HTML/CSS with no compilation, bundling, or package management
- **Static Content**: Pure client-side static pages with minimal JavaScript for form validation
- **Consistent Design**: All pages share the same color scheme (pink-to-orange gradients), typography (Segoe UI), and responsive patterns
- **Navigation Structure**: 
  - Shared header navigation with links: Home, Features, About, Login
  - `index.html` contains all sections (hero, features, about, CTA) with anchor navigation
  - `login.html` is a standalone authentication page
- **Form Validation**: Real-time validation with visual feedback (green/red borders), error messages, and loading states

## Deployment

The project uses GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) to automatically deploy to EC2:

- **Triggers**: On push to `main` branch
- **CI Stage**: Validates HTML structure exists and has proper tags (`<html>`, `<head>`, `<body>`) for all HTML files
- **CD Stage**:
  - Cleans old HTML/CSS/JS files from EC2 deploy path
  - Copies all HTML files (`*.html`) to EC2 via SSH
- **Deployed Files**: `index.html`, `login.html`
- **Required Secrets**:
  - `EC2_HOST`: EC2 instance hostname/IP
  - `EC2_USER`: SSH username for EC2
  - `EC2_SSH_KEY`: Private SSH key for authentication
  - `DEPLOY_PATH`: Target directory on EC2
- **GitHub Permissions**: Pre-configured in `.claude/settings.local.json` for `gh issue`, `git remote`, and `curl` commands

## Local Development

Simply open `index.html` directly in a browser or use a simple HTTP server:

```bash
python -m http.server 8000
# or
npx serve .
```

### CSS Conventions

- **Color Scheme**: Pink-to-orange gradient (`linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`)
- **Typography**: Segoe UI font family, consistent heading sizes and weights
- **Responsive Breakpoint**: 768px for mobile layouts
- **Button Styles**: `.btn` base class with `.btn-primary` variant, hover effects with transform and shadow
- **Form Styles**: `.form-group` wrapper with real-time validation classes (`.valid`, `.invalid`)
- **Animation**: Loading spinner with `@keyframes spin` for form submission states

### JavaScript Patterns

- **Form Validation**: Real-time validation on `blur` and `input` events
- **Email Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` for email format validation
- **Password Requirements**: Minimum 8 characters with visual feedback
- **Loading States**: Button disabled state with spinner animation during submission
- **Success Handling**: Form replacement with success message, simulated redirect after 2 seconds

## Testing

HTML validation runs automatically in CI. For local testing:

- **Landing Page**: Open `index.html` directly in a browser
- **Login Page**: Open `login.html` and test form validation
- **Responsive Design**: Test both pages across viewport sizes (breakpoint at 768px)
- **Form Validation**: 
  - Test email format validation (invalid vs valid emails)
  - Test password requirements (minimum 8 characters)
  - Verify real-time validation feedback (border colors, error messages)
  - Test form submission loading state and success message
- **Navigation**: Verify navigation links work between pages and anchor links scroll correctly
- **HTML Validation**: Use W3C Markup Validation Service for compliance checking

## Making Changes

- **Page Content**: Edit `index.html` or `login.html` directly
- **Design Consistency**: Maintain the same color scheme, typography, and responsive patterns across pages
- **Form Logic**: Edit JavaScript in `login.html` for validation changes
- **Deployment**: Changes will be deployed automatically to EC2 on push to `main` branch
- **File Management**: The CI/CD pipeline deploys all HTML files and cleans up any old HTML/CSS/JS files

## Troubleshooting

- **CI/CD Failures**: Check that all HTML files have proper structure (`<html>`, `<head>`, `<body>` tags)
- **Deployment Issues**: Verify GitHub Secrets are configured correctly (`EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`, `DEPLOY_PATH`)
- **Form Validation Not Working**: Check that JavaScript is enabled in browser and no console errors
- **Styling Issues**: Ensure CSS is not being blocked by browser extensions or cache issues
- **Navigation Problems**: Verify file paths are correct and files exist in expected locations
