import express, { urlencoded } from 'express';
import helmet from 'helmet';
import { mainRouter } from './routers'
import 'dotenv/config';
import passport from 'passport';
import { notFoundRequest } from './routers/notFoundRequest';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(urlencoded({ extended: true}));

app.use(passport.initialize());

app.use("/", mainRouter);
app.use(notFoundRequest)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});