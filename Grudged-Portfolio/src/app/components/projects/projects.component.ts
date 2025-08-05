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
  
  categories = ['All', 'Enterprise', 'Full Stack', 'E-commerce', 'Data Analytics', 'DevOps', 'Content Management'];
  
  projects = [
    {
      title: 'Enterprise Warehouse Management System',
      description: 'Real-time logistics dashboard for slot machine manufacturing - tracking inventory from receiving through shipping with sub-second data updates across multiple warehouse stations.',
      technologies: ['AngularJS', 'JavaScript', 'Real-time APIs', 'Enterprise Database'],
      image: 'assets/images/warehouse-system.jpg',
      liveUrl: '#',
      githubUrl: '#',
      category: 'Enterprise'
    },
    {
      title: 'Freelance Time Tracker Platform',
      description: 'Professional time tracking application for freelancers with JWT authentication, project management, client reporting, and modern Angular standalone architecture.',
      technologies: ['Angular 20', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      image: 'assets/images/timetracker.jpg',
      liveUrl: '#',
      githubUrl: 'https://github.com/grudged/FreelanceTimeTracker',
      category: 'Full Stack'
    },
    {
      title: 'Pokemon Trading Card Marketplace',
      description: 'E-commerce platform with Stripe payment processing, eBay API price integration, and real-time inventory management. Features secure checkout and automated pricing updates.',
      technologies: ['Angular', 'FastAPI', 'Stripe', 'eBay API', 'Netlify'],
      image: 'PokeProjectHomeMarket.png',
      liveUrl: 'https://grudgedgamingsmarketplace.netlify.app',
      githubUrl: 'https://github.com/grudged/Poke-Project',
      category: 'E-commerce'
    },
    {
      title: 'Sports Analytics Platform',
      description: 'Multi-sport data visualization platform with NHL/NFL statistics, PostgreSQL data modeling, and expanding fantasy football analytics. Built for scalable sports data processing.',
      technologies: ['Angular', 'Python', 'Flask', 'PostgreSQL', 'Data Visualization'],
      image: 'SportsDataNHL.png',
      liveUrl: 'https://nhl-data-visualizer.netlify.app/',
      githubUrl: 'https://github.com/grudged/nhl-data-projects',
      category: 'Data Analytics'
    },
    {
      title: 'DevOps Monitoring Infrastructure',
      description: 'Containerized application monitoring with Docker and Zabbix integration. Monitors multiple servers, web services, and FastAPI applications with automated alerting.',
      technologies: ['Docker', 'Zabbix', 'System Administration', 'Python Scripts'],
      image: 'ZabbixDockerContainer.png',
      liveUrl: '#',
      githubUrl: 'https://github.com/grudged/FreelanceTimeTracker',
      category: 'DevOps'
    },
    {
      title: 'Mythical Author Portfolio Site',
      description: 'Content management system with SEO optimization, authentication functionality, and modern web performance. Deployed on Netlify with comprehensive SEO implementation.',
      technologies: ['Angular', 'SEO Optimization', 'Authentication', 'Netlify'],
      image: 'AMOakleyHomePage.jpg',
      liveUrl: 'https://amoakleysite.netlify.app/home',
      githubUrl: 'https://github.com/grudged/Olli-Project',
      category: 'Content Management'
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