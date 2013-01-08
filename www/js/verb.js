$("#verbPage").bind("pageinit",function(event,data){
	console.log("verbPage page init");
	$.get("../res/verb.xml",null,function(xml){
		$("#verbListView").empty();
		$(xml).find("item").each(function(index){
			var aItem = $("<a />",{href:"page2.html"}).html($(this).text());
			var listItem = $("<li></li>",{class:"li_level1",value:index}).append(aItem);
			$("#verbListView").append(listItem);
		});
		$(".li_level1").one("tap",function(event,data){
			var value = $(this).attr("value");
			selectedPath.level1 = value;
			console.log("value is %d",value);
		});
		$("#verbListView").listview("refresh");
	},"xml");
});
