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
		<title>纳税申报审核</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/nssbAudit.css">
		<link rel="stylesheet" href="<%=path%>/resources/jquery-zTree/css/zTreeStyle.css" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-3.3.6/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/handsontable/css/handsontable.full.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrapvalidator-master/dist/css/bootstrapValidator.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/showLoading/css/showLoading.css">
		<!-- jquery -->
		<script type="text/javascript" src="<%=path%>/resources/jquery.min.js"></script>
		
		<script type="text/javascript" src="<%=path%>/resources/jquery.form.js"></script>
		<!-- 自适应 -->
		<script type="text/javascript" src="<%=path %>/js/commons/adjustScreen.js"></script>
	    <!-- layer -->
		<script type="text/javascript" src="<%=path%>/resources/layer/layer.js"></script>
		<!-- zTree -->
		<script type="text/javascript" src="<%=path%>/resources/jquery-zTree/js/jquery.ztree.all-3.5.js"></script>
		
		<!-- 时间控件 -->
		<script type="text/javascript" src="<%=path%>/resources/My97DatePicker/WdatePicker.js"></script>
		<!-- bootstrap -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-3.3.6/js/bootstrap.min.js"></script>
		
		<!-- bootstrap table -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.min.js"></script>
		
		<!-- handsontable -->
		<script type="text/javascript" src="<%=path%>/resources/handsontable/js/handsontable.full.min.js"></script>
		
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/bootstrapValidator.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrapvalidator-master/dist/js/language/zh_CN.js"></script>
		<script type="text/javascript" src="<%=path %>/js/nssbAudit/nssbAuditValidator.js"></script>
		
		<script type="text/javascript" src="<%=path %>/js/nssbAudit/nssbAudit.js"></script>
		<script type="text/javascript" src="<%=path %>/js/nssbAudit/nssbAuditValidator.js"></script>
		<script type="text/javascript" src="<%=path%>/js/commons/util.js"></script>
		<script type="text/javascript" src="<%=path%>/js/table/tableSet.js"></script>
		<!-- showLoading -->
		<script type="text/javascript" src="<%=path%>/resources/showLoading/js/jquery.showLoading.min.js"></script>
		
		<!--[if lt IE 9]>
		<script type="text/javascript" src="<%=path%>/resources/compatible/html5shiv.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/ie8-responsive-file-warning.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/respond.js"></script>
		<![endif]-->
	</head>
	<body>
		<div class="container">
				<div class="panel panel-default">
				<div class="panel-heading">
					<!-- 顶部标题 -->
					<div class="" style="color:#3985BB;font-size:x-large;">
						<a data-toggle="collapse" style="display: block; text-decoration: none;" href="#nssb_top"> 纳税申报审核 </a>						
						
					</div>

				</div>
				<!-- 查询表单 -->
				<div id="nssb_top" class="collapse">
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="indexSearch_form">
						  <div class="form-group col-xs-7">
						    <label for="number" class="col-sm-3 control-label">纳税人识别号:</label>
						    <div class="col-sm-9">
						      <input type="text" class="form-control"  name="nsrsbhId" id="nsrsbhId">
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="name" class="col-sm-4 control-label">纳税人名称:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" name="nsName" id="nsName">
						    </div>
						  </div>
						  <div class="form-group col-xs-7">
						    <label for="name" class="col-sm-3 control-label">申请单编号:</label>
						    <div class="col-sm-9">
						      <input type="text" class="form-control" name="applyId" >
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="name" class="col-sm-4 control-label">损益确认行:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" id="sure" name="nsBank">
						    </div>
						  </div>
						  <div class="form-group col-xs-7">
						    <label for="name" class="col-sm-3 control-label">税款所属期起:</label>
						    <div class="col-sm-5">
						      <input type="text" class="form-control" id="begindate" name="skSdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="number" class="col-sm-4 control-label">税款所属期止:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" id="enddate" name="skEdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						  <div class="form-group col-xs-7">
						    <label for="number" class="col-sm-3 control-label">申请日期起:</label>
						    <div class="col-sm-5">
						      <input type="text" class="form-control" id="DateBegin" name="applyDateBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="number" class="col-sm-4 control-label">申请日期止:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" id="DateEnd" name="applyDateEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						   <div class="form-group col-xs-7">
						    <label for="number" class="col-sm-3 control-label">审核日期起:</label>
						    <div class="col-sm-5">
						      <input type="text" class="form-control" id="DateBegin" name="auditDateBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="number" class="col-sm-4 control-label">审核日期止:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control" id="DateEnd" name="auditDateEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
						    </div>
						  </div>
						  <div class="form-group col-xs-7">
						    <label for="number" class="col-sm-3 control-label" id="state">审核状态:</label>
						    <div class="col-sm-5"> 
						      <select class="form-control"  name="additState">
						      	 
								  <option value="1">审核中</option>
								  <option value="">全部</option>
								  <option value="2">审核通过</option>
								  <option value="3">审核不通过</option>
								  
								 
							 </select>
						    </div>
						  </div>
						  <div class="form-group col-xs-5">
						    <label for="number" class="col-sm-4 control-label">创建人:</label>
						    <div class="col-sm-8">
						      <input type="text" class="form-control"  name="applyName" >
						    </div>
						  </div>
						
						</form>
					</div>
					<div class="text-right" style="padding: 0px 10px 10px 10px;">
							<button type="button" class="btn btn-success" id="auditQuery">查询</button>
							<button type="button" class="btn btn-primary" id="audit_searchReset">清空</button>
							
					</div>
				</div>				
			</div>					
				<table id="auditTable"></table>
		</div>
		<!-- 点击审核弹出模态框 -->
		<div class="modal fade" id="auditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
				
				<div class="modal-dialog" id="audit-modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
								纳税申报审核
						</h4>
						</div>
						
						<div class="modal-body second-modal-dialog-body" id="sh_modal_body">
						<div>
							<div>
								<form class="form-horizontal" id="auditForm">
									<div class="form-group col-xs-7">
										<label class="col-sm-3 control-label">
											申请单编号:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control new-nssb" name="APPLY_ID" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label class="col-sm-4 control-label">
											纳税人识别号:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" name="NSRSBH_ID" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											纳税人名称:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control new-nssb" name="NS_NAME" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="number" class="col-sm-4 control-label">
											创建人:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" name="APPLYNAME" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											税款所属期起:
										</label>
										<div class="col-sm-5">
											<input type="text" name="SK_SDATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											税款所属期止:
										</label>
										<div class="col-sm-8">
											<input type="text" name="SK_EDATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											所属损益确认行:
										</label>
										<div class="col-sm-5">
											<input type="text" name="NS_BANK" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											申请时间:
										</label>
										<div class="col-sm-8">
											<input type="text" name="READ_DATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											审核意见:
										</label>
										<div class="col-sm-9">
											<textarea class="form-control" rows="3"  id="saveAuditIdea" name="AUDIT_IDEA" ></textarea>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="" class="col-sm-4 control-label">
											审核结果:
										</label>
										<div class="col-sm-8" class="radio-inline">
											<label>
												<input  type="radio" name="additState" value="2" />
												审核通过 &nbsp;&nbsp;&nbsp;
											</label>
											<label>
												<input  type="radio" name="additState" value="3" />
												审核不通过
											</label>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											审核人:
										</label>
										<div class="col-sm-8">
											<input type="text" name=""  id="saveAuditor"  class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											审核时间:
										</label>
										<div class="col-sm-8">
											<input type="text" name=""  id="auditDate"  class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
								</form>
						</div>
						<!-- <div class="text-right">
						</div> -->
						</div>
						<div class="clearfix"></div>
						<div>
							<ul class="nav nav-tabs" id="shTab">
								<li class="active tab_tztz">
									<a href="#tzTabPane">台账表</a>
								</li>
								<li class="tab_ssbb">
									<a href="#bbTabPane">申报表</a>
								</li>
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane in active" id="shtzTabPane">
								<table id="shtzTable"></table>
							</div>
							<div class="tab-pane" id="shbbTabPane">
								<table id="shbbTable"></table>
							</div>

						</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-success" id="auditSave">保存</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
							<!--  
							<button type="button" class="btn btn-success text-center" id="ssbb">生成报表</button>
							-->
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			<div id="index_toolbar" data-toggle="collapse" >
				<button type="button" class="btn btn-info" id="auditBtn">
					 <span class="glyphicon glyphicon-tasks"></span> 审核
				</button>		
			</div>
			
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
		
		<!-- 点击申请单号弹出模态框 -->
		<div class="modal fade" id="lookUpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">
			<div class="modal-dialog" id="lookUp-modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							查看
						</h4>
					</div>
					<div class="modal-body second-modal-dialog-body" id="lookUpBody">
						<div>
							<div>
								<form class="form-horizontal" id="lookUpForm">
									<div class="form-group col-xs-7">
										<label class="col-sm-3 control-label">
											申请单编号:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control new-nssb" name="APPLY_ID" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label class="col-sm-4 control-label">
											纳税人识别号:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" name="NSRSBH_ID" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											纳税人名称:
										</label>
										<div class="col-sm-9">
											<input type="text" class="form-control new-nssb" name="NS_NAME" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="number" class="col-sm-4 control-label">
											创建人:
										</label>
										<div class="col-sm-8">
											<input type="text" class="form-control new-nssb" name="APPLYNAME" readonly="readonly">
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											税款所属期起:
										</label>
										<div class="col-sm-5">
											<input type="text" name="SK_SDATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											税款所属期止:
										</label>
										<div class="col-sm-8">
											<input type="text" name="SK_EDATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											所属损益确认行:
										</label>
										<div class="col-sm-5">
											<input type="text" name="NS_BANK" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="name" class="col-sm-4 control-label">
											申请时间:
										</label>
										<div class="col-sm-8">
											<input type="text" name="READ_DATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group col-xs-7">
										<label for="number" class="col-sm-3 control-label">
											审核意见:
										</label>
										<div class="col-sm-9">
											<textarea class="form-control" rows="3" name="AUDIT_IDEA" readonly="readonly"></textarea>
										</div>
									</div>
									<div class="form-group col-xs-5">
										<label for="" class="col-sm-4 control-label">
											审核状态:
										</label>
										<div class="col-sm-8">
												<input  type="text" name="ADDIT_STATE" class="form-control new-nssb" readonly="readonly"/>
										</div>
									</div>
								</form>
							</div>
							<div class="text-right">
							</div>
						</div>
						<div class="clearfix"></div>
						<div>
							<ul class="nav nav-tabs" id="lookUpTab">
								<li class="active tab_tztz">
									<a href="#tzTabPane">台账表</a>
								</li>
								<li class="tab_ssbb">
									<a href="#bbTabPane">申报表</a>
								</li>
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane in active" id="tzTabPane">
								<table id="tzTable"></table>
							</div>
							<div class="tab-pane" id="bbTabPane">
								<table id="bbTable"></table>
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
				<!-- 三级页面，点击表格(台账表)中的数据弹出模态框，显示台账表和申报表页面详情 -->
		<div class="modal fade" id="cellModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false"
			data-backdrop="static">
			<div class="modal-dialog" id="hotTable_modal_dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="cellName">
						</h4>
					</div>
					<div class="modal-body tz-modal-body third-modal-dialog-body-content">
						<div>
							<div id="cellTable" class="h-three third-modal-dialog-body"></div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-pvt" data-dismiss="modal">
							关闭
						</button>
						<button type="button" class="btn btn-success" id="hide_cell" style="display:none;">

						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
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
						<%-- <div class="div-upload-file">
							<script type="text/javascript" src="<%=path%>/js/upload/uploadDom.js"></script>
						</div> --%>
						<!-- 展示已上传文件信息 -->
						<div>
							<table id="table_upload"></table>
						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-success btn-pvt" id="download_btn">
							下载文件
						</button>
						<button type="button" class="btn btn-danger btn-pvt" id="delfile_btn">
							删除文件
						</button>
						<button type="button" class="btn btn-primary btn-pvt" id="upload_close_btn">
							关闭
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
			</div>
	</body>
<script type="text/javascript">
	//全局审核人
	var globalAuditor="${awftMap.YHMC}";
	var yhid = "${awftMap.YHID}";
	
	
	/**
 *  ctx 全局变量，当前的web应用的根目录
 **/
var ctx = '<%=path%>';	
</script>
</html>