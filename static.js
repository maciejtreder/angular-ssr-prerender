const express = require('express');

const app = express();

app.get('*.*', express.static('./dist/angular-ssr-prerender'));
app.get('**', (req,res) => {res.sendFile('index.html', {root: __dirname + '/dist/angular-ssr-prerender'})});

console.log('Listening on localhost:8080');
app.listen(8080);