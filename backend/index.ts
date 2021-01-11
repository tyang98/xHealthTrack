import * as express from 'express';

const app = express();

app.get('/home', function (req, res) {
  res.send('Welcome home!');
});

// example using path parameters
app.get('/users/:name/:lname', function (req, res) {
  res.send('Hello ' + req.params.name + ' ' + req.params.lname);
});

// example using query parameters
app.get('/users', function (req, res) {
  res.send('Hello ' + req.query.name + ' ' + req.query.lname);
});

// tell express to listen for requests on port 8080
app.listen(8080, function () {
  console.log('server started');
});