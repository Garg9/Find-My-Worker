// const app = require('../app');
// const serverless = require('serverless-http');

// module.exports = serverless(app);

const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  // Set the path to your 'views' folder
  const viewsDir = path.join(__dirname, '..', 'views');

  // Render the 'index.ejs' file
  ejs.renderFile(path.join(viewsDir, 'index.ejs'), {}, (err, html) => {
    if (err) {
      res.status(500).send('Error rendering the page');
    } else {
      res.status(200).send(html);
    }
  });
};

// const serverless = require('serverless-http');
// const express = require('express');
// const path = require('path');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../views'));

// // Home
// app.get('/', (req, res) => {
//   res.render('index');
// });

// // Client login
// app.get('/client/login', (req, res) => {
//   res.render('client/clientlogin');
// });

// // Admin login
// app.get('/admin/login', (req, res) => {
//   res.render('admin/admin_login');
// });

// // Worker login
// app.get('/worker/login', (req, res) => {
//   res.render('worker/workerlogin');
// });

// module.exports = serverless(app);

// const serverless = require('serverless-http');
// const express = require('express');
// const path = require('path');

// const app = express();

// // Setup EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../views'));

// // Routes
// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/admin/login', (req, res) => {
//   res.render('admin/admin_login');
// });

// app.get('/client/login', (req, res) => {
//   res.render('client/clientlogin');
// });

// app.get('/worker/login', (req, res) => {
//   res.render('worker/workerlogin');
// });

// // Export for serverless
// module.exports = serverless(app);

// const serverless = require('serverless-http');
// const express = require('express');
// const path = require('path');

// const app = express();

// // Set up EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../views'));

// // Simple index route
// app.get('/', (req, res) => {
//   res.render('index'); // Rendering the index.ejs file
// });

// Export for serverless
module.exports = serverless(app);


