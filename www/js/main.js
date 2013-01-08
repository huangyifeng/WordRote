var selectedPath = {
	level0 : 0,
	level1 : 0,
	level2 : 0
};

$(document).bind("mobileinit",function(event,data){
	$.mobile.defaultPageTransition = "slide";
});

$("#mainPage").live("pageinit",function(event,data){
	$.mobile.changePage("./html/verb.html");
	$(".li_level0").live("tap",function(event,data){
		selectedPath.level0 = $(this).attr("value");
		console.log("tap fired : %d",selectedPath.level0);
	}).eq(selectedPath.level0).addClass("ui-btn-active");
});