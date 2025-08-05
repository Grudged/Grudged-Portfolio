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
  projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with Angular, Node.js, and MongoDB',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'assets/images/project1.jpg',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      image: 'assets/images/project2.jpg',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts',
      technologies: ['Vue.js', 'Weather API', 'Chart.js', 'CSS Grid'],
      image: 'assets/images/project3.jpg',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];
}