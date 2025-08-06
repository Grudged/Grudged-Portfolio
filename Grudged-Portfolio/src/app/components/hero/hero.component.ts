import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  
  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Chris_Moore_Resume.pdf';
    link.click();
  }
}