export interface Tile {
  id: string;
  accent: string; // primary colour (exactly as provided)
  icon: string;   // centre icon character
  title: string;  // service name
  domains: string[]; // four domain labels
  path: string; // routing target path for details button
}

export const tiles: Tile[] = [
  {
    id: "voice",
    accent: "#E8593C",
    icon: "◈",
    title: "AI Voice Receptionist",
    domains: ["Clinics", "Restaurants", "Salons", "Law Firms"],
    path: "/services/voice-agents",
  },
  {
    id: "chat",
    accent: "#185FA5",
    icon: "AI",
    title: "Intelligent Chatbot",
    domains: ["Customer Support", "HR Helpdesk", "IT FAQ", "Sales Enablement"],
    path: "/services/chatbots",
  },
  {
    id: "workflow",
    accent: "#3B6D11",
    icon: "❋",
    title: "Workflow Automation",
    domains: ["Finance Ops", "HR Onboarding", "Sales CRM", "Ticket Routing"],
    path: "/services/workflow",
  },
  {
    id: "data",
    accent: "#854F0B",
    icon: "⬡",
    title: "Data Dashboards",
    domains: ["Business Intelligence", "Sales Analytics", "Finance Reports", "Ops Dashboards"],
    path: "/services/dashboards",
  },
];

