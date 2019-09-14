require("html-loader!../html/serve.html");
import '../scss/serve.scss';
import $ from 'jquery';
import io from 'socket.io-client';

const ERROR = -1;
const WAITING = 0;
const CHOOSING = 1;
const DELIVERING = 2;

let state = ERROR;

const acceptRequest = function () {

};

const declineRequest = function () {

};

$("#chooseyes").click(function() {

});

$("#chooseno").click(function() {

});

$("#confirmyes").click(function() {

});

$("#confirmno").click(function() {

});

$(document).ready(() => {
  const socket = io("http://localhost:8000");
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

      $("#log").html("<p>You've recieved a job request! The details are as follows:</p>" +
        "<p><span class='serveview-log--highlight'>Restaraunt:&nbsp;</span>" + order['storename'] + "</p>"+
        "<p><span class='serveview-log--highlight'>Food:&nbsp;</span>" + order['foodname'] + "</p>"+
        "<p><span class='serveview-log--highlight'>For User:&nbsp;</span>" + order['userid'] + "</p>");
    } else {
      declineRequest();
    }
  });
});
