import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Health check endpoint (can be kept outside of the main routes)
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'api', time: new Date().toISOString() });
});

const port = process.env.BACKEND_PORT || 8080;

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
