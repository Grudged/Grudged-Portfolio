import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationDialogComponent } from '../documentation-dialog/documentation-dialog.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DocumentationDialogComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  selectedCategory = 'All';
  
  isDocumentationOpen = false;
  selectedProjectTitle = '';
  selectedProjectDiagrams: string[] = [];
  
  categories = ['All', 'Automation', 'AI/ML', 'Full Stack', 'Data', 'Enterprise', 'IoT/Hardware'];

  projects = [
    {
      title: 'Mission Control',
      description: 'PWA ops console with 23 views for monitoring and managing all services, data pipelines, betting operations, LLC finances, crypto portfolio, and infrastructure health. The central nervous system for everything I build.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'WebSockets', 'PWA', 'Gemma 4 AI Agent'],
      image: 'screenshots/mission-control.png',
      liveUrl: '',
      githubUrl: '#',
      category: 'Automation',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Knowledge Pipeline',
      description: 'Self-improving AI system: 39+ data collectors feed a central warehouse, a nightly compiler distills it into reports and training pairs, and a LoRA fine-tune runs on Gemma 4 locally. The system literally gets smarter every night.',
      technologies: ['Python', 'MLX', 'Gemma 4', 'LoRA', 'RAG', 'SQLite', 'systemd'],
      image: 'knowledge-pipeline.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'AI/ML',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Chase Engine',
      description: 'Automated sports betting bot running chase strategies across NHL, MLB, NBA, WNBA, EPL, and MLS. Manages bankroll, tracks sequences, and places bets based on backtested models using William Hill odds.',
      technologies: ['Python', 'FastAPI', 'SQLite', 'APScheduler', 'ESPN API', 'systemd'],
      image: 'chase-engine.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'Automation',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'CharacterQuill',
      description: 'AI-powered companion for fiction authors. Build characters, chat with them via group AI for in-voice feedback, visualize plot with story maps, generate portraits, and use randomizers for scene and name ideas.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'AI Chat', 'WebSockets'],
      image: 'screenshots/characterquill.png',
      liveUrl: 'https://characterquill.com',
      githubUrl: '#',
      category: 'Full Stack',
      links: ['Live Demo'],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Reef Watch',
      description: 'Satellite imagery analysis platform for monitoring coral reef health worldwide. Interactive CesiumJS globe with AI-driven reef condition assessments from real satellite data.',
      technologies: ['FastAPI', 'CesiumJS', 'Satellite APIs', 'AI Analysis', 'GeoJSON'],
      image: 'screenshots/reefwatch.png',
      liveUrl: '',
      githubUrl: '#',
      category: 'Data',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Data Warehouse & Collectors',
      description: '39+ automated collectors gathering data from sports APIs, crypto markets, SEC EDGAR filings, DeFi protocols, weather, economics, and more. Central SQLite warehouse with dynamic schema and a REST API.',
      technologies: ['Python', 'SQLite', 'REST APIs', 'systemd Timers', 'Playwright'],
      image: 'data-warehouse.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'Data',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Stream Engine',
      description: 'Twitch bot for my sim racing streams with iRacing telemetry, WoW character stats via Blizzard API, Gemma AI chat responses, predictions, and full chat logging.',
      technologies: ['Python', 'FastAPI', 'Twitch API', 'Blizzard API', 'Gemma 4', 'SQLite'],
      image: 'screenshots/stream-engine.png',
      liveUrl: 'https://twitch.tv/grudgedgaming',
      githubUrl: '#',
      category: 'Automation',
      links: ['Live Demo'],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'GGS Marketplace',
      description: 'E-commerce platform for Pokemon trading cards with Stripe payments, real-time eBay price checking via Playwright scraper, and a $21.9K tracked collection across 56 graded cards.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'Stripe', 'Playwright'],
      image: 'screenshots/ggsmarketplace.png',
      liveUrl: 'https://ggsmarketplace.org',
      githubUrl: '#',
      category: 'Full Stack',
      links: ['Live Demo'],
      diagrams: [
        'README.md',
        'HL-System-Architecture.png',
        'Deployment-Architecture.png',
        'Payment-Process-Flow.png',
        'Active-Listing-Flow.png',
        'Active-Listing-Schedule.png',
        'AL-Database-Schema.png',
      ]
    },
    {
      title: 'A.M. Oakley',
      description: 'Author platform for my fiction writing under the pen name A.M. Oakley. Showcases published work, connects with readers, and ties into the EditForge manuscript workflow.',
      technologies: ['Angular', 'TypeScript', 'Netlify'],
      image: 'screenshots/amoakley.png',
      liveUrl: 'https://amoakley.com',
      githubUrl: '#',
      category: 'Full Stack',
      links: ['Live Demo'],
      diagrams: []
    },
    {
      title: 'Enterprise Warehouse Management System',
      description: 'Real-time inventory tracking dashboard that processes live data from receiving through shipping operations, giving manufacturing teams instant visibility into material requests, putaway queues, and status transitions across the floor.',
      technologies: ['Angular', 'JavaScript', 'Real-time APIs', 'Oracle SQL', 'Microsoft Server', 'Automation', 'Dashboards'],
      image: 'MaterialRequestExample.png',
      liveUrl: '',
      githubUrl: '#',
      category: 'Enterprise',
      links: [],
      diagrams: [],
      confidentialType: 'enterprise'
    },
    {
      title: 'Dev Garden',
      description: 'Personal knowledge database that captured web content and searched notes semantically with AI embeddings, Chrome/VS Code extensions, and a self-hostable Next.js app. Shipped September 2025. Retired April 2026 after ChatGPT and Claude memory features displaced the standalone knowledge-tool problem space for my workflow.',
      technologies: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'pgvector', 'OpenAI', 'LangChain', 'BullMQ', 'NextAuth'],
      image: 'DGHomePage.png',
      liveUrl: '',
      githubUrl: '#',
      category: 'Full Stack',
      links: [],
      diagrams: [
        'DGREADME.md',
        'DGAuthentication.png',
        'DGDatabaseER.png',
        'DGHigh_Level_Architecture.png',
        'DGMiddlewareAPIAccess.png',
        'DGPWA_ShareTargetFlow.png',
        'DGRequestFlow_(CreateItem).png',
      ],
      confidentialType: 'personal',
      retired: true,
      retiredDate: 'April 2026'
    }
  ];

  get filteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  openDocumentation(project: any) {
    this.selectedProjectTitle = project.title;
    this.selectedProjectDiagrams = project.diagrams || [];
    this.isDocumentationOpen = true;
  }

  closeDocumentation() {
    this.isDocumentationOpen = false;
    this.selectedProjectTitle = '';
    this.selectedProjectDiagrams = [];
  }

  getConfidentialMessage(project: any): string {
    if (project.confidentialType === 'enterprise') {
      return 'Enterprise Project - Code Confidential';
    } else if (project.confidentialType === 'personal') {
      return 'Personal Data/Project - Source Protected';
    }
    return 'Code Not Available';
  }
}