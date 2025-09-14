# Dev Garden 🌱

**Your Personal Development Knowledge Base - Never Lose a Solution Again**

Dev Garden is a comprehensive knowledge management system designed specifically for developers. It automatically captures, organizes, and makes searchable all your development knowledge - from browsing history and Stack Overflow answers to code snippets and documentation. With both web and VS Code extension interfaces, Dev Garden ensures your knowledge is always at your fingertips.

## 📸 Screenshots

*Coming soon - Dashboard, Search Interface, VS Code Extension*

## 🎨 UI/UX Features 

### Dark Mode Support
Dev Garden includes a fully implemented dark mode that automatically adapts to your system preferences:
- **Automatic Theme Detection**: Respects your OS dark mode settings
- **Manual Toggle**: Switch between light/dark modes with the sun/moon icon in the header
- **Persistent Preference**: Your theme choice is saved across sessions
- **Smooth Transitions**: All components smoothly transition between themes

### Branding & Logo
- **Custom Logo**: Dev Garden features a distinctive plant-based logo with transparent background and dotted growth lines
- **Responsive Sizing**: Logo adapts to different contexts (navbar: 64x64px, hero: 400x400px, auth: 72x72px)
- **Clean Design**: No-background version (DevGardenLogoNB.png) for better integration with any theme
- **Favicon Support**: Browser tab icon using the Dev Garden logo

## ✨ Key Features

### 🔍 Intelligent Knowledge Management
- **Auto-Capture**: Browser and VS Code extensions automatically save relevant content
- **AI-Powered Organization**: Automatic categorization and tagging using GPT-3.5
- **Semantic Search**: Natural language queries across your entire knowledge base
- **Smart Collections**: Organize items by project, technology, or custom categories
- **Relevance Scoring**: AI determines content relevance (0-1 scale)

### 🛠️ Developer-Focused Tools
- **VS Code Integration**: Access and save knowledge without leaving your IDE
- **Code Snippet Management**: Syntax-highlighted code with language detection
- **Multi-Source Import**: Import bookmarks, PDFs, images, and text/markdown
- **API Access**: Full REST API for custom integrations
- **Team Collaboration**: Share collections with team members (coming soon)

### 🔒 Privacy & Security
- **Self-Hosted Option**: Keep your data on your infrastructure
- **Encrypted Storage**: All data encrypted at rest
- **Session-Based Auth**: Secure NextAuth.js authentication
- **User Isolation**: Complete data separation between users

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- OpenAI API key for AI features
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dev-garden.git
cd dev-garden
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/devgarden"
DIRECT_DATABASE_URL="postgresql://user:password@localhost:5432/devgarden"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# OpenAI API
OPENAI_API_KEY="sk-your-openai-api-key"

# Optional: Email (for password reset)
EMAIL_SERVER=""
EMAIL_FROM=""

# Optional: External Status Page (Better Stack)
# If set, /status will redirect to your status page
NEXT_PUBLIC_STATUS_URL="https://status.dev-garden.io"

# EmailJS (for password reset emails)
# Create a template with variables: to_email, reset_url, app_name
EMAILJS_SERVICE_ID=""
EMAILJS_TEMPLATE_ID=""
EMAILJS_PUBLIC_KEY=""
# Optional server-side token (recommended)
EMAILJS_PRIVATE_KEY=""

# App identity (used in emails)
APP_NAME="Dev Garden"
SUPPORT_EMAIL="support@devgarden.io"

# Chrome Extension
# Public Chrome Web Store URL (if published)
NEXT_PUBLIC_CHROME_EXTENSION_URL=""
# Docs/landing URL as fallback
NEXT_PUBLIC_CHROME_EXTENSION_DOCS_URL=""

# SEO / Search Console
# Public site URL for canonical/OG/sitemap/robots
NEXT_PUBLIC_SITE_URL="https://dev-garden.io"
# Google Search Console verification token (adds meta tag)
GOOGLE_SITE_VERIFICATION=""

