/************************************************************************************
The appAPI.ready() code block will be executed on every page load.
*************************************************************************************/

appAPI.ready(function($) {

    appAPI.selectedText(function(text, event) {
        // Removes previous #popupText elements
        $(".popupTranslatedText").remove();
        
        appAPI.request.get({
          url: "https://translate.google.com/translate_a/single?client=t&sl=en&tl=bn&hl=en&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&dt=sw&ie=UTF-8&oe=UTF-8&prev=btn&rom=1&ssel=0&tsel=0&q="+text,
          
          onSuccess: function(response) {
            var data = response.toString();
            //process data
            data = " &nbsp; &nbsp; '" + text.toString().trim() + "': " + data.substring(data.indexOf('"')+1, data.indexOf('"', data.indexOf('"') + 1));
            console.log("postback succeeded with response: " + response);
            // Adds the hidden popup to the page
            $("<p>").attr({
                // The class for the popup
                class : 'popupTranslatedText',
            }).html(data).css({
                'position': 'fixed',
                'top': '50%',
                'right': '10px',
                'width': '200px',
                'line-height': '100px',
                'z-index': '9999',
                'background-color': '#490505',
                'color' : 'white',
                'border': '8px solid #666',
                '-webkit-border-radius': '30px',
                '-moz-border-radius': '30px',
                'border-radius': '30px',
                '-webkit-box-shadow': '2px 2px 4px #888',
                '-moz-box-shadow': '2px 2px 4px #888',
                'box-shadow': '2px 2px 4px #888'
                    
    
            // Slowly fade the popup in
            }).hide().appendTo('body').fadeIn('slow');

            $(document).mousedown(function(){
                $(".popupTranslatedText").fadeOut("slow");
            }); 
          },
          onFailure: function(httpCode) {
            console.log("postback failure: " + httpCode);
            
            $(document).mousedown(function(){
                $(".popupTranslatedText").fadeOut("slow");
            }); 
          },

          contentType: 'application/text'
        });
        
  
    }, {
        // Min selection length to trigger callback
        minlength: 2,
        // Max selection length to trigger callback
        maxlength: 25
    });
});
