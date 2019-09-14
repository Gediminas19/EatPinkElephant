require("html-loader!../html/serve.html");
import '../scss/serve.scss';
import $ from 'jquery';
import {getCookie, setCookie} from './modules/cookies.js';
import io from 'socket.io-client';

const ERROR = -1;
const WAITING = 0;
const CHOOSING = 1;
const DELIVERING = 2;

let state = ERROR;
let courier_id = null;
let order_id = null;

const acceptRequest = function () {
  var h = new XMLHttpRequest();
  var url = " /acceptorder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.send(JSON.stringify({ orderid: order_id, courierid: courier_id}));
  h.onreadystatechange = function (res) {
      if (h.readyState == 4 && h.status == 200) {
          $("#log").text(h.responseText);
      } else {
        $("#log").text("Error, check log for more info");
      }
      $(".servechoose").css("display", "none");
  };
};

const declineRequest = function () {
  var h = new XMLHttpRequest();
  var url = " /declineorder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.send(JSON.stringify({ orderid: order_id, courierid: courier_id}));
  h.onreadystatechange = function (res) {
      if (h.readyState == 4 && h.status == 200) {
          $("#log").text(h.responseText);
      } else {
        $("#log").text("Error, check log for more info");
      }
      $(".servechoose").css("display", "none");
  };
};

$("#chooseyes").click(acceptRequest);
$("#chooseno").click(declineRequest);

$("#confirmyes").click(function() {

});

$("#confirmno").click(function() {

});

$(document).ready(() => {
  courier_id = getCookie("userid");
  const socket = io("/");
  socket.on('connect', () => {
    $("#log").text("Connected to server! Please stand by while we wait to match someone with you.")
    state = WAITING;
  });

  socket.on('disconnect', () => {
    $("#log").text("Error: disconnected from server");
  });

  socket.on('job_request', function(data) {
    console.log(data);
    if (state == WAITING) {
      $(".servechoose").css("display", "block");

      var order = data['order'];
      order_id = order['orderid'];
      console.log(order_id)

      $("#log").html("<p>You've recieved a job request! The details are as follows:</p>" +
        "<p><span class='serveview-log--highlight'>Restaraunt:&nbsp;</span>" + order['storename'] + "</p>"+
        "<p><span class='serveview-log--highlight'>Food:&nbsp;</span>" + order['foodname'] + "</p>"+
        "<p><span class='serveview-log--highlight'>For User:&nbsp;</span>" + order['userid'] + "</p>");
    } else {
      declineRequest();
    }
  });
});