# Demo video (Loom embed URL used for hero modal)
NEXT_PUBLIC_DEMO_VIDEO_URL="https://www.loom.com/embed/d944b8be31a2434ba5980364ec5aa363?autoplay=0"

# Chat / Comments (feature flag)
# Server-side toggle (preferred):
CHAT_ENABLED="0"
# Optional client-side toggle for gating UI:
NEXT_PUBLIC_CHAT_ENABLED="false"

# Discussions (board)
DISCUSSIONS_ENABLED="0"
NEXT_PUBLIC_DISCUSSIONS_ENABLED="false"
```

4. **Initialize the database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed with sample data
npm run prisma:seed

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

5. **Start the development server**
```bash
# Default port 3000
npm run dev

# Or specify a custom port
PORT=3004 npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access Dev Garden!

## 📡 Status Page

- Dev Garden supports an external status page (e.g., Better Stack).
- Set `NEXT_PUBLIC_STATUS_URL` to your status domain (e.g., `https://status.dev-garden.io`).
- The `/status` route will redirect to that URL if configured; otherwise a simple in-app status page is shown.
- The Footer “Status” link points to `/status`, so no component changes are needed.

## 🔎 SEO & Search Console

- Canonicals, Open Graph, and Twitter Card are configured in `src/app/layout.tsx`.
- Robots and sitemap are auto-generated at:
  - `/robots.txt`
  - `/sitemap.xml`
