export function validateEnv(): string {
  const requiredVars = ["NEXTAUTH_SECRET", "NEXTAUTH_URL", "MONGODB_URI", "ADMIN_EMAIL"];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    return `Missing environment variables: ${missingVars.join(", ")}`;
  }

  return "All required environment variables are set.";
}
