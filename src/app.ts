import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import mapRouter from './routes/mapRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/map', mapRouter);

app.use((_, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: any, req: Request, res: Response) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
