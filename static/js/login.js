require("html-loader!../html/login.html");
import '../scss/login.scss';
import $ from 'jquery';
import {getCookie, setCookie} from './modules/cookies.js';

$("#submitbutton").click(function() {
  let userid = document.getElementById('userid').value;
  if (!userid) {
    $("#log").addClass("loginform-log--error");
    $("#log").text("Error: You must provide a User ID to log in.");
  } else {
    $("#log").removeClass("loginform-log--error");
    setCookie("userid", userid, 1);
    $("#log").text(`Successfully set User ID to "${userid}"!`);
  }
});

$(document).ready(function() {
  const current_user = getCookie("userid");
  if (current_user) {
    $("#log").text(`You are currently logged in as ${current_user}.`);
  }
});
