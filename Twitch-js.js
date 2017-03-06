//===========STREAM LIST==============
var streamList = [];

function openLink(get) { 
    window.open(get);
}

//=================CLEAR SEARCH DIV FUNCTION=================
function clearIt() {
  var node = document.getElementById("stream-search-container")
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}
}

//================REMOVE FUNCTION===================
function remove(element, streamBox, sidebar, streamerName) {
  for(var i = 0; i < streamList.length; i++) {
    if(streamList[i] === streamerName) {
      streamList.splice(i, 1);
    }
}
  element.remove();
  streamBox.remove();
  sidebar.remove();
  }

//=================RUN FUNCTION========================
function run(stream){
  
//run clear function  
clearIt()
  
var url
  
//================GET STREAM FUNCTION====================  
//  function getStream() {
//  stream =  $("#input").val().toString();
//  document.getElementById("input").value = '';
//};
//  getStream();

  url = "https://api.twitch.tv/kraken/streams/"+stream+"?client_id=irhjwfdcpf9kdtkqkugxvlto36zyml";
 
  
//======================AJAX ONE========================  
$.ajax({ 
  type: "GET",
  url: url,
  async: false,
  dataType: "json",
  success: function(data) {
    
  //Checking if stream is offline --- YES  
  if(data.stream === null) {
      var channel = data._links.channel;
      var urlOffline = channel+"?client_id=irhjwfdcpf9kdtkqkugxvlto36zyml";
         
//==========================AJAX TWO=========================
          $.ajax({ 
            type: "GET",
            url: urlOffline,
            async: false,
            dataType: "json",
//========================SUCCESS=============================
            success: function(data) {
              
              var streamLogoOffline = data.logo;
              var streamBannerOffline = data.profile_banner;
              var streamDisplay_NameOffline = data.display_name;
              var streamGameOffline = "Offline";
              var streamViewerOffline = "0";
              var streamLinkOffline = data.url;
         
//====================CREATE SIDEBAR FUNCTION====================              
              function createSidebarDivFunction() {
                var sidebarChannelLink
                var sidebarURLStream

                //create elements
                var createSidebarDivElement = document.createElement("div");
                var createSidebarRemoveDivElement = document.createElement("div");

                //add classes
                var addClassSidebarDivElement = createSidebarDivElement.className += "sidebar-div-list";
                var addClassSidebarRemoveDivElement = createSidebarRemoveDivElement.className 
                += "remove";
                
                //add id to parent element
                var addIdSidebarDivElement = createSidebarDivElement.setAttribute("id", "sidebar"+streamDisplay_NameOffline);

                //create parent element
                var sidebarParent = document.getElementById("sidebar-streamer-container");

                //create text nodes
                var createSidebarTextNode = document.createTextNode(streamDisplay_NameOffline);
                createSidebarDivElement.appendChild(createSidebarTextNode);
                var createSidebarTextNodeRemove = document.createTextNode("x");
                createSidebarRemoveDivElement.appendChild(createSidebarTextNodeRemove);
                
                //adding remove function
                var createRemoveAttribute = createSidebarRemoveDivElement.setAttribute("onclick", "remove(this, "+streamDisplay_NameOffline+", sidebar"+streamDisplay_NameOffline+", '"+streamDisplay_NameOffline+"')");
                
                console.log(createSidebarRemoveDivElement);
                
                sidebarParent.insertAdjacentElement('beforeEnd', createSidebarDivElement);
                createSidebarDivElement.insertAdjacentElement('afterBegin', createSidebarRemoveDivElement);
              }
              
              
              function createStreamBox() {
      //Creating Elements
      var divStreamBox = document.createElement("div");
      var streamImage = document.createElement("image");
      var streamH3 = document.createElement("h3");
      var streamSpan1 = document.createElement("span");
      var streamSpan2 = document.createElement("span");;

      //Add URL Link to StreamBox
     divStreamBox.onclick = function openLink() { 
        window.open(streamLinkOffline);
    }

      //Inserting Classes
      var insertClassStreamBox = divStreamBox.className += "stream";
      var insertClassStreamTitle = streamH3.className += "stream-title";
      var insertClassStreamSpan1 = streamSpan1.className +="stream-game";
      var insertClassStreamSpan2 = streamSpan2.className +="stream-viewers";
                
      //Adding Id to Div
      var insertIdStreamBox = divStreamBox.setAttribute("id", streamDisplay_NameOffline)

      //Inserting Elements Into StreamBox
      divStreamBox.insertAdjacentElement('afterbegin', streamH3);
      divStreamBox.insertAdjacentElement('afterbegin', streamImage);
      divStreamBox.insertAdjacentElement('afterbegin', streamSpan1);
      divStreamBox.insertAdjacentElement('afterbegin', streamSpan2);

      //Attaching inner HTML/Sources + adding text nodes
      streamImage.innerHTML = "<img class='stream-logo' src="+streamLogoOffline+" /img>";
      var streamH3TextNode = document.createTextNode(streamDisplay_NameOffline)
      streamH3.appendChild(streamH3TextNode);
      var streamSpan1TextNode = document.createTextNode(streamGameOffline)
      streamSpan1.appendChild(streamSpan1TextNode);
      var streamSpan2TextNode = document.createTextNode("Viewers: "+streamViewerOffline)
      streamSpan2.appendChild(streamSpan2TextNode);
                
      //Creating parent var
      var parent = document.getElementById("stream-container-bottom");
                
      //Checking for null stream banner
      if(streamBannerOffline === null){
      divStreamBox.style.backgroundImage = 'url("https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png")'
      divStreamBox.style.backgroundRepeat = "repeat";
      divStreamBox.style.backgroundSize = "auto";
      }
      else if(streamBannerOffline !== null) {
        divStreamBox.style.backgroundImage = "url("+streamBannerOffline+")";
      }
      parent.insertAdjacentElement("beforebegin", divStreamBox);
    };
              
          //Checking if streamer is already in list
          if(streamList.includes(streamDisplay_NameOffline)) {
            alert(streamDisplay_NameOffline+" is already connected!");
          }
          else {
            createStreamBox();
            createSidebarDivFunction();
            streamList.push(streamDisplay_NameOffline);
          }
  },
            
//======================ERROR=============================            
  error: function() {
    alert("Channel not found");
  }
          })
    }
    
    //else statement to stream online check --- NO
    else {
      var streamLogo = data.stream.channel.logo;
      var streamBanner = data.stream.channel.profile_banner;
      var streamDisplay_Name = data.stream.channel.display_name;
      var streamGame = data.stream.channel.game;
      var streamViewer = data.stream.viewers;
      var streamLink = data.stream.channel.url;
      
//================CREATE STREAM BOX OFFLINE=============      
      function createStreamBox() {
          //Creating Elements
          var divStreamBox = document.createElement("div");
          var streamImage = document.createElement("image");
          var streamH3 = document.createElement("h3");
          var streamSpan1 = document.createElement("span");
          var streamSpan2 = document.createElement("span");
          var streamSpan3 = document.createElement("span");

          //Add URL Link to StreamBox
         divStreamBox.onclick = function openLink() { 
            window.open(streamLink);
        }

          //Inserting Classes
          var insertClassStreamBox = divStreamBox.className += "stream";
          var insertClassStreamTitle = streamH3.className += "stream-title";
          var insertClassStreamSpan1 = streamSpan1.className +="stream-game";
          var insertClassStreamSpan2 = streamSpan2.className +="stream-viewers";
          var insertClassStreamSpan3 = streamSpan3.className +="stream-online-orb";
          
          //Adding Id to Div
          var insertIdStreamBox = divStreamBox.setAttribute("id", streamDisplay_Name)
      
          //Inserting Elements Into StreamBox
          divStreamBox.insertAdjacentElement('afterbegin', streamH3);
          divStreamBox.insertAdjacentElement('afterbegin', streamImage);
          divStreamBox.insertAdjacentElement('afterbegin', streamSpan1);
          divStreamBox.insertAdjacentElement('afterbegin', streamSpan2);
          divStreamBox.insertAdjacentElement('afterbegin', streamSpan3);

          //Attaching inner HTML/Sources
          streamImage.innerHTML = "<img class='stream-logo' src="+streamLogo+" /img>";
          var streamH3TextNode = document.createTextNode(streamDisplay_Name)
          streamH3.appendChild(streamH3TextNode);
          var streamSpan1TextNode = document.createTextNode("Playing: "+streamGame)
          streamSpan1.appendChild(streamSpan1TextNode);
          var streamSpan2TextNode = document.createTextNode("Viewers: "+streamViewer)
          streamSpan2.appendChild(streamSpan2TextNode);
          
          //creating parent element var
          var parent = document.getElementById("stream-container-bottom");
        
          //checking if stream banner is null
          if(streamBanner === null){
          divStreamBox.style.backgroundImage = 'url("https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png")'
          divStreamBox.style.backgroundRepeat = "repeat";
          divStreamBox.style.backgroundSize = "auto";
          }
          else if(streamBanner !== null) {
            divStreamBox.style.backgroundImage = "url("+streamBanner+")";
          }
          parent.insertAdjacentElement("beforebegin", divStreamBox);
        
        };
      
              
//====================CREATE SIDEBAR FUNCTION=========================        
        function createSidebarDivFunction() {
                var sidebarChannelLink
                var sidebarURLStream

                //Create elements
                var createSidebarDivElement = document.createElement("div");
                var createSidebarRemoveDivElement = document.createElement("div");

                //Adding classes
                var addClassSidebarDivElement = createSidebarDivElement.className += "sidebar-div-list";
                var addClassSidebarRemoveDivElement = createSidebarRemoveDivElement.className 
                += "remove";
          
                //add id to parent element
                var addIdSidebarDivElement = createSidebarDivElement.setAttribute("id", "sidebar"+streamDisplay_Name);

                //Creating parent var
                var sidebarParent = document.getElementById("sidebar-streamer-container");

                //Creating text nodes
                var createSidebarTextNode = document.createTextNode(streamDisplay_Name);
                createSidebarDivElement.appendChild(createSidebarTextNode);
                var createSidebarTextNodeRemove = document.createTextNode("x");
                createSidebarRemoveDivElement.appendChild(createSidebarTextNodeRemove);
          
                //adding remove function
                var createRemoveAttribute = createSidebarRemoveDivElement.setAttribute("onclick", "remove(this, "+streamDisplay_Name+" , sidebar"+streamDisplay_Name+", '"+streamDisplay_Name+"')");

                //Inserting elements
                sidebarParent.insertAdjacentElement('beforeEnd', createSidebarDivElement);
                createSidebarDivElement.insertAdjacentElement('afterBegin', createSidebarRemoveDivElement);
              }
            
              //checking if stream is already in list
              if(streamList.includes(streamDisplay_Name)) {
                alert(streamDisplay_Name+" is already connected!");
              }
              else {
                createStreamBox();
                createSidebarDivFunction();
                streamList.push(streamDisplay_Name);
              }
            }
  },
  //=====================ERROR TWO======================
  //You're in the wrong part of town
  error: function() {
    alert("Oops! Wtf did you do?"); ``
  }
})};

