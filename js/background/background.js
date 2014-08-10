console.log("loaded background");

var cmdList = {
  movieList : 0
};

//template stuff

  //fuck u bitch
 


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

    console.log(request);   

    if (request.requestType == cmdList.movieList){     
      window.localStorage.setItem("movIds",JSON.stringify(request.data));
      sendResponse({message : "recieved cmd"});
  	}else{
  		sendResponse({message: "error"});
  	}
});