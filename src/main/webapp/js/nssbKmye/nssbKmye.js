$(function() {
	$("#kmye_table").bootstrapTable(
			{
				url : ctx + "/nssbKmye/queryKmyeByPage.do",
				queryParams : function(params) {
					params = $.extend($('#kmye_searchForm').serializeJson(","),
							params);
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
				sortName : "", // 排序列名
				sortOrder : "asc", // 排序方式
				// height : $(window).height(),
				sidePagination : 'server',
				cache : false,
				striped : true, // 使表格带有条纹
				pagination : true, // 在表格底部显示分页工具栏
				paginationLoop : false,
				showToggle : true, // 名片格式
				cardView : false,// 设置为True时显示名片（card）布局
				detailView : false, // 是否显示父子表
				showRefresh : true, // 显示刷新按钮
				search : false,// 是否显示右上角的搜索框
				clickToSelect : true,// 点击行即可选中单选/复选框
				toolbar : "#kmye_toolbar", // 设置工具栏的Id或者class
				pageSize : 10,
				pageList : [ 10, 25, 50, 100, 200 ],
				showColumns : true,
				queryParamsType : '',
				onLoadSuccess : function(data) {
				},
				formatLoadingMessage : function() {
					return "请稍等，正在加载中...";
				},
				formatNoMatches : function() { // 没有匹配的结果
					return '无符合条件的记录';
				},
				onLoadError : function(data) {
					$('#reportTable').bootstrapTable('removeAll');
				},
				columns : [ {
					field : "RN",
					title : "序号 ",
					align : "center",
					valign : "middle",
					sortable : false
				}, {
					field : "GL_ORG_ID",
					title : "总账机构 ",
					align : "center",
					valign : "middle",
					sortable : true
				}, {
					field : "DTL_ACT_ORG_ID",
					title : "明细账机构",
					align : "center",
					valign : "middle",
					sortable : true
				}, 
				{
					field : "JGMC",
					title : "机构名称",
					align : "center",
					valign : "middle",
					sortable : true
				},
				{
					field : 'ACT_ITM_ID',
					title : '会计科目',
					align : 'center',
					valign : 'middle',
					sortName : 'optTime',
					sortable : true
				}, {
					field : 'CCY_CD',
					title : '币种代码 ',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'BAL',
					title : '余额',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, 
				{
					field : 'HL',
					title : '汇率',
					align : 'center',
					valign : 'middle',
					sortable : false
				},
				{
					field : 'RMBBAL',
					title : '余额（人民币）',
					align : 'center',
					valign : 'middle',
					sortable : false
				},{
					field : 'DBT_AMT',
					title : '借方发生额 ',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'CRD_AMT',
					title : '贷方发生额 ',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'PST_DT',
					title : '过账日期 ',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'DATA_DT',
					title : '数据时间 ',
					align : 'center',
					valign : 'middle',
					sortable : true
				} ]
			});
	$('#kmye_search').click(function() {
		$('#kmye_table').bootstrapTable('refresh', {});
	});
	$('#kmye_searchReset').click(function() {
		$('#kmye_searchForm')[0].reset();
		$('#kmye_table').bootstrapTable('refresh', {});
	});
	$('#kmye_add').click(function() {
		$('#kmye_modal').modal("show");
	});
});