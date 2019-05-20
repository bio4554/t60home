(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-3753530-10', 'auto');
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview', '/background.html');

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(
		null, 
		{file: "content_script.js"}
	);
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request.request == "storage")	{
		var la=localStorage["lang"], link=0, fmt=localStorage["format"];
		if (typeof la=="undefined") {
			la=chrome.i18n.getMessage("lang");
		}
		var li=localStorage["link"];
		if (typeof li!="undefined" && li=="0") {
			link=1;
		}
		if (typeof fmt=="undefined") {
			fmt="epub";
		}
		sendResponse(
			{"lang": la, "link": link, "format": fmt}
		);
	}else{
		sendResponse({});
	}
}); 
