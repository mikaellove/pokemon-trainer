const express = require('express');
const app = express();
const packageJson = require('./package.json')

// Middleware
app.use(requireHTTPS);
app.use(express.static('./dist/' + packageJson.name));

// Redirect app request to index.html
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/' + packageJson.name});
});

// Start server
app.listen(process.env.PORT || 8080, () => console.log('Server started...'));

/**
 * @author: Klement Omeri
 * Special thanks to Klement for providing the function to redirect traffic from http to https
 */
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