- Configure env vars:
  - `NEXT_PUBLIC_SITE_URL` → your public base URL (e.g., https://dev-garden.io)
  - `GOOGLE_SITE_VERIFICATION` → token from Google Search Console (adds meta tag automatically)
- Steps to verify in Google Search Console:
  1. Add property for your domain (use domain property if possible).
  2. Paste the token into `GOOGLE_SITE_VERIFICATION` and redeploy.
  3. Click Verify in Search Console.
  4. Submit sitemap at `https://your-site/sitemap.xml`.

## 🔐 Password Reset

- Pages:
  - `Forgot Password`: `/forgot-password` (sends reset email)
  - `Reset Password`: `/reset-password?token=...` (sets new password)
- API:
  - `POST /api/auth/forgot-password` → generates a one-hour token and sends an EmailJS message.
  - `POST /api/auth/reset-password` → validates token and updates password.
- Configuration:
  - Set EmailJS env vars above and create a template with these fields (we send all of them):
    - `to_email`, `to_name`, `reset_link` (alias: `reset_url`), `app_name`, `expires_in`, `support_email`
  - In EmailJS Template Settings, set "To email" to `{{to_email}}` (required by EmailJS to find the recipient).
  - A full HTML template is available at `docs/email/password_reset_template.html`.
  - Ensure `NEXTAUTH_URL` is set so reset links contain the correct origin in production.
- Database:
  - Added `PasswordResetToken` model; run migrations after pulling changes:
    ```bash
    npm run prisma:generate
    npm run prisma:migrate
    ```

- Debugging:
  - Set `RESET_DEBUG=1` to get verbose responses on `POST /api/auth/forgot-password` (includes `resetUrl` and any EmailJS error). Disable after verification.

### Prisma + Neon (PgBouncer) Tip

If your `DATABASE_URL` uses a pooled PgBouncer endpoint (e.g., host contains `-pooler`), Prisma migrations and resets can fail.

- Set `DIRECT_DATABASE_URL` to your Neon direct endpoint (no `-pooler`).
- The Prisma schema includes `directUrl`, so migrations use the direct connection while your app can keep using the pooled URL.

## 🧩 Chrome Extension CTA

- New users or accounts with no items will see a banner on the Dashboard suggesting installation of the Chrome Extension.
- Configure:
  - `NEXT_PUBLIC_CHROME_EXTENSION_URL` → Chrome Web Store listing URL (opens in new tab).
  - `NEXT_PUBLIC_CHROME_EXTENSION_DOCS_URL` → Documentation or landing page URL for the extension (used as fallback “Learn more” link).
- Code: `src/components/dashboard/ChromeExtensionCTA.tsx` rendered from `src/app/dashboard/page.tsx`.

## 💬 Dev Chat / Comments (Alpha)

- Feature flags:
  - `CHAT_ENABLED=1` (server-side) to enable API routes.
  - `NEXT_PUBLIC_CHAT_ENABLED=true` (optional, for gating upcoming UI components).
- Database:
  - New `Comment` model for item-scoped comments and threads (soft delete supported).
- Endpoints (enabled when `CHAT_ENABLED=1`):
  - `GET /api/items/:id/comments` → List comments for the item (owner-only for now).
  - `POST /api/items/:id/comments` → Create comment `{ content, parentId? }`.
- Migration:
  ```bash
  npm run prisma:generate
  npm run prisma:migrate
  ```
- Notes:
  - Rate limiting and input sanitization are applied.
  - Access control is owner-only initially; sharing/roles coming next.

## 🧵 Discussions Board (MVP)

- Feature flags:
  - `DISCUSSIONS_ENABLED=1` (server) enables API and pages.
  - `NEXT_PUBLIC_DISCUSSIONS_ENABLED=true` shows “Discussions” in the sidebar.
- Database:
  - `DiscussionPost`, `DiscussionVote`, reuse `Comment` (now supports `postId`).
- API:
  - `GET/POST /api/discussions` → list/create posts (auth required for read/write).
  - `POST /api/discussions/:id/vote` → upvote/downvote (1 or -1).
  - `GET/POST /api/discussions/:id/comments` → comments under a post.
- UI:
  - `/dashboard/discussions` → list posts and “New Post”.
  - `/dashboard/discussions/new` → create post.
  - `/dashboard/discussions/[slug]` → post detail, voting, and comments panel.
- Markdown:
  - Posts and comments support Markdown (GFM). Unsafe HTML is not rendered.
- Migration:
  ```bash
  npm run prisma:generate
  npm run prisma:migrate
  ```

## 📥 File Import & Storage

- Upload multiple files from `/dashboard/import` → Import Files.
- Supported types: PDFs (`application/pdf`), images (`image/*`: png, jpg, gif, webp, svg), and text/markdown (`text/*`).
- Extraction:
  - PDFs: text extracted via `pdf-parse`.
  - Text/Markdown: decoded and indexed.
  - Images: optional OCR via `tesseract.js` when `EXTRACT_ENABLE_OCR=1`.

### Storage drivers

- `local` (default for development)
  - Saves files under `public/uploads/{userId}/...`.
  - Not suitable for serverless production environments.

- `s3` (recommended for production)
  - Set `STORAGE_DRIVER=s3` and S3 env vars (see below).
  - Use a bucket policy to allow public GET, or front with CloudFront and keep the bucket private.
  - App writes objects with no ACLs (compatible with ACLs disabled / Bucket owner enforced).

### Required env vars for S3

Add the following to your deployment environment:

```
STORAGE_DRIVER=s3
S3_BUCKET=your-bucket
S3_REGION=us-east-2
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_PUBLIC_BASE_URL=https://your-bucket.s3.us-east-2.amazonaws.com

# Upload size and UI hint
MAX_UPLOAD_SIZE_BYTES=15728640
NEXT_PUBLIC_MAX_UPLOAD_MB=15

# Optional OCR for images
EXTRACT_ENABLE_OCR=0
```

### S3 quick setup

1. Create bucket (General purpose), Region (e.g., us-east-2), ACLs disabled, Bucket owner enforced.
2. For quick start public files, turn OFF “Block all public access” and add a bucket policy allowing `s3:GetObject` on `arn:aws:s3:::YOUR_BUCKET/*`.
3. Create an IAM user with policy allowing `s3:PutObject` and `s3:GetObject` on `arn:aws:s3:::YOUR_BUCKET/*`.
4. Set env vars and redeploy.

## 🧩 Extensions

### Chrome Extension

Dev Garden includes a comprehensive Chrome extension that automatically captures your development knowledge as you browse.

**📥 Installation Options:**

1. **Chrome Web Store** (Coming Soon)
   - Search for "Dev Garden" in Chrome Web Store
   - One-click installation with automatic updates

2. **Manual Installation** (Available Now)
   ```bash
   # Load extension in developer mode
   cd extension/chrome
   # Open chrome://extensions/
   # Enable "Developer mode" → Click "Load unpacked" → Select folder
   ```

**✨ Features:**
- **Auto-capture** from Stack Overflow, GitHub, ChatGPT, and documentation sites
- **Smart context menu** - Right-click any webpage to save
- **Quick notes** - Save code snippets directly from the popup
- **Setup wizard** - Guided 3-step configuration process
- **Privacy-focused** - Only accesses developer-related websites

**📚 Documentation:**
- [Chrome Extension README](extension/chrome/README.md) - Complete feature guide
- [Quick Start Guide](extension/chrome/QUICK_START.md) - 5-minute setup
- [Installation Guide](extension/chrome/INSTALL.md) - Detailed installation options

### VS Code Extension

Access your Dev Garden knowledge base directly from your IDE with full integration.

**📥 Installation:**

1. **From VSIX file (local development)**
```bash
# Navigate to extension directory
cd extension/vscode

# Install dependencies and compile
npm install
npm run compile

# Package the extension
npx vsce package

# Install in VS Code
code --install-extension dev-garden-*.vsix
```

2. **From VS Code Marketplace** (coming soon)
```
Search for "Dev Garden" in VS Code Extensions
```

**⚙️ Configuration:**

1. Open VS Code Settings (`Ctrl+,`)
2. Search for "Dev Garden"
3. Configure:
   - **API URL**: `https://devgarden-cnw9swdh9-grudgeds-projects.vercel.app` (or your deployment URL)
   - **API Key**: Your email address (used for authentication)

**💡 Usage:**

**Command Palette** (`Ctrl+Shift+P`):
- `Dev Garden: Search Dev Garden` - Search your knowledge base
- `Dev Garden: Add Quick Note` - Create a new note
- `Dev Garden: Save Selection` - Save selected code to Dev Garden
- `Dev Garden: Refresh` - Refresh the extension data

**Activity Bar**:
- Click the Dev Garden icon to access your collections, tags, and recent items

**Context Menu**:
- Right-click selected text → "Save Selection to Dev Garden"

## 🏗️ Architecture

### Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **Database** | PostgreSQL, Prisma ORM |
| **Authentication** | NextAuth.js, bcrypt |
| **AI/ML** | OpenAI GPT-3.5 Turbo |
| **State Management** | React Query (TanStack) |
| **Forms** | React Hook Form |
| **Extensions** | VS Code Extension API, Chrome Extension API |

### Project Structure

```
dev-garden/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # REST API endpoints
│   │   │   ├── auth/         # Authentication routes
│   │   │   ├── items/        # CRUD operations
│   │   │   ├── search/       # Search functionality
│   │   │   └── extension/    # Extension-specific APIs
│   │   ├── dashboard/         # Dashboard pages
│   │   └── (auth)/           # Auth pages (login/register)
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── dashboard/       # Dashboard components
│   │   └── landing/         # Landing page sections
│   ├── lib/                 # Utilities and configs
│   │   ├── auth.ts         # NextAuth configuration
│   │   ├── prisma.ts       # Database client
│   │   └── ai.ts           # OpenAI integration
│   └── types/              # TypeScript definitions
├── extension/
│   ├── vscode/             # VS Code extension
│   │   ├── src/           # Extension source code
│   │   └── package.json   # Extension manifest
│   └── chrome/            # Chrome extension
│       ├── background.js  # Service worker
│       ├── popup.html/js  # Extension popup
│       ├── content-*.js   # Site-specific scripts
│       ├── onboarding.html/js  # Setup wizard
│       └── privacy.html   # Privacy policy
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
└── public/               # Static assets
```

## 📚 API Documentation

### Authentication

All API endpoints require authentication via session cookies (web) or Bearer token (extensions).

**Extension Authentication Header:**
```
Authorization: Bearer your-email@example.com
```

### Core Endpoints

#### Items
```http
GET    /api/items              # List items (paginated)
POST   /api/items              # Create new item
GET    /api/items/:id          # Get specific item
PATCH  /api/items/:id          # Update item
DELETE /api/items/:id          # Delete item
POST   /api/items/:id/categorize  # AI categorize
```

#### Search
```http
GET /api/search?q=query&tags=tag1,tag2&collection=id
```

#### Collections
```http
GET    /api/collections        # List collections
POST   /api/collections        # Create collection
PATCH  /api/collections/:id    # Update collection
DELETE /api/collections/:id    # Delete collection
```

#### Tags
```http
GET    /api/tags               # List all tags with counts
POST   /api/tags               # Create new tag
```

#### Extension-Specific
```http
POST /api/extension/items      # Create item from extension
GET  /api/extension/items      # Validate extension auth
```

### Request/Response Examples

**Create Item**
```json
POST /api/items
{
  "title": "React Performance Tips",
  "content": "Use memo, useMemo, useCallback...",
  "url": "https://example.com/react-tips",
  "tags": ["react", "performance"],
  "collectionId": "uuid"
}
```

**Search Response**
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "React Performance Tips",
      "snippet": "Use memo, useMemo...",
      "relevanceScore": 0.95,
      "aiCategory": "frontend",
      "tags": [{"name": "react"}],
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1
}
```

## 🤖 AI Features

### Automatic Categorization
Items are automatically categorized into:
- **Development Areas**: Frontend, Backend, DevOps, Mobile, Desktop
- **Technologies**: Database, Security, Testing, Cloud, Architecture
- **Content Types**: Tutorial, Documentation, Q&A, Code Example, Article

### Smart Tagging
AI analyzes content and suggests relevant tags based on:
- Technology mentions (React, Python, Docker, etc.)
- Problem domains (authentication, caching, optimization)
- Concepts (design patterns, algorithms, best practices)

### Relevance Scoring
Each item receives a relevance score (0-1) based on:
- Content quality and completeness
- Code-to-explanation ratio
- Practical applicability
- Recency and update frequency

## 🔧 Configuration

### Database Options

**Local PostgreSQL**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/devgarden"
```

