# Fake News Detector

## Overview

A web application that uses AI to detect fake news from text input or uploaded documents. Users can paste news article text or upload PDF/DOCX files to receive a classification (REAL/FAKE) with a confidence score. The application features a clean, professional interface inspired by analytical tools like Grammarly, prioritizing credibility and clarity in presenting verification results.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component System**: Built on shadcn/ui components with Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design system uses Tailwind CSS with a custom configuration featuring the "new-york" style preset.

**Styling Approach**: Tailwind CSS with CSS variables for theming, enabling dynamic color schemes and consistent spacing. The design follows a professional, utility-focused approach with Inter font family for optimal readability.

**State Management**: TanStack React Query (formerly React Query) for server state management, with custom query client configuration that disables automatic refetching and uses infinite stale time for predictable data behavior.

**Routing**: Wouter for lightweight client-side routing, managing navigation between the home page and 404 error page.

**Form Handling**: React Hook Form with Zod resolvers for type-safe form validation, though not extensively used in the current implementation.

**Design System Principles**:
- Card-based layouts with rounded corners and subtle shadows
- Two-tab interface for text input vs. file upload
- Clear visual hierarchy using typography scale (text-4xl for headings down to text-sm for labels)
- Professional color scheme with destructive variants for fake news, success-like green for real news
- Responsive spacing using Tailwind's spacing primitives (4, 6, 8, 12, 16 units)
- Maximum content width of 4xl for focused reading experience

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured for ES modules.

**Development Setup**: Custom Vite integration for hot module replacement in development, with middleware mode enabling seamless full-stack development experience.

**API Design**: RESTful API architecture with routes prefixed with `/api`. The backend currently has minimal route implementation, serving primarily as a proxy/gateway to the external Python-based ML API.

**Request Logging**: Custom middleware that logs API requests with timing information, truncating verbose responses to 80 characters for cleaner console output.

**Session Management**: Infrastructure includes connect-pg-simple for PostgreSQL-backed session storage, though authentication is not currently implemented.

**Build Process**: Separate build steps for client (Vite) and server (esbuild), with server code bundled as ESM with external package references for production deployment.

### Data Layer

**ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver for edge-compatible database connections.

**Schema Definition**: Type-safe schema using Drizzle with Zod integration for validation. Currently defines a minimal `users` table with UUID primary keys, username, and password fields.

**Migration Strategy**: Drizzle Kit for schema migrations with `db:push` command for direct schema synchronization to the database.

**In-Memory Storage**: MemStorage implementation provides a Map-based storage layer for development/testing, offering basic CRUD operations for users without requiring a database connection.

**Design Decision**: The application is structured to support database operations but currently uses in-memory storage, allowing for easy transition to full PostgreSQL implementation when authentication features are added.

### External Dependencies

**Machine Learning API**: Primary integration with a FastAPI-based fake news detection service hosted on Google Cloud Run (`https://fake-news-detector-api-786177988089.asia-south1.run.app`).

**API Endpoints**:
- `POST /predict_from_text?text={urlEncodedText}` - Analyzes text directly
- `POST /predict_files` - Accepts PDF or DOCX file uploads for text extraction and analysis

**Response Format**: Returns JSON with `label` (classification) and `probability` (confidence score as decimal).

**Database**: PostgreSQL via Neon serverless platform, configured through `DATABASE_URL` environment variable. Drizzle ORM provides the abstraction layer with type-safe queries and migrations.

**UI Component Library**: Radix UI primitives (@radix-ui/* packages) provide unstyled, accessible component primitives that are wrapped with shadcn/ui styling patterns.

**Styling Tools**:
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for variant-based component styling
- clsx and tailwind-merge for conditional class composition

**Icons**: Lucide React for consistent, customizable icon set throughout the interface.

**Date Handling**: date-fns for date manipulation and formatting utilities.

**Development Tools**:
- Replit-specific Vite plugins for runtime error overlay, cartographer, and dev banner
- esbuild for fast server-side bundling
- tsx for TypeScript execution in development

**Font Delivery**: Google Fonts (Inter family) loaded via CDN for professional typography.