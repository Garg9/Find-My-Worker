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

  // Extract the view name from the URL (without the leading "/")
  const viewName = req.path.slice(1); // E.g., '/admin_login' -> 'admin_login'

  // List of valid views to prevent unexpected paths
  const validViews = ['index', 'admin/admin_login', 'client/clientlogin', 'worker/workerlogin'];

  // Check if the view is valid
  if (validViews.includes(viewName)) {
    // Render the corresponding EJS file
    ejs.renderFile(path.join(viewsDir, `${viewName}.ejs`), {}, (err, html) => {
      if (err) {
        console.error(err); // Log the error to Vercel logs
        res.status(500).send('Error rendering the page');
      } else {
        res.status(200).send(html);
      }
    });
  } else {
    // If the view is not valid, send a 404 error
    res.status(404).send('Page Not Found');
  }
};





