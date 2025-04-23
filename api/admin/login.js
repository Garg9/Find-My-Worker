const path = require('path');
const ejs = require('ejs');

module.exports = (req, res) => {
  const viewsDir = path.join(__dirname, '../../views/admin');
  const filePath = path.join(viewsDir, 'admin_login.ejs');

  ejs.renderFile(filePath, {}, {}, (err, str) => {
    if (err) {
      res.status(500).send('Error rendering admin login page');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(str);
    }
  });
};
