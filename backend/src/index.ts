import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import apiRoutes from './routes';

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const app = express();
    dotenv.config();

    // Middleware
    app.use(helmet());
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    app.use(express.json());

    app.use('/api', apiRoutes);

    const port = process.env.BACKEND_PORT || 8080;
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};

main();
