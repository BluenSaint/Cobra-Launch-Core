/**
 * Feature flags for toggling functionality
 */

interface FeatureFlags {
  enableDarkMode: boolean;
  enableAIAnalysis: boolean;
  enableNotifications: boolean;
  enableCreditSimulator: boolean;
  enableAutoDisputes: boolean;
  enableVideoPlayback: boolean;
  enableLiveChat: boolean;
  enableMemberDirectory: boolean;
  enableDocumentVault: boolean;
}

// Default feature flags
export const defaultFeatureFlags: FeatureFlags = {
  enableDarkMode: true,
  enableAIAnalysis: true,
  enableNotifications: true,
  enableCreditSimulator: false,
  enableAutoDisputes: false,
  enableVideoPlayback: false,
  enableLiveChat: false,
  enableMemberDirectory: false,
  enableDocumentVault: true,
};

// Production feature flags
export const productionFeatureFlags: FeatureFlags = {
  ...defaultFeatureFlags,
  enableCreditSimulator: true,
};

// Function to check if a feature is enabled
export function isFeatureEnabled(featureName: keyof FeatureFlags): boolean {
  const isProduction = process.env.NODE_ENV === 'production';
  const flags = isProduction ? productionFeatureFlags : defaultFeatureFlags;
  
  return flags[featureName] || false;
}

// Function to get all enabled features
export function getEnabledFeatures(): (keyof FeatureFlags)[] {
  const isProduction = process.env.NODE_ENV === 'production';
  const flags = isProduction ? productionFeatureFlags : defaultFeatureFlags;
  
  return Object.entries(flags)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature as keyof FeatureFlags);
} 