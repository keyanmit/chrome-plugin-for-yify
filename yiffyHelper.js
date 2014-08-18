

window.yify = new function(){
	var self = this;
	var EndPoints = {
		MovieById : "https://yts.re/api/listimdb.jsonp?imdb_id="
	};

	self.getMovieDetailByImdbId = function(id, callBack, runAlways){
		if(id){			
			$.ajax({
				jsonp: "callback",   
    			dataType: "jsonp",
				url : EndPoints.MovieById + id
			}).done(function(movieList){
				var movieName = undefined; 
				var count = 0;
				if(movieList && movieList.MovieList && movieList.MovieList.length){
					movieName = movieList.MovieList[0].MovieTitleClean;
					count = movieList.MovieList[0].MovieRating;
					callBack(movieName, count, movieList.MovieList);			
				}				
			}).always(function(){
				runAlways();
			});
		}
	};

};