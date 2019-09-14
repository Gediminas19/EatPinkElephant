const path = require("path");
const express = require('express');
const app = express();
const PORT = 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var orders = {};
var users = {};

var order_id = 0;

const STATIC_ROOT = path.resolve('./static/dist');
app.use(express.static(STATIC_ROOT));

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

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
