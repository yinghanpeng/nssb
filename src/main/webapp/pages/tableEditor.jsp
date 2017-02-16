<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>纳税申报-报表模板编辑器</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- jquery -->
<script type="text/javascript" src="<%=path%>/resources/jquery.min.js"></script>
<!-- zTree -->
<script type="text/javascript"
	src="<%=path%>/resources/jquery-zTree/js/jquery.ztree.all-3.5.js"></script>
<link rel="stylesheet"
	href="<%=path%>/resources/jquery-zTree/css/zTreeStyle.css"
	type="text/css">
<!-- layer -->
<script type="text/javascript" src="<%=path%>/resources/layer/layer.js"></script>
<!-- bootstrap -->
<script type="text/javascript"
	src="<%=path%>/resources/bootstrap-3.3.6/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=path%>/resources/bootstrap-3.3.6/css/bootstrap.min.css">
<!-- handsontable -->
<script type="text/javascript"
	src="<%=path%>/resources/handsontable/js/handsontable.full.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=path%>/resources/handsontable/css/handsontable.full.min.css">

<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

html {
	height: 100%;
}

body {
	width: 100%;
	height: 100%;
}

.iContainer {
	padding: 0 0 0 200px;
	width: 100%;
	height: 100%;
}

.iMiddle {
	padding-left: 20px;
	width: 100%;
	height: 93%;
	float: left;
}

#table {
	position: relative;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: auto;
}

.iLeft {
	width: 200px;
	height: 100%;
	float: left;
	margin-left: -100%;
	position: relative;
	left: -200px;
}

