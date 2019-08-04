import cors from 'cors';
import express from 'express';
import consign from 'consign';

const app = express();

app.use(cors());
// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app);