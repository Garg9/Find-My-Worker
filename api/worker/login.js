const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const viewsDir = path.join(__dirname, '..', '..', 'views', 'worker');

  ejs.renderFile(path.join(viewsDir, 'workerlogin.ejs'), {}, (err, html) => {
    if (err) {
      console.error("EJS Render Error:", err);  // Helpful debug
      res.status(500).send('Error rendering worker login page');
    } else {
      res.status(200).send(html);
    }
  });
};
