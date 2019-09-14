require("html-loader!../html/status.html");
import $ from 'jquery';
import '../scss/status.scss';

$("#checkorder").submit(function( event ) {
  CheckOrder(document.getElementById('orderid').value)
  event.preventDefault()
});

function CheckOrder(id) {
  var h = new XMLHttpRequest();
  var url = " /checkorder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.setRequestHeader('Access-Control-Allow-Origin' , '*');
  h.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  h.send(JSON.stringify({ orderid: id}));
  h.onreadystatechange = function (res) {
    if (h.readyState == 4 && h.status == 200) {
      console.log(h.responseText)
    }
  };
}