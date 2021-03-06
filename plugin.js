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

      var torentListTmplHtml = '<span class="Quality Quality-InComplete" title="Seed/Peers : ${TorrentSeeds} / ${TorrentPeers} Size : ${Size}" data-url="${TorrentUrl}">${Quality}</span>';

      this.MovieTmpl = $.template("compiledMovieTemplate",movieTplHtml);
      this.TorrentTmpl = $.template("compiledTorrentTmpl",torentListTmplHtml);
  };

  

//end

window.UI = new function(){
  var self = this;
  self.loadFromDb = function(callBack){

  window.mvCount = 0;

  $('.TorrentContainer').html("");//clear the exising torrents
  var movIds = window.localStorage.getItem("movIds");
    if(movIds){
      movIds = JSON.parse(movIds); 
      
      window.mvCount = movIds.length;

      movIds.forEach(function(mov,idx){
        window.yify.getMovieDetailByImdbId(mov, function(name, count, movies){
                    
          if(!(count == 0 || name== undefined || movies === undefined)){
            //show                              
            window.UI.renderTorrentLink({
              MovieTitle : name,
              MovieRating : count        
            },movies);
          }                      
        }, function(){
          window.mvCount = window.mvCount - 1;
          if(window.mvCount == 0){
            $('.TorrentContainer .Torrent .Quality').on("click",function(){              
              chrome.downloads.download({url : $(this).data("url")});                    
            }).removeClass("Quality-InComplete")
            .addClass("Quality-Complete");            

            if($('.Quality').is(":visible")==false){
              window.clearLoader();
              $('.TorrentContainer').append("sorry we couldnt find torrent for titles in current page. :/");      
            }
          }
        }); 
      });
    }
    window.clearLoader = callBack;
    /*window.setTimeout(function(){
      if($('.loader').is(":visible")){
        window.clearLoader();
        $('.TorrentContainer').append("sorry we couldnt find torrent for titles in current page. :/");
      }
    },5000);*/
  }

  self.renderTorrentLink = function(MovieTmplObj, TorrentTmplObj){
      $.tmpl(window.template.MovieTmpl,MovieTmplObj).appendTo('.TorrentContainer');

      $.tmpl(window.template.TorrentTmpl,TorrentTmplObj)
      .appendTo($('.TorrentContainer .Torrent').last());
        

      window.clearLoader();
  }; 

  self.wireUp = function(callBack){
    $('.credits a').on("click",function(){
      chrome.tabs.create({
        url : $(this).attr("href")
      });
    });
    if(callBack){
      callBack();
    }
  }

  self.handleImdbLoaded = function(callBack){
    chrome.tabs.query({active:true, currentWindow: true},function(data){
      if(data && data.length){
        var tab = data[0];
        if(tab.url.indexOf("www.imdb.com")==-1){
          console.log("tour starts");
          window.UX.togleContext('.tour','.imdbContext');
          window.UX.takeATour();
        }else{
          window.UX.togleContext('.imdbContext','.tour');
          if(callBack){
           callBack();
          }
        }
      }
    });
  }
};

window.UX = new function(){

  var self = this;
  var animation = {
    speed : 1000,
    storyTimeout : 4000,
    ease : "drop"
  };

  self.takeATour = function(){    
    
    $('.tour .step1').show(animation.ease,{},animation.speed,function(){

      console.log("step1 complete");

      window.setTimeout(function(){
        
        console.log("begin hide step1");

        $('.tour .step1').hide(animation.ease,{},animation.speed/100,function(){
          
          console.log("hide step1 complete");

          $('.tour .step2').show(animation.ease,{},animation.speed,function(){

              console.log("begin show step2");
              window.setTimeout(function(){
              chrome.tabs.create({url: 'http://www.imdb.com/'});
              },animation.storyTimeout);
            });
        });
      },animation.storyTimeout);

    });    
    

  };

  self.togleContext = function(active,passive){
    $(active).show();
    $(passive).hide();
  }
}

$(document).ready(function(){


    window.UI.handleImdbLoaded(function(){
      
      window.UI.wireUp();
      window.UI.loadFromDb(function(){
        $('.loader').hide();
        $('.credits').show();
      });

    });
});