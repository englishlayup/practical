function toggleSpec() {
  var stoggle = document.getElementById("spec-toggle");
  var sw = stoggle.getElementsByTagName("li");
  for (var i = 0; i < sw.length; i++) {
    sw[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("hd-active");
      current[0].className = current[0].className.replace("hd-active", "");
      this.className += "hd-active";
    });
  }
}

function togglediv1(show, hide) {
  var div1 = document.getElementsByClassName(show);
  var div2 = document.getElementsByClassName(hide);
  div2[0].classList.add("hd-sec-hidden");
  div1[0].className = div1[0].className.replace(" hd-sec-hidden", "");
}

function changeA(eff, clss) {
  var div = document.getElementById("color");
  div.style.animation = eff;
  div.className = "";
  div.className = clss;
}

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }

  function compareImages(img) {
    var slider, img, clicked = 0,
      w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";
    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }

    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

function hoverEco() {
  var eco = document.getElementsByClassName("img-comp-container");
  eco[0].addEventListener("mouseover", function () {
    var labels = eco[0].getElementsByClassName("label");
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.opacity = "1";
    }
  });
  eco[0].addEventListener("mouseout", function () {
    var labels = eco[0].getElementsByClassName("label");
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.opacity = "0";
    }
  });
}

function changePos(pos) {
  var drag = document.getElementById("dragger");
  drag.className = '';
  // window.alert(pos);
  drag.className += "pos" + pos;
  var div = document.getElementById("asus-audio");
  var component = div.getElementsByTagName("li");
  var current = document.getElementsByClassName("audio-active");
  current[0].className = current[0].className.replace("audio-active", "");
  component[pos].classList.add("audio-active");
}

function validate() {
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var noti = document.getElementById("contact").getElementsByTagName("span");
  var flag1;
  var flag2;
  if(email.value.match("^[a-zA-z0-9]+[@][a-zA-z]+[.][a-zA-Z]+([.][a-zA-Z]+)?$") == null){
    noti[0].style.display = "inline";
    // email.focus();
    email.style.border = "5px solid #ad0202";
    flag1 = 0;
  }
  else{ 
    noti[0].style.display="none";
    email.style.border = "none";
    flag1 = 1;
  }
  if(phone.value.match("^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$") == null){
    noti[1].style.display = "inline";
    // phone.focus();
    phone.style.border = "5px solid #ad0202";
    flag2 = 0;
  }
  else{ 
    noti[1].style.display="none";
    phone.style.border = "none"; 
    flag2 = 1;
  }
  if(flag1*flag2 == 0){ 
    colorWhite();
    return false;
  }
  else{
    colorRed(); 
    return true
  };
}

function scrollToDiv(to){
  var des = document.getElementById(to); 
  window.scroll({
    top: des.offsetTop + 25, 
    left: 0, 
    behavior: 'smooth' 
  });
}

function colorRed() {
  var increase = 0;
  var decrease = 100; 
  var bttn = document.getElementById("send-bttn");
  var loop = setInterval(function() {
    increase += 15;
    decrease -= 15;
    bttn.style.color = "white";
    // bttn.style.background = "linear-gradient(to right,#ad0202 50%, white 50%)";
    bttn.style.background = "linear-gradient(to right,#ad0202 " + increase + "px, white " + decrease + "px)";
    if(increase > 300){
      clearInterval(loop);
    }
  }, 50);
}

function colorWhite() {
  var bttn = document.getElementById("send-bttn");
  bttn.style.color ="#ad0202";
  bttn.style.background = "white";
}

function toggleOpacity(){
  var arr = document.getElementById("light-mode").getElementsByTagName("li");
  // window.alert(arr.length);
  for(var i = 0; i < arr.length; i++){
    arr[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("light-active");
      current[0].className = current[0].className.replace("light-active", "");
      this.className += "light-active";
    });
  }
}

function backtoTopBttn(){
  window.onscroll = function() {
    displayTopBttn()
  };

  function displayTopBttn() {
    var spec = document.getElementById("spec");
    // window.alert("Body scroll top: " +document.body.scrollTop);
    // window.alert("Spec offset top: " +spec.offsetTop);
    if(document.body.scrollTop > spec.offsetTop || document.documentElement.scrollTop > spec.offsetTop) {
      document.getElementById("backtoTop").style.opacity = "1";
    }
    else {
      document.getElementById("backtoTop").style.opacity = "0";
    }
  }
}

function toTop(){
  var y = window.scrollY;
  y = y - 50;
  window.scrollTo(0,y);
  if(y > 0) {
    var t = setTimeout("toTop()", 10);
  }
  else {
    clearTimeout(t);
  }
}