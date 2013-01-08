var selectedPath = {
	level0 : 0,
	level1 : 0,
	level2 : 0
};

$(document).bind("mobileinit",function(event,data){
	$.mobile.defaultPageTransition = "slide";
});

$("#mainPage").live("pageinit",function(event,data){
	$.mobile.changePage("./html/verb.html",{
		transition:"flip",
	});
});