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
  
  categories = ['All', 'Automation', 'AI/ML', 'Full Stack', 'Data', 'IoT/Hardware'];

  projects = [
    {
      title: 'Mission Control',
      description: 'PWA ops console with 23 views for monitoring and managing all services, data pipelines, betting operations, LLC finances, crypto portfolio, and infrastructure health. The central nervous system for everything I build.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'WebSockets', 'PWA', 'Gemma 4 AI Agent'],
      image: 'mission-control.svg',
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
      title: 'EditForge',
      description: 'AI-powered manuscript editor with group character chat. Writers can have conversations with their own characters powered by AI, getting in-voice feedback on scenes and dialogue.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'AI Chat', 'WebSockets'],
      image: 'editforge.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'Full Stack',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Reef Watch',
      description: 'Satellite imagery analysis platform for monitoring coral reef health worldwide. Interactive CesiumJS globe with AI-driven reef condition assessments from real satellite data.',
      technologies: ['FastAPI', 'CesiumJS', 'Satellite APIs', 'AI Analysis', 'GeoJSON'],
      image: 'reef-watch.svg',
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
      title: 'RF Tomography',
      description: '5-node ESP32-C3 mesh network measuring WiFi signal attenuation to detect motion and presence through walls. FastAPI backend with real-time visualization in Mission Control.',
      technologies: ['ESP32-C3', 'MicroPython', 'FastAPI', 'WiFi CSI', 'Real-time'],
      image: 'rf-tomography.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'IoT/Hardware',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'StarBrain Academy',
      description: 'Interactive learning PWA for kids covering 6 subjects with mini-games and adaptive difficulty. Built for my own kids, 15K+ lines of code with zero external dependencies for the learning engine.',
      technologies: ['Vite', 'Preact', 'TypeScript', 'PWA', 'CSS Animations'],
      image: 'starbrain-academy.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'Full Stack',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'Stream Engine',
      description: 'Twitch bot for my sim racing streams with iRacing telemetry, WoW character stats via Blizzard API, Gemma AI chat responses, predictions, and full chat logging.',
      technologies: ['Python', 'FastAPI', 'Twitch API', 'Blizzard API', 'Gemma 4', 'SQLite'],
      image: 'stream-engine.svg',
      liveUrl: '',
      githubUrl: '#',
      category: 'Automation',
      links: [],
      diagrams: [],
      confidentialType: 'personal'
    },
    {
      title: 'GGS Marketplace',
      description: 'E-commerce platform for Pokemon trading cards with Stripe payments, real-time eBay price checking via Playwright scraper, and a $21.9K tracked collection across 56 graded cards.',
      technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'Stripe', 'Playwright'],
      image: 'GGMarketPlaceHomeV2.png',
      liveUrl: 'https://ggsmarketplace.com',
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
      image: 'AMOakleyHome.jpg',
      liveUrl: 'https://amoakley.com',
      githubUrl: '#',
      category: 'Full Stack',
      links: ['Live Demo'],
      diagrams: []
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