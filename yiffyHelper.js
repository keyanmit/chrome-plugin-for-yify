

window.yify = new function(){
	var self = this;
	var EndPoints = {
		MovieById : "https://yts.re/api/listimdb.json?imdb_id="
	};

	self.getMovieDetailByImdbId = function(id, callBack){
		if(id){			
			$.ajax({
				url : EndPoints.MovieById + id
			}).done(function(movieList){
				var movieName = undefined; 
				var count = 0;
				if(movieList && movieList.MovieList && movieList.MovieList.length){
					movieName = movieList.MovieList[0].MovieTitleClean;
					count = movieList.MovieList[0].MovieRating;
				}
				callBack(movieName, count, movieList.MovieList);			
			});
		}
	};

};