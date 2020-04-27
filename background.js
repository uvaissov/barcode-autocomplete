var storage = chrome.storage.sync;
var tasks = new Array();

function parseResult(text) {
    const title = text.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    if(title && title.indexOf('Штрих-код')>3){
        const index = title.indexOf('Штрих-код');
        const result = title.substr(0,index - 3)
        return result
    }
    return null
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'queryBarcode') {          
        var url = `https://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=${encodeURIComponent(request.barcode)}`
            
        fetch(url)
            .then(response => response.text())
            .then(text => parseResult(text))
            .then(result => sendResponse(result))
            .catch(error => sendResponse(error))
        return true;  // Will respond asynchronously.
      }
    });


var show = function(text) {
    var notification = window.webkitNotifications.createNotification('icon_small.png','Есть дело', text);
    notification.show();    
}

var getCookie = function(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}