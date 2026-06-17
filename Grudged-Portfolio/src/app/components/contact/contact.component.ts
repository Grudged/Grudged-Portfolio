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
    message: '',
    botField: '' // honeypot — humans never fill this
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

      // Mirror the inquiry into Salesforce (same Lead Org as grudged.io +
      // the AppExchange listing). Fire-and-forget: a SF failure must not flip
      // the user's "message sent" success — EmailJS already delivered it.
      this.createSalesforceLead();

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

  // Create a Salesforce Lead via the Netlify function (server-side Web-to-Lead).
  // Never throws into the caller — logs and moves on.
  private createSalesforceLead() {
    fetch('/.netlify/functions/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.contactForm.name,
        email: this.contactForm.email,
        subject: this.contactForm.subject,
        message: this.contactForm.message,
        botField: this.contactForm.botField
      })
    }).catch((err) => console.error('Salesforce lead post failed:', err));
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
      message: '',
      botField: ''
    };
  }
}