/**
 * Resume content. Wording is copied from the approved content pack
 * (content-source.md, sections 2–8, approved 9 November 2026; achievements and
 * Arnie OS label updated the same day).
 *
 * The site is the master copy for wording. When you change this file,
 * re-export the PDF in `public/` so the two stay in step.
 *
 * @packageDocumentation
 */

/** One title held at a company, with its dates and bullets. */
export interface Position {
  title: string;
  dates: string;
  bullets: string[];
}

/** One company on the resume. Most have one position; WeSwap has two. */
export interface Role {
  company: string;
  location: string;
  /** Extra label, such as "Side project". */
  note?: string;
  positions: Position[];
}

export const experience: Role[] = [
  {
    company: 'PVcase',
    location: 'Remote',
    positions: [
      {
        title: 'Product Director – Platform',
        dates: 'Nov 2024 – present',
        bullets: [
          'Lead product vision and strategy for a new B2B SaaS operating system, uniting fragmented solar engineering and commercial workflows into a centralised platform.',
          'Exceeded pilot adoption goals, driving usage to 500+ monthly active users.',
          'Launched an AI-native, LLM-powered review workflow that converts manual human expertise into automated, structured compliance checks with human-in-the-loop validation. Now released and gaining traction with customers.',
          'Architected Pipeline Intelligence, a cross-product data model unifying project records into a single platform-wide data foundation.',
          'Established a metrics-driven product operating cadence, automating weekly reporting on delivery and adoption to drive high-tempo, pragmatic decision-making.',
          'Hired and coached Product and Engineering talent, established structured discovery and PRD review practices, and drove alignment across all levels of the business.',
        ],
      },
    ],
  },
  {
    company: 'AMBOSS',
    location: 'Berlin',
    positions: [
      {
        title: 'Product Director',
        dates: 'Jul 2022 – Sep 2024',
        bullets: [
          'Accountable for growth, adoption and retention across global markets, with particular focus on user acquisition in the US.',
          'Extended student user tenure and converted students into clinician users.',
          'Transformed a fragmented payment set-up into a streamlined ecosystem. This substantially reduced processing costs, improved payment success rates, cut time-to-market for campaigns and new products from weeks to hours, and reduced engineering dependency.',
          'Increased purchase-path conversion and average order value.',
          'Integrated 300+ US medical institutions following business mergers.',
        ],
      },
    ],
  },
  {
    company: 'Delivery Hero',
    location: 'Berlin',
    positions: [
      {
        title: 'Product Director',
        dates: 'Aug 2020 – Jan 2022',
        bullets: [
          'Led global product strategy for a high-volume, multi-sided marketplace. Drove platform expansion by migrating 20+ countries onto a centralised financial platform across APAC, LATAM and Europe.',
          'Managed complex cross-functional rollouts across regulatory, engineering and regional operations.',
          'Delivered measurable commercial impact through improved margin dynamics: reduced annual processing costs by €5M+ and improved payment success rates, recovering millions in previously failed orders.',
          'Managed a 12-person product organisation and redesigned cross-functional workflows, improving sprint predictability (measured by committed vs. delivered tickets).',
        ],
      },
    ],
  },
  {
    company: 'Equals',
    location: 'London',
    positions: [
      {
        title: 'Product Director',
        dates: 'Jun 2019 – Aug 2020',
        bullets: [
          'Responsible for coordinating end-to-end product development across International Payments, Expense Management, Travel Money and Currency Trading.',
          'Launched Card Issuing products and Currency Exchange trading tools to the market.',
          "Improved the activation journey through data analysis, A/B testing and Google's HEART framework, reducing cost per acquisition and increasing order frequency.",
        ],
      },
    ],
  },
  {
    company: 'WeSwap',
    location: 'London',
    positions: [
      {
        title: 'Chief Product Officer',
        dates: 'Jan 2016 – May 2019',
        bullets: [
          'Led mobile and web product strategy, scaling the platform to 500,000+ users.',
          'Introduced new payment methods, substantially growing monthly active users and card-load frequency.',
          'Launched Smart Swap, increasing average order value, and developed community features that reduced acquisition costs.',
        ],
      },
      {
        title: 'Head of Operations',
        dates: 'Dec 2014 – Dec 2015',
        bullets: [
          'Hired and led the fraud, compliance and customer support teams.',
          "Drove cross-functional technical integrations with Stripe, LexisNexis and Salesforce, establishing improved transaction monitoring and reporting workflows that eliminated most of the platform's fraud.",
        ],
      },
    ],
  },
  {
    company: 'TryMyKitchen',
    location: 'London',
    note: 'Side project',
    positions: [
      {
        title: 'Co-founder',
        dates: 'Jan 2015 – May 2020',
        bullets: [
          'Founded and launched a self-serve marketplace for cooking classes, growing to over 8,000 classes across Europe and North America.',
          'Partnered with Jamie Oliver cooking schools and Heineken to deliver tailored cooking class experiences at events.',
        ],
      },
    ],
  },
  {
    company: 'Guardian News and Media',
    location: 'London',
    positions: [
      {
        title: 'Product Manager',
        dates: 'Feb 2013 – Dec 2014',
        bullets: ['Launched the Guardian Membership programme in September 2014.'],
      },
    ],
  },
  {
    company: 'HostelBookers',
    location: 'London',
    positions: [{ title: 'Various Operations and Product roles', dates: 'May 2007 – Jan 2013', bullets: [] }],
  },
];

