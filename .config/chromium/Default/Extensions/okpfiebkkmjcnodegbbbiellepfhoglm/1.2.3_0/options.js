(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-3753530-10', 'auto');
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview', '/options.html');

function setChildTextNode(elementId, text) {
	document.getElementById(elementId).innerText = text;
}

function restore_options() {
	var 
		lang=chrome.i18n.getMessage("lang"),
		opt=chrome.i18n.getMessage("opt"),
		label=document.getElementsByTagName('label')
	;
	document.getElementsByTagName('button')['0'].innerHTML=chrome.i18n.getMessage("save");
	label['0'].innerHTML=chrome.i18n.getMessage("remove");
	label['3'].innerHTML=chrome.i18n.getMessage("langtxt");
	document.getElementById('note').innerHTML=chrome.i18n.getMessage("note");
	document.querySelector('#warn strong').innerHTML=chrome.i18n.getMessage("wtitle");
	document.querySelector('#warn span').innerHTML=chrome.i18n.getMessage("wmsg");
	document.getElementsByTagName('h2')['0'].innerHTML=opt;
	document.title+=" "+opt;

	switch(lang){
		case "es":
			document.getElementById('la').innerHTML="<option value=\"es\">"+chrome.i18n.getMessage("es")+"</option><option value=\"ca\">"+chrome.i18n.getMessage("ca")+"</option><option value=\"en\">"+chrome.i18n.getMessage("en")+"</option>";
			break;
		case "ca":
			document.getElementById('la').innerHTML="<option value=\"ca\">"+chrome.i18n.getMessage("ca")+"</option><option value=\"es\">"+chrome.i18n.getMessage("es")+"</option><option value=\"en\">"+chrome.i18n.getMessage("en")+"</option>";
			break;
		default:
			document.getElementById('la').innerHTML="<option value=\"en\">"+chrome.i18n.getMessage("en")+"</option><option value=\"es\">"+chrome.i18n.getMessage("es")+"</option><option value=\"ca\">"+chrome.i18n.getMessage("ca")+"</option>";
	}

	var li=localStorage["link"], la=localStorage["lang"], fmt=localStorage["format"];
	if (typeof(la)=="undefined") {
		li="1";
		la=lang;
		fmt="epub";
	}
	document.getElementById('li').checked=parseInt(li);
	document.getElementById('la').value=la;
	if (fmt=="epub"){
		document.getElementById('epub').checked=true;
	}else{
		document.getElementById('mobi').checked=true;
	}
}

function save() {
	var li=document.getElementById('li').checked, la=document.getElementById('la').value, fmt=(document.getElementById('mobi').checked)? "mobi": "epub";
	localStorage["link"] = (li) ? 1 : 0;
	localStorage["lang"] = la;
	localStorage["format"] = fmt;
	setChildTextNode("msg", chrome.i18n.getMessage("saved"));
	setTimeout(function() {
		setChildTextNode("msg", "");
	}, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', save);
	restore_options()
});