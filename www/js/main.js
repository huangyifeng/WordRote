var selectedPath = {
	level0 : 0,
	level1 : 0,
	level2 : 0
};

var wordsFromFile = null;

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
	wordsFromFile = wordsArray;
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",1000000);
	db.transaction(initDB,onError,initDBSuccess);
};

var initDB = function(transaction){
	var tableName = "Words";
	transaction.executeSql("Drop table if exists " + tableName);
	transaction.executeSql("Create table if not exists " + tableName + 
			"('col_id' INTEGER PRIMARY KEY AUTOINCREMENT," +
			"'level0' INTEGER DEFAULT 0," +
			"'level1' INTEGER DEFAULT 0," +
			"'level2' INTEGER DEFAULT 0," +
			"'jiaming' VARCHAR(255)," +
			"'jieshi' VARCHAR(255))");
};

var initDBSuccess = function(){
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",1000000);
	db.transaction(insertRecords,onError,insertRecordsSuccess);
};

var insertRecords = function(tx){
	var tableName = "Words";
	for(var item in wordsFromFile){
		var sql = "INSERT INTO " + tableName + 
				"('level0','level1','level2','jiaming','jieshi') " +
				"VALUES " +
				"(" + item[0] + ", " +
					item[1] + ", " +
					item[2] + ", " +
					"'" + item[3] + "'" +
					"'" + item[4] + "'" +
				")";
		tx.executeSql(sql);
	}
	wordsFromFile = null;
};

var insertRecordsSuccess = function(){
	alert("数据终于他妈的都插入了");
};

// =========================================

var onError = function(evt){
	alert("草，怎么出错了！算了，联系作者吧。");
};