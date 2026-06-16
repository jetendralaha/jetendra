// =============================================================
//  EDIT YOUR PORTFOLIO CONTENT HERE
//  Everything the site renders is driven by this single file.
// =============================================================

// Vite's base path (e.g. "/jetendra/"). Used to build links to files in
// /public so they resolve correctly on GitHub Pages project sites.
const BASE = import.meta.env.BASE_URL;

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone" | "location";
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
}

export const personal = {
  name: "Jetendra Laha",
  title: "Lead Software Engineer — DevOps & DevSecOps",
  tagline:
    "Building secure, cloud-native platforms with Kubernetes, automated DevSecOps pipelines, and AI-driven security.",
  location: "Bangalore, Karnataka, India",
  email: "jetendra.laha162@gmail.com",
  phone: "+91-9348366218",
  // Drop your photo into /public as profile.jpg (or .png/.webp and update this path).
  photoUrl: `${BASE}profile.jpg`,
  about: [
    "Lead DevOps & DevSecOps Engineer with 10+ years of experience across cloud platforms, Kubernetes, CI/CD automation, and secure infrastructure in enterprise and R&D environments.",
    "I design and secure end-to-end DevSecOps pipelines — integrating SAST, DAST, SCA, and secure SDLC practices — and build AI-driven security automation for intelligent log analysis, vulnerability detection, and automated remediation.",
    "I lead AI Security Posture Management (AISPM) initiatives, enforce shift-left security, and align cloud platforms with CIS Benchmarks, GDPR, HIPAA, and PCI DSS.",
  ],
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "Multi-Cloud", label: "AWS & Azure" },
    { value: "DevSecOps", label: "Secure SDLC" },
    { value: "AI-Driven", label: "Security Automation" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jetendra-laha-406186195",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:jetendra.laha162@gmail.com",
    icon: "mail",
  },
  {
    label: "Phone",
    href: "tel:+919348366218",
    icon: "phone",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Cloud & Platforms",
    items: ["AWS", "Azure", "Kubernetes (EKS)", "Docker", "OpenShift"],
  },
  {
    category: "CI/CD & IaC",
    items: ["GitLab CI/CD", "Azure DevOps", "Terraform", "Ansible", "Helm"],
  },
  {
    category: "DevSecOps",
    items: [
      "SonarQube (SAST)",
      "Checkmarx (DAST)",
      "Trivy / Aqua",
      "SCA & SBOM",
      "Secure CI/CD Gates",
    ],
  },
  {
    category: "AI & Automation",
    items: ["RAG", "RLM", "Tree-of-Thoughts", "Cognee", "AI Agents", "AISPM"],
  },
  {
    category: "Observability",
    items: ["Datadog", "Prometheus", "Grafana"],
  },
  {
    category: "Programming & OS",
    items: ["Python", "Shell Scripting", "Linux"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Lead Software Engineer (DevOps & DevSecOps)",
    company: "Siemens Technology and Service Pvt. Ltd.",
    period: "Dec 2021 – Present",
    location: "Bangalore, India",
    highlights: [
      "Designed and implemented secure CI/CD pipelines using GitLab CI/CD and Azure DevOps.",
      "Managed AWS EKS clusters and Kubernetes-based application deployments at scale.",
      "Implemented Infrastructure as Code with Terraform and Ansible across AWS and Azure.",
      "Enabled Trivy-based container security with Aqua integration for automated scanning and secure releases.",
      "Integrated SAST (SonarQube) with quality gates and DAST (Checkmarx) for runtime vulnerability detection.",
      "Built AI agents using RAG, RLM, and Tree-of-Thoughts to detect vulnerabilities, suggest fixes, and auto-raise Merge Requests.",
      "Automated severity-based pipeline fail/pass controls, improving MTTR and remediation timelines.",
      "Integrated SCA tooling to generate SBOMs and block high-risk dependencies from production.",
      "Implemented monitoring with Datadog, Prometheus, and Grafana.",
    ],
  },
  {
    role: "Senior Member of Technical Staff — R&D",
    company: "Mavenir Systems Pvt. Ltd.",
    period: "Sep 2019 – Dec 2021",
    location: "India",
    highlights: [
      "Automated Kubernetes cluster provisioning on on-prem and cloud using Ansible.",
      "Managed Helm and nested Helm charts with Harbor repositories.",
      "Performed resilience and capacity testing using JMeter and Kubernetes workloads.",
      "Integrated Prometheus and Grafana for observability.",
      "Collaborated with engineering teams to resolve platform and deployment issues.",
    ],
  },
  {
    role: "Cloud Infrastructure Operations Engineer",
    company: "Crusaders Tech Solution LLP",
    period: "Sep 2015 – Sep 2019",
    location: "India",
    highlights: [
      "Managed OpenStack-based private cloud environments with SDN controllers.",
      "Handled production and lab infrastructure scaling across multi-vendor hardware.",
      "Developed shell scripts for automation and operational efficiency.",
      "Supported Linux-based systems and open-source IaaS platforms.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Cloud Cost Analysis",
    description:
      "Open-source tool for cloud cost optimization — analyzes usage and spend, then surfaces actionable savings suggestions across resources.",
    tags: ["FinOps", "Cloud Cost", "Optimization", "Python"],
    repo: "https://github.com/jetendralaha/clous-cost-analysis",
  },
  {
    title: "KubeForge",
    description:
      "Open-source platform that converts existing container workload definitions into production-ready, security-hardened K3s deployments — and can optionally produce fully self-contained bootable ISO images for air-gapped, offline environments.",
    tags: ["Kubernetes", "K3s", "Security Hardening", "Air-Gapped"],
    repo: "https://github.com/jetendralaha/KubeForge",
  },
  {
    title: "OpenLLM Shield",
    description:
      "Open-source LLM security gateway — a lightweight firewall for AI applications. A drop-in reverse proxy that scans every LLM request for prompt-injection attacks before it reaches the upstream provider, aligned with OWASP LLM01 and MITRE ATLAS.",
    tags: ["LLM Security", "Prompt Injection", "FastAPI", "OWASP LLM01"],
    repo: "https://github.com/jetendralaha/openllm-shield",
  },
  {
    title: "AI Log Analysis with RAG",
    description:
      "Contextual log correlation engine using RAG and Cognee-based memory concepts for long-term incident understanding and faster root-cause analysis.",
    tags: ["RAG", "Cognee", "Observability", "Python"],
  },
  {
    title: "Onboarding Bot",
    description:
      "A Kubernetes-deployed GitLab bot that automates application onboarding — turning a single GitLab issue into a fully automated pipeline from requirement parsing and approval routing to repository creation and CI/CD setup, eliminating manual, error-prone steps.",
    tags: ["GitLab", "Kubernetes", "Automation", "CI/CD"],
  },
  {
    title: "End-to-End DevSecOps Pipeline",
    description:
      "Secure CI/CD with integrated SAST (SonarQube), DAST (Checkmarx), SCA, and Trivy/Aqua container scanning, enforced through severity-based quality gates and SBOM generation.",
    tags: ["GitLab CI/CD", "Azure DevOps", "SonarQube", "Checkmarx", "Trivy"],
  },
  {
    title: "Multi-Cloud Infrastructure as Code",
    description:
      "Reusable Terraform and Ansible automation provisioning hardened, compliant infrastructure across AWS and Azure, aligned with CIS Benchmarks.",
    tags: ["Terraform", "Ansible", "AWS", "Azure"],
  },
  {
    title: "Kubernetes Platform & Observability",
    description:
      "Production-grade EKS cluster operations with Helm deployments, cluster hardening, and full-stack observability using Datadog, Prometheus, and Grafana.",
    tags: ["Kubernetes", "EKS", "Helm", "Prometheus", "Grafana"],
  },
];


export const achievements: AchievementItem[] = [
  {
    title: "\uD83C\uDFC6 PAMC Hackathon Finalist",
    description:
      "Recognized as a finalist at the PAMC Hackathon for delivering an innovative, high-impact solution under competitive conditions.",
  },
  {
    title: "\u2B50 Super Star Performer Award",
    description:
      "Awarded the Super Star Performer recognition at Mavenir for outstanding contributions and consistent high performance.",
  },
  {
    title: "\uD83D\uDE80 Delivery Excellence Award",
    description:
      "Honored with the Delivery Excellence Award for flawless execution and dependable delivery on critical initiatives.",
  },
  {
    title: "\uD83C\uDF1F STAR Award \u2014 SINEC ANS V1.0.0 Release",
    description:
      "Recognized as the go-to engineer for the SINEC ANS V1.0.0 release \u2014 resolving complex Kubernetes, Helm, scripting, and AWS deployment challenges and bringing calm and confidence to high-pressure delivery.",
  },
  {
    title: "\uD83D\uDCA1 STAR Award \u2014 XCR / FDS Integration",
    description:
      "Awarded for relentless efforts solving the FDS integration issues that brought the XCR-based SINEC ANS live.",
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech — Mechanical Engineering",
    institution: "Biju Patnaik University of Technology",
  },
];
