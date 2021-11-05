function mainfunc() {
	const yPlayer = document.querySelector('.video-stream.html5-main-video')
	let videoSpeed = yPlayer.playbackRate;
	// let videoSpeed = localStorage.getItem('youTubeVideoSpeed') === null ? yPlayer.playbackRate : localStorage.getItem('youTubeVideoSpeed');
	const counter = 0.25;

	const divSpeedCounter = document.createElement("div");
	divSpeedCounter.style.margin = "10px";
	divSpeedCounter.style.height = "25px";
	divSpeedCounter.style.width = "55px";
	divSpeedCounter.style.fontSize = "20px"
	divSpeedCounter.textContent = document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate;
	divSpeedCounter.classList.add('video-counter');

	document.getElementById(`flex`).appendChild(divSpeedCounter);

	function elementCreator(elementType, backgroundColor, elemText, elemClass) {
		element = document.createElement(elementType);
		element.classList.add(elemClass);
		element.textContent = elemText;
		element.style.backgroundColor = backgroundColor;
		element.style.cssText += 'margin: 10px; height: 25px; width: 55px; color: white;';
		return element
	}

	const ButtonSlow = elementCreator("button", "red", "slow", "video-control1")

	ButtonSlow.addEventListener('click', function (event) {
		changeVideoSpeed('down')
	});

	document.getElementById(`flex`).appendChild(ButtonSlow);

	const ButtonNormal = elementCreator("button", "black", "normal", "video-control2")

	ButtonNormal.addEventListener('click', function (event) {
		changeVideoSpeed('normal')
	});

	document.getElementById(`flex`).appendChild(ButtonNormal);

	const ButtonFast = elementCreator("button", "green", "fast", "video-control3")

	ButtonFast.addEventListener('click', function (event) {
		changeVideoSpeed('up')
	});
	document.getElementById(`flex`).appendChild(ButtonFast);

	if (localStorage.getItem('youTubeVideoSpeed')) { // Иницилизация, чтение скорости из локального хранилища
		videoSpeed = localStorage.getItem('youTubeVideoSpeed')
		divSpeedCounter.innerHTML = videoSpeed;
	};

	function changeVideoSpeed(upOrDown) {
		switch (upOrDown) {
			case 'up':
				videoSpeed = (videoSpeed + counter);
				break
			case 'down':
				videoSpeed = (videoSpeed - counter);
				break
			case 'normal':
				videoSpeed = 1.0;
				break
		}
		yPlayer.playbackRate = videoSpeed;
		localStorage.setItem('youTubeVideoSpeed', videoSpeed);
		divSpeedCounter.innerHTML = videoSpeed;
	}

	function autoUpdateVideoSpeed() {
		if (document.querySelector('#movie_player').classList.contains('playing-mode') && document.querySelector('.video-stream.html5-main-video').playbackRate != videoSpeed) {
			document.querySelector('.video-stream.html5-main-video').playbackRate = videoSpeed;
			divSpeedCounter.innerHTML = videoSpeed;
			localStorage.setItem('youTubeVideoSpeed', videoSpeed);
		}
	}
	setInterval(autoUpdateVideoSpeed, 5000)
};
// window.onload = mainfunc()
setTimeout(mainfunc, 3000)