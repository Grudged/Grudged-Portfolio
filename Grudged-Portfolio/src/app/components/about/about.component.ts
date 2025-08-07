import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills = [
    { name: 'Angular/AngularJS', level: 95 },
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'Node.js/Express.js', level: 80 },
    { name: 'Python/FastAPI', level: 75 },
    { name: 'MongoDB/PostgreSQL', level: 70 },
    { name: 'Real-time Systems', level: 90 },
    { name: 'Docker/DevOps', level: 50 },
    { name: 'API Integration', level: 90 }
  ];

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Chris_Moore_Resume.pdf';
    link.click();
  }
}