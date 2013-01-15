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
	
	// cvs operation ===========================
	
	$(document).bind("deviceready",function(){
		$("#refresh-btn").live("tap",readCSV);
	});
});

var readCSV = function()
{
	console.log("begin read csv");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
};


var onFileSystemSuccess = function(fileSystem){
	fileSystem.root.getFile("wordlist.csv",null,gotFileEntry,onError);
	console.log("file system OK");
};

var gotFileEntry = function(fileEntry){
	fileEntry.file(gotFile,onError);
};

var gotFile = function(file){
	var reader = new FileReader();
	reader.onloadend = function(evt){
		parseCSV(evt.target.result);
	};
	reader.readAsText(file);
};


var parseCSV = function(csvString)
{
    $.csv.toArrays(csvString,{},saveWordsToDB);
};

// db operation ============================

var saveWordsToDB = function(error,wordsArray)
{
	console.log(wordsArray);
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",1000000);
	db.transaction("initDB")
};

// =========================================

var onError = function(evt){
	alert("an error occurred");
};