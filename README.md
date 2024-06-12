# Real Estate Agency

This project is a web application for a real estate agency that displays properties and includes a dashboard for adding new properties. The application is built with Next.js, TypeScript, Next-Auth for authentication, Docker for containerization, PostgreSQL for the database, and Prisma as the ORM.
View the live demo: [Real Estate Agency Demo](https://real-estate-dashboard-eight.vercel.app/)

## Features

- Display properties with detailed information
- Dashboard for adding new properties
- User authentication with Next-Auth
- Containerized with Docker
- Uses PostgreSQL and Prisma for database management

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next-Auth](https://next-auth.js.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## Getting Started

### Prerequisites

- Docker
- Node.js

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/real-estate-agency.git
   cd real-estate-agency
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   POSTGRES_URL="postgresql://user:*****@localhost:5432/real_estate"
   POSTGRES_PASSWORD=*****
   NEXTAUTH_SECRET=your_secret_key
   EDGE_STORE_ACCESS_KEY= generate at edgestore.dev
   EDGE_STORE_SECRET_KEY= generate at edgestore.dev
   ```

4. Run the Docker containers:

   ```sh
   docker-compose up
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding New Properties

1. Log in to the dashboard using your credentials.
2. Navigate to the "Add Property" section.
3. Fill in the property details and submit the form.
4. The new property will be displayed on the main properties page.
