const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const viewsPath = path.join(__dirname, '..', '..', 'views', 'worker');
  const filePath = path.join(viewsPath, 'workerlogin.ejs');

  ejs.renderFile(filePath, {}, (err, html) => {
    if (err) {
      console.error('❌ Error rendering worker login page:', err);
      res.status(500).send('Error rendering worker login page');
    } else {
      res.status(200).send(html);
    }
  });
};
