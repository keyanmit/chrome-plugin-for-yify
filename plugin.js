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
                                    + '<span class="RatingStar">${MovieRating}</span>'
                                  + '</div>'
                                + '</div>'
                              + '</div>'
                          + '</div>';

      var torentListTmplHtml = '<span class="Quality" title="Seed/Peers : ${TorrentSeeds} / $(TorrentPeers) Size : ${Size}" data-url="${TorrentUrl}">${Quality}</span>';

      this.MovieTmpl = $.template("compiledMovieTemplate",movieTplHtml);
      this.TorrentTmpl = $.template("compiledTorrentTmpl",torentListTmplHtml);
  };

  

//end

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
          window.UI.renderTorrentLink({
            MovieTitle : name,
            MovieRating : count        
          },movies);            
        }); 
      });
    }
  }

  self.renderTorrentLink = function(MovieTmplObj, TorrentTmplObj){
      $.tmpl(window.template.MovieTmpl,MovieTmplObj).appendTo('.TorrentContainer');

      $.tmpl(window.template.TorrentTmpl,TorrentTmplObj)
      .appendTo($('.TorrentContainer .Torrent').last());

      $('.TorrentContainer .Torrent .Quality').last().on("click",function(){
          chrome.downloads.download({url : $(this).data("url")});          
      });     
  }; 
};

$(document).ready(function(){    
    window.UI.loadFromDb();
});