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
    { name: 'Python/FastAPI', level: 95 },
    { name: 'Angular/TypeScript', level: 95 },
    { name: 'PostgreSQL/SQLite', level: 90 },
    { name: 'Linux/systemd', level: 85 },
    { name: 'Data Pipelines', level: 90 },
    { name: 'AI/ML (Local LLMs, LoRA, RAG)', level: 80 },
    { name: 'JavaScript/Node.js', level: 85 },
    { name: 'Infrastructure/Networking', level: 75 }
  ];
}