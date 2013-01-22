$("#detail-page").bind("pageinit",function(){
	var db = window.openDatabase("wordslist.db","1.0","wordslist DB",2000000);
	db.transaction(getWordListFromDB,onDatabaseError);
});

var getWordListFromDB = function(tx){
	var sql = "SELECT jiaming,jieshi FROM " + tableName +
			" WHERE level0 = " + selectedPath.level0 +
			" AND level1 = " + selectedPath.level1 +
			" AND level2 = " + selectedPath.level2;
//	console.log("query sql is: " + sql);
	tx.executeSql(sql,[],querySuccess,queryFailed);
};

var querySuccess = function(tx,result){
//	console.log("selected rows is:" + result.rows.length);
//	console.log("selected rows[0] is:" + result.rows.item(0));
	showWordList(result.rows);
};

var queryFailed = function(tx,error){
	onError(error);
};

//UI ======================
var showWordList = function(list){
//	console.log("show word list run");
	var wordsList = $("#words-list-view").empty();
	for(var index = 0,length = list.length;index < length;index++){
		var worditem = list.item(index);
//        console.log("worditem is " + worditem);
		var cell = createAWordListCell(worditem);
		wordsList.append(cell);
	}
	wordsList.listview("refresh");
};

var createAWordListCell = function(worditem){
	var jiaming = $("<p />", {class: "word-list-jiaming"}).html(worditem.jiaming);
	var jieshi = $("<p />", {class: "word-list-jieshi"}).html(worditem.jieshi);
	var cell = $("<li />",{class:"word-cell"}).append(jiaming).append(jieshi);
	
	return cell;
	
}
