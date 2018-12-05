
// var musicList =[{
// 	src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
// 	title: 'IF YOU',
// 	singer: 'Big Bang'
// },{
// 	src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
// 	title: '玫瑰',
// 	singer: '二百'
// }]

var http = require('http')
var server = http.createServer(function(req,res){
	res.setHeader('Content-Type','text/html; charset=utf-8')
	res.writeHead('200','ok')
	res.write('hello world')

	res.end()
	//console.log('open http://localhost:8080')
})
server.listen(8080)
console.log(__dirname)
console.log(__filename)

// var xhr = new XMLHttpRequest()
// xhr.open('GET','/music.json',true)
// xhr.onload = function(){
// 	if(xhr.status > 200 && xhr.status <300 || xhr.status === 304){
// 		console.log(this.rewsponseText)
// 	}else{
// 		console.log('获取数据失败	')
// 	}
// }
// xhr.onerror = function(){
// 	console.log('网络异常')
// }
// xhr.send()