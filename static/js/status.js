require("html-loader!../html/status.html");
import $ from 'jquery';
import '../scss/status.scss';
import {getCookie, setCookie} from './modules/cookies.js';

$("#checkorder").submit(function( event ) {
  CheckOrder(getCookie("userid"))
  event.preventDefault()
});

function CheckOrder(user_id) {
  var h = new XMLHttpRequest();
  var url = " /checkorder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.setRequestHeader('Access-Control-Allow-Origin' , '*');
  h.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  h.send(JSON.stringify({ userid: user_id}));
  h.onreadystatechange = function (res) {
    if (h.readyState == 4 && h.status == 200) {
      console.log(h.responseText)
      $("#OrdersMade").text(JSON.stringify(JSON.parse(h.responseText)['ordersmade']))
      $("#OrdersAccepted").text(JSON.stringify(JSON.parse(h.responseText)['ordersaccepted']))
    }
  };
}