import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-documentation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation-dialog.component.html',
  styleUrls: ['./documentation-dialog.component.css']
})
export class DocumentationDialogComponent {
  @Input() isOpen = false;
  @Input() projectTitle = '';
  @Input() diagrams: string[] = [];
  @Output() close = new EventEmitter<void>();

  currentImageIndex = 0;
  markdownContent = '';
  isLoadingMarkdown = false;

  constructor(private http: HttpClient) {}

  closeDialog() {
    this.close.emit();
  }

  async previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      if (this.isCurrentItemMarkdown) {
        await this.loadMarkdownContent();
      }
    }
  }

  async nextImage() {
    if (this.currentImageIndex < this.diagrams.length - 1) {
      this.currentImageIndex++;
      if (this.isCurrentItemMarkdown) {
        await this.loadMarkdownContent();
      }
    }
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  get currentItem() {
    return this.diagrams[this.currentImageIndex];
  }

  get isCurrentItemMarkdown() {
    return this.currentItem?.endsWith('.md');
  }

  get isCurrentItemImage() {
    return !this.isCurrentItemMarkdown;
  }

  async selectItem(index: number) {
    this.currentImageIndex = index;
    
    if (this.isCurrentItemMarkdown) {
      await this.loadMarkdownContent();
    }
  }

  async loadMarkdownContent() {
    if (!this.isCurrentItemMarkdown) return;
    
    this.isLoadingMarkdown = true;
    try {
      const response = await firstValueFrom(this.http.get(this.currentItem, { responseType: 'text' }));
      this.markdownContent = this.convertMarkdownToHtml(response || '');
    } catch (error) {
      console.error('Error loading markdown:', error);
      this.markdownContent = '<p>Error loading documentation content.</p>';
    } finally {
      this.isLoadingMarkdown = false;
    }
  }

  private convertMarkdownToHtml(markdown: string): string {
    // Basic markdown to HTML conversion
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```[\s\S]*?```/gim, (match) => {
        const code = match.replace(/```/g, '').trim();
        return `<pre><code>${code}</code></pre>`;
      })
      // Inline code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>')
      // Wrap in paragraphs
      .replace(/^(?!<[h|p|u|o|c])/gim, '<p>')
      .replace(/(?<![>])$/gim, '</p>');
  }

  async ngOnChanges() {
    if (this.isOpen && this.isCurrentItemMarkdown) {
      await this.loadMarkdownContent();
    }
  }

  getItemTitle(filename: string): string {
    if (filename.endsWith('.md')) {
      return 'Project Documentation';
    }
    
    // Extract title from filename
    const name = filename.replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
    return name.replace(/-|_/g, ' ');
  }
}