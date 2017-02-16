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
		<title>纳税申报管理</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		<!-- jquery -->
		<script type="text/javascript" src="<%=path%>/resources/jquery.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/jquery.form.js"></script>
		<script type="text/javascript" src="<%=path%>/js/commons/browserType.js"></script>
		<!-- 全局变量 -->
		<script type="text/javascript" src="<%=path %>/js/commons/globalArgs.js"></script>
		<!-- 进度条 -->
		<script type="text/javascript" src="<%=path %>/js/commons/nanobar.min.js"></script>
		<!-- zTree -->
		<link rel="stylesheet" href="<%=path%>/resources/jquery-zTree/css/zTreeStyle.css" type="text/css">
		<script type="text/javascript" src="<%=path%>/resources/jquery-zTree/js/jquery.ztree.all-3.5.js"></script>
		<!-- layer -->
		<script type="text/javascript" src="<%=path%>/resources/layer/layer.js"></script>
		<!-- 时间控件 -->
		<script type="text/javascript" src="<%=path%>/resources/My97DatePicker/WdatePicker.js"></script>
		<!-- bootstrap -->
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-3.3.6/css/bootstrap.css">
		<script type="text/javascript" src="<%=path%>/resources/bootstrapValidator.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-3.3.6/js/bootstrap.min.js"></script>
		<!-- bootstrap table -->
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.css">
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.min.js"></script>
		<!-- handsontable -->
		<script type="text/javascript" src="<%=path%>/resources/handsontable/js/handsontable.full.min.js"></script>
		<!-- showLoading -->
		<script type="text/javascript" src="<%=path%>/resources/showLoading/js/jquery.showLoading.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/showLoading/js/jquery.showLoading.min.js"></script>
		<!-- table2excel -->
		<script type="text/javascript" src="<%=path%>/resources/dist/jquery.table2excel.js"></script>
		<!-- beforePrint.js  --> 
        <script type="text/javascript" src="<%=path%>/resources/printThis/beforePrint.js"></script>
		<!-- printThis.js  --> 
        <script type="text/javascript" src="<%=path%>/resources/printThis/printThis.js"></script>
		<!-- 自适应 -->
		<script type="text/javascript" src="<%=path %>/js/commons/adjustScreen.js"></script>
		<!-- 内部封装 -->
		<script type="text/javascript" src="<%=path%>/js/commons/util.js"></script>
		<!-- jquery validator -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/bootstrapValidator.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/language/zh_CN.js"></script>
		<link href="<%=path%>/resources/bootstrapvalidator-master/dist/css/bootstrapValidator.css" rel="stylesheet">
		<script type="text/javascript" src="<%=path%>/js/nssbManager/nssbManagerValidator.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/handsontable/css/handsontable.full.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/showLoading/css/showLoading.css">
		
		<!-- 文件上传 -->
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-fileinput/css/fileinput.min.css">
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-fileinput/js/fileinput.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-fileinput/js/fileinput_locale_zh.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/table/tableSet.js"></script>
		<script type="text/javascript" src="<%=path%>/js/nssbManager/nssbManagerMain.js"></script>
		<script type="text/javascript" src="<%=path%>/js/commons/browserType.js"></script>
		<!--[if lt IE 9]>
		<script type="text/javascript" src="<%=path%>/resources/compatible/html5shiv.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/ie8-responsive-file-warning.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/respond.js"></script>
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/nssbManager.css">
	</head>
	<body>
		<div class="container">
			<div class="panel panel-default">
				<div class="panel-heading">
					<!-- 顶部标题 -->
					<div class="" style="color: #3985BB; font-size: x-large;">
						<a data-toggle="collapse" style="display: block; text-decoration: none;" href="#nssb_top"> 
							纳税申报管理
						</a>
					</div>

				</div>
				<!-- 查询表单 -->
				<div id="nssb_top" class="collapse">
					<div class="panel-body" style="padding-bottom: 0px !important;">
						<form class="form-horizontal" role="form" id="afwtSearch_form">
							<div class="form-group col-xs-7">
								<label for="number" class="col-sm-3 control-label">
									纳税人识别号:
								</label>
								<div class="col-sm-9">
									<input type="text" class="form-control h-cls-input" id="nsrsbhIdfrom" name="nsrsbhId">
								</div>
							</div>
							<div class="form-group col-xs-5">
								<label for="name" class="col-sm-4 control-label">
									纳税人名称:
								</label>
								<div class="col-sm-8">
									<input type="text" class="form-control h-cls-input" id="nsNamefrom" name="nsName">
								</div>
							</div>
							<div class="form-group col-xs-7">
								<label for="number" class="col-sm-3 control-label">
									所属损益确认行:
								</label>
								<div class="col-sm-5">
									<input type="text" class="form-control h-cls-input" id="sure" name="nsBank">
								</div>
							</div>
							<div class="form-group col-xs-5">
								<label for="number" class="col-sm-4 control-label">
									状态:
								</label>
								<div class="col-sm-8">
									<select class="form-control" id="additStatefrom" name="additState">
										<option value="">
											全部
										</option>
										<option value="0">
											未审核
										</option>
										<option value="1">
											审核中
										</option>
										<option value="2">
											审核通过
										</option>
										<option value="3">
											审核不通过
										</option>

									</select>
								</div>
							</div>
							<div class="form-group col-xs-7">
								<label for="number" class="col-sm-3 control-label">
									税款所属期起:
								</label>
								<div class="col-sm-5">
									<input type="text" name="skSdate" id="begindatefrom" class="form-control h-cls-input" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
								</div>
							</div>
							<div class="form-group col-xs-5">
								<label for="name" class="col-sm-4 control-label">
									税款所属期止:
								</label>
								<div class="col-sm-8">
									<input type="text" name="skEdate" id="enddatefrom" class="form-control h-cls-input" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
								</div>
							</div>

						</form>
					</div>
					<div class="text-right" style="padding-right: 10px; padding-bottom: 10px;">
						<button type="button" class="btn btn-success" id="afwt_search">
							查询
						</button>
						<button type="button" class="btn btn-primary" id="afwt_searchReset">
							清空
						</button>
					</div>
				</div>
			</div>
			<!-- toolbar按钮 -->
			<div id="index_toolbar" data-toggle="collapse">
				<button type="button" class="btn btn-success" id="addBtn">
					<span class="glyphicon glyphicon-plus"></span>
					新增
				</button>
				<button type="button" class="btn btn-warning" id="edit">
					<span class="glyphicon glyphicon-cog"></span>
					编辑
				</button>
				<button type="button" class="btn btn-info" id="submit">
					<span class=" glyphicon glyphicon-open"></span>
					提交
				</button>
				<button type="button" class="btn btn-danger" id="delete">
					<span class=" glyphicon glyphicon-remove"></span>
					删除
				</button>
				<button type="button" class="btn btn-primary" id="export">
					<span class="glyphicon glyphicon-export"></span>
					导出及打印
				</button>
				<!-- <button type="button" class="btn btn-pink" id="print" style="color: white;">
					<span class="glyphicon glyphicon-hdd"></span>
					打印
				</button> -->
				
			</div>
			<table id="table"></table>
		</div>

		<!-- 点击新建弹出模态框 -->
		<div class="modal fade" id="queryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" id="add-modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							新建纳税申报
						</h4>
					</div>
					<div class="modal-body second-modal-dialog-body" id="add-modal-body">
						<div style="height: 130px;">
							<div style="height: 100px;">
								<form class="form-horizontal" id="AddafwtForm" action="<%=path%>/interface/insertAfwt.do" method="post">
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											纳税人识别号:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control new-nssb" id="nsrsbhId" name="nsrsbhId" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											纳税人名称:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" id="nsName" name="nsName" disabled="disabled">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											审核机构:
										</label>
										<div class="col-sm-9">
											<!-- <input type="text" class="form-control new-nssb" id="auditBank"  name ="auditBank"  > -->
											<select class="form-control new-nssb" id="auditBank" name="auditBank">

											</select>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="number" class="col-sm-4 control-label">
											申请人:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" id="applyName" name="applyName" disabled="disabled">
											<input type="hidden" id="sssyh" name="nsBank" />
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											税款所属期起:
										</label>
										<div class="col-sm-5">
											<input type="text" name="skSdate" id="begindate" class="form-control new-nssb" />
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											税款所属期止:
										</label>
										<div class="col-sm-8">
											<input type="text" name="skEdate" id="enddate" class="form-control new-nssb" />
										</div>
									</div>
								</form>
							</div>
							<div class="text-right">

							</div>
						</div>
						<div>

							<ul class="nav nav-tabs" id="addTab">
								<li class="active tab_tztz">
									<a href="#tz1">调整台账</a>
								</li>
								<li class="tab_scbb">
									<a href="#bb1">生成报表</a>
								</li>

							</ul>

						</div>
						<div class="tab-content">
							<div class="tab-pane in active" id="tz1">
								<table id="table_tz_add"></table>
							</div>
							<div class="tab-pane" id="bb1">
								<table id="table_bb_add"></table>
							</div>

						</div>

					</div>
					<div class="modal-footer">
						<!--  
							<button type="button" class="btn btn-success text-center footer_ssbb" id="ssbb">生成报表</button>
							-->
						<button type="button" class="btn btn-success" id="AddSave">
							保存
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->

		</div>

		<!-- 点击编辑弹出模态框 -->
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" id="edit-modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id = "editTitle">
							编辑纳税申报
						</h4>

					</div>
					<div class="modal-body second-modal-dialog-body" id="h-sb2">
						<div style="height: auto;">
							<div style="height: 150px;">
								<form class="form-horizontal" id="editForm" action="<%=path%>/interface/updateAfwt.do" method="post">
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											纳税人识别号:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control" id="nsrsbhIds" name="nsrsbhId" disabled="disabled">
											<input type="hidden" class="form-control" id="applyId" name="applyId">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											纳税人名称:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="nsNames" name="nsName" disabled="disabled">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											审核机构:
										</label>
										<div class="col-sm-9">
											<select class="form-control new-nssb" id="auditBanks" name="auditBank">

											</select>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="number" class="col-sm-4 control-label">
											申请人:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="applyNames" name="applyName" disabled="disabled">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											税款所属期起:
										</label>
										<div class="col-sm-5">
											<input type="text" name="skSdate" id="begindates" class="form-control" />
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											税款所属期止:
										</label>
										<div class="col-sm-8">
											<input type="text" name="skEdate" id="enddates" class="form-control" />
										</div>
									</div>
								</form>
							</div>
							<div class="text-right">
								<!-- <button type="button" class="btn btn-primary" id="editUpsubmit">提交</button> -->
							</div>
						</div>
						<div>
							<ul class="nav nav-tabs" id="editTab">
								<li class="active tab_tztz"  id="tz_tab">
									<a href="#tz2">调整台账</a>
								</li>
								<li class="tab_ssbb"  id="bb_tab">
									<a href="#bb2">生成报表</a>
								</li>
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane in active" id="tz2">
								<table id="table_tz_edit"></table>
							</div>
							<!-- 隐藏域传值 -->
							<input type="hidden" id="tableId" />
							<input type="hidden" id="afwtHtmlName" />
							<div class="tab-pane" id="bb2">
								<table id="table_bb_edit"></table>
							</div>
							<div class="tab-pane" id="bb3">
								<br/><br/>
								<h4 class="text-center">您修改了台账表数据，请先生成报表</h4>
							</div>

						</div>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning text-center footer_ssbb" id="ssbb">
							生成报表
						</button>
						<button type="button" class="btn btn-success" id="editSave">
							保存
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->

		</div>


		<!-- 点击导出弹出模态框 -->
		<div class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" style="width: 90%; height: 90%;" id="export-modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							导出
						</h4>
					</div>

					<div class="modal-body second-modal-dialog-body" id="h-export2" style="overflow: auto;">
						<div style="height: 1px;"></div>
						<div>
							<ul class="nav nav-tabs" id="exportTab">
								<li class="active tab_tztz">
									<a href="#tz3">台账表</a>
								</li>
								<li class="tab_ssbb">
									<a href="#bb4">申报表</a>
								</li>
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane in active" id="tz3">
								<table id="table_tz_export"></table>
							</div>
							<div class="tab-pane" id="bb4">
								<table id="table_bb_export"></table>
							</div>

						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>

					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->

		</div>
		
		<!-- 点击文件上传弹出模态框 -->
		<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" style="width: 90%; height: 90%;" id="upload-modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							操作文件
						</h4>
					</div>

					<div class="modal-body second-modal-dialog-body" id="upload_body" style="overflow: auto;">
						<div style="height: 1px;"></div>
						<!-- 上传文件 -->
						<div class="div-upload-file">
							<script type="text/javascript" src="<%=path%>/js/upload/uploadDom.js"></script>
						</div>
						<!-- 展示已上传文件信息 -->
						<div>
							<table id="table_upload"></table>
						</div>
					</div>

					<div class="modal-footer">
						<!-- <button type="button" class="btn btn-success" id="upload_submit_btn">
							确定上传
						</button> -->
						<button type="button" class="btn btn-success btn-pvt" id="download_btn">
							下载文件
						</button>
						<button type="button" class="btn btn-danger btn-pvt" id="delfile_btn">
							删除文件
						</button>
						<button type="button" class="btn btn-primary btn-pvt" id="upload_close_btn" data-dismiss="modal">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		
		
		<!-- 点击审核意见弹出模态框 -->
		<div class="modal fade bs-example-modal-lg" id="auditMessageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							审核意见
						</h4>
					</div>

					<div class="modal-body second-modal-dialog-body" style="overflow: auto;">
						<p class="audit_p" style="font-size: 20px;">无</p>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>

					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->

		</div>
		
		<!-- 点击所属损益行，弹出ztree -->
		<div class="modal fade" id="ztreeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" style="width: 40%; height: 90%;">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							请选择所属损益行
						</h4>
					</div>

					<div class="modal-body second-modal-dialog-body" style="overflow: auto;">
						<ul id="zTree_Bank" class="ztree"></ul>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-success" id="ztreeSave">
							保存
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>

					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->

		</div>


		<!-- 三级页面，点击表格(台账表)中的数据弹出模态框，显示台账表和申报表页面详情 -->
		<div class="modal fade" id="cellModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" id="editTZCell_modal_dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="sjymtz">

						</h4>

					</div>
					<div class="modal-body tz-modal-body third-modal-dialog-body-content">
						<div>
							<div id="table_cell_tz" class="h-three third-modal-dialog-body"></div>
							<div id="table_cell_tz_1" style="display: none"></div>
							<div id="page1"></div><%--style="display: none" --%>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="add_row_tz">新建一行</button>
						<button type="button" class="btn btn-warning" id="del_row_tz">删除一行</button>
						<button type="button" class="btn btn-success" id="save_cell">
							保存
						</button>
						<button type="button" class="btn btn-success" id="export_cell">
							导出Excel
						</button>
						<button type="button" class="btn btn-success" id="export_cell_print">
							打印
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
						<button type="button" class="btn btn-success" id="hide_cell_tz" style="display:none;">

						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>

		</div>

		<!-- 三级页面，点击表格(申报表)中的数据弹出模态框，显示台账表和申报表页面详情 -->
		<div class="modal fade" id="cellModal_sb" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" id="editSBCell_modal_dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="sjymsb">

						</h4>

					</div>
					<div class="modal-body bb-modal-body third-modal-dialog-body-content">
						<div>
							<div id="table_cell_sb" class="h-three third-modal-dialog-body"></div>
						</div>
					</div>
					<div class="modal-footer">
						<!-- <button type="button" class="btn btn-warning text-center" id="ssbb">生成报表</button> -->
						<button type="button" class="btn btn-success" id="save_cell_sb">
							保存
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>

		</div>

		<!-- 三级页面，点击表格(导出)中的数据弹出模态框，显示台账表和申报表页面详情 -->
		<div class="modal fade" id="cellModal_export" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">

			<div class="modal-dialog" id="exportCell_modal_dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="sjymdc">

						</h4>

					</div>
					<div class="modal-body export-modal-body third-modal-dialog-body-content">
						<div>
							<div id="table_cell_export" class="h-three third-modal-dialog-body"></div>
						</div>
					</div>
					<div class="modal-footer">
						<!-- <button type="button" class="btn btn-warning text-center" id="ssbb">生成报表</button> -->
						<button type="button" class="btn btn-success" id="save_cell_export">
							确认导出
						</button>
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
		</div>
	</body>
	<script type="text/javascript">
		var ctx = '<%=path%>';
		var yhid = "${awftMap.YHID}";
		var nsrsbhId = "${awftMap.NSRSBH}";
		var nsName = "${awftMap.NSRMC}";
		var applyName = "${awftMap.YHMC}";
		var sssyh = "${bmmc}";
		var orgId = "${awftMap.QX_BMID}";
		var sbbz = "${awftMap.SBBZ}";
	</script>

</html>