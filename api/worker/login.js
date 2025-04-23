const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const viewsPath = path.join(__dirname, '..', '..', 'views', 'worker');
  const filePath = path.join(viewsPath, 'workerlogin.ejs');

  // Define errMsg (example: could come from query params, session, or logic)
  const errMsg = req.query.error || null; // Example: get from query string

  ejs.renderFile(filePath, { errMsg }, (err, html) => {
    if (err) {
      console.error('❌ Error rendering worker login page:', err);
      res.status(500).send(`Error rendering worker login page: ${err.message}`);
    } else {
      res.status(200).send(html);
    }
  });
};
