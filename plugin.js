document.addEventListener('DOMContentLoaded', function () {
   
});


//template stuff
  
  //fuck u bitch
  window.template = new function(){      

      var movieTplHtml = '<div class="movie">'
                              + '<div class="MovieBanner">'
                                + '<div class="DescWrapper">'
                                  + '<div class="Title">${MovieTitle}</div>'
                                + '</div>'
                                + '<div class="TorrentList">'
                                  + '<div class="Torrent">'
                                    + '<span class="RatingStar">4.8</span>'
                                  + '</div>'
                                + '</div>'
                              + '</div>'
                          + '</div>';

      var torentListTmplHtml = '<span class="Quality" title="Seed/Peers : ${TorrentSeeds} / $(TorrentPeers) Size : ${Size}" >${Quality}</span>';

      this.MovieTmpl = $.template("compiledMovieTemplate",movieTplHtml);
      this.TorrentTmpl = $.template("compiledTorrentTmpl",torentListTmplHtml);
  };

  

//end



function show(){
  window.yify.getMovieDetailByImdbId($('#key').get(0).value, function(name, count, movies){

      if(count == 0 || name== undefined || movies === undefined){
        //show no result found. exit
        return;
      }

      $('.TorrentContainer').html("");//clear the exising torrents
      
      $.tmpl(window.template.MovieTmpl,{
        MovieTitle : name        
      }).appendTo('.TorrentContainer');

      $.tmpl(window.template.TorrentTmpl,movies)
        .appendTo('.TorrentContainer .Torrent');                
  });
}

window.UI = new function(){
  var self = this;
  self.loadFromDb = function(){
  $('.TorrentContainer').html("");//clear the exising torrents
  var movIds = window.localStorage.getItem("movIds");
    if(movIds){
      movIds = JSON.parse(movIds); 
      movIds.forEach(function(mov,idx){
        window.yify.getMovieDetailByImdbId(mov, function(name, count, movies){
          if(count == 0 || name== undefined || movies === undefined){
            //show no result found. exit
            return;
          }
          $.tmpl(window.template.MovieTmpl,{
            MovieTitle : name        
          }).appendTo('.TorrentContainer');

          $.tmpl(window.template.TorrentTmpl,movies)
            .appendTo($('.TorrentContainer .Torrent')[idx]);     
        }); 
      });
    }
  } 
};

$(document).ready(function(){

    $('#click').on("click",show);
    window.UI.loadFromDb();
});