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
		<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>纳税申报税收分类</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		<!-- jquery -->
		<script type="text/javascript" src="<%=path%>/resources/jquery.min.js"></script>
		<!-- 全局变量 -->
		<script type="text/javascript" src="<%=path %>/js/commons/globalArgs.js"></script>
		<!-- layer -->
		<script type="text/javascript" src="<%=path%>/resources/layer/layer.js"></script>
		<!-- bootstrap -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrapValidator.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-3.3.6/js/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-3.3.6/css/bootstrap.min.css">
		<!-- bootstrap table -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.min.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.css">
		<!-- 时间控件 -->
		<script type="text/javascript" src="<%=path%>/resources/My97DatePicker/WdatePicker.js"></script>		
		<!-- bootstrap validator -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/bootstrapValidator.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/language/zh_CN.js"></script>
		<script type="text/javascript" src="<%=path %>/js/nssbSsfl/nssbSsflValidator.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrapvalidator-master/dist/css/bootstrapValidator.min.css">
		<script type="text/javascript" src="<%=path %>/js/nssbSsfl/nssbSsfl.js"></script>
		<!-- 内部封装 -->
		<script type="text/javascript" src="<%=path%>/js/commons/util.js"></script>
		<!--[if lt IE 9]>
		<script type="text/javascript" src="<%=path%>/resources/compatible/html5shiv.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/ie8-responsive-file-warning.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/respond.js"></script>
		<![endif]-->
		<style>
			*{
				margin : 0px;
				padding: 0px;
			}
			.has-feedback .form-control {
				padding-right: 5px !important;
			}
		</style>
		<script type="text/javascript">
		var ctx = '<%=path%>';
		
		$(function(){
		$.ajax( {
		url : ctx + "/nssbSsfl/selectSsflList.do",
		type : "post",
		data : {
		},
		success : function(data) {
			
			var data = JSON.parse(JSON.parse(data));
			document.getElementById("ssflbm_user").innerHTML = "";
			$.each(data, function(idx, obj) {
				$("#ssflbm_user").append(
						"<option style='width:400px;' value='" + obj.ssflmc + "'>" + obj.ssflmc
								+ "</option>");
			});
			document.getElementById("ssflbm_edit_sel").innerHTML = "";
			$.each(data, function(idx, obj) {
				$("#ssflbm_edit_sel").append(
						"<option style='width:400px;' value='" + obj.ssflmc + "'>" + obj.ssflmc
								+ "</option>");
			});
		}		  
		});		
		
			$("#ssfl_modify").on("click",function(){
 
		var selections = $("#ssfl_table").bootstrapTable('getSelections');
		if (selections.length < 1) {
			layer.msg('请至少选择列表中1条数据！', {
				icon : 3,
				offset : '150px'
			});
			return false;
		}
		if (selections.length > 1) {
			layer.msg('只允许选择列表中1条数据！', {
				icon : 3,
				offset : '150px'
			});
			return false;
		}
		
		var spmcId = selections[0].ID;
		$('#spmcId').val(spmcId);

		$('#spmc_edit').val(selections[0].SPMC);
		$('#spmc_edit_hide').val(selections[0].SPMC);

		var ssflmcVal = selections[0].SSFLMC;
		var opts = $('#ssflbm_edit_sel option');
		for ( var i in opts) {
			if (opts[i].value == ssflmcVal) {
				opts[i].selected = true;
				break;
			}
		}
		$('#ssbl_edit').modal("show");
	 	});
	 	
	//批量删除
	$('#ssfl_del').on("click",function(){
	
	//function deleteMore() {
		var selections = $("#ssfl_table").bootstrapTable('getSelections');
		if (selections.length < 1) {
			layer.msg('请至少选择列表中1条数据！', {
				icon : 3,
				offset : '150px'
			});
			return false;

		}
		var spmc = [];
		for ( var i = 0; i < selections.length; i++) {
			spmc.push(selections[i].SPMC);
		}
		var ssflSpmc = spmc.join(",");
		ssdlDel(ssflSpmc);
		
	});
	//删除
	function ssdlDel(spmc) {

		layer.confirm('是否确定要删除？', {
			btn : [ '确定', '取消' ]
		//按钮
				}, function() {
					$.ajax( {
						type : "POST",
						url : ctx + "/nssbSsfl/delSsflById.do",
						data : {
							spmc : spmc
						},
						success : function(data) {
							//console.log(data);
							if (data = "success") {
								layer.msg('删除成功', {
									icon : 1
								});
								search();
							} else {
								layer.msg('删除失败', {
									icon : 2
								});

							}

						}
					});
				});
	}
	//查询按钮点击事件
	function search() {
		$("#ssfl_table").bootstrapTable('refresh');
	}
    $('#addSubmit1').on("click",function(){
  
		var spmc = $("#spmc_user").val();
		var ssflbm = $("#ssflbm_user").val();
		$.ajax( {
			url : ctx + "/nssbSsfl/add.do",
			type : "post",
			data : {
				"spmc" : spmc,
				"ssflbm" : ssflbm
			},
			dataType : "json",
			success : function(result) {
				if (result == "success") {
					layer.msg('新增成功', {
						icon : 1
					});
					$("#spmc_user").val("");
					search();
				} else {
					layer.msg('新增失败', {
						icon : 2
					});

				}
			}
		});
	  
    });
	 	
	});
		
	$(function() {
		$("#ssfl_table").bootstrapTable(

				{
					url : ctx + "/nssbSsfl/querySsflByPage.do",
					queryParams : function(params) {
						params = $.extend($('#ssfl_searchForm').serializeJson(
								","), params);
						//params.spmc=$("#spmcID").val();
						params.idate = new Date().getTime();
						return params;
					},
					ajax : function(params) {
						$.ajax( {
							url : params.url,
							type : "post",
							data : params.data,
							dataType : "json",
							success : function(data) {
								params.success(data);
							}
						});
					},
					sortName : "", //排序列名
					sortOrder : "asc", //排序方式
					//height : $(window).height(),
					sidePagination : 'server',
					cache : false,
					striped : true, //使表格带有条纹
					pagination : true, //在表格底部显示分页工具栏
					paginationLoop : false,
					pageNumber:1,
					showToggle : true, //名片格式
					cardView : false,//设置为True时显示名片（card）布局
					detailView : false, //是否显示父子表
					showRefresh : true, //显示刷新按钮
					search : false,//是否显示右上角的搜索框
					clickToSelect : true,//点击行即可选中单选/复选框
					toolbar : "#ssfl_toolbar", //设置工具栏的Id或者class
					pageSize : 10,
					pageList : [ 10, 25, 50, 100, 200 ],
					sidePagination : 'server',
					showColumns : true,
					queryParamsType : '',
					contentType : 'application/json',
					onLoadSuccess : function(data) {
						//console.info(data);
				},
				formatLoadingMessage : function() {
					return "请稍等，正在加载中...";
				},
				formatNoMatches : function() { //没有匹配的结果  
						return '无符合条件的记录';
					},
					onLoadError : function(data) {
						$('#reportTable').bootstrapTable('removeAll');
					},
					columns : [ {
						field : 'state',
						checkbox : true
					}, {
						field : "RN",
						title : "序号 ",
						align : "center",
						valign : "middle",
						sortable : false
					}, {
						field : 'ID',
						visible : false
					}, {
						field : "SPMC",
						title : "商品名称 ",
						align : "center",
						valign : "middle",
						sortable : true
					}, {
						field : "SSFLMC",
						title : "税收分类名称",
						align : "center",
						valign : "middle",
						sortable : true
					} ]
				});
		$('#ssfl_search').click(function() {
				$('#ssfl_table').bootstrapTable('refresh', {});
			});
		$('#ssfl_searchReset').click(function() {
				$('#ssfl_searchForm')[0].reset();
				$('#ssfl_table').bootstrapTable('refresh', {});
		});		
	});
    
	
