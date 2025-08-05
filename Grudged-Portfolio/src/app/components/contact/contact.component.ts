import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../../config/email.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(emailConfig.publicKey);
  }

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.submitMessage = 'Sending message...';

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: this.contactForm.name,
          from_email: this.contactForm.email,
          subject: this.contactForm.subject,
          message: this.contactForm.message,
          to_email: emailConfig.toEmail
        }
      );

      console.log('Email sent successfully:', response);
      this.submitSuccess = true;
      this.submitMessage = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
      this.resetForm();
      
    } catch (error) {
      console.error('Email sending failed:', error);
      this.submitSuccess = false;
      this.submitMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
    } finally {
      this.isSubmitting = false;
      // Clear message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }
  }

  // Alternative method: Open default email client
  openEmailClient() {
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent('Hi Chris,\n\nI found your portfolio and would like to get in touch.\n\nBest regards,');
    window.open(`mailto:${emailConfig.toEmail}?subject=${subject}&body=${body}`);
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}