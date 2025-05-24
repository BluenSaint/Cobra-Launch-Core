export interface PlanDetails {
  price: number;
  disputes: number | string;
  tradelines: number;
}

export const plans: Record<string, PlanDetails> = {
  Shield: { price: 85, disputes: 2, tradelines: 0 },
  Elite: { price: 150, disputes: "Unlimited", tradelines: 1 },
  Infinity: { price: 399, disputes: "Unlimited", tradelines: 2 },
};

export function getPlanDetails(planName: string): PlanDetails | undefined {
  return plans[planName];
}
