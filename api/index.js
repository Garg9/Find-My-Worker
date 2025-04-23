// const app = require('../app');
// const serverless = require('serverless-http');

// module.exports = serverless(app);

// const ejs = require('ejs');
// const path = require('path');

// module.exports = (req, res) => {
//   // Set the path to your 'views' folder
//   const viewsDir = path.join(__dirname, '..', 'views');

//   // Render the 'index.ejs' file
//   ejs.renderFile(path.join(viewsDir, 'index.ejs'), {}, (err, html) => {
//     if (err) {
//       res.status(500).send('Error rendering the page');
//     } else {
//       res.status(200).send(html);
//     }
//   });
// };

const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  // Set the path to your 'views' folder
  const viewsDir = path.join(__dirname, '..', 'views');

  // Extract view name from the URL
  const viewName = req.path.slice(1); // This removes the leading '/'
  
  // List of allowed views
  const validViews = ['index', 'admin/admin_login', 'client/clientlogin', 'worker/workerlogin'];

  if (validViews.includes(viewName)) {
    // Render the specific view (e.g., index.ejs, admin/admin_login.ejs)
    ejs.renderFile(path.join(viewsDir, `${viewName}.ejs`), {}, (err, html) => {
      if (err) {
        res.status(500).send('Error rendering the page');
      } else {
        res.status(200).send(html);
      }
    });
  } else {
    // If view is invalid, return a 404
    res.status(404).send('Page Not Found');
  }
};




