


window.addEventListener('load', (e) => {
   addMyStyle();
   //addBackButtons();
   addFunctionalTags();
   addFocusedClass();
   addExpandOrCollapseQuestion();
   deactivateAutosearch();

   window.open = function (url, name, features) {
      location.href = "chromehelper://" + url.split("://")[1];
   };
   window.log("huge success");
      /*
      workflowy.lume.vision
         great website
      function

      ablauf
         addEventListeners
         analyze
            get tagname "embed"
            get url
         append
         remove
       */
      /*
      $('a').live('click', function (e){
            var href = $(this).attr('href');
            console.log(href);
            if(href.startsWith("https://workflowy.com/")) return;
            if(href.startsWith("http://") || href.startsWith("https://")){
                  e.preventDefault();
                  location.href = "chromehelper://" + href.split("://")[1];
            }
      });
      */
}); 

var hashtagPlugins = [];


function addHashtagPlugin(plugin){
   hashtagPlugins.push(plugin);
}
addHashtagPlugin({
   name: "color",
   reset: function( $contentNode ){
      $contentNode.css({color: ""});
   },
   manipulate: function( tagName, $contentNode ){
      if(tagName.startsWith("color-")){
         $contentNode.css({color: "#" + tagName.substr(6)});
         $contentNode.css({color: tagName.substr(6)});
      }
   }
});
addHashtagPlugin({
   name: "StylableTags",
   reset: function( $contentNode, $projectNode ){
      $projectNode.removeClass((index, old) => {
         var classes = old.split(" ");
         var custom = [];
         for( i = 0; i < classes.length; i++){
               if(classes[i].endsWith("-proj")){ custom.push(classes[i]);}
         }
         return custom.join(" ");
      });
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
         $projectNode.addClass(tagName + "-proj");
   }
});
addHashtagPlugin({
   name: "StylableTags2.0",
   reset: function( $contentNode, $projectNode ){
      $projectNode.removeClass((index, old) => {
         var classes = old.split(" ");
         var custom = [];
         for( i = 0; i < classes.length; i++){
               if(classes[i].endsWith("-proj")){ custom.push(classes[i]);}
         }
         return custom.join(" ");
      });
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
         $projectNode.addClass(tagName + "-proj");
   }
});
addHashtagPlugin({
   name: "highlight",
   reset: function( $contentNode ){
      $contentNode.css({backgroundColor: ""});
   },
   manipulate: function( tagName, $contentNode ){
      if(tagName.startsWith("highlight-")){
         $contentNode.css({backgroundColor: "#" + tagName.substr(10)});
         $contentNode.css({backgroundColor: tagName.substr(10)});
      }
   }
   // css: see stylesheet
});
addHashtagPlugin({
   name: "area-highlight",
   reset: function( $contentNode, $projectNode ){
      $projectNode.css({backgroundColor: ""});
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
      if(tagName.startsWith("area-highlight-")){
         $projectNode.css({backgroundColor: "#" + tagName.substr(15) });
         $projectNode.css({backgroundColor: tagName.substr(15) });
      }
   }
});
addHashtagPlugin({
   name: "area-color",
   reset: function( $contentNode, $projectNode ){
      $projectNode.css({color: ""});
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
      if(tagName.startsWith("area-color-")){
         $projectNode.css({color: "#" + tagName.substr(11)});
         $projectNode.css({color: tagName.substr(11)});
      }
   }
});
addHashtagPlugin({
   name: "font",
   reset: function( $contentNode ){
      $contentNode.css({fontFamily: ""});
   },
   manipulate: function( tagName, $contentNode ){
      if(tagName.startsWith("font-")){
         $contentNode.css({fontFamily: tagName.substr(5).replace('-', ' ')});
      }
   }
});
addHashtagPlugin({
   name: "area-font",
   reset: function( $contentNode, $projectNode ){
      $projectNode.css({fontFamily: ""});
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
      if(tagName.startsWith("area-font-")){
         $projectNode.css({fontFamily:  tagName.substr(10).replace('-', ' ')});
      }
   }
});
addHashtagPlugin({
   name: "embed",
   reset: function( $contentNode, $projectNode ){
      var $embedPoint = $projectNode.children(".notes");
      $embedPoint.nextAll(".embedded-content").remove();
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
      var $embedPoint = $projectNode.children(".notes");
      if( tagName == "embed" || tagName == "embedded" ){
         $contentNode.find('.contentLink').map( function(){
            var url = this.href;

            // addIFrame;
            // onload="this.height=this.contentWindow.document.body.scrollHeight"
            $embedPoint.after('<div class="embedded-content" style="padding-left: 25px;"><iframe width="100%" height="'+($(window).height()-120)+'" src="' + url + '" frameborder="0" allowfullscreen></iframe></div>');
         })
      }
   }
});
addHashtagPlugin({
   name: "image",
   reset: function( $contentNode, $projectNode ){
      var $embedPoint = $projectNode.children(".notes");
      $embedPoint.nextAll(".embedded-content").remove();
   },
   manipulate: function( tagName, $contentNode, $projectNode ){
      if( tagName.split('-')[0] == "image" ){
         var maxHeight
         var maxWidth

         //if(tagName.split('-')[1] == 'autosize' || !tagName.split('-')[1]){
            maxHeight = $(window).height() - 70
            maxWidth = $projectNode.width()
         //}
         if(!isNaN(tagName.split('-')[1])){
            maxHeight = tagName.split('-')[1]
         }
         if(tagName.split('-')[1] == 'medium'){
            maxHeight = 300
         }
         if(tagName.split('-')[1] == 'small'){
            maxHeight = 150
         }
         if(tagName.split('-')[1] == 'tiny'){
            maxHeight = 50
         }
         if(tagName.split('-')[1] == 'thumbnail'){
            maxHeight = 50
         }
         if(tagName.split('-')[1] == 'original'){
            maxHeight = 1000000
            maxWidth = 1000000
         }
         var $embedPoint = $projectNode.children(".notes") 
         $contentNode.find('.contentLink').map( function(){
            var url = this.href;
            if(url.startsWith('https://www.dropbox.com/') && url.endsWith('?dl=0'))
               url = url.substr(0, url.length - 1) + "1";
            // addIFrame;
            // onload="this.height=this.contentWindow.document.body.scrollHeight"
            // style="max-width:'+($(window).width()-70)+'; max-height:'+($(window).height()-70)+';"
            $embedPoint.after('<a class="embedded-content" href="'+this.href+'" target="_blank"><img src="' + url + '" style="max-width:'+(maxWidth-25)+'px; max-height:'+(maxHeight)+'px; margin-left:25px;"></a>');
         })
      }
   }
});


