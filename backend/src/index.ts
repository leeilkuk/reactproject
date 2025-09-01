import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    ok: true,
    service: 'api',
    time: new Date().toISOString(),
  });
});

const users = [{ id: 1, name: 'Alice' }];

app.get('/api/v1/users', (req: Request, res: Response) => {
  res.json(users);
});

const port = process.env.BACKEND_PORT || 8080;

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
