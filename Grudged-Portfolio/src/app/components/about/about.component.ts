import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills = [
    { name: 'Angular/AngularJS', level: 95 },
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'Node.js/Express.js', level: 85 },
    { name: 'Python/FastAPI', level: 80 },
    { name: 'MongoDB/PostgreSQL', level: 85 },
    { name: 'Real-time Systems', level: 90 },
    { name: 'Docker/DevOps', level: 75 },
    { name: 'API Integration', level: 90 }
  ];
}