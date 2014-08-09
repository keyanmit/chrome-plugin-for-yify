alert("imdbCrawler loading");

var fucker = new function(){
	this.fucked = function(){
		alert("working");
	}
};

var cmdList = {
	movieList : 0
};

window.imdbCrawler = new function(){

	var self = this;
	var imdbRegExp = new RegExp("/tt[0-9]*/");
	self.movIds = [];
	var movieSink = {};
	self.getAllMovieIds = function(tags){

		var tObj;
		movieSink = {};
		$('a').each(function(idx,tag){

			tObj = $(tag)[0];
			if(tObj){
				tObj = tObj.href; // sets proper url with the domain name too
				if(tObj){
					tObj = tObj.match(imdbRegExp);
					if(tObj){
						tObj = tObj[0];
						tObj = tObj.substring(1,tObj.length-1);
						movieSink[tObj]=1;
					}
				}
			}
			self.movIds = [];					
		});
		
		for(key in movieSink){
				self.movIds.push(key);
		}
		return self.movIds;
	}	
}

var tmpList = window.imdbCrawler.getAllMovieIds();
localStorage.setItem("movIds",JSON.stringify(tmpList));

chrome.runtime.sendMessage({
	requestType : cmdList.movieList,
	data : tmpList
},function(response){
	console.log(response);
});

/*chrome.runtime.sendMessage({data: "fucker"},function(response){
	console.log(response);
	console.log("done");
});*/
