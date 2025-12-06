// src/server.ts
import express from 'express';
import cors from 'cors';
import tripRoutes from './routes/trip';
import authRoutes from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());

// Trip routes
app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log(`Server is up and running`);
});
