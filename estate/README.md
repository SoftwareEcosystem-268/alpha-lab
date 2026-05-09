# Real Estate Application

A full-stack real estate listing application built with Nest.js, React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🏠 Property listing with grid layout
- 🔍 Filter properties by type (sale/rent)
- 📄 Detailed property view page
- ➕ Add new properties through a form
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔗 RESTful API with Nest.js
- 💾 SQLite database with TypeORM

## Tech Stack

### Backend
- **Nest.js** - Progressive Node.js framework
- **TypeORM** - ORM for database operations
- **SQLite** - Lightweight database
- **class-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Project Structure

```
/
├── backend/                 # Nest.js backend
│   ├── src/
│   │   ├── entities/       # Database entities
│   │   ├── dto/            # Data transfer objects
│   │   ├── property/       # Property module (controller, service)
│   │   ├── seeds/          # Database seed scripts
│   │   ├── app.module.ts   # Root module
│   │   └── main.ts         # Application entry point
│   └── real_estate.db      # SQLite database
│
└── frontend/               # React frontend
    ├── src/
    │   ├── pages/         # Page components
    │   ├── services/      # API service layer
    │   ├── types/         # TypeScript types
    │   └── App.tsx        # Root component with routing
    └── index.html
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd Arty_241_API
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run start:dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Database Seeding (Optional)

The database is automatically seeded with sample properties on first run. To re-seed:

```bash
cd backend
npx ts-node src/seeds/seed.ts
```

## API Endpoints

### Properties
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get property by ID
- `GET /properties/featured` - Get featured properties
- `GET /properties/type/:type` - Get properties by type (sale/rent)
- `POST /properties` - Create a new property
- `PUT /properties/:id` - Update a property
- `DELETE /properties/:id` - Delete a property

### Property Schema

```typescript
{
  id: number;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  type: 'sale' | 'rent';
  imageUrl: string;
  featured: boolean;
  createdAt: Date;
}
```

## Application Features

### Property Listing Page
- Grid layout displaying all properties
- Filter buttons: All, For Sale, For Rent
- Property cards with image, price, details
- Responsive design (1-3 columns based on screen size)

### Property Detail Page
- Full property information display
- High-quality hero image
- Bedrooms, bathrooms, and area stats
- Contact Agent and Schedule Tour buttons
- Back navigation

### Add Property Form
- Complete form for creating new listings
- Input validation
- Sale/Rent type selection
- Featured property checkbox
- Form resets after successful submission

## Development

### Backend Development
```bash
cd backend
npm run start:dev    # Start with hot-reload
npm run build        # Build for production
npm run start:prod   # Start production build
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Customization

### Changing the API URL
Edit `frontend/src/services/propertyService.ts`:
```typescript
const API_URL = 'http://your-backend-url:port/properties';
```

### Updating CORS Settings
Edit `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://your-frontend-url:port',
  credentials: true,
});
```

### Changing the Database
Edit `backend/src/app.module.ts` to use PostgreSQL or MySQL instead of SQLite:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres', // or 'mysql'
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'real_estate',
  entities: [Property],
  synchronize: true,
}),
```

## License

This project is open source and available under the MIT License.
