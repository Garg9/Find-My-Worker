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
