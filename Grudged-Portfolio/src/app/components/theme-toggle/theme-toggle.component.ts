import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle" 
      (click)="toggleTheme()"
      [attr.aria-label]="(isDarkTheme$ | async) ? 'Switch to light mode' : 'Switch to dark mode'">
      <svg *ngIf="!(isDarkTheme$ | async)" class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
        <!-- Moon icon for light mode -->
        <path d="M12 3a6.364 6.364 0 0 0-9 9 6.364 6.364 0 0 0 9 9c.19 0 .38-.01.56-.03a6.95 6.95 0 0 1-5.51-6.77 6.95 6.95 0 0 1 5.51-6.77c-.18-.02-.37-.03-.56-.03z"/>
      </svg>
      <svg *ngIf="isDarkTheme$ | async" class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
        <!-- Sun icon for dark mode -->
        <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z"/>
      </svg>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: var(--text-color);
    }

    .theme-toggle:hover {
      background: var(--hover-bg);
      transform: scale(1.1);
    }

    .theme-icon {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    .theme-toggle:hover .theme-icon {
      transform: rotate(15deg);
    }
  `]
})
export class ThemeToggleComponent {
  isDarkTheme$;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}