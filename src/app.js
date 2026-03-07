import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.route.js'
import authRoutes from './routes/auth.route.js';

const app = express();

app.use(morgan('combined'));
app.use(express.json());

app.use('/api/users/', usersRoutes)
app.use('/api/login', authRoutes)

export default app;
