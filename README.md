# Project Cobra

Enterprise-grade credit repair SaaS platform with automated dispute generation, OCR processing, and comprehensive client management.

## Overview

Project Cobra is a full-featured credit repair platform designed for credit repair businesses and financial institutions. The platform automates the dispute process, provides OCR capabilities for document processing, and offers a comprehensive admin interface for managing clients and disputes.

## Features

- **Automated Dispute Generation**: Create and manage disputes with credit bureaus
- **Multi-Engine OCR Processing**: Extract data from credit reports using AWS Textract, Google Vision, and Tesseract
- **Escalation Management**: Handle CFPB and state AG escalations
- **Subscription Management**: Tiered pricing with Stripe integration (Shield, Elite, Infinity plans)
- **Admin War Room**: Comprehensive dashboard for monitoring and management
- **Secure Architecture**: Enterprise-grade security and compliance

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Infrastructure**: AWS, Vercel, GitHub Actions
- **Authentication**: JWT, OAuth
- **Payment Processing**: Stripe
- **OCR**: AWS Textract, Google Vision, Tesseract

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- AWS Account (for Textract)
- Stripe Account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/BluenSaint/Cobra-Launch-Core.git
   cd Cobra-Launch-Core
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

4. Run database migrations:
   ```
   npm run migration:run
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### Development Workflow

- **Feature Branches**: Create feature branches from `main` (e.g., `feature/new-dispute-form`)
- **Pull Requests**: Submit PRs to `main` for review
- **CI/CD**: GitHub Actions will run tests and deploy to staging
- **Production**: Merge to `main` to deploy to production

## Architecture

The application follows a microservices architecture:

- **Web App**: Next.js frontend with App Router
- **Client API**: NestJS backend for client-facing operations
- **Admin API**: NestJS backend for administrative operations
- **OCR Service**: Document processing and violation detection
- **Billing Service**: Subscription and payment management

## Modules

### Dispute Module

Handles the creation, management, and tracking of credit disputes:

- Create disputes against credit bureaus
- Track dispute status and timeline
- Generate dispute letters
- Detect FCRA violations

### Escalation Module

Manages escalation of unresolved disputes:

- CFPB complaint submission
- State Attorney General escalations
- Escalation document management
- Timeline tracking

### OCR Module

Processes credit reports and other documents:

- Multi-engine OCR (AWS Textract, Google Vision, Tesseract)
- Structured data extraction
- Violation detection
- Document storage and retrieval

### Billing Module

Manages subscriptions and payments:

- Stripe integration
- Tiered pricing plans (Shield, Elite, Infinity)
- Payment processing
- Subscription management

### Admin Module

Provides administrative capabilities:

- User management
- Dispute oversight
- System health monitoring
- Analytics dashboard

## Security and Compliance

Project Cobra is designed with security and compliance in mind:

- **FCRA Compliance**: Follows Fair Credit Reporting Act guidelines
- **GDPR Ready**: Designed for data privacy
- **PCI Compliant**: Secure payment processing
- **SOC 2**: Security controls for service organizations
- **Audit Logging**: Comprehensive activity tracking

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For questions or support, please contact the development team at dev@cobra-unit.com.
