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
    Login(userid)
  }
});

function Login(user_id) {
  var h = new XMLHttpRequest();
  var url = " /login";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.send(JSON.stringify(
    { userid: user_id }));
  h.onreadystatechange = function (res) {
      if (h.readyState == 4 && h.status == 200) {
          console.log(h.responseText)
      }
  };
}

$(document).ready(function() {
  const current_user = getCookie("userid");
  if (current_user) {
    $("#log").text(`You are currently logged in as ${current_user}.`);
  }
});
