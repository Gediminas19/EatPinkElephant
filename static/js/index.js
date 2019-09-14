require("html-loader!../html/index.html");
import '../scss/index.scss';
import $ from 'jquery';

window.onload = function() {
  console.log("loaded!");
}
$(".header-righticon").click(function() {
  if($(".header-menuexpand").css("display") == "none") {
    $(".header-menuexpand").css("display", "flex");
  } else {
    $(".header-menuexpand").css("display", "none");
  }
});
