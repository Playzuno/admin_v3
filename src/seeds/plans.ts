export interface Plan {
  id: string;
  variant: 'starter' | 'professional';
  title: string;
  subtitle: string;
  price: number;
  isPopular: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
}

export const plans: Plan[] = [
  {
    id: '1',
    variant: 'starter',
    title: 'Starter Plan',
    subtitle: 'For Professional Business Entrepreneur',
    price: 822.2,
    isPopular: false,
    features: [
      { name: '100GB cloud storage', included: true },
      { name: 'Up to 50 team members', included: true },
      { name: 'Priority support', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Export reports', included: false },
      { name: 'API access', included: false },
    ],
  },
  {
    id: '2',
    variant: 'professional',
    title: 'Professional Plan',
    subtitle: 'The most reliable for Business Enterprises',
    price: 1650.3,
    isPopular: true,
    features: [
      { name: '500GB cloud storage', included: true },
      { name: 'Unlimited team members', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Export reports', included: true },
      { name: 'API access', included: true },
    ],
  },
  {
    id: '3',
    variant: 'starter',
    title: 'Enterprise Plan',
    subtitle: 'For professional Business Enterpreneur',
    price: 2130.5,
    isPopular: false,
    features: [
      { name: '1TB cloud storage', included: true },
      { name: 'Unlimited team members', included: true },
      { name: '24/7 Priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom reporting', included: true },
      { name: 'API access with higher limits', included: true },
    ],
  },
];