import type { LucideIcon } from "lucide-react";
import { Lightbulb, Target, ListChecks, Calculator, Notebook, LayoutDashboard } from "lucide-react";

export type Objective = {
  id: string;
  title: string;
  description: string;
  preselectedFor?: string[]; // e.g., ['SaaS', 'E-commerce']
};

export type Methodology = {
  id: "dashboard" | "lean-startup" | "smart" | "okr" | "innovation-accounting" | "notebook";
  name: string;
  icon: LucideIcon;
  objectives: Objective[];
};

export const methodologies: Methodology[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    objectives: []
  },
  {
    id: "lean-startup",
    name: "Lean Startup",
    icon: Lightbulb,
    objectives: [
      { id: "ls-1", title: "Define Value Hypothesis", description: "What value does your product/service provide to customers?" },
      { id: "ls-2", title: "Define Growth Hypothesis", description: "How will new customers discover your product/service?" },
      { id: "ls-3", title: "Build Minimum Viable Product (MVP)", description: "Create a minimal version of the product to test hypotheses.", preselectedFor: ['SaaS', 'Marketplace'] },
      { id: "ls-4", title: "Establish Build-Measure-Learn Loop", description: "Implement a feedback loop to iterate on the product." },
      { id: "ls-5", title: "Identify Actionable Metrics", description: "Focus on metrics that inform business decisions." },
      { id: "ls-6", title: "Pivot or Persevere Decision", description: "Based on data, decide whether to change strategy or continue." },
    ],
  },
  {
    id: "smart",
    name: "SMART Goals",
    icon: Target,
    objectives: [
      { id: "sm-1", title: "Specific: Define the Goal", description: "Clearly state what you want to accomplish." },
      { id: "sm-2", title: "Measurable: Track Progress", description: "How will you measure success?" },
      { id: "sm-3", title: "Achievable: Set Realistic Goals", description: "Is the goal attainable with your resources?" },
      { id: "sm-4", title: "Relevant: Align with Vision", description: "Does this goal align with your company's mission?" },
      { id: "sm-5", title: "Time-bound: Set a Deadline", description: "What is the timeframe for achieving this goal?" },
    ],
  },
  {
    id: "okr",
    name: "Objectives & Key Results",
    icon: ListChecks,
    objectives: [
      { id: "okr-1", title: "Set Company-wide Objectives", description: "Define 3-5 high-level, ambitious goals for the company." },
      { id: "okr-2", title: "Define Key Results for Each Objective", description: "For each objective, create 3-5 measurable results that signify success." },
      { id: "okr-3", title: "Align Team/Individual OKRs", description: "Cascade objectives down to teams and individuals." },
      { id: "okr-4", title: "Regularly Check-in on Progress", description: "Review progress weekly or bi-weekly." },
      { id: "okr-5", title: "Score and Reflect on OKRs", description: "At the end of the cycle, score performance and reflect on learnings." },
    ],
  },
  {
    id: "innovation-accounting",
    name: "Innovation Accounting",
    icon: Calculator,
    objectives: [
      { id: "ia-1", title: "Establish Baseline Metrics with MVP", description: "Measure initial user engagement and feedback with the MVP." },
      { id: "ia-2", title: "Tune the Engine", description: "Iterate on the product to improve one key metric at a time." },
      { id: "ia-3", title: "Cohort Analysis", description: "Analyze the behavior of different groups of users over time." },
      { id: "ia-4", title: "A/B Testing", description: "Run controlled experiments to test new features or changes." },
      { id: "ia-5", title: "Define Vanity vs. Actionable Metrics", description: "Distinguish between metrics that look good and those that drive decisions." },
    ],
  },
  {
    id: "notebook",
    name: "Notebook",
    icon: Notebook,
    objectives: [],
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
