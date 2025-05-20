export function validateEnv() {
  const requiredVars = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'MONGODB_URI', 'ADMIN_EMAIL'];

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is missing`);
    }
  });

  console.log('All required environment variables are set.');
} 