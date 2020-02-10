import cors from 'cors';
import express from 'express';
import consign from 'consign';

const app = express();

app.use(cors());
// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('seeders/seeders.js')
  .into(app)