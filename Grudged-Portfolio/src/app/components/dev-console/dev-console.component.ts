import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KonamiService } from '../../services/konami.service';
import { Subscription } from 'rxjs';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dev-console',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dev-console.component.html',
  styleUrls: ['./dev-console.component.css']
})
export class DevConsoleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('terminalOutput') terminalOutput!: ElementRef;
  @ViewChild('commandInput') commandInput!: ElementRef;

  isVisible = false;
  currentInput = '';
  commandHistory: string[] = [];
  historyIndex = -1;
  terminalLines: TerminalLine[] = [];
  
  private subscription!: Subscription;

  private terminalCommands: { [key: string]: () => string | void } = {
    'help': () => this.getHelpText(),
    'about': () => 'Chris Moore - Full Stack Developer specializing in Angular, Node.js, and cloud technologies.',
    'skills': () => 'Angular • TypeScript • Node.js • Python • Docker • AWS • MongoDB • PostgreSQL • Git',
    'github': () => { window.open('https://github.com/grudged', '_blank'); return 'Opening GitHub profile...'; },
    'linkedin': () => { window.open('https://linkedin.com/in/chris-moore-dev', '_blank'); return 'Opening LinkedIn profile...'; },
    'portfolio': () => { window.open('https://chris-moore.dev', '_blank'); return 'Opening portfolio website...'; },
    'resume': () => { window.open('/resume.pdf', '_blank'); return 'Opening resume...'; },
    'whoami': () => 'chris@portfolio:~$ Chris Moore',
    'date': () => new Date().toLocaleString(),
    'clear': () => { this.terminalLines = []; return ''; },
    'ls': () => 'projects/  about/  contact/  skills/  experience/',
    'pwd': () => '/home/chris/portfolio',
    'cat skills.txt': () => this.getDetailedSkills(),
    'ps aux': () => this.getProcessList(),
    'uptime': () => `Site uptime: ${this.getUptime()}`,
    'fortune': () => this.getRandomQuote(),
    'matrix': () => { this.startMatrixEffect(); return 'Entering the Matrix...'; },
    'konami': () => '🎮 You found the secret! The Konami Code: ↑↑↓↓←→←→BA',
    'hire': () => '💼 Excellent choice! Let\'s discuss opportunities: chrismoore044@gmail.com',
    'coffee': () => '☕ *brewing coffee* ...perfect fuel for coding!',
    'sudo': () => 'chris is not in the sudoers file. This incident will be reported.',
    'exit': () => { this.closeConsole(); return 'Goodbye!'; },
    'version': () => 'Portfolio Terminal v2.1.0 - Built with Angular 18',
    'ping google.com': () => 'PING google.com (8.8.8.8): 56 bytes\n64 bytes from google.com: time=12ms',
    'history': () => this.getCommandHistory()
  };

  constructor(private konamiService: KonamiService) {}

  ngOnInit() {
    this.subscription = this.konamiService.devMode$.subscribe(isActive => {
      this.isVisible = isActive;
      if (isActive) {
        this.initializeTerminal();
        setTimeout(() => this.focusInput(), 100);
      }
    });
  }

  ngAfterViewInit() {
    this.setupKeyboardHandlers();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initializeTerminal() {
    this.terminalLines = [
      {
        type: 'system',
        content: 'Welcome to Chris Moore\'s Developer Console',
        timestamp: new Date()
      },
      {
        type: 'system',
        content: 'Type "help" for available commands or "exit" to close',
        timestamp: new Date()
      },
      {
        type: 'system',
        content: `Developer Score: ${this.konamiService.getDeveloperScore()}/6 🚀`,
        timestamp: new Date()
      }
    ];
  }

  private setupKeyboardHandlers() {
    document.addEventListener('keydown', (event) => {
      if (!this.isVisible) return;
      
      if (event.key === 'Escape') {
        this.closeConsole();
      }
    });
  }

  executeCommand() {
    if (!this.currentInput.trim()) return;

    const command = this.currentInput.trim().toLowerCase();
    
    this.terminalLines.push({
      type: 'input',
      content: `$ ${this.currentInput}`,
      timestamp: new Date()
    });

    this.commandHistory.push(this.currentInput);
    this.historyIndex = -1;

    const output = this.processCommand(command);
    if (output) {
      this.terminalLines.push({
        type: 'output',
        content: output,
        timestamp: new Date()
      });
    }

    this.currentInput = '';
    this.scrollToBottom();
  }

  private processCommand(command: string): string {
    if (this.terminalCommands[command]) {
      return this.terminalCommands[command]() || '';
    } else if (command.startsWith('echo ')) {
      return command.substring(5);
    } else {
      return `Command not found: ${command}. Type "help" for available commands.`;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.navigateHistory('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateHistory('down');
        break;
      case 'Tab':
        event.preventDefault();
        this.autoComplete();
        break;
    }
  }

  private navigateHistory(direction: 'up' | 'down') {
    if (direction === 'up' && this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
      this.currentInput = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
    } else if (direction === 'down' && this.historyIndex > -1) {
      this.historyIndex--;
      if (this.historyIndex === -1) {
        this.currentInput = '';
      } else {
        this.currentInput = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      }
    }
  }

  private autoComplete() {
    const availableCommands = Object.keys(this.terminalCommands);
    const matches = availableCommands.filter(cmd => cmd.startsWith(this.currentInput.toLowerCase()));
    
    if (matches.length === 1) {
      this.currentInput = matches[0];
    } else if (matches.length > 1) {
      this.terminalLines.push({
        type: 'output',
        content: matches.join('  '),
        timestamp: new Date()
      });
      this.scrollToBottom();
    }
  }

  private getHelpText(): string {
    return `Available commands:
    
Basic Commands:
  help      - Show this help message
  about     - About Chris Moore
  skills    - List technical skills
  clear     - Clear terminal
  exit      - Close console
  
Navigation:
  github    - Open GitHub profile
  linkedin  - Open LinkedIn profile
  portfolio - Open portfolio website
  resume    - Open resume PDF
  
Fun Commands:
  whoami    - Current user info
  fortune   - Random developer quote
  matrix    - Enter the Matrix
  coffee    - Get coffee (essential!)
  konami    - About the Konami code
  hire      - Contact information
  
System Commands:
  ls        - List directories
  pwd       - Show current directory
  date      - Show current date/time
  uptime    - Show site uptime
  version   - Terminal version
  ping      - Test connectivity
  
Use ↑/↓ arrows for command history, Tab for autocomplete`;
  }

  private getDetailedSkills(): string {
    return `Frontend: Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS
Backend: Node.js, Python, FastAPI, Express.js
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
Tools: Git, VS Code, Postman, Jest, Cypress
Other: RESTful APIs, GraphQL, WebSockets, CI/CD`;
  }

  private getProcessList(): string {
    return `USER    PID  %CPU %MEM   VSZ   RSS COMMAND
chris  1234   2.1  0.8  4096  2048 angular-dev-server
chris  1235   1.5  1.2  8192  3072 node portfolio-api
chris  1236   0.1  0.3  1024   512 git status
chris  1237   0.5  0.5  2048  1024 vs-code`;
  }

  private getUptime(): string {
    const start = new Date('2024-01-01');
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days`;
  }

  private getRandomQuote(): string {
    const quotes = [
      "Code never lies, comments sometimes do. - Ron Jeffries",
      "First, solve the problem. Then, write the code. - John Johnson",
      "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
      "The best way to get a project done faster is to start sooner. - Jim Highsmith",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "Programming isn't about what you know; it's about what you can figure out. - Chris Pine"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  private getCommandHistory(): string {
    return this.commandHistory.slice(-10).map((cmd, i) => `${i + 1}  ${cmd}`).join('\n');
  }

  private startMatrixEffect() {
    // Simple matrix effect for 3 seconds
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          this.terminalLines.push({
            type: 'system',
            content: this.generateMatrixLine(),
            timestamp: new Date()
          });
          this.scrollToBottom();
        }, i * 200);
      }
    }, 500);
  }

  private generateMatrixLine(): string {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let line = '';
    for (let i = 0; i < 80; i++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    return line;
  }

  closeConsole() {
    this.konamiService.closeDevMode();
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.terminalOutput) {
        this.terminalOutput.nativeElement.scrollTop = this.terminalOutput.nativeElement.scrollHeight;
      }
    }, 10);
  }

  private focusInput() {
    if (this.commandInput) {
      this.commandInput.nativeElement.focus();
    }
  }

  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString();
  }

  trackByFn(index: number, item: TerminalLine): string {
    return `${index}-${item.timestamp.getTime()}`;
  }

  formatLineContent(content: string): string {
    // Convert newlines to <br> for HTML display
    return content.replace(/\n/g, '<br>');
  }

  // Expose commands for template
  get commands() {
    return this.terminalCommands;
  }
}