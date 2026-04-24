import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  private readonly isBrowser: boolean;

  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (!this.isBrowser) {
      // On the prerender server we have no access to localStorage / window /
      // document.body. Default to light and let the client resolve the real
      // preference after hydration.
      return;
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.setTheme(isDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkTheme.value);
  }

  setTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    if (!this.isBrowser) return;

    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  get currentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}