.iRight {
	width: 300px;
	height: 100%;
	float: left;
	margin-left: -300px;
	position: relative;
	right: -300px;
}
</style>
</head>
<body>
	<div class="iContainer">
		<div class="iMiddle">
			<form class="form-horizontal" role="form">
				<div class="form-group col-xs-6">
					<label for="inputEmail3" class="col-sm-2 control-label">表名</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="table_name">
					</div>
				</div>
				<div class="form-group col-xs-6">
					<label for="inputPassword3" class="col-sm-2 control-label">tableID</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="table_id">
					</div>
				</div>
				<div class="form-group col-xs-6">
					<label for="inputPassword3" class="col-sm-2 control-label">状态</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="tzNssb">
					</div>
				</div>
				<div class="form-group col-xs-6">
					<label for="inputPassword3" class="col-sm-2 control-label">一级项目</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="oneMenus"
							name="oneMenus">
					</div>
				</div>
				<div class="form-group col-xs-6">
					<label for="inputPassword3" class="col-sm-2 control-label">二级项目</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="twoMenus"
							name="twoMenus">
					</div>
				</div>
				<div class="text-right"
					style="padding-right: 75px; padding-bottom: 8px;">
					<button type="button" class="btn btn-success" id="save">save</button>
					<button type="button" class="btn btn-primary" id="load">load</button>
					<button type="button" class="btn btn-warning" id="clear">clear</button>
				</div>
			</form>
			<table id="table"></table>
		</div>
		<div class="iLeft">
			<ul id="treeDemo" class="ztree">
			</ul>
			<div></div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var hot,tree,treeid;
	//hot:表格对象,tree:树节点对象,setting加载树时参数设置,treeid:树节点id

			//保存表样
			function saveTableStyle(hot) {	
			var ret = new Object();
			//1.保存表行列数
			var rows = hot.countRows();
			var cols = hot.countCols();
			//ret['maxRows'] = rows;
			//ret['maxCols'] = cols;
			//2.保存行高列宽
			var rowHeights = new Array(); 
			var colWidths = new Array();
			//2.1.行
			for(var i=0;i<rows;i++){		
				rowHeights.push(hot.getRowHeight(i));
			}
			ret['rowHeights'] = rowHeights;
			//2.2.列
			for(var j=0;j<cols;j++){				
				colWidths.push(hot.getColWidth(j));
			}
			ret['colWidths'] = colWidths;
			//3.保存合并单元格
			if(hot.mergeCells){
				ret['mergeCells'] = hot.mergeCells.mergedCellInfoCollection;
			};
			//4.循环每一个单元格			
			var cell = new Array();
			var customBorders = new Array();
			for(var i=0;i<rows;i++){
				for(var j=0;j<cols;j++){
				/*
					if(hot.getCell(i,j,true)!==undefined&&hot.getCell(i,j,true)!==null){
						var style = new Object();
						style['backgroundColor'] = hot.getCell(i,j,true).style.backgroundColor;
						cell['style'] = style;
					}
					*/
					//边框
					if(hot.getCellMeta(i,j).borders!==undefined&&hot.getCellMeta(i,j).borders!==null){
						var borders = hot.getCellMeta(i,j).borders;
						delete borders.instance;
						customBorders.push(borders);
					}
					//保存表格只读、合并单元格
					var meta = hot.getCellMeta(i,j);
					delete meta.instance;
					cell.push(meta);					
				}
			}
			//保存表格边框、只读、合并单元格
			ret['cell'] = cell;
			ret['customBorders'] = customBorders;
			//格子内的数据
			ret['data'] = hot.getData();			
			return ret;
			};
	$('#save').click(function(){
	
			 var name = $("#table_name").val().trim();
     		 var id = $("#table_id").val().trim();  
     		 var tzNssb=$("#tzNssb").val().trim();   
     		 var oneMenus = $("#oneMenus").val().trim();	
     		 var twoMenus = $("#twoMenus").val().trim();	 

			 var ok = true;
		      if(name==""){
		    	  alert("请输入table_name");
		          ok = false;
		          return;
		      }
		      if(id==""){
		    	  alert("请输入id");
		          ok = false;
		          return;
		      }
		      if(oneMenus==""){
		    	  alert("请输入一级项目");
		          ok = false;
		          return;
		      }
		      if(twoMenus==""){
		    	  alert("请输入二级项目");
		          ok = false;
		          return;
		      }
		      if(ok){
		        //发送Ajax请求
		        var tableModel = saveTableStyle(hot);
		        $.ajax({
					url:"<%=path%>/interface/addTableModel.do",
					type : "post",
					data:{"modelId":id,"tableModel":JSON.stringify(tableModel),"modelName":name,"tzNssb":tzNssb,"twoMenus":twoMenus,"oneMenus":oneMenus},
					dataType : "json",
					success : function(data) {
							
							$.ajax({
								url : "<%=path%>/interface/LoadModelName.do",
								type : "post",
								data : {"sortName": "", "sortOrder": "asc", "pageSize": 30, "pageNumber": 1},
								dataType : "json",
								success : function(data) {
										//var arr = JSON.parse(data);
										
										var ob = new Array();
										$.each(data.rows, function(idx, obj) {
											var bo = new Object();
											bo['id'] = obj.MODEL_ID;
											bo['name'] = obj.MODEL_NAME;
											bo['tz_nssb'] = obj.TZ_NSSB;
											bo['oneMenus'] = obj.ONE_MENUS;
											bo['twoMenus'] = obj.TWO_MENUS;
											ob.push(bo);
										});
									zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, ob);
									layer.msg("保存成功!");
								}
							});
					}
				});	     
		     }	
	});
	$('#load').click(function(){
		reNewTable($("#table_id").val().trim())
	});
	$('#clear').click(function(){
		console.info(hot.getSettings());
	});
	function reNewTable(){
	console.log(tree.id+tree.tzNssb);
			$.ajax({
					url : "<%=path%>/interface/LoadTableModel.do",
					type : "post",
					dataType : "json",
					data : {"modelId":tree.id,"sortName": "", "sortOrder": "asc", "pageSize": 30, "pageNumber": 1,"tzNssb":tree.tzNssb},
					
					success : function(data) {	
					console.log(data);		
					$("#table_name").val(tree.name);
					$("#table_id").val(tree.id);
					$("#tzNssb").val(tree.tzNssb);
					$("#oneMenus").val(tree.oneMenus);
					$("#twoMenus").val(tree.twoMenus);
					var settings = JSON.parse(JSON.parse(data));
					settings['rowHeaders'] = true;
					settings['colHeaders'] = true;
					settings['contextMenu'] = true;
					settings['outsideClickDeselects'] = true;
					settings['manualColumnResize'] = true;
					settings['manualRowResize'] = true;
					//settings['minSpareRows'] = 1;
					//settings['minSpareCols'] = 1;
					/* if(settings.customBorders.length===0){
						settings.customBorders = true;
					} */
					hot.destroy();
					hot = new Handsontable($('#table')[0],settings);		
					}
				});
	};
	function zTreeOnClick(event, treeId, treeNode){
			tree=treeNode;
			console.log("tree"+JSON.stringify(tree));
			reNewTable();		
	}
	 function addDiyDom(treeId, treeNode) {
            var spaceWidth = 5;
            var switchObj = $("#" + treeNode.tId + "_switch"),
            icoObj = $("#" + treeNode.tId + "_ico");
            switchObj.remove();
            icoObj.parent().before(switchObj);
            var spantxt = $("#" + treeNode.tId + "_span").html();
            if (spantxt.length > 13) {
                spantxt = spantxt.substring(0, 13) + "...";
                $("#" + treeNode.tId + "_span").html(spantxt);
            }
        }
	$(function() {
		hot = new Handsontable($('#table')[0], {
		//新建一个1000行16列的表格
		data:Handsontable.helper.createSpreadsheetData(20, 20),
		//表格头
		rowHeaders: true,
		colHeaders: true,
		//最小空白列
		//minSpareCols: 1,
		//最小空白行
		//minSpareRows: 1,
		//右键菜单
		contextMenu: true,
		//鼠标点击表格外面取消当前的选择焦点
	    outsideClickDeselects: true,
		//手动调节行高列宽
		manualColumnResize: true,
        manualRowResize: true,
       	mergeCells:true,//合并单元格
		//开启边框功能
       	customBorders: true,
		//afterDestroy:reNewTable,
	});
		setting = {
			callback: {
				onClick: zTreeOnClick
			},
			view: {
                addDiyDom: addDiyDom
            }
		};
		$.ajax({
				url : "<%=path%>
	/interface/LoadModelName.do",
			type : "post",
			data : {
				"sortName" : "",
				"sortOrder" : "asc",
				"pageSize" : 50,
				"pageNumber" : 1
			},
			dataType : "json",
			success : function(data) {
				//var arr = JSON.parse(data);
				console.log(data);
				var ob = new Array();
				$.each(data.rows, function(idx, obj) {
					var bo = new Object();
					console.log("=================================");
					console.log(bo);
					bo['id'] = obj.MODEL_ID;
					bo['name'] = obj.MODEL_NAME;
					bo['tzNssb'] = obj.TZ_NSSB;
					bo['oneMenus'] = obj.ONE_MENUS;
					bo['twoMenus'] = obj.TWO_MENUS;
					ob.push(bo);
				});
				zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, ob);
			}
		});
	});
</script>
</html>