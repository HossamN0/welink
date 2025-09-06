# Parking Reservations System - Frontend

A comprehensive parking management system built with Next.js 15, featuring real-time WebSocket communication, role-based authentication, and a modern UI built with Tailwind CSS and Radix UI components.

## Live Demo
A test deployment of the application is available for preview:
- **Website** - https://welink-task.vercel.app

## PageSpeed Insights Results
The application has been tested for performance, accessibility, best practices, and SEO using Google's PageSpeed Insights. The results demonstrate a strong focus on optimization and user experience.
- **Image name** - [page-speed-test.png]

## Features

- **Role-Based Authentication** - Admin, Employee, Visitor, and Subscriber roles
- **Real-Time Communication** - WebSocket integration for live updates
- **Protected Routes** - Middleware-based route protection
- **Modern UI** - Built with Tailwind CSS and Radix UI components
- **State Management** - Redux Toolkit with persistence
- **API Integration** - Axios-based API services
- **Performance Monitoring** - Built-in performance dashboard

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin-only pages
│   ├── auth/              # Authentication pages
│   ├── checkpoint/        # Employee checkpoint interface
│   ├── gate/              # Gate management (public)
│   └── api/               # API routes
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── services/              # API and WebSocket services
├── store/                 # Redux store configuration
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── validation/            # Form validation schemas
```

## Authentication & Roles

The system uses NextAuth.js with credentials provider and supports four user roles:

- **Admin** (`admin`) - admin page access
- **Employee** (`employee`) - Checkpoint management
- **Visitor** (`visitor`) - gate access
- **Subscriber** (`subscriber`) - gate access

### Authentication Flow
1. Users login via `/auth/login`
2. Credentials are validated against backend API
3. JWT token is stored in session (next-auth)
4. Middleware protects routes based on user role

## Routes & Navigation

### Public Routes
- `/` - Home page (redirects based on role)
- `/gate` - Gate selection page
- `/gate/[gateId]` - Individual gate interface

### Protected Routes

#### Admin Routes (`/admin/*`)
- `/admin/parking` - Parking state reports
- `/admin/category` - Category management

#### Employee Routes (`/checkpoint/*`)
- `/checkpoint` - Employee checkpoint interface

#### Authentication Routes (`/auth/*`)
- `/auth/login` - Login page

### Route Protection Logic
- **Unauthenticated users** → Redirected to login
- **Authenticated users** → Redirected to role-appropriate dashboard
- **Wrong role access** → Redirected to home page
- **Auth pages** → Redirected to home if already logged in

## API Integration

### Available Services
- **Gate Service** (`/services/api/gate.ts`)
  - `GetGates()` - Fetch all gates
  - `GetGateById(id)` - Fetch specific gate

- **Admin Service** (`/services/api/admin.ts`)
  - `getParkingState()` - Get parking zone status
  - `changeZoneStatus()` - Update zone open/closed status
  - `GetCategories()` - Fetch parking categories
  - `UpdateCategory()` - Update category settings

- **Tickets Service** (`/services/api/tickets.ts`)
  - `checkin()` - Create parking ticket
  - `getTicketById()` - Fetch ticket details
  - `checkout()` - Process ticket checkout

- **Subscription Service** (`/services/api/subscription.ts`)
  - Subscription management endpoints

### Known Issues
- `GET /api/v1/admin/vacations` - Backend endpoint not implemented
- `GET /api/v1/admin/users` - Backend endpoint not implemented

## WebSocket Integration

### Real-Time Features
- **Connection Management** - Automatic WebSocket connection handling
- **Message Broadcasting** - Real-time updates across the system
- **Reusable Hooks** - `useWebSocket()` for easy integration

### Current Implementation
- WebSocket successfully connects and sends/receives messages
- Integrated reusable hooks for real-time actions
- Messages currently appear only for the same user (not yet broadcast to other connected users)
- WebSocket usage demonstrated in `/gate/[gateId]` route

### WebSocket Services
- `WebsocketConnection` - Component for establishing connection
- `useWebSocket` - Hook for listening to messages
- `sendWebSocketMessage` - Function for sending messages

## UI Components

### Design System
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Custom Components** - Reusable UI elements

### Key Components
- `Button` - Customizable button component
- `Dialog` - Modal dialogs
- `Sidebar` - Navigation sidebar
- `Skeleton` - Loading states
- `Tooltip` - Contextual information

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   - `NEXTAUTH_SECRET` - NextAuth.js secret key
   - `NEXT_PUBLIC_WS_URL` - WebSocket server URL
   - `NEXT_PUBLIC_API_URL` - Backend API URL

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling

### State Management
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Query** - Server state management

### Authentication
- **NextAuth.js** - Authentication framework
- **JWT** - Token-based authentication

### UI & Styling
- **Radix UI** - Component primitives
- **Lucide React** - Icons
- **Class Variance Authority** - Component variants
- **clsx** - Conditional class names

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundling
- **PostCSS** - CSS processing

## Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## Development Notes

### Current Status
- Authentication system fully implemented
- Role-based route protection working
- WebSocket connection established
- Core UI components built
- Some admin endpoints not yet implemented in backend
- WebSocket broadcasting limited to single user

### Next Steps
1. Implement missing backend endpoints for vacations and users
2. Enable WebSocket message broadcasting to all connected users
3. Add comprehensive error handling
4. Implement comprehensive testing suite

### Development Decisions
- **API Data Fetching**: Originally planned to use Server-Side Rendering (SSR) with API actions, but switched to React Query for client-side data fetching as per project requirements. This provides better caching, background updates, and optimistic updates for real-time features.

## Contributing

Please follow the established code patterns and ensure all new features include proper TypeScript types and error handling.
