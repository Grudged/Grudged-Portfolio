# Email Contact Setup Guide

## Option 1: EmailJS Setup (Recommended)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account
5. Note your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: Portfolio Contact - {{subject}}

Hi Chris,

You have a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Note your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Code
Replace these values in `contact.component.ts`:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

### Example:
```typescript
emailjs.init('user_abcd1234efgh5678'); // Your public key
emailjs.send('service_xyz789', 'template_abc123', { ... });
```

## Option 2: Direct Mailto (Already Implemented)
The "Open Email Client" button uses the user's default email program.

## Option 3: Backend Service (Future Enhancement)
For more advanced features, you could implement:
- Node.js + Nodemailer
- Netlify Functions
- Vercel API Routes

## Testing
1. Deploy to Netlify
2. Test the contact form
3. Check your email for messages

## Rate Limits
EmailJS free tier allows:
- 200 emails/month
- Perfect for portfolio contact forms

## Security
- No sensitive data exposed
- Client-side only
- GDPR compliant
