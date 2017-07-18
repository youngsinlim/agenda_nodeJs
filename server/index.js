const http = require('http'),
  path = require('path'),
  LoginRouting = require('./ruta_login.js'),
  EventRouting = require('./ruta_events.js'),
  express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const PORT = 3000;
const app = express();

app.use(session({
  secret: "agendanodejs"
}));

const Server = http.createServer(app);

mongoose.connect('mongodb://localhost/agenda')


app.use(express.static('../client/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/', LoginRouting)
app.use('/events', EventRouting)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
