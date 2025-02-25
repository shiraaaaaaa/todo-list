import path from 'path'

import express from 'express'
import proxy from 'express-http-proxy'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', proxy(process.env.SERVER_URL!));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});