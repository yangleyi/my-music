function myAjax(cont){
	$.ajax({
		type:'get',
		url:'https://api.imjad.cn/cloudmusic/?type=search&s='+cont,
		success:function(data){
			if(data.code == 200){
				var musicType = {
						song 	: 'song',
						mv 	: 'mv',
						lyric 	: 'lyric'
					}
					songMes = {
						mvId 	: data.result.songs[0].mv,
						songId 	: data.result.songs[0].id,
						picId 	: data.result.songs[0].al.picUrl
					};
				$.ajax({
					type:'get',
					url:`https://api.imjad.cn/cloudmusic/?type=${musicType.song}&id=${songMes.songId}&br=128000`,
					success:function(data){
						console.log(data)
						var src = data.data[0].url;
						$('#music').append(`<audio src="${src}" controls="controls" autoplay="autoplay"></audio>`)
					}
			 	});
				$.ajax({
					type:'get',
					url:`https://api.imjad.cn/cloudmusic/?type=${musicType.lyric}&id=${songMes.songId}&br=128000`,
					success:function(data){
						// console.log(data)
						var geci = '未找到！';
						var reg = String.fromCharCode(8629); // "↵"
						data.klyric.lyric == null||data.klyric.lyric == undefined ? geci = data.lrc.lyric : geci = data.klyric.lyric;  
						var str = geci;
						// console.log([str,reg]);
						var arr = str.split('/n');
						console.log(arr)
						// geci = geci.pop();
						// for(var i = 0; i < geci.length; i++){
							$('#lyric').append(`<p>${str}</p>`)
						// }
					}
				})
			}else{
				alert('没有找到此歌曲！')
			}
		}
	})
};

