require("html-loader!../html/serve.html");
import '../scss/serve.scss';
import $ from 'jquery';
import io from 'socket.io-client';

$(document).ready(() => {
  const socket = io("http://localhost:8000");
  socket.on('connect', () => {
    $("#log").text("Connected to server! Please stand by while we wait to match someone with you.")
  });
  socket.on('disconnect', () => {
    $("#log").text("Error: disconnected from server");
  });
});
