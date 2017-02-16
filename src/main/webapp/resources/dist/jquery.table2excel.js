/*
 *  jQuery table2excel - v1.0.2
 *  jQuery plugin to export an .xls file in browser from an HTML table
 *  https://github.com/rainabba/jquery-table2excel
 *
 *  Made by rainabba
 *  Under MIT License
 */
//table2excel.js
;(function ( $, window, document, undefined ) {
	var pluginName = "table2excel",

	defaults = {
    			name: "Table2Excel"
	};

	// The actual plugin constructor
	function Plugin ( element, options ) {
			this.element = element;
			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			//
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
	}

	Plugin.prototype = {
		init: function () {
			var e = this;
			
			var hidetable = $(e.element).clone().hide();

			e.template = {
				head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><meta charset=\"UTF-8\"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
				sheet: {
					head: "<x:ExcelWorksheet><x:Name>",
					tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
				},
				mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
				table: {
					head: "<table>",
					tail: "</table>"
				},
				foot: "</body></html>"
			};

			e.tableRows = [];
			var thead_flag = 0;

			// get contents of table except for exclude
			//$(e.element).each( function(i,o) {
			hidetable.each( function(i,o) {
				var tempRows = "";
				//alert($(o).find("tr"));
				var theadNumber = 0;
				//alert("here")
				$(o).find("tr").each(function (i,o) {
					
					if($(o).find("th").length > 1){
						thead_flag = 1;
						theadNumber +=1;
					}
					$(o).find("thead").remove();
					$(o).find("th").remove();
					
					var tdhide = "display: none";
					
					
					
					$(o).find("td").each(function(j,s){
						var m = s.outerHTML;
						
						var t = $(s).text();
						if(m.indexOf(tdhide)!=-1){
							$(s).remove();
						}
						
						//class="htDimmed htAutocomplete"下拉
						var classStr = $(s).attr('class');
						//<div class="htAutocompleteArrow">▼</div>
						if(classStr.indexOf("htAutocomplete") != -1){
							$(s).find(".htAutocompleteArrow").remove();
						}
						
						if(t.indexOf("纳税人签字：")!= -1){
							$(s).parent().nextAll("tr").each(function(i2,o2){
								$(o2).children('td').last().remove();
							});
							$(s).parent().children('td').last().remove();
							$(s).parent().nextAll("tr").remove();
							s.style.cssText="border : 0.1pt  solid;text-align: center;";
						}
						
						if(classStr.indexOf("htLeft") != -1){
							s.style.cssText="border : 0.1pt  solid;text-align: left;";
						}else if(classStr.indexOf("htCenter")!=-1){
							s.style.cssText="border : 0.1pt  solid;text-align: center;";
						}else if(classStr.indexOf("htRight")!=-1){
							s.style.cssText="border : 0.1pt  solid;text-align: right;";
						}else{
							s.style.cssText="border : 0.1pt  solid;";
						}
						
					});
					
					if(theadNumber==2){
						return true;
					}
					
					tempRows += "<tr>" + $(o).html() + "</tr>";
					
					
				});
				
				if(thead_flag == 1){
					e.tableRows.push(tempRows.substring(9));
				}else{
					e.tableRows.push(tempRows);
				}
				
			});

			//e.tableRows = "<table><tr><td>abc</td></tr><tr><td>abc</td></tr></table>";

			e.tableToExcel(e.tableRows, e.settings.name);
		},

		tableToExcel: function (table, name) {
			var e = this, fullTemplate="", i, link, a;

			
			if(window.btoa){
				e.uri = "data:application/vnd.ms-excel;base64,";
				//e.uri = "data:application/vnd.ms-excel;filename="+"aa.xls"+";base64,";
				
				e.base64 = function (s) {
					return window.btoa(unescape(encodeURIComponent(s)));
				};
				e.format = function (s, c) {
					return s.replace(/{(\w+)}/g, function (m, p) {
						return c[p];
					});
				};
				e.ctx = {
					worksheet: name || "Worksheet",
					table: table
				};

				fullTemplate= e.template.head;

				if ( $.isArray(table) ) {
					for (i in table) {
						//fullTemplate += e.template.sheet.head + "{worksheet" + i + "}" + e.template.sheet.tail;
						fullTemplate += e.template.sheet.head + "Table" + i + "" + e.template.sheet.tail;
					}
				}

				fullTemplate += e.template.mid;

				if ( $.isArray(table) ) {
					for (i in table) {
						fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
					}
				}

				fullTemplate += e.template.foot;

				for (i in table) {
					e.ctx["table" + i] = table[i];
				}
				delete e.ctx.table;


	        	link = e.uri;
	        	link += e.base64(e.format(fullTemplate, e.ctx));
        		//link = e.uri + window.Base64.encode(e.format(fullTemplate, e.ctx));
	        	//window.location.href = link;
	        	
				var userAgent = navigator.userAgent; 
				if (userAgent.indexOf("Firefox") > -1) {
					window.location.href = link;
					/*fileName = getFileName(e.settings);
					fileName = new String(fileName.getBytes(), "ISO-8859-1"); 
					e.uri = "data:application/vnd.ms-excel;filename="+fileName+";base64,";
					link = e.uri + e.base64(e.format(fullTemplate, e.ctx));*/
			    }else{
					a = document.createElement("a");
					a.download = getFileName(e.settings);
					a.href = link;
					a.click();
			    }
				
				
				
			}else{
	        		
	        		table = '<table>'+table+'</table>';
	        		//str table
	        		//var tableElementShow = document.getElementById("table_cell_tz");
	        		
	        		var tableElement = document.getElementById("table_cell_tz_1");
	        		$(tableElement).html(table);
	        		
	        		var oXL;  
	                try{  
	                    oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel  
	                }catch(e){  
	                    alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，"+"那么请调整IE的安全级别。\n\n具体操作：\n\n"+"工具 → Internet选项 → 安全 → 自定义级别 → 1.对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用;2.允许对剪切板进行编程访问→ 启用");  
	                    return false; 
	                }  
	                var oWB = oXL.Workbooks.Add(); //获取workbook对象  
	                var oSheet = oWB.ActiveSheet;//激活当前sheet  
	                var sel = document.body.createTextRange();  
	                sel.moveToElementText(tableElement); //把表格中的内容移到TextRange中  
	                sel.select(); //全选TextRange中内容  
	                sel.execCommand("Copy");//复制TextRange中内容  
	                oSheet.Paste();//粘贴到活动的EXCEL中  
	                oXL.Visible = true; //设置excel可见属性  
	                var fname = oXL.Application.GetSaveAsFilename(getFileName(e.settings), "Excel Spreadsheets (*.xls), *.xls");  
	                oWB.SaveAs(fname);  
	                oWB.Close();  
	                oXL.Quit();
	        		
	        	}

			return true;

		}
	};

	function getFileName(settings) {
		return ( settings.filename ? settings.filename : "未命名文件") + ".xls";
	}


	$.fn[ pluginName ] = function ( options ) {
		var e = this;
			e.each(function() {
					if ( !$.data( e, "plugin_" + pluginName ) ) {
							$.data( e, "plugin_" + pluginName, new Plugin( this, options ) );
					}
			});

			// chain jQuery functions
			return e;
	};

})( jQuery, window, document );
