const path = require("path");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const favicon = require('serve-favicon');


var orders = {};
var users = {};

var order_id = 0;

const STATIC_ROOT = path.resolve('./static/dist');
app.use(express.static(STATIC_ROOT));
app.use(favicon(path.join(STATIC_ROOT, 'favicon.ico')));

app.get('/', function(req, res) {
    res.sendFile('./index.html', {root: STATIC_ROOT});
});

app.post('/neworder', function (req, res) {
    orders[order_id] = req.body;
    res.send("Your order ID is: " + order_id);
    order_id += 1;
});

app.post('/checkorder', function (req, res) {
    res.send("You requested to check order ID: " + req.body['orderid'] + ", which is " + JSON.stringify(orders[req.body['orderid']]));
});

app.post('/acceptorder', function (req, res) {
    orders[req.body['orderid']]['status'] = "ACCEPTED";
    orders[req.body['orderid']]['courierid'] = req.body['courierid'];
    res.send("You have accepted order " + JSON.stringify(orders[req.body['orderid']]));
});

app.post('/arrived', function (req, res) {
    if (orders[req.body['orderid']]['courierid'] == req.body['courierid']) {
        orders[req.body['orderid']]['status'] = "ARRIVED";
        res.send('Your order ' + JSON.stringify(orders[req.body['orderid']]) + ' has arrived.');
    } else {
      res.send('You are not authorized to make this change');
    }
});

app.post('/delivered', function (req, res) {
    if (orders[req.body['orderid']]['userid'] == req.body['userid']) {
        orders[req.body['orderid']]['status'] = "DELIVERED"
        res.send('Your are confirming that your order ' + JSON.stringify(orders[req.body['orderid']]) + ' has been delivered.');
    } else {
      res.send('You are not authorized to make this change');
    }
});

io.on('connection', client => {
  console.log("Got connection");
  client.on('disconnect', () => console.log("lost connection"));
});
//app.listen(PORT, () => console.log(`listening on port ${PORT}`));
server.listen(PORT);
console.log(`listening on port ${PORT}`);