</script>
	</head>
	<body style="font-family:monospace,monospace;font-family:arial,Tahoma,'Microsoft YaHei';">
		<div class="container">
			<div class="panel panel-default">
				<div class="panel-heading">
					<!-- 顶部标题 -->
					<div class="" style="color: #3985BB; font-size: x-large;">
						<a data-toggle="collapse" style="display: block; text-decoration: none;" href="#searchSsfl"> 税收分类 </a>

					</div>
				</div>
				<div id="searchSsfl" class="panel-collapse collapse">
					<div class="panel-body" style="padding-bottom:0px;">
						<form role="form" class="form-horizontal" id="ssfl_searchForm">
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									商品名称：
								</label>
								<div class="col-sm-9">
									<input type="text" name="spmc" class="form-control" />
								</div>	
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-4 control-label">
									税收分类名称：
								</label>
								<div class="col-sm-8">
									<input type="text" name="ssflmc" class="form-control" />
								</div>
							</div>
						</form>
						
						
						
					</div>
				    <div class="text-right" style="padding-right: 10px; padding-bottom: 10px;">
						<button type="button" class="btn btn-success" id="ssfl_search">查询</button>
					    <button type="button" class="btn btn-primary" id="ssfl_searchReset">清空</button>
					</div>
				</div>
			</div>

			<div id="ssfl_toolbar">
				<button type="button" class="btn btn-success" id="ssfl_add" data-toggle="modal" data-target="#myModal">
					<span class="glyphicon glyphicon-plus"></span>
					增加
				</button>
				<button type="button" class="btn btn-warning" id="ssfl_modify">
					<span class="glyphicon glyphicon-cog"></span>
					修改
				</button>
				<button type="button" class="btn btn-danger" id="ssfl_del">
					<span class=" glyphicon glyphicon-remove"></span>
					批量删除
				</button>
			</div>
			<table id="ssfl_table"></table>

		</div>

		
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static" style="padding-top:100px;">
			<form id="addSsflForm" class="form-horizontal" role="form">
				<div class="modal-dialog" style="width:60%;">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">
								新增
							</h4>

						</div>
						<div class="modal-body">
									  <div class="form-group">
							    <label for="inputEmail3" class="col-sm-2 control-label">商品名称</label>
							    <div class="col-sm-10">
							      <input type="text" class="form-control" id="spmc_user" name="spmcName">
							    </div>
							  </div>
							  <div class="form-group">
							    <label for="inputEmail3" class="col-sm-2 control-label">税收分类名称</label>
							    <div class="col-sm-10">
							      <select id="ssflbm_user" name="ssflbm_user" class="form-control">
							
							</select>
							    </div>
						</div>
						

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-success" id="addSubmit" >
								确定增加
							</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal">
								关闭
							</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			</form>
		</div>



		<div class="modal fade" id="ssbl_edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static" style="padding-top:100px;">
			<div class="modal-dialog" style="width:60%;">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="myModalLabel">
							修改
						</h4>
					</div>
					<div class="modal-body">
					
						<form class="form-horizontal" name="updateSsflForm" id="updateSsflForm" role="form">
							  <div class="form-group">
							    <label for="inputEmail3" class="col-sm-2 control-label">商品名称</label>
							    <div class="col-sm-10">
							      <input type="text" class="form-control" id="spmc_edit" name="spmc_edit">
							      <input type="hidden" id="spmcId" />
								  <input type="hidden" id="spmc_edit_hide" />
							    </div>
							  </div>
							  <div class="form-group">
							    <label for="inputEmail3" class="col-sm-2 control-label">税收分类名称</label>
							    <div class="col-sm-10">
							      <select id="ssflbm_edit_sel" name="ssflbm_edit_sel" class="form-control" autocomplete="off">
								
							</select>
							    </div>
						</div>
							  
							</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">
							关闭
						</button>
						<button type="button" class="btn btn-success" id="ssflEdit">
							提交更改
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>



	</body>

</html>
