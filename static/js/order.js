require("html-loader!../html/order.html");
import '../scss/order.scss';
import $ from 'jquery';
import {getCookie, setCookie} from './modules/cookies.js';

$("#restbutton").click(function() {
  let restid = document.getElementById('restid').value;
  if (!restid) {
    $("#order").addClass("orderform-rest--error");
    $("#order").text("Error: You must provide a resturaunt.");
  } else {
    $("#order").removeClass("orderform-rest--error");
    setCookie("order", order, 1);
    $("#order").text(`Successfully set resturaunt to "${restid}"!`);
  }
});

$(document).ready(function() {
  const current_rest = getCookie("restid");
  if (current_rest) {
    $("#order").text(`You have selected ${current_rest}.`);
  }
});

$("#orderbutton").click(function() {
  let orderid = document.getElementById('orderid').value;
  if (!orderid) {
    $("#order").addClass("orderform-order--error");
    $("#order").text("Error: You must provide an order.");
  } else {
    $("#order").removeClass("orderform-order--error");
    setCookie("order", order, 1);
    $("#order").text(`Successfully set order to "${orderid}"!`);
  }
});

$(document).ready(function() {
  const current_order = getCookie("orderid");
  if (current_order) {
    $("#order").text(`Your order is ${current_order}.`);
  }
});

$("#destbutton").click(function() {
  let destid = document.getElementById('destid').value;
  if (!destid) {
    $("#order").addClass("orderform-dest--error");
    $("#order").text("Error: You must provide an destination.");
  } else {
    $("#order").removeClass("orderform-dest--error");
    setCookie("order", order, 1);
    $("#order").text(`Successfully set destination to "${destid}"!`);
  }
});

$(document).ready(function() {
  const current_dest = getCookie("destid");
  if (current_dest) {
    $("#order").text(`Your order will be delivered to ${current_dest}.`);
  }
});

$("#neworder").submit(function( event ) {
  NewOrder(getCookie("userid"), document.getElementById('restid').value, document.getElementById('orderid').value, document.getElementById('destid').value)
  event.preventDefault();
});

function NewOrder(user_id, store_name, food_name, dest_name) {
  var h = new XMLHttpRequest();
  var url = " /neworder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.send(JSON.stringify(
    { userid: user_id, courierid: '', storename: store_name, foodname: food_name, destname: dest_name, status: "PENDING"}));
  h.onreadystatechange = function (res) {
      if (h.readyState == 4 && h.status == 200) {
          console.log(h.responseText)
      }
  };
}