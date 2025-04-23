const ejs = require('ejs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'views', 'worker', 'workerlogin.ejs');
  console.log('Attempting to render:', filePath);
  
  ejs.renderFile(filePath, {}, (err, html) => {
    if (err) {
      console.error('EJS Error:', err.message, err.stack);
      res.status(500).send(`Error: ${err.message}`);
    } else {
      res.status(200).send(html);
    }
  });
};
