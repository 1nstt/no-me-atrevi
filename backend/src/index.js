import express from 'express';
import CardsRoutes from './routes/cards.routes.js';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cards', CardsRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Cards API',
  });
}
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});