function addFunctionalTags(){

   function analyseProject($projectNode, mode){
      // #todo-questionmark:am i attached twice and n-times again and again?
      //    console.log() will tell

      // hasContentChanged ?
         if (mode == "fast"){
            var e = project_tree.getProjectReferenceFromDomProject($projectNode); //[^a-zA-Z]n[^a-zA-Z]
            var nameContent = e.getName();
            var noteContent = e.getNote();
         }else{
            var nameContent = $projectNode.children(".name").children(".content").getContentText();
            var noteContent = $projectNode.children(".notes").children(".content").getContentText();
         }

         if(nameContent + noteContent == $projectNode.data('lastWorflowyContent')){
            return;
         }else{
            $projectNode.data('lastWorflowyContent', nameContent + noteContent);
         }
      //

      $projectNode.children(".name, .notes").children(".content").map( function () {
         var $contentNode = $(this);
         hashtagPlugins.forEach((plugin) => {
            // if(! (intervalMode && (plugin.name == 'image' || plugin.name == 'embed') ) )
            plugin.reset($contentNode, $projectNode);
         })
      });
      $projectNode.children(".name, .notes").children(".content").map( function () {
         var $contentNode = $(this);
         // walk trough tags 
         $contentNode.find('span > .contentTagText').map( function(){
            var tagName = $(this).text().toLowerCase();

            hashtagPlugins.forEach((plugin) => {
               plugin.manipulate(tagName, $contentNode, $projectNode);
            })

         });
         
      });
   }
   function analyseNote(){
      // #todo-questionmark:am i attached twice and n-times again and again?
      //    console.log() will tell

      var $projectNode = $(this).parent().parent();
      if (! $projectNode.hasClass('project')) return;
      
      analyseProject($projectNode, "destinct");

   }


   function analyseNoteAllProjects() {
      //setTimeout( () => {
         $(".project").each(function(){ analyseProject($(this), "fast"); } );
      //}, 0)
   };
   // Hints: 
   // we cannot select for .project because:
   //       this would be triggered on every event from any child-.projects 
   window.analyseNoteAllProjects = analyseNoteAllProjects;
   $("#expandButton").live("click", () => { setTimeout( analyseNoteAllProjects, 1); } );
   $("div.content").live("click keyup", analyseNote);
   $(window).bind("hashchange drop load", analyseNoteAllProjects);
   //setInterval(analyseNoteAllProjects, 500)

   
/*
   $(".img-toggle").live("click", function() {
      console.log("toggle");
      $(this).toggle();
   });
   */
}

