import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  selectedCategory = 'All';
  
  categories = ['All', 'Enterprise', 'Full Stack', 'E-commerce', 'Data Analytics', 'DevOps'];
  
  projects = [
    {
      title: 'Enterprise Warehouse Management System',
      description: 'Real-time inventory tracking dashboard that processes live data from receiving through shipping operations, enabling manufacturing teams to make instant decisions with up-to-date information.',
      technologies: ['Angular', 'JavaScript', 'Real-time APIs', 'SQL Database'],
      image: 'MaterialRequestExample.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'Enterprise',
      links: ['Live Demo', 'Case Study']
    },
    {
      title: 'Pokemon Trading Card Marketplace',
      description: 'Full-featured e-commerce platform where collectors can buy and sell trading cards with secure payment processing and real-time price checking from eBay.',
      technologies: ['Angular', 'FastAPI', 'MongoDB', 'Stripe API', 'Netlify'],
      image: 'PokeProjectHomeMarket.png',
      liveUrl: 'https://grudgedgamingsmarketplace.netlify.app',
      githubUrl: 'https://github.com/grudged/Poke-Project',
      category: 'E-commerce',
      links: ['Live Demo', 'View Code']
    },
    {
      title: 'Freelance Time Tracker',
      description: 'Professional time management platform that helps freelancers track billable hours, manage multiple projects, and generate client reports automatically.',
      technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
      image: 'FreelanceTTDashboard.png',
      liveUrl: '#',
      githubUrl: 'https://github.com/grudged/FreelanceTimeTracker',
      category: 'Full Stack',
      links: ['Live Demo', 'View Code']
    },
    {
      title: 'Sports Analytics Dashboard',
      description: 'Interactive data visualization platform displaying NHL and NFL player statistics with advanced filtering, helping fantasy sports enthusiasts make informed decisions.',
      technologies: ['Angular', 'Python', 'Flask', 'PostgreSQL'],
      image: 'SportsDataNHL.png',
      liveUrl: 'https://nhl-data-visualizer.netlify.app/',
      githubUrl: 'https://github.com/grudged/nhl-data-projects',
      category: 'Data Analytics',
      links: ['Live Demo', 'View Code']
    },
    {
      title: 'DevOps Monitoring Setup',
      description: 'Containerized monitoring solution providing comprehensive visibility across multiple servers, web services, and applications in distributed environments.',
      technologies: ['Docker', 'Zabbix', 'Python', 'System Administration'],
      image: 'ZabbixDockerContainer.png',
      liveUrl: '#',
      githubUrl: '#',
      category: 'DevOps',
      links: ['Documentation', 'Architecture Diagram']
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
}