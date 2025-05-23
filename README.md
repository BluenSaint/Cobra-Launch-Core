# Project Cobra

Project Cobra is a comprehensive platform for automated credit report dispute processing and FCRA compliance management.

![Project Cobra](https://via.placeholder.com/1200x600?text=Project+Cobra)

## Overview

This platform integrates OCR technology, machine learning, and compliance validation to streamline the credit dispute process. It provides a user-friendly interface for submitting and tracking disputes while ensuring all communications adhere to FCRA regulations.

## Features

- **AI-Powered OCR**: Automatically extract and analyze credit report data
- **FCRA Compliance**: Validate all dispute communications against regulatory requirements
- **Real-time Tracking**: Monitor dispute status and progress
- **Secure Document Storage**: Safely store all credit reports and dispute documents
- **Automated Follow-ups**: Schedule and send automated communications
- **Comprehensive Analytics**: Generate detailed reports on dispute progress

## Repository Structure

- `/frontend`: Next.js 14 frontend with App Router
- `/apps/client-api`: NestJS backend API
- `/libs/fcra-compliance`: Rust-based compliance validation engine
- `/libs/credit-parser`: Python ML models for credit report parsing
- `/k8s`: Kubernetes deployment configuration
- `/.github/workflows`: CI/CD pipeline configuration

## Getting Started

### Prerequisites

- Node.js 18+
- Rust 1.70+
- Python 3.9+
- Docker and Docker Compose
- Kubernetes CLI (kubectl)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BluenSaint/Cobra-Unit.git
   cd Cobra-Unit
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../apps/client-api
   npm install
   ```

4. Build the Rust compliance engine:
   ```bash
   cd ../../libs/fcra-compliance
   cargo build
   ```

5. Set up Python environment:
   ```bash
   cd ../credit-parser
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Development

1. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Start the backend development server:
   ```bash
   cd apps/client-api
   npm run start:dev
   ```

### Testing

- Run frontend tests:
  ```bash
  cd frontend
  npm test
  ```

- Run backend tests:
  ```bash
  cd apps/client-api
  npm test
  ```

### Deployment

The project is configured for deployment to AWS EKS using GitHub Actions. See the [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

## Environment Variables

### Frontend Environment Variables

Create a `.env.local` file in the `/frontend` directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
```

### Backend Environment Variables

Create a `.env` file in the `/apps/client-api` directory with the following variables:

```
PORT=3001
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

## Contributing

We welcome contributions to Project Cobra! Please see our [Contribution Guide](CONTRIBUTING.md) for details on how to get started.

## Design

The UI design for this project is available on Figma: [Project Cobra Design](https://figma.com/file/project-cobra-design)

## API Documentation

API documentation is available via Swagger UI at `/api/docs` when running the backend server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
