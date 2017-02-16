(function ($) {
    $.fn.extend({
    	"beforePrint": function(options){
    		var defaults = {};
    		var opts = $.extend({},defaults,options);
    		return this.each(function(i,o){ 
    			$(o).find("thead").remove();
    			var $tbody = $(o).find("tbody:first").each(function(i,o){
    				var $trs = $(o).find("tr").each(function(i,o){
    					$(o).find("th").remove();
    					var tdhide = "display: none";
    					$(o).find("td").each(function(i,o){
    						var t = $(o).text();
    						var tdStyle = $(o).attr("style");
    						tdStyle = tdStyle+"";
    						if(tdStyle.indexOf(tdhide) > -1){
    							$(o).remove();
    						}
    						var tdClass = $(o).attr("class");
    						tdClass = tdClass + "";
    						if(tdClass.indexOf("htAutocomplete") != -1){
    							$(o).find(".htAutocompleteArrow").remove();
    						}
    						if(tdClass.indexOf("htLeft") != -1){
    							$(o).css({"border":"#000 1px solid","text-align":"left"});
    						}else if(tdClass.indexOf("htCenter")!=-1){
    							$(o).css({"border":"#000 1px solid","text-align":"center"});
    						}else if(tdClass.indexOf("htRight")!=-1){
    							$(o).css({"border":"#000 1px solid","text-align":"right"});
    						}else{
    							$(o).css("border","#000 1px solid");
    						}
    						if(t.indexOf("纳税人签字：")!= -1){
    							$(o).parent().nextAll("tr").each(function(i2,o2){
    								$(o2).children('td').last().remove();
    							});
    							$(o).parent().children('td').last().remove();
    							$(o).parent().nextAll("tr").remove();
    							$(o).css({"border":"#000 1px solid","text-align":"center"});
    						}
    						if((t.indexOf("授权声明")!=-1)){
    							$(o).parent().attr("style", "font-weight:bold;height:100px;border:#000 1px solid");
    						
    						}
    						if((t.indexOf("主管税务机关：")!=-1)){	
    							$(o).parent().attr("style", "font-weight:bold;height:40px;border:#000 1px solid");
    							
    						}
    						if((t.indexOf("纳税人识别号：")!=-1)){	
    							$(o).parent().parent().parent().attr("style", "width:100%");
    							$(o).parent().children().slice(4, 25).each(function(i,e){
    								$(e).attr("style","width:3%");
    							});
    						}
    					});
    					
    				});
    				
    			});
    			
    		});
    		
    	}
    
    });
})(window.jQuery);