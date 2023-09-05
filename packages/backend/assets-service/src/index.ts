import express from 'express';
import { join } from 'path';

const app = express();
const port = 5000;

app.use('/sprites', express.static(join(__dirname, '..', 'pokeapi-sprites', 'sprites')));

app.listen(port, () => {
  console.log(`Assets Service listening on port ${port}.`);
});
