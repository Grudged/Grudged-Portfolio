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
  }
}
