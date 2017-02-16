/**
 * 判断浏览器的类型以及版本号
 * 
 */
var userAgent = navigator.userAgent;   
var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;     
var rFirefox = /(firefox)\/([\w.]+)/;     
var rOpera = /(opera).+version\/([\w.]+)/;     
var rChrome = /(chrome)\/([\w.]+)/;     
var rSafari = /version\/([\w.]+).*(safari)/;    
var browser;    
var version;    

var ua = userAgent.toLowerCase(); 

function uaMatch(ua){    
  var match = rMsie.exec(ua);    
  if(match != null){    
    return { browser : "IE", version : match[2] || "0" };    
  }    
  var match = rFirefox.exec(ua);    
  if (match != null) {    
    return { browser : match[1] || "", version : match[2] || "0" };    
  }    
  var match = rOpera.exec(ua);    
  if (match != null) {    
    return { browser : match[1] || "", version : match[2] || "0" };    
  }    
  var match = rChrome.exec(ua);    
  if (match != null) {    
    return { browser : match[1] || "", version : match[2] || "0" };    
  }    
  var match = rSafari.exec(ua);    
  if (match != null) {    
    return { browser : match[2] || "", version : match[1] || "0" };    
  }    
  if (match != null) {    
    return { browser : "", version : "0" };    
  }    
}  

function getBrowserType(){
	var browserInfo = uaMatch(ua);
	return browserInfo.browser;
};  
function getBrowserVersion(){
	var browserInfo = uaMatch(ua);
	return browserInfo.version;
};
function getBrowserTypeAndVersion(){
	var browserInfo = uaMatch(ua);
	return browserInfo.browser + browserInfo.version;
}