**Cloud Providers**
- **Neon**: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname`
- **Supabase**: `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`
- **Railway**: `postgresql://postgres:[PASSWORD]@containers-xxx.railway.app:5432/railway`

### Customization

**Theme Colors** (`tailwind.config.ts`):
```typescript
colors: {
  'garden': {
    50: '#f0fdf4',   // Lightest
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Primary
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'   // Darkest
  }
}
```

**Environment Variables**:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `NEXTAUTH_URL`: Full URL of your application
- `OPENAI_MODEL`: GPT model to use (default: gpt-3.5-turbo)

## 🐛 Troubleshooting

### Common Issues

**"No data provider registered" in VS Code**
- Ensure the server is running (`npm run dev`)
- Check API URL in VS Code settings matches your server
- Verify API key (email) is correct
- Reload VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")

**Database connection errors**
```bash
# Test connection
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

**Port already in use**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 [PID]

# Or use different port
PORT=3004 npm run dev
```

**Extension not loading**
```bash
# Reinstall extension
code --uninstall-extension dev-garden.dev-garden
code --install-extension path/to/dev-garden-*.vsix

# Check extension logs
# VS Code: View → Output → Select "Dev Garden" from dropdown
```

## 🚧 Roadmap

### Phase 1: Core Features ✅
- [x] Web dashboard
- [x] Authentication system
- [x] CRUD operations
- [x] AI categorization
- [x] Search functionality
- [x] VS Code extension