function search() {
  clearIt()
  
  var searchStreamer
  
  function getSearch() {
    searchStreamer = $("#input").val().toString();
    document.getElementById("input").value = '';
    console.log(searchStreamer);
  }
  getSearch()
  
  var searchURL = "https://api.twitch.tv/kraken/search/channels/?q="+searchStreamer+"&&client_id=irhjwfdcpf9kdtkqkugxvlto36zyml";
  
  $.ajax({
  type: "GET",
  url: searchURL,
  async: false,
  dataType: "json",
  success: function(data) {
    console.log(data)
    
    
//=================CREATE STREAMER LIST DIV========================
function createStreamerDivList(thisName) {
  console.log(thisName);
  
  //create div element
  var createStreamerDivListElement = document.createElement("div");
  
  //add class
  var streamerDivListAddClass = createStreamerDivListElement.className +="streamer-list-element";
  
  //add id
  var streamerDivListAddId = createStreamerDivListElement.setAttribute("id", "list"+thisName);
  
  //set onclick
  var setOnclickFunctionStreamerDivList = createStreamerDivListElement.setAttribute("onclick", "run('"+thisName+"')")
  
  //add text node
  var createStreamerDivList = document.createTextNode(thisName);
  createStreamerDivListElement.appendChild(createStreamerDivList);
  
  //set parent
  var parentSearchListContainer = document.getElementById("stream-search-container");
  
  //insert into div container
  var insertStreamerDivList = parentSearchListContainer.insertAdjacentElement('afterBegin', createStreamerDivListElement);
  
  }
    for(var i = data.channels.length-1; i >= 0; i--){
     
    var streamerSearchDisplay_Name = data.channels[i].display_name;
     createStreamerDivList(streamerSearchDisplay_Name)
   }

    
    },
  error: function() {
    alert("error");
  }
  })
}
