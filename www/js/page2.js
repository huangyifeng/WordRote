$("#page2Page").bind("pageinit",function(event,data){
	console.log("page2 init");
	$("#page2ListView").empty();
	$.get("../res/50yinRow.xml",null,function(xml){
		$(xml).find("item").each(function(index){
			var aItem = $("<a />",{href:"detail.html"}).html($(this).text());
			var listItem = $("<li />",{value:index,class:"li_level2"}).append(aItem);
			$("#page2ListView").append(listItem);
		});
		$(".li_level2").one("tap",function(){
			selectedPath.level2 = $(this).attr("value");
			console.log("page 2 tap value is %d",selectedPath.level2);
		});
		$("#page2ListView").listview("refresh");
	},"xml");
});