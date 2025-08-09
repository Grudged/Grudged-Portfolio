import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KonamiService {
  private konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  private konamiIndex = 0;
  private devModeActive = new BehaviorSubject<boolean>(false);
  
  public devMode$ = this.devModeActive.asObservable();

  constructor() {
    this.setupGlobalListener();
  }

  private setupGlobalListener() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.handleKonamiInput(event);
    });
  }

  private handleKonamiInput(event: KeyboardEvent) {
    if (event.code === this.konamiCode[this.konamiIndex]) {
      this.konamiIndex++;
      
      if (this.konamiIndex === this.konamiCode.length) {
        this.activateDevMode();
        this.konamiIndex = 0;
        
        // Add some visual feedback
        this.showKonamiActivation();
      }
    } else {
      this.konamiIndex = 0;
    }
  }

  private activateDevMode() {
    this.devModeActive.next(true);
    console.log('🎮 Konami Code activated! Dev mode enabled.');
    console.log('💻 Developer Console unlocked!');
    console.log('🚀 Welcome, fellow developer!');
  }

  public toggleDevMode() {
    const current = this.devModeActive.value;
    this.devModeActive.next(!current);
  }

  public closeDevMode() {
    this.devModeActive.next(false);
  }

  private showKonamiActivation() {
    // Create temporary visual feedback
    const notification = document.createElement('div');
    notification.innerHTML = '🎮 Konami Code Activated!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 14px;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  }

  // Easter egg: Check if user is a developer based on their actions
  public getDeveloperScore(): number {
    const checks = [
      () => window.navigator.userAgent.includes('Chrome'),
      () => window.localStorage.length > 5, // Has used local storage
      () => window.console && typeof window.console.log === 'function',
      () => document.querySelector('script') !== null, // Has scripts
      () => window.performance && window.performance.timing,
      () => typeof window.fetch === 'function' // Knows modern APIs
    ];
    
    return checks.filter(check => check()).length;
  }
}