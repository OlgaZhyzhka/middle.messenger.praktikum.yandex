import express from 'express';
import { config } from 'dotenv';
import { dirname, join, resolve } from 'path';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const app = express();
const port = process.env.PORT || 3000;

const publicPath = resolve(__dirname, './dist');

app.use(express.static(publicPath));

app.get('*', (_, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
