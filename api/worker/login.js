const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const viewsPath = path.join(__dirname, '..', '..', 'views', 'worker');
  const filePath = path.join(viewsPath, 'workerlogin.ejs');

  console.log("Attempting to render:", filePath); // Logs to Vercel
  ejs.renderFile(filePath, {}, (err, html) => {
    if (err) {
      console.error('❌ EJS Render Error:', err);
      res.status(500).send('Error rendering worker login page');
    } else {
      res.status(200).send(html);
    }
  });
};