/** Achievements block (content-source.md, section 3, rewritten 9 November 2026). Site wording only. */
export const achievements: { label: string; text: string }[] = [
  {
    label: 'Platform',
    text: 'defined the shared project data model behind PVcase Platform (500+ monthly active users), opening new OEM and partner opportunities.',
  },
  {
    label: 'AI',
    text: "led the release of AI-Assisted Design Review, an LLM workflow with a human deciding every finding. It shortens customers' design review cycles and is released and gaining traction with customers.",
  },
  {
    label: 'Arnie OS',
    text: "architected Arnie OS, a multi-agent system that automates my team's admin and reporting, and used it to deliver AI-Assisted Design Review from idea to shipped in under a month.",
  },
  {
    label: 'Commercial',
    text: 'reduced annual processing costs by €5M+ at Delivery Hero; improved purchase-path conversion and average order value at AMBOSS.',
  },
];

export const education = [
  { degree: 'MEng, Telecommunications Engineering', school: "King's College London", year: '2005' },
];

/** Skill groups. Shared by the home page and the resume page. */
export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Product leadership',
    items: [
      'Product Strategy',
      'Platform Strategy',
      'Product Vision',
      'Product Organisation Design',
      'Team Building & Coaching',
      'Discovery',
      'Roadmapping',
      'Operating Cadence',
    ],
  },
  {
    group: 'Technology',
    items: [
      'AI/LLM Products',
      'Agentic Workflows',
      'Workflow Automation',
      'Platform Architecture',
      'APIs',
      'Data Products',
      'Integrations',
      'Analytics',
    ],
  },
  {
    group: 'Commercial',
    items: ['B2B SaaS', 'Marketplace Economics', 'Payments', 'Cost Optimisation', 'Growth'],
  },
];

export const languages = [
  { name: 'English', level: 'native' },
  { name: 'French', level: 'fluent' },
  { name: 'Spanish', level: 'intermediate' },
  { name: 'German', level: 'basic' },
];

export const projects = [
  {
    name: 'Arnie OS',
    label: 'AI project',
    bullets: [
      "Architected a custom multi-agent AI operating system using Anthropic's framework and MCP integrations across Jira, Slack, Tableau and Google Workspace to automate product management workflows.",
      'Engineered 10+ specialised agents with defined tool permissions, skills and escalation logic to execute data synthesis, PRD scoping and automated reporting.',
    ],
  },
];
