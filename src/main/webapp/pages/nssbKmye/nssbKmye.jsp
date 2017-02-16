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
		<title>纳税申报科目余额</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-3.3.6/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.css">
		<!-- jquery -->
		<script type="text/javascript" src="<%=path%>/resources/jquery.min.js"></script>
		<!-- 全局变量 -->
		<script type="text/javascript" src="<%=path %>/js/commons/globalArgs.js"></script>
		<!-- bootstrap -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrapValidator.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-3.3.6/js/bootstrap.min.js"></script>
		
		<!-- bootstrap table -->
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.min.js"></script>
		
		<!-- 时间控件 -->
		<script type="text/javascript" src="<%=path%>/resources/My97DatePicker/WdatePicker.js"></script>
		<!-- 内部封装 -->
		<script type="text/javascript" src="<%=path%>/js/commons/util.js"></script>
		<script type="text/javascript" src="<%=path %>/js/nssbKmye/nssbKmye.js"></script>
		<!--[if lt IE 9]>
		<script type="text/javascript" src="<%=path%>/resources/compatible/html5shiv.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/ie8-responsive-file-warning.js"></script>
		<script type="text/javascript" src="<%=path%>/resources/compatible/respond.js"></script>
		<![endif]-->
		<script type="text/javascript">
		/**
		 *  ctx 全局变量，当前的web应用的根目录
		 **/
		var ctx = '<%=path%>';	
</script>
	</head>
	<body style="font-family:monospace,monospace;font-family:arial,Tahoma,'Microsoft YaHei';">
		<div class="container">
			<div class="panel panel-default">
				<div class="panel-heading">
					<!-- 顶部标题 -->
					<div class="" style="color: #3985BB; font-size: x-large;">
						<a data-toggle="collapse" style="display: block; text-decoration: none;" href="#searchKmye"> 科目余额 </a>
					</div>

				</div>
				<div id="searchKmye" class="panel-collapse collapse">
					<div class="panel-body" style="padding-bottom:0px;">
						<form role="form" class="form-horizontal" id="kmye_searchForm">
							<div class="form-group col-xs-6" >
								<label class="col-sm-3 control-label">
									总账机构：
								</label>
								<div class="col-sm-9">
								      <input type="text" name="glOrgId" id="glOrgId" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									明细账机构：
								</label>
								<div class="col-sm-9">
									<input type="text" name="dtlActOrgId" id="dtlActOrgId" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									会计科目：
								</label>
								<div class="col-sm-9">
									<input type="text" name="actItmId" id="actItmId" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									币种代码：
								</label>
								<div class="col-sm-9">
									<input type="text" name="ccyCd" id="ccyCd" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									借方发生额：
								</label>
								<div class="col-sm-9">
									<input type="text" name="dbtAmt" id="dbtAmt" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									贷方发生额：
								</label>
								<div class="col-sm-9">
									<input type="text" name="crdAmt" id="crdAmt" class="form-control" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									数据时间起：
								</label>
								<div class="col-sm-9">
									<input type="text" name="dataDtStart" id="begindate" class="form-control" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									数据时间止：
								</label>
								<div class="col-sm-9">
									<input type="text" name="dataDtEnd" id="enddate" class="form-control" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
								</div>
							</div>
							<div class="form-group col-xs-6">
								<label class="col-sm-3 control-label">
									余额：
								</label>
								<div class="col-sm-9">
									<input type="text" name="bal" id="bal" class="form-control" />
								</div>
							</div>

						</form>
					</div>
					<div class="text-right" style="padding-right: 10px; padding-bottom: 10px;">
						<button type="button" class="btn btn-success" id="kmye_search">查询</button>
					    <button type="button" class="btn btn-primary" id="kmye_searchReset">清空</button>
					</div>
				</div>
			</div>
			<table id="kmye_table"></table>
		</div>
		<div class="modal fade" id="kmye_modal"  tabindex="-1" role="dialog" aria-labelledby="kmye_ModallTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
			<div class="modal-dialog" style="width: 600px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="kmye_ModalTitle"></h4>
					</div>
					<div class="modal-body">
						<form id="kmye_form" class="form-horizontal"></form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" id="kmye_close">
							关闭
						</button>
						<button type="button" class="btn btn-primary" id="kmye_submit">
							提交
						</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
