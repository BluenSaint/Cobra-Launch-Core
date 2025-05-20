# Project Cobra 🐍

Project Cobra is an AI-powered credit repair SaaS application that helps users dispute inaccuracies on their credit reports.

## Features

- 🧠 AI-powered credit report analysis
- 📝 Automated dispute letter generation
- 📈 Credit score simulation and tracking
- 🔒 Bank-level security for document handling
- ⚖️ FCRA and CROA compliant processes
- 🚀 Regulatory escalation to CFPB when needed

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Animation**: Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB connection string
- Stripe API keys
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-cobra.git
   cd project-cobra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Authentication providers
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
  /app                 # App Router pages and layouts
    /auth              # Authentication routes
    /dashboard         # User dashboard routes
    /upload            # File upload routes
    /pricing           # Pricing routes
  /components          # React components
    /ui                # UI components (Button, Card, etc.)
    /layout            # Layout components (Navbar, Footer, etc.)
    /auth              # Authentication components
    /dashboard         # Dashboard components
  /lib                 # Utility functions
    /auth              # Auth utilities
    /db                # Database utilities
    /stripe            # Stripe utilities
  /types               # TypeScript type definitions
```

## Deployment

This project is configured to deploy on Vercel. Connect your GitHub repository to Vercel for automatic deployments on push to main.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 