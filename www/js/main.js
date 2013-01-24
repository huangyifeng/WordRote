var selectedPath = {
	level0 : 0,
	level1 : 0,
	level2 : 0
};

var tableName = "tab_words";
var isEverImportDataKey = "com.huangyifeng.isEverImportData";
var isEverImportDataValue = "com.huangyifeng.isEverImportData.Yes";

var wordsFromFile = null;

$(document).bind("mobileinit",function(event,data){
	$.mobile.defaultPageTransition = "slide";
});

$("#mainPage").live("pageinit",function(event,data){
	$.mobile.changePage("./html/verb.html");
	$(".li_level0").live("tap",function(event,data){
		selectedPath.level0 = $(this).attr("value");
	}).eq(selectedPath.level0).addClass("ui-btn-active");
	
	// cvs operation ===========================
	
	$(document).bind("deviceready",function(){
		$("#refresh-btn").live("tap",readCSV);
        var storagedValue = window.localStorage.getItem(isEverImportDataKey);
        if(isEverImportDataValue != storagedValue){
            $("#refresh-btn").trigger("tap");
        }
	});
                    
});

var readCSV = function()
{
    $.mobile.showPageLoadingMsg("b","别急，帮你导入文件呢。",false);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileError);
};

var onFileSystemSuccess = function(fileSystem){
	fileSystem.root.getFile("wordlist.csv",null,gotFileEntry,onFileError);
//	console.log("file system OK");
};

var gotFileEntry = function(fileEntry){
	fileEntry.file(gotFile,onFileError);
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
//    console.log("csv string is: " + csvString);
    $.csv.toArrays(csvString,{},saveWordsToDB);
};

// db operation ============================

var saveWordsToDB = function(error,wordsArray)
{
	wordsFromFile = wordsArray;
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",2000000);
	db.transaction(initDB,onDatabaseError,initDBSuccess);
};

var initDB = function(transaction){
	transaction.executeSql("Drop table if exists " + tableName);
	var createSql = "Create table if not exists " + tableName + 
			"('col_id' INTEGER PRIMARY KEY AUTOINCREMENT," +
			"'level0' INTEGER DEFAULT 0," +
			"'level1' INTEGER DEFAULT 0," +
			"'level2' INTEGER DEFAULT 0," +
			"'jiaming' VARCHAR(255)," +
			"'jieshi' VARCHAR(255))";
//    console.log("create table statement: " + createSql);
	transaction.executeSql(createSql);
};

var initDBSuccess = function(){
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",2000000);
	db.transaction(insertRecords,onDatabaseError,insertRecordsSuccess);
};

var insertRecords = function(tx){
	for(var index = 0,length = wordsFromFile.length; index < length; index++)
	{
		var item = wordsFromFile[index];
        if(item[0] == "" || item[0] == undefined){
        	continue;
        }
		var sql = "INSERT INTO " + tableName + 
				" (level0,level1,level2,jiaming,jieshi) " +
				"VALUES " +
				"(" + item[0] + ", " +
					item[1] + ", " +
					item[2] + ", " +
					"'" + item[3] + "', " +
					"'" + item[4] + "'" +
				");";
//        console.log("insert statement is : " + sql);
		tx.executeSql(sql);
	}
	wordsFromFile = null;
};

var insertRecordsSuccess = function(){
	alert("数据终于他妈的都插入了");
    $.mobile.hidePageLoadingMsg();
    window.localStorage.setItem(isEverImportDataKey,isEverImportDataValue);
};

// =========================================

var onFileError = function(error){
    if(error.code == FileError.NOT_FOUND_ERR){
    	showError("大哥，你文件都没放进来，我怎么导入啊。");
    }
    else{
    	onError(error);
    }
};

var onDatabaseError = function(error){
	onError(error);
};

var onError = function(error){
	showError("草，怎么出错了！联系作者吧。");
};

var showError = function(msg){
	alert(msg);
};