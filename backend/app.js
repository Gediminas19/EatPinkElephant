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


function onConnect(socket) {
    console.log("Got connection");
    socket.on('disconnect', () => console.log("lost connection"));

    // socket.on("")
}

app.post('/login', function (req, res) {    
    if (users[req.body['userid']] == null) {
        users[req.body['userid']] = {points: 5, location: "doghouse", orders_made: [], orders_accepted: []}
    }
    res.send(users[req.body['userid']])
})

app.post('/neworder', function (req, res) {
    orders[order_id] = req.body;
    users[req.body['userid']]['orders_made'].push(order_id)
    res.send("Your order ID is: " + order_id);
    order_id += 1;
});

app.post('/checkorder', function (req, res) {
    var orders_made = []
    for (orderid in users[req.body['userid']]['orders_made']) {
        orders_made.push(orders[orderid])
    }
    var orders_accepted = []
    for (orderid in users[req.body['userid']]['orders_accepted']) {
        orders_accepted.push(orders[orderid])
    }
    res.send(JSON.stringify({ordersmade: orders_made, ordersaccepted: orders_accepted}))
});

app.post('/acceptorder', function (req, res) {
    orders[req.body['orderid']]['status'] = "ACCEPTED";
    orders[req.body['orderid']]['courierid'] = req.body['courierid'];
    users[req.body['courierid']]['orders_accepted'].push(req.body['orderid'])
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

io.on('connection', onConnect);
//app.listen(PORT, () => console.log(`listening on port ${PORT}`));
server.listen(PORT);
console.log(`listening on port ${PORT}`);
