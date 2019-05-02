require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

const port = process.env.PORT || 3000;


// const staticPath = `${__dirname}/../public`;
// console.log(staticPath);

// app.use('/band/:id', express.static(staticPath));
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));


const mediaPlayer = {
  target: 'http://ec2-52-70-127-56.compute-1.amazonaws.com:3002',
  changeOrigin: true,
};
const mediaPlayerProxy = proxy(mediaPlayer);
app.use('/:id', mediaPlayerProxy)


app.listen(port, () => {
  console.log(`server running at: http://ec2-18-206-120-71.compute-1.amazonaws.com:${port}`);
});