var videoSpeed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate;
var counter = 0.25;

var NewButton1 = document.createElement("button");
NewButton1.style.backgroundColor = 'red';
NewButton1.style.margin = "10px";
NewButton1.style.height = "25px";
NewButton1.style.width = "55px";
NewButton1.style.color = "white";
NewButton1.classList.add('video-control1');
NewButton1.textContent = "slow";
NewButton1.addEventListener('click', function (event) {
  document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = (videoSpeed-counter);
  videoSpeed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate;
});

document.getElementById(`flex`).appendChild(NewButton1);


var NewButton2 = document.createElement("button");
NewButton2.style.backgroundColor = 'black';
NewButton2.style.margin = "10px";
NewButton2.style.height = "25px";
NewButton2.style.width = "55px";
NewButton2.style.color = "white";
NewButton2.textContent = "normal";
NewButton2.classList.add('video-control2');
NewButton2.addEventListener('click', function (event) {
  document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 1.0
  videoSpeed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate;;
});

document.getElementById(`flex`).appendChild(NewButton2);

var NewButton3 = document.createElement("button");
NewButton3.style.backgroundColor = 'green';
NewButton3.style.margin = "10px";
NewButton3.style.height = "25px";
NewButton3.style.width = "55px";
NewButton3.style.color = "white";
NewButton3.textContent = "fast";
NewButton3.classList.add('video-control3');
NewButton3.addEventListener('click', function (event) {
  document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = (videoSpeed+counter)
  videoSpeed = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate;;
});

document.getElementById(`flex`).appendChild(NewButton3);