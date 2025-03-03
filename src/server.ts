import express, { urlencoded } from 'express';
import helmet from 'helmet';
import { mainRouter } from './routers'

const app = express();
app.use(express.json());
app.use(helmet());
app.use(urlencoded({ extended: true}));
app.use(mainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});