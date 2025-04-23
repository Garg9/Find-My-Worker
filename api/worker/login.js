const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const viewsDir = path.join(__dirname, '..', '..', 'views', 'worker');

  const filePath = path.join(viewsDir, 'workerlogin.ejs');

  ejs.renderFile(filePath, {}, (err, html) => {
    if (err) {
      console.error('Error rendering EJS:', err);
      res.status(500).send('Error rendering worker login page');
    } else {
      res.status(200).send(html);
    }
  });
};