function addFocusedClass(){
   $('.content').live('focus', function(){ 
      $(this).addClass('focused');
   }).live('blur', function(){ 
      $(this).removeClass('focused');
   });
}


function addBackButtons(){
   var css = {
      backgroundColor:'transparent', 
      color:'#555555', 
      fontSize:'24px', 
      position:'fixed', 
      top:'70px', 
      zIndex:1000, 
      cursor:'pointer'
   };
   var $el=$('<div>&lt;</div>').css(css).css({left:'30px'}).bind('click', function(){history.back();});
   $('body').append($el);
   var $el2=$('<div>&gt;</div>').css(css).css({right:'30px'}).bind('click', function(){history.forward();});
   $('body').append($el2);
}


function addExpandOrCollapseQuestion(){
   var originalFn = $.fn.expandOrCollapseAllDescendantsOfProjectToggle;
   $.fn.expandOrCollapseAllDescendantsOfProjectToggle = function() {
      if(confirm("Do you really want to expand or collapse ALL items?")){
            originalFn.apply(this, arguments);
      }
   };
}
      
function deactivateAutosearch (){
   setTimeout(function (){
         var jData = $("#searchBox").data("events");
         if(jData && jData.keydown && jData.keydown.length >= 2){
            jData.keydown.shift();
            $("#searchBox").bind("keydown", function (){
               setTimeout(function() {
                     tagging.getTagAutocompleter().updateDisplay( $("#searchBox") );
               }, 1);
            });
         }else{
            deactivateAutosearch();
         }
   }, 500);
}
function hideTag(tagName){
   css = `
      .contentTag[title='Filter ${tagName}'] {
         visibility: hidden;
      }

      .notes:hover .contentTag, .name:hover .contentTag, .content.focused .contentTag {
         visibility: visible;
      }

      .name.hashtag-color .contentTag {
         display:none;
      }

      .content.focused .contentTag {
         display:initial;
      }


      .contentTag::after {
         content:'hi';
      }

   `;
}


let styleNode;
function addStyleString(str){
   if(!styleNode){
      styleNode = document.createElement('style');
      document.body.appendChild(styleNode);
   }
   styleNode.innerHTML = str;
}

