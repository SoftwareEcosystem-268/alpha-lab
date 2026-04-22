# CLAUDE.md

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

## Local Development

Simply open `index.html` directly in a browser or use a simple HTTP server:
```bash
python -m http.server 8000
# or
npx serve .
```

## Testing

HTML validation runs automatically in CI. For local testing:
- **Landing Page**: Open `index.html` directly in a browser
- **Login Page**: Open `login.html` and test form validation
- **Responsive Design**: Test both pages across viewport sizes (breakpoint at 768px)
- **Form Validation**: Test email format validation and password requirements (8+ characters)
- **Navigation**: Verify navigation links work between pages
- **HTML Validation**: Use W3C Markup Validation Service for compliance checking

## Making Changes

- **Page Content**: Edit `index.html` or `login.html` directly
- **Design Consistency**: Maintain the same color scheme, typography, and responsive patterns across pages
- **Form Logic**: Edit JavaScript in `login.html` for validation changes
- **Deployment**: Changes will be deployed automatically to EC2 on push to `main` branch
- **File Management**: The CI/CD pipeline deploys all HTML files and cleans up any old HTML/CSS/JS files
