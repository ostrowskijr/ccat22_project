import express from 'express';
import router from '../../routers';

const app = express();
const PORT = process.env.PORT || 3000;

export default function startServer() {
  
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}