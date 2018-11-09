const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();

const port = 3000;
const publicDir = path.join(__dirname, 'public');

const options = {
  target: 'http://localhost:3000',
  changeOrigin: true,
  router: {
    '/api': 'http://localhost:3001',
    '/rooms': 'http://localhost:3002',
    '/listings': 'http://localhost:1128',
  },
};

const apiProxy = proxy(options);

app.use('/api', apiProxy);
app.use('/rooms', apiProxy);
app.use('/listings', apiProxy);

app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
