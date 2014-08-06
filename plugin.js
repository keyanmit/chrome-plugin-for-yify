document.addEventListener('DOMContentLoaded', function () {
   
});


//template stuff
  
  //fuck u bitch
  window.template = new function(){

      var tmplText= '<div class="TorrentList">'
                    + '<div class="Torrent">'
                      + '<span class="Quality">${Quality}</span>'
                      + '<span class="SeedPeerRatio">${TorrentSeeds}/${TorrentPeers}</span>'
                      + '<span class="TorrentSize">${Size}</span>'
                    + '</div>'
                  + '</div>';

      var bannerText = '<div class="MovieBanner">'
                        + '<div class="DescWrapper">'
                        +   '<div class="Title">${MovieTitle}</div>'
                        +   '<div class="TorrentCount">${TorrentCount} torrents.</div>'
                        + '</div>'
                        + '<div class="RatingStar"></div>'
                      + '</div>';              

      this.TorrentBanner = $.template("comiledBannerTxt",bannerText); 
      this.TorrentList = $.template("compiledTmplTxt",tmplText);   
  };

  

//end



function show(){
  window.yify.getMovieDetailByImdbId($('#key').get(0).value, function(name, count, movies){

      if(count == 0 || name== undefined || movies === undefined){
        //show no result found. exit
        return;
      }

      $('.TorrentContainer').html("");//clear the exising torrents
      
      $.tmpl(window.template.TorrentBanner,{
        MovieTitle : name,
        TorrentCount : count
      }).appendTo('.TorrentContainer');

      $.tmpl(window.template.TorrentList,movies)
        .appendTo('.TorrentContainer');                
  });
}


$(document).ready(function(){

    $('#click').on("click",show);
});