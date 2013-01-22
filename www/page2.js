$("#page2Page").live(
                     "pageinit",
                     function(event, data) {
                     console.log("page2 init");
                     $("#page2ListView").empty();
                     //               $.get("wushiyin.xml",null,function(xml){
                     //                  console.log("xml : ");
                     //				var wordType = null;
                     //				if (0 == selectedPath.level0) {
                     //					wordType = "verb";
                     //				}
                     //				var nodeName = wordType + "_type_list_" + selectedPath.level1;
                     //				$(xml).find("string-array[name='" + nodeName + "']").find(
                     //						"item").each(function(index) {
                     //					var aItem = $("<a />", {
                     //						href : "detail.html"
                     //					}).html($(this).text());
                     //					var listItem = $("<li />", {
                     //						value : index,
                     //						class : "li_level2"
                     //					}).append(aItem);
                     //					$("#page2ListView").append(listItem);
                     //				});
                     //				$(".li_level2").one("tap", function() {
                     //					selectedPath.level2 = $(this).attr("value");
                     ////					console.log("page 2 tap value is %d", selectedPath.level2);
                     //				});
                     //				$("#page2ListView").listview("refresh");
                     //			});
                     $.ajax({
                            url: "wushiyin.xml",
                            success: function(html){
                            console.log("load sucess");
                            },
                            error:function(XMLHttpRequest, textStatus, errorThrown){
                            console.log("load error : " + XMLHttpRequest.status);
                            console.log("url is :" + document.location.href);
                            }
                            });
                     });