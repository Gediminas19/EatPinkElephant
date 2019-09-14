require("html-loader!../html/status.html");
import $ from 'jquery';
import '../scss/status.scss';

$('#status').click(function () {
  CheckOrder(document.getElementById('orderbox').value)
})

function CheckOrder(id) {
  var h = new XMLHttpRequest();
  var url = " http://localhost/checkorder";
  h.open("POST", url, true);
  h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  h.send(JSON.stringify({ orderid: id}));
  h.onreadystatechange = function (res) {
    if (h.readyState == 4 && h.status == 200) {
      console.log(h.responseText)
    }
  };
}