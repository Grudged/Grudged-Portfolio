# Grudged Portfolio

A modern, fully SEO-optimized portfolio website showcasing full-stack development expertise. Built with Angular 20 and optimized for performance, accessibility, and search engine discoverability.

## 🚀 Features

- **Modern Angular Architecture**: Built with Angular 20+ standalone components
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, structured data
- **Performance Focused**: Lazy loading, optimized images, Core Web Vitals ready
- **Fully Responsive**: Mobile-first design with smooth animations
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Contact Integration**: EmailJS integration for contact form functionality

## 🛠 Tech Stack

- **Frontend**: Angular 20, TypeScript, CSS3
- **Styling**: Custom CSS with CSS variables for theming
- **Email Service**: EmailJS for contact form
- **Deployment**: Optimized for Netlify with proper headers and redirects
- **SEO**: Structured data, sitemap, robots.txt, analytics ready

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Grudged-Portfolio

# Install dependencies
npm install

# Start development server
npm run start
# or for specific port
npm run serve:43503
```

### Development Commands

```bash
# Development server
ng serve                    # Default port 4200
npm run serve:43503        # Custom port 43503

# Build for production
npm run build:prod         # Optimized production build

# Run tests
ng test                    # Unit tests with Karma

# Development build with watch
npm run watch             # Build and watch for changes
```

## 🎨 Customization

### Personal Information
Update personal details in:
- `src/app/components/hero/hero.component.html` - Name and title
- `src/app/components/about/about.component.html` - Bio and skills
- `src/app/components/projects/projects.component.ts` - Project data

### SEO Configuration
Update SEO settings in `src/index.html`:
- Replace `https://grudged-portfolio.netlify.app/` with your domain
- Update social media URLs in structured data
- Replace `GA_MEASUREMENT_ID` with your Google Analytics ID

### Styling
- Global styles: `src/styles.css`
- Component styles: Individual `.css` files per component
- Theme variables: Defined in `:root` and `.dark-theme` selectors

## 📊 SEO Features

- ✅ Complete meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card optimization
- ✅ JSON-LD structured data (Person schema)
- ✅ Sitemap.xml and robots.txt
- ✅ Canonical URLs
- ✅ Performance optimization (lazy loading, preconnect)
- ✅ Google Analytics integration ready

## 🚢 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build:prod`
2. Deploy the `dist/Grudged-Portfolio/browser` folder
3. Netlify configuration files included:
   - `public/_redirects` - SPA routing
   - `public/_headers` - Performance and security headers

### Other Platforms
The production build is compatible with any static hosting service.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🔧 Configuration Files

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `public/_headers` - Netlify headers for performance
- `public/_redirects` - SPA routing for Netlify

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using Angular and modern web technologies.
