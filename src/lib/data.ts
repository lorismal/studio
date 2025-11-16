import type { LucideIcon } from "lucide-react";
import { Lightbulb, Target, ListChecks, Calculator } from "lucide-react";

export type SubObjective = {
  id: string;
  title: string;
  description: string;
  type: 'qualitative' | 'quantitative';
}

export type Objective = {
  id: string;
  title: string;
  description: string;
  subObjectives: SubObjective[];
};

export type Methodology = {
  id: "lean-startup" | "smart" | "okr" | "innovation-accounting";
  name: string;
  icon: LucideIcon;
  objectives: Objective[];
};

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

export const methodologyObjectives: Record<Methodology['id'], Pick<Objective, 'id' | 'title' | 'description'>[]> = {
    'lean-startup': [
        { id: 'ls-build', title: 'Build', description: 'Focus on building the Minimum Viable Product (MVP).' },
        { id: 'ls-measure', title: 'Measure', description: 'Establish metrics to measure customer behavior and validate hypotheses.' },
        { id: 'ls-learn', title: 'Learn', description: 'Learn from the data and decide whether to pivot or persevere.' },
    ],
    'smart': [
        { id: 'sm-specific', title: 'Specific', description: 'Define a clear and specific goal.' },
        { id: 'sm-measurable', title: 'Measurable', description: 'Establish criteria for measuring progress.' },
        { id: 'sm-achievable', title: 'Achievable', description: 'Ensure the goal is realistic and attainable.' },
        { id: 'sm-relevant', title: 'Relevant', description: 'Align the goal with broader business objectives.' },
        { id: 'sm-time-bound', title: 'Time-bound', description: 'Set a deadline for the goal.' },
    ],
    'okr': [
        { id: 'okr-objective', title: 'Set Objective', description: 'Define an ambitious, qualitative goal for the company.' },
        { id: 'okr-key-results', title: 'Define Key Results', description: 'Create 3-5 measurable key results to track achievement of the objective.' },
    ],
    'innovation-accounting': [
        { id: 'ia-mvp', title: 'Establish MVP Baseline', description: 'Define and measure the baseline conversion rates and metrics from the MVP.' },
        { id: 'ia-tune', title: 'Tune the Engine', description: 'Iterate on the product to improve one key metric at a time.' },
        { id: 'ia-pivot', title: 'Pivot or Persevere', description: 'Use the data to make a decision on whether the strategy is working or a change is needed.' },
    ]
}

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