function addMyStyle(){
   addStyleString(`
      #documentView {
         font-family: "Avenir", "Arial";
      }

      .project.blink-proj > .name {
         animation: fadeIn 2s infinite alternate;
      }
      .project.area-blink-proj {
         animation: fadeIn 2s infinite alternate;
      }
      /* project styles */
      /* Calendar stuff */
      div.project[class*=" date:"] > .children {
         margin-left: 10px;
         padding-left: 15px;
         border-left: 1px solid #fe5;
      } 
      div.project[class*=" date:"] > .name > .bullet {
         background-image: 
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' version='1.1'><circle cx='50' cy='50' r='35' style='fill: #fe9;'/></svg>");
      }
      div.project[class*=" date:"] > .children > .project > .name > .bullet {
         background-image: 
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' version='1.1'><circle cx='50' cy='50' r='19' style='fill: #009999;'/></svg>");
      }
      div.project.month-proj > .children {
         margin-left: 10px;
         padding-left: 15px;
         border-left: 1px solid #009999;
      }
      div.project.month-proj > .name > .bullet {
         background-image: 
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' version='1.1'><circle cx='50' cy='50' r='35' style='fill: #066;'/></svg>");
      }
      div.project.created-proj > div > div.content, div.project.created-proj > div > div.content .contentTag , div.project.created-proj > div > div.content .contentTagText{
         color: #4400dd;
         text-decoration: none;
      }


      div.project[class*=" highlight-"] > .name > .content {
         color: black !important; padding: 3px 10px 3px 10px;
         box-shadow: 3px 3px 3px #E6E6E6;
         margin-top: 10px;
         margin-bottom: 10px;
      }

      div.project[class*=" area-highlight-"] {
         color: black !important; padding: 3px 10px 3px 10px;
         box-shadow: 3px 3px 3px #E6E6E6;
         margin-top: 10px;
         margin-bottom: 10px;
      }



      /* just a test of something */
      div.project.created-proj > div > div.content, div.project.created-proj > div > div.content .contentTag , div.project.created-proj > div > div.content .contentTagText{
         color: #4400dd;
         text-decoration: none;
      }





      /* # show-note */
      DIV.show-note-proj > DIV.notes > DIV.content{
         height: auto !important;
         overflow: visible !important;
         display: block !important;   
      }


      /* # blackfont-note */
      DIV.blackfont-note-proj > DIV.notes > DIV.content{
         color: black; 
      }

      DIV.blackfont-note-area-proj DIV.notes > DIV.content{
         color: black; 
      }




      /* #monospace (damit es kein flimmern gibt, hier nochmal zusätzlich mit projectid für command-line-tricks) */
      div.project.monospace-proj div.content, x-div[projectid="e5205e6f-2cbb-7455-46d4-8719f63ace16"] div.content  {
         font-family: "Courier";
      }






      /* # bash */
      div.name [title="Filter #bash"] {
         visibility:hidden;
      }
      [title="Filter #bash"]:hover {
         visibility:visible;

      }
      x[title="Filter #bash"]::before { 
         content: "Read this ❯ ";
      }
      div.project.bash-proj > div > div.content, div.project.bash-area-proj .project div > div.content {
         font-family: "Courier"
      }
      div.project.bash-proj > div.name > .bullet, div.project.bash-area-proj .project div.name > .bullet {
         background-size: cover;
         background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiPg0KPHBhdGggZD0ibSAxNDUsMzEyIGMgLTIsNjkgMzEsMTAwIDEwNCwxMDIgNzgsMSAxMTMsLTM0IDEwOSwtMTAxIC02LC01OCAtNjIsLTczIC0xMDYsLTc5IC00OCwtMTcgLTk5LC0yNSAtOTksLTk1IDAsLTQ4IDMyLC03OSA5OSwtNzggNjAsMCA5NywyNSA5Niw4NCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDAiIC8+DQo8cGF0aCBkPSJtIDI1MCwxNSAwLDQ3MCIgc3R5bGU9InN0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozMCIgLz4NCjwvc3ZnPg==");
      }






      /* # google */
      div.project.google-proj > div.name > .bullet, div.project.google-area-proj .project div.name > .bullet {
         background-size: cover;
         background-image: url("http://iconbug.com/data/c7/64/4e0354cbf02d5d17b1625cd4270d790d.png");
      }









      /* high-lighter */
      span.contentUnderline {
         background-color: #FFFF00 !important;
         text-decoration: none !important;
         border-radius: 3px;
         padding-left: 3px;
         padding-right: 3px;
      }



      /* move starred pages viewer to the top */
      #savedViewHUD {
         top: 30px;
      }

      /* button ☆☆☆  with 3 stars */
      #savedViewHUDButton {
         width: 66px;
         height: 23px;
         margin-top: 2px;
         margin-left: 5px;
         background-image: url('data:image/svg+xml;utf8,<svg version="1.1" id="saved-view-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" 	 y="0px" width="18.5px" height="23.375px" viewBox="0 0 18.5 23.375" enable-background="new 0 0 18.5 23.375" 	 xml:space="preserve"> <path fill="#666666" stroke="#666666" stroke-miterlimit="10" d="M17.625,19.838c0,1.608-0.992,2.912-2.217,2.912H3.092 	c-1.224,0-2.217-1.304-2.217-2.912V3.662c0-1.608,0.993-2.912,2.217-2.912h12.316c1.225,0,2.217,1.304,2.217,2.912V19.838z"/> <path fill="#EAEAEA" d="M14.164,10.265c-0.084-0.261-0.44-0.391-1.068-0.391h-2.393l-0.73-2.191V7.672 	C9.839,7.27,9.688,7.002,9.519,6.868c-0.185-0.141-0.36-0.141-0.53,0C8.812,7.009,8.661,7.277,8.534,7.672l-0.37,1.101l-0.36,1.101 	H5.422c-0.353,0-0.642,0.051-0.868,0.153c-0.225,0.103-0.289,0.273-0.19,0.513c0.085,0.212,0.293,0.435,0.625,0.667l0.963,0.688 	l0.963,0.698l-0.72,2.191l-0.021,0.021C5.982,15.398,6,15.779,6.226,15.949c0.213,0.155,0.59,0.049,1.134-0.317l1.904-1.355 	l1.895,1.355l0.021,0.021c0.515,0.367,0.885,0.466,1.111,0.296c0.226-0.169,0.24-0.551,0.042-1.143l-0.011-0.011v-0.021l-0.72-2.181 	l1.874-1.344l0.021-0.021l0.021-0.021C14.033,10.84,14.248,10.526,14.164,10.265z"/> </svg> ');
         background-size: 21px 23px;
         background-repeat: repeat-x;
         background-position: 2px 0px;
         background-color: #666666;
         border: 1px solid #666666;
      }

      /* light them on hover ⭐⭐⭐ */
      #savedViewHUDButton:hover {
         background-image: url('data:image/svg+xml;utf8,<svg version="1.1" id="saved-view-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" 	 y="0px" width="18.5px" height="23.375px" viewBox="0 0 18.5 23.375" enable-background="new 0 0 18.5 23.375" 	 xml:space="preserve"> <path fill="#666666" stroke="#666666" stroke-miterlimit="10" d="M17.625,19.838c0,1.608-0.992,2.912-2.217,2.912H3.092 	c-1.224,0-2.217-1.304-2.217-2.912V3.662c0-1.608,0.993-2.912,2.217-2.912h12.316c1.225,0,2.217,1.304,2.217,2.912V19.838z"/> <path fill="#fe9" d="M14.164,10.265c-0.084-0.261-0.44-0.391-1.068-0.391h-2.393l-0.73-2.191V7.672 	C9.839,7.27,9.688,7.002,9.519,6.868c-0.185-0.141-0.36-0.141-0.53,0C8.812,7.009,8.661,7.277,8.534,7.672l-0.37,1.101l-0.36,1.101 	H5.422c-0.353,0-0.642,0.051-0.868,0.153c-0.225,0.103-0.289,0.273-0.19,0.513c0.085,0.212,0.293,0.435,0.625,0.667l0.963,0.688 	l0.963,0.698l-0.72,2.191l-0.021,0.021C5.982,15.398,6,15.779,6.226,15.949c0.213,0.155,0.59,0.049,1.134-0.317l1.904-1.355 	l1.895,1.355l0.021,0.021c0.515,0.367,0.885,0.466,1.111,0.296c0.226-0.169,0.24-0.551,0.042-1.143l-0.011-0.011v-0.021l-0.72-2.181 	l1.874-1.344l0.021-0.021l0.021-0.021C14.033,10.84,14.248,10.526,14.164,10.265z"/> </svg> ');
      border-color: #FE9;
      }

      /* ⭐ yellow fav-star ⭐ */
      div.pageStar.starred {
         background-image: 
            url('data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="1088px" height="1026px" viewBox="-41.75 -43.75 1088 1026" enable-background="new -41.75 -43.75 1088 1026" style="fill:#fe9;stroke:#db3;stroke-width:70px;"	 xml:space="preserve"> <path d="M995.711,355.384c-8.54-26.336-44.482-39.502-107.829-39.502H646.599L572.934,94.884v-1.068	c-13.522-40.569-28.824-67.617-45.906-81.139c-18.506-14.236-36.299-14.236-53.381,0c-17.795,14.233-33.098,41.28-45.908,81.139	L390.37,204.849l-36.299,111.033H113.856c-35.587,0-64.769,5.159-87.545,15.48c-22.775,10.32-29.181,27.579-19.217,51.78 c8.542,21.353,29.538,43.772,62.99,67.26l97.154,69.395l97.153,70.465l-72.598,220.997l-2.136,2.136	c-19.217,59.787-17.437,98.222,5.338,115.304c21.353,15.657,59.432,4.981,114.236-32.028l192.172-136.655L692.507,896.67	l2.135,2.135c51.958,37.012,89.324,46.977,112.102,29.895c22.776-17.082,24.2-55.517,4.271-115.304l-1.066-1.067v-2.135	l-72.6-219.931l188.971-135.588l2.136-2.136l2.135-2.135C982.544,413.389,1004.253,381.717,995.711,355.384z"/></svg>');
      }









      /* life logging beautifying tags */

      .contentTag[title="Filter @one"] {
      color: #ffffff !important;
      background-color:  #cccccc;
      padding-left:3px;
      padding-right: 3px;
      }
      .contentTag[title="Filter @one"]  span{
      color: #ffffff !important;
      text-decoration: none;
      }
      .contentTag[title*="@lifelog"] {
      color: #ffffff !important;
      background-color:  #cccccc;
      padding-left: 3px;
      padding-right: 3px;
      }
      .contentTag[title*="@lifelog"]  span{
      color: #ffffff !important;
      text-decoration: none;
      }
      .contentTag[title*="@product"] span{
      color: #000000 !important;
      text-decoration: none;
      }





      /* # done */
      div.project.done-proj > div.name > .bullet::before {
         display: block;
         left: 3px;
         position: relative;
         top: 1px;
         content:"✔";
      }
      div.project.done-proj > div.name > .bullet {
         background-image: none !important;
      }



      /* @ go-workflowy */
      .project .project .project .contentTag[title*="@go-workflowy"] {
         font-size: 44px;
         line-height:66px;
      }
      .project .project .project .contentTag[title*="@go-workflowy"] span {
         text-decoration:none;
         color:#000000;
      }


      /* big sized Startpage */
      #pageContainer > div > div.project.mainTreeRoot.open.selected > div.children > div > div.name {
         font-size: 120%;
         mmmargin-bottom: 10px;
         margin-top: 10px;
      }


      /* # bullet-free-area */
      div.project.bullet-free-area-proj a.bullet {
         background-image: none;
         background-color: transparent;
      }
      
      .project.highlight-rainbow-proj > div > .content{
         background-color:#ffdddd;
         animation:lightrainbow 10s infinite;
      }
      .project.area-highlight-rainbow-proj{
         background-color:#ffdddd;
         animation:lightrainbow 10s infinite;
      }
      @keyframes lightrainbow {
         0% {background-color: #ffdddd;}
         10% {background-color: #ffeedd;}
         20% {background-color: #ffffdd;}
         30% {background-color: #eeffdd;}
         40% {background-color: #ddffdd;}
         50% {background-color: #ddffee;}
         60% {background-color: #ddffff;}
         70% {background-color: #ddeeff;}
         80% {background-color: #ddddff;}
         90% {background-color: #eeddff;}
         100% {background-color: #ffddee;}
      }
      .project.color-rainbow-proj > .name{
         color:#ff0000;
         animation:rainbow 10s infinite;
      }
      @keyframes rainbow {
         0% {color: #aa0000;}
         10% {color: #aa5500;}
         20% {color: #aaaa00;}
         30% {color: #55aa00;}
         40% {color: #00aa00;}
         50% {color: #00aa55;}
         60% {color: #00aaaa;}
         70% {color: #0055aa;}
         80% {color: #0000aa;}
         90% {color: #5500aa;}
         100% {color: #aa0055;}
      }

      .project.uppercase-proj > div > .content {
         text-transform: uppercase;
      }
      .project.area-uppercase-proj {
         text-transform: uppercase;
      }
      .project.lowercase-proj > div > .content {
         text-transform: uppercase;
      }
      .project.area-lowercase-proj {
         text-transform: uppercase;
      }


      .project.h1-proj > .name > .content {
         font-family: "Copperplate";
         font-size: 24px;
      }
      .project.h1-proj {
         padding-top: 20px;
         padding-bottom: 10px;
      }

      .project.workflowytable-proj:not(.parent) > .children {
         display: flex !important;
      }

   `)
}