### Phase 2: Enhanced Features 🚀
- [x] Chrome browser extension with auto-capture
- [ ] Firefox browser extension
- [ ] Markdown note editor with preview
- [ ] Code execution sandbox
- [ ] Export to various formats (MD, PDF, JSON)
- [ ] Bulk operations UI

### Phase 3: Collaboration 👥
- [ ] Team workspaces
- [ ] Shared collections
- [ ] Comments and annotations
- [ ] Knowledge base analytics
- [ ] Permission management

### Phase 4: Advanced Features 🔮
- [ ] Vector search with embeddings
- [ ] Similar content recommendations
- [ ] Knowledge graph visualization
- [ ] API client libraries (Python, JS, Go)
- [ ] Mobile applications (React Native)
- [ ] CLI tool

## 🆕 Recent Updates (September 2025)

### Major Feature Additions
- ✅ **Chrome Extension**: Complete browser extension with auto-capture functionality
  - Automatic content saving from Stack Overflow, GitHub, ChatGPT
  - Smart right-click context menu for manual saves
  - Professional setup wizard with 3-step onboarding
  - Comprehensive privacy policy and documentation
  - Production deployment ready with Vercel integration
- ✅ **Production Deployment**: Full application deployed to Vercel
  - Secure authentication with NextAuth.js
  - PostgreSQL database with Prisma ORM
  - Build-safe configuration for serverless environments
  - Environment variable management for production

