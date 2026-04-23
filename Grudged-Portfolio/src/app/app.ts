import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DevConsoleComponent } from './components/dev-console/dev-console.component';
import { ThemeService } from './services/theme.service';
import { KonamiService } from './services/konami.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DevConsoleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Grudged-Portfolio');

  constructor(
    private themeService: ThemeService,
    private konamiService: KonamiService
  ) {
    // Initialize theme service on app startup
    // Konami service automatically initializes and listens for the code
    this.showConsoleBreadcrumb();
  }

  private showConsoleBreadcrumb() {
    // Leave a breadcrumb for fellow developers
    console.log('%c🎮 Developer detected!', 'color: #00ff88; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Hint: Some classic gaming knowledge might unlock hidden features...', 'color: #4ecdc4; font-size: 12px;');
    console.log('%c🕹️ Try the legendary cheat code: ↑↑↓↓←→←→BA', 'color: #ffd700; font-size: 12px;');
    console.log('%c🚀 Built with Angular 18 + TypeScript', 'color: #888; font-size: 10px;');
    console.log('%c📧 Contact: CMoore@grudged.io', 'color: #888; font-size: 10px;');
  }
}
