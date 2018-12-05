var musicList = []
	var currentIndex = 0
	var clock
	var audio = new Audio()
	audio.autoplay = true


	function $(selector){
		return document.querySelector(selector)
	}

	getMusicList(function(list){
		console.log(list)
		//var song = list[0]
		//var audioObject = new Audio(song.src)
		//audioObject.play()
		musicList = list
		loadMusic(list[currentIndex])
	})

	audio.ontimeupdate = function(){
		console.log(this.currentTime)
		$('.musicWrap .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
		// var min = Math.floor(this.currentTime/60)
		// var sec = Math.floor(this.currentTime)%60+''
		// sec = sec.length===2 ? sec:'0'+sec
		// $('.musicWrap .time').innerText = min + ':' + sec
	}

	audio.onplay = function(){
		clock = setInterval(function(){
			var min = Math.floor(audio.currentTime/60)
			var sec = Math.floor(audio.currentTime)%60+''
			sec = sec.length===2 ? sec:'0'+sec
			$('.musicWrap .time').innerText = min + ':' + sec			
		},1000)
	}

	audio.onpause = function(){
		clearInterval(clock)
	}

	audio.onended = function(){
		currentIndex = ++currentIndex%musicList.length
		loadMusic(musicList[currentIndex])		
	}

	$('.musicWrap .play').onclick = function(){
		if(audio.paused){
			audio.play()
			this.querySelector('.fa').classList.add('fa-pause')
			this.querySelector('.fa').classList.remove('fa-play')
		}else{
			audio.pause()
			this.querySelector('.fa').classList.remove('fa-pause')
			this.querySelector('.fa').classList.add('fa-play')			
		}
	}

	$('.musicWrap .forward').onclick = function(){
		currentIndex = ++currentIndex%musicList.length
		loadMusic(musicList[currentIndex])
	}

	$('.musicWrap .backward').onclick = function(){
		currentIndex = (musicList.length + (--currentIndex))%musicList.length
		loadMusic(musicList[currentIndex])
	}

	$('.musicWrap .bar').onclick = function(e){
		var percent = e.offsetX / parseInt(getComputedStyle(this).width)
		console.log(percent)
		audio.currentTime = audio.duration * percent
	} 
	
	function getMusicList(callback){
		var xml = new XMLHttpRequest()
		xml.open('GET','/music.json',true)
		xml.onload = function(){
			if(xml.status >=200 && xml.status <300 || xml.status ===304){
				callback(JSON.parse(this.responseText))
			}else{
				console.log('获取失败')
			}					
		}
		xml.send()
	}

	function loadMusic(musicObj){
		console.log('musicinfo',musicObj)
		$('.musicWrap .title').innerText = musicObj.title
		$('.musicWrap .singer').innerText = musicObj.singer
		audio.src = musicObj.src
	}