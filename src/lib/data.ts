import type { LucideIcon } from "lucide-react";
import { Lightbulb, Target, ListChecks, Calculator } from "lucide-react";

export type Objective = {
  id: string;
  title: string;
  description: string;
  preselectedFor?: string[]; // e.g., ['SaaS', 'E-commerce']
  type?: 'qualitative' | 'quantitative';
};

export type Methodology = {
  id: "lean-startup" | "smart" | "okr" | "innovation-accounting";
  name: string;
  icon: LucideIcon;
  objectives: Objective[];
};

// The methodologies array no longer contains dashboard and notebook as they are treated as separate views
export const methodologies: Omit<Methodology, 'objectives'>[] = [
  {
    id: "lean-startup",
    name: "Lean Startup",
    icon: Lightbulb,
  },
  {
    id: "smart",
    name: "SMART Goals",
    icon: Target,
  },
  {
    id: "okr",
    name: "Objectives & Key Results",
    icon: ListChecks,
  },
  {
    id: "innovation-accounting",
    name: "Innovation Accounting",
    icon: Calculator,
  },
];

export const startupTypesForTags = {
  'SaaS': ['User Feedback', 'Feature Request', 'Bug Report', 'Growth Hack'],
  'E-commerce': ['Supplier Note', 'Marketing Campaign', 'Logistics', 'Customer Service'],
  'Marketplace': ['Buyer Side', 'Seller Side', 'Trust & Safety', 'Transaction'],
  'Fintech': ['Regulation', 'Security', 'User Onboarding', 'Compliance'],
  'Healthtech': ['HIPAA', 'Clinical Trial', 'Patient Data', 'Doctor Feedback']
}

export type StartupData = {
  ideaDescription: string;
  refinedConcept: string;
  targetMarkets: string;
  keyFeatures: string;
  industries: string[];
  businessModels: string[];
}

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  attachedTo?: string; // ID of methodology or objective
  createdAt: Date;
}
