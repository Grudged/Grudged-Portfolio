import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  closeDialog() {
    this.close.emit();
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.diagrams.length - 1) {
      this.currentImageIndex++;
    }
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }
}