### UI/UX Improvements
- ✅ **Full Dark Mode Implementation**: All components now support dark mode
  - Homepage sections (Hero, Features, How It Works, CTA, Footer)
  - Authentication pages (Login, Register)
  - Dashboard components
  - Smooth transitions with Tailwind CSS
- ✅ **Logo Integration**: Custom Dev Garden logo replacing generic icons
  - Header navigation bar
  - Login/Register pages
  - Hero section
- ✅ **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes

### Extension Updates
- ✅ **VS Code Extension**: Updated for production deployment
  - API endpoint pointing to production Vercel URL
  - Version 1.0.2 with enhanced error handling
- ✅ **Chrome Extension Enhancement**: Professional features added
  - Onboarding flow for new users
  - Privacy policy compliance
  - Error handling and connection testing
  - Statistics tracking and display

### Component Updates
- **Landing Page Components**:
  - `HeroSection`: Features prominent logo display with animations
  - `HowItWorks`: Dark mode compatible step-by-step guide
  - `FeaturesGrid`: Card-based layout with hover effects
  - `CTASection`: Call-to-action with gradient backgrounds
  - `Footer`: Multi-column layout with categorized links

- **Authentication Components**:
  - `LoginPage`: Clean form design with dark mode support
  - `RegisterPage`: Matching authentication UI patterns
  - Integrated logo branding throughout

### Theme System
- **Color Palette**: Chrome-inspired dark mode colors
  - Primary: `chrome-dark-primary` (#1c1c1c)
  - Secondary: `chrome-dark-secondary` (#2a2a2a)
  - Borders: `chrome-dark-border` (#3a3a3a)
  - Text Primary: `chrome-dark-text-primary` (#e5e5e5)
  - Text Secondary: `chrome-dark-text-secondary` (#999999)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (when available)
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Add JSDoc comments for public APIs
- Keep components small and focused
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [OpenAI](https://openai.com/) - AI categorization
- [Vercel](https://vercel.com/) - Deployment platform

## 💬 Support & Community

- **Documentation**: [docs.devgarden.io](https://docs.devgarden.io) (coming soon)
- **Issues**: [GitHub Issues](https://github.com/yourusername/dev-garden/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/dev-garden/discussions)
- **Email**: support@devgarden.io
- **Twitter**: [@devgarden](https://twitter.com/devgarden)

---

<p align="center">
  <strong>Built with ❤️ for developers who never want to lose a solution again</strong>
  <br>
  <em>© 2025 Dev Garden. All rights reserved.</em>
</p>
