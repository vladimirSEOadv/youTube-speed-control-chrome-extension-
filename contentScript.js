function mainfunc() {
	const yPlayer = document.querySelector('.video-stream.html5-main-video');
	let videoSpeed = localStorage.getItem('youTubeVideoSpeed') != null ? Number(localStorage.getItem('youTubeVideoSpeed')) : yPlayer.playbackRate;
	const stepCounter = 0.25;

	// Создание элементов интерфейса
	const divSpeedCounter = document.createElement('div');
	divSpeedCounter.style.margin = '10px';
	divSpeedCounter.style.height = '25px';
	divSpeedCounter.style.width = '230px';
	divSpeedCounter.style.fontSize = '30px';
	divSpeedCounter.style.display = 'flex';
	divSpeedCounter.style.justifyContent = 'center';
	divSpeedCounter.textContent = document.getElementsByClassName('video-stream html5-main-video')[0].playbackRate;
	divSpeedCounter.classList.add('video-counter');

	document.getElementById('flex').appendChild(divSpeedCounter);

	function elementCreator(elementType, backgroundColor, elemText, elemId) { //Конструктор кнопок
		element = document.createElement(elementType);
		element.id = elemId;
		element.textContent = elemText;
		element.style.backgroundColor = backgroundColor;
		element.style.cssText += 'margin: 10px; height: 25px; width: 55px; color: white;';
		document.getElementById('flex').appendChild(element);
		return element
	}

	document.getElementById('flex').addEventListener('click', (event) => { // Обработчик событий кликов
		switch (event.target.id) {
			case 'fast-button-for-yt-video':
				videoSpeed = (videoSpeed + stepCounter);
				break
			case 'normal-button-for-yt-video':
				videoSpeed = 1.0;
				break
			case 'slow-button-for-yt-video':
				videoSpeed = (videoSpeed - stepCounter);
				break
		};
		yPlayer.playbackRate = videoSpeed;
		localStorage.setItem('youTubeVideoSpeed', videoSpeed);
		divSpeedCounter.innerHTML = videoSpeed;
	});

	const ButtonSlow = elementCreator('button', 'red', 'slow', 'slow-button-for-yt-video');
	const ButtonNormal = elementCreator('button', 'black', 'normal', 'normal-button-for-yt-video');
	const ButtonFast = elementCreator('button', 'green', 'fast', 'fast-button-for-yt-video');


	function autoUpdateVideoSpeed() { // Обновление скорости воспроизведения при запуске
		if (document.querySelector('#movie_player').classList.contains('playing-mode') && document.querySelector('.video-stream.html5-main-video').playbackRate != videoSpeed) {
			document.querySelector('.video-stream.html5-main-video').playbackRate = videoSpeed;
			divSpeedCounter.innerHTML = videoSpeed;
			localStorage.setItem('youTubeVideoSpeed', videoSpeed);
		}
	};
	setInterval(autoUpdateVideoSpeed, 5000);

	document.addEventListener('keydown', function (event) {
		if (event.code == 'KeyA') {
			videoSpeed = (videoSpeed - stepCounter);
			yPlayer.playbackRate = videoSpeed;
			localStorage.setItem('youTubeVideoSpeed', videoSpeed);
			divSpeedCounter.innerHTML = videoSpeed;
		}
		if (event.code == 'KeyS') {
			videoSpeed = 1.0;
			yPlayer.playbackRate = videoSpeed;
			localStorage.setItem('youTubeVideoSpeed', videoSpeed);
			divSpeedCounter.innerHTML = videoSpeed;
		}
		if (event.code == 'KeyD') {
			videoSpeed = (videoSpeed + stepCounter);
			yPlayer.playbackRate = videoSpeed;
			localStorage.setItem('youTubeVideoSpeed', videoSpeed);
			divSpeedCounter.innerHTML = videoSpeed;
		}
	});
};



setTimeout(mainfunc, 5000);