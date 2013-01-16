$("#detail-page").bind("pageinit",function(){
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",2000000);
	db.transaction(getWordListFromDB,onDatabaseError);
});

var getWordListFromDB = function(tx){
	var sql = "SELECT jiaming,jieshi FROM " + tableName +
			" WHERE level0 = " + selectedPath.level0 +
			" AND level1 = " + selectedPath.level1 +
			" AND level2 = " + selectedPath.level2;
	console.log("query sql is: " + sql);
	tx.executeSql(sql,[],querySuccess,queryFailed);
};

var querySuccess = function(tx,result){
	console.log("selected rows is:" + result.rows.length);
	showWordList(result.rows);
};

var queryFailed = function(tx,error){
	onError(error);
};

//UI ======================
var showWordList = function(list){
	console.log(list);
	console.log(list.item(0));
};
