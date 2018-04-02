function myAjax(cont){
// 	$.ajax({
// 		type:'get',
// 		url:'https://api.imjad.cn/cloudmusic/?type=search&s='+cont,
// 		success:function(data){
// 			if(data.code == 200){
// 				var musicType = {
// 						song 	: 'song',
// 						mv 	: 'mv',
// 						lyric 	: 'lyric'
// 					}
// 					songMes = {
// 						mvId 	: data.result.songs[0].mv,
// 						songId 	: data.result.songs[0].id,
// 						picId 	: data.result.songs[0].al.picUrl
// 					};
// 				$.ajax({
// 					type:'get',
// 					url:`https://api.imjad.cn/cloudmusic/?type=${musicType.song}&id=${songMes.songId}&br=128000`,
// 					success:function(data){
// 						console.log(data)
// 						var src = data.data[0].url;
// 						$('#music').append(`<audio src="${src}" controls="controls" autoplay="autoplay"></audio>`)
// 					}
// 			 	});
// 				$.ajax({
// 					type:'get',
// 					url:`https://api.imjad.cn/cloudmusic/?type=${musicType.lyric}&id=${songMes.songId}&br=128000`,
// 					success:function(data){
// 						// console.log(data)
// 						var geci = '未找到！';
// 						var reg = String.fromCharCode(8629); // "↵"
// 						data.klyric.lyric == null||data.klyric.lyric == undefined ? geci = data.lrc.lyric : geci = data.klyric.lyric;  
// 						var str = geci;
// 						// console.log([str,reg]);
// 						var arr = str.split('/n');
// 						console.log(arr)
// 						// geci = geci.pop();
// 						// for(var i = 0; i < geci.length; i++){
// 							$('#lyric').append(`<p>${str}</p>`)
// 						// }
// 					}
// 				})
// 			}else{
// 				alert('没有找到此歌曲！')
// 			}
// 		}
// 	})
	request('get','https://api.imjad.cn/cloudmusic/?type=search&s='+cont)
	.then(function(msg){
		console.log(msg)
		return request('get',`https://api.imjad.cn/cloudmusic/?type=song&id=${msg.result.songs[0].id}&br=128000`)
	})
	.then(function(msg){
		console.log(msg)
		$('#music').append(`<audio src="${msg.data[0].url}" controls="controls" autoplay="autoplay"></audio>`)
		return msg
	})
	.then(function(msg){
		return request('get',`https://api.imjad.cn/cloudmusic/?type=lyric&id=${msg.data[0].id}&br=128000`)
	})
	.then(function(msg){
		console.log(msg)
		$('#lyric').append(`<p>${msg.klyric.lyric == null||msg.klyric.lyric == undefined ? msg.lrc.lyric : msg.klyric.lyric}</p>`)
	})
};
function request(method, url){
	return new Promise(function(resolve, reject){
		$.ajax({
			type: method,
			url: url,
			success:function(data){
				resolve(data)
			},
			fail:function(err){
				reject(err)
			}
		})
	})
}

