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
  
  categories = ['All', 'Enterprise', 'Full Stack', 'E-commerce', 'Data Analytics', 'DevOps'];
  
  projects = [
    {
      title: 'Enterprise Warehouse Management System',
      description: 'Real-time inventory tracking dashboard that processes live data from receiving through shipping operations, enabling manufacturing teams to make instant decisions with up-to-date information.',
      technologies: ['Angular', 'JavaScript', 'Real-time APIs', 'Oracle SQL Database', 'Microsoft Server', 'Automation' , 'Graphs', 'Dashboards'],
      image: 'MaterialRequestExample.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'Enterprise',
      links: ['Live Demo', 'Case Study'],
      diagrams: [],
      confidentialType: 'enterprise'
    },
    {
      title: 'Pokemon Trading Card Marketplace',
      description: 'Full-featured e-commerce platform where collectors can buy and sell trading cards with secure payment processing and real-time price checking from eBay.',
      technologies: ['Angular', 'FastAPI', 'MongoDB', 'Stripe API', 'Netlify'],
      image: 'PokeProjectHomeMarket.png',
      liveUrl: 'https://grudgedgamingsmarketplace.netlify.app',
      githubUrl: '#',
      category: 'E-commerce',
      links: ['Live Demo', 'View Code', 'Architecture Diagram'],
      diagrams: [
        'README.md',  // Put README first as overview
        'System Architecture Diagram.png',
        'Data Scheme (ERD).png',
        'User Flow Diagram.png',
        'Data Flow Diagram.png',
        'Component Hierarchy Diagram.png',
        'State Management Diagram.png',
        'Tech Stack Diagram.png'
      ]
    },
    {
      title: 'Freelance Time Tracker',
      description: 'Professional time management platform that helps freelancers track billable hours, manage multiple projects, and generate client reports automatically.',
      technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
      image: 'FreelanceTTDashboard.png',
      liveUrl: '#',
      githubUrl: 'https://github.com/grudged/FreelanceTimeTracker',
      category: 'Full Stack',
      links: ['Live Demo', 'View Code'],
      diagrams: [
        'Component Hierachy (Frontend).png',
        'Database Schema (Simplified ERD).png',
        'Deployment and Monitoring.png',
        'Data Flow.png',
        'User Flow.png',
        'System ArchitectureTT.png'
      ]
    },
    {
      title: 'Sports Analytics Dashboard',
      description: 'Interactive data visualization platform displaying NHL and NFL player statistics with advanced filtering, helping fantasy sports enthusiasts make informed decisions.',
      technologies: ['Angular', 'Python', 'Flask', 'PostgreSQL'],
      image: 'SportsDataNHL.png',
      liveUrl: 'https://nhl-data-visualizer.netlify.app/',
      githubUrl: 'https://github.com/grudged/nhl-data-projects',
      category: 'Data Analytics',
      links: ['Live Demo', 'View Code'],
      diagrams: [
        'System Architecture.png',
        'Data Flow.png',
        'Database Schema (Simplified).png',
        'Deployment Strategy.png'
      ]
    },
    {
      title: 'DevOps Monitoring Setup',
      description: 'Containerized monitoring solution providing comprehensive visibility across multiple servers, web services, and applications in distributed environments.',
      technologies: ['Docker', 'Zabbix', 'Python', 'System Administration'],
      image: 'ZabbixDockerContainer.png',
      liveUrl: '',
      githubUrl: '#',
      category: 'DevOps',
      links: ['Documentation', 'Architecture Diagram'],
      diagrams: [
        'BACKEND_README.md'
      ]
    },
    {
      title: 'Fantasy Author Content Site',
      description: 'A platform for fantasy author A.M. Oakley to showcase their work, connect with readers, and manage their writing projects.',
      technologies: ['Angular', 'CSS', 'HTML', 'Content Management'],
      image: 'AMOakleyHome.jpg',
      liveUrl: 'https://amoakley.com',
      githubUrl: '#',
      category: 'Content Management',
      links: ['Documentation', 'Architecture Diagram'],
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