var applyId;// 流水号
var hot;// 全局handsontable实例
var row;// 二级页面点击表名后，row为表名所对应的实例
var rowId;//当前文件上传按钮所对应的行号
var tableId;// 当前流水下的表ID
var tableName;// 当前流水下的表名
var dateNumber;// 当前流水下的期数
var status;// 表格的状态，1未处理，2已处理
var type;// type类型1台账表2申报表
var buttonType;// 判断保存按钮是否显示，1确认导出按钮隐藏，保存显示。2确认导出显示，保存隐藏
var pvt_person = "";// 当前流水下的纳税主体
var pvt_beginDate = "";//纳税所属起始时间
var pvt_endDate = "";// 纳税所属结束时间
var selections;// 流水表选择的当前流水
var too_report = 0;//判断有没有执行一键生成报表这个功能
var ssbb_systemTime = "";//点击一键生成所对应的系统时间
var norSave;//判断有没有点击过保存按钮
var editClick  = false;//判断有没有点击过编辑按钮
var nodes = '';//用户在所属损益行点击完ztree，所勾选所有选项组成的对象
var treeObj;//ztree对象
var isDateChanged = 0; //判断税款所属期是否改变  0-没改  1-改变
/*
 * bootstrpTable通用设置
 */
var bootstrapTableSetting = {
	url : '',
	queryParams : function(params) {
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
	sortName : "",
	// 排序列名
	sortOrder : "asc",
	// 排序方式
	sidePagination : 'server',
	cache : false,
	striped : true,
	// 使表格带有条纹
	pagination : true,
	// 在表格底部显示分页工具栏
	showToggle : true,
	// 名片格式
	cardView : false,
	// 设置为True时显示名片（card）布局
	detailView : false,
	// 是否显示父子表
	showRefresh : true,
	// 显示刷新按钮
	search : false,
	// 是否显示右上角的搜索框
	clickToSelect : true,
	// 点击行即可选中单选/复选框
	pageSize : 10,
	pageList : [ 10, 25, 50, 100, 200 ],
	paginationLoop : false,
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
	columns : [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	} ]
};
/*
 * 初始化所有的formatter
 */
//主页面申请单编号
function numberFormatter(row, index, value){
	return "<a href='#' class='number_main'>" + row + "</a>"; 
};
// 台账表编辑
function titleFormatter(row, index, value) {
	return "<a href='#' class='edit_tz'>" + row + "</a>";
};
function auditMessageFormatter(row, index, value){
	return "<a href='#' class='auditMessage'>" + '审核意见' + "</a>";
}
// 申报表编辑
function sbTitleFormatter(row, index, value) {
	return "<a href='#' class='edit_sb'>" + row + "</a>";
};
function acceptIdFormatter(row, index, value) {
	if (row == 1) {
		return "未处理";
	} else if (row == 2) {
		return "已处理";
	}
};
function export_tz_Formatter(row, index, value) {
	// return "<a href='#' class='export_tz'>" + row + "</a>";
};
function export_sb_Formatter(row, index, value) {
	// return "<a href='#' class='export_sb'>" + row + "</a>";
};
function export_tz_btn_Formatter(row, index, value) {
	return "<button type='button' class='export_tz btn btn-warning'>导出 / 打印</button>";
};
function export_sb_btn_Formatter(row, index, value) {
	return "<button type='button' class='export_sb btn btn-warning'>导出 / 打印</button>";
};
function print_tz_btn_Formatter(row, index, value) {
	return "<button type='button' class='print_tz btn btn-success'>打印</button>";
};
function print_sb_btn_Formatter(row, index, value) {
	return "<button type='button' class='print_sb btn btn-success'>打印</button>";
};
/*
 * 初始化所有bootstrapTable
 */
function bootstrapTableInit() {
	// 主界面bootstrapTable加载
	bootstrapTableSetting.url = ctx + "/interface/queryAfwtByPage.do";
	bootstrapTableSetting.queryParams = function(params) {
		params = $.extend($('#afwtSearch_form').serializeJson(","), params);
		var str = new Array;
		$.each(nodes, function(idx, obj) {
			str.push(obj.NAMES);
		});
		params.nsBank = str.toString();
		return params;
	};
	bootstrapTableSetting.sortName = 'ADD_DATE';
	bootstrapTableSetting.sortOrder = 'desc';
	bootstrapTableSetting.toolbar = "#index_toolbar";
	bootstrapTableSetting.columns = [ {
		field : 'id',
		checkbox : true
	}, {
		field : 'APPLY_ID',
		title : '申请单编号',
		align : "center",
		valign : "middle",
		formatter : numberFormatter,
		events : operateEvents,
		sortable : true
	}, {
		field : 'NSRSBH_ID',
		title : '纳税人识别号',
		align : "center",
		valign : "middle",
		sortable : true
	}, {
		field : 'NS_NAME',
		title : '纳税人名称',
		align : "center",
		valign : "middle"
	}, {
		field : 'SK_SDATE',
		title : '税款所属期起',
		align : "center",
		valign : "middle",
		sortable : true
	}, {
		field : 'SK_EDATE',
		title : '税款所属期止',
		align : "center",
		valign : "middle",
		sortable : true
	}, {
		field : 'NS_BANK',
		title : '所属损益确认行',
		align : "center",
		valign : "middle"
	}, {
		field : 'APPLYNAME',
		title : '创建人',
		align : "center",
		valign : "middle"
	}, {
		field : 'ADD_DATE',
		title : '创建时间',
		align : "center",
		valign : "middle",
		sortable : true
	}, {
		field : 'ADDIT_STATE',
		title : '状态',
		align : "center",
		valign : "middle",
		formatter : function(row, index, value) {
			if (row == 0) {
				return "未审核";
			} else if (row == 1) {
				return "审核中";
			} else if (row == 2) {
				return "审核通过";
			} else if (row == 3) {
				return "审核不通过";
			}
		},
		sortable : true
	}, {
		field : 'AUDIT_IDEA',
		title : '审核意见',
		align : "center",
		valign : "middle",
		formatter : auditMessageFormatter,
		events : operateEvents
	} 
	];
	$('#table').bootstrapTable(bootstrapTableSetting);
	bootstrapTableSetting.toolbar = '';
	bootstrapTableSetting.sortName = '';
	bootstrapTableSetting.sortOrder = '';
	// 新增模态框的调整台账bootstrapTable加载
	bootstrapTableSetting.url = ctx + "/interface/LoadModelName.do";
	bootstrapTableSetting.queryParams = function(params) {
		params.tzNssb = 1;
		return params;
	};
	bootstrapTableSetting.columns = [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'ONE_MENUS',
		title : '一级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'TWO_MENUS',
		title : '二级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'MODEL_NAME',
		title : '三级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'coin_credit',
		title : '处理结果',
		align : "center",
		valign : "middle"
	}, {
		field : 'ACCEPT_NAME',
		title : '处理人'
	}, {
		field : 'ACCEPT_DATE',
		title : '处理时间',
		align : "center",
		valign : "middle"
	} ];
	$('#table_tz_add').bootstrapTable(bootstrapTableSetting);
	// 新增模态框的申报表bootstrapTable加载
	bootstrapTableSetting.queryParams = function(params) {
		params.tzNssb = 2;
		return params;
	};
	$('#table_bb_add').bootstrapTable(bootstrapTableSetting);
	// 编辑模态框的台账表格加载
	bootstrapTableSetting.url = ctx + "/interface/queryAfwtHandsonByPage.do";
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.tzNssb = 1;
		return params;
	};
	bootstrapTableSetting.columns = [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'ONE_MENUS',
		title : '一级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'TWO_MENUS',
		title : '二级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'AFWT_HTML_NAME',
		title : '三级项目',
		align : "left",
		valign : "middle",
		formatter : titleFormatter,
		events : operateEvents
	}, {
		field : 'ACCEPT_ID',
		title : '处理结果',
		align : "center",
		valign : "middle",
		formatter : acceptIdFormatter
	}, {
		field : 'ACCEPT_NAME',
		title : '处理人'
	}, {
		field : 'ACCEPT_DATE',
		title : '处理时间',
		align : "center",
		valign : "middle"
	} ];
	$('#table_tz_edit').bootstrapTable(bootstrapTableSetting);
	// 编辑模态框的申报表加载
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.tzNssb = 2;
		return params;
	};
	bootstrapTableSetting.columns = [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'ONE_MENUS',
		title : '一级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'TWO_MENUS',
		title : '二级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'AFWT_HTML_NAME',
		title : '三级项目',
		align : "left",
		valign : "middle",
		formatter : sbTitleFormatter,
		events : operateEvents
	}, {
		field : 'ACCEPT_ID',
		title : '处理结果',
		align : "center",
		valign : "middle",
		formatter : acceptIdFormatter
	}, {
		field : 'ACCEPT_NAME',
		title : '处理人'
	}, {
		field : 'ACCEPT_DATE',
		title : '处理时间',
		align : "center",
		valign : "middle"
	} ];
	$('#table_bb_edit').bootstrapTable(bootstrapTableSetting);
	// 导出模态框的台账表
	bootstrapTableSetting.url = ctx + "/interface/queryAfwtHandsonByPage.do";
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.tzNssb = 1;
		return params;
	};
	bootstrapTableSetting.columns = [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'ONE_MENUS',
		title : '一级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'TWO_MENUS',
		title : '二级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'AFWT_HTML_NAME',
		title : '三级项目',
		align : "left",
		valign : "middle"
	}, {
		field : 'ACCEPT_ID',
		title : '处理结果',
		align : "center",
		valign : "middle",
		formatter : acceptIdFormatter
	}, {
		field : 'ACCEPT_NAME',
		title : '处理人',
		align : "center",
		valign : "middle"
	}, {
		field : 'ACCEPT_DATE',
		title : '处理时间',
		align : "center",
		valign : "middle"
	}, {
		field : 'export',
		title : '',
		align : "center",
		valign : "middle",
		formatter : export_tz_btn_Formatter,
		events : operateEvents
	}];
	$('#table_tz_export').bootstrapTable(bootstrapTableSetting);
	// 导出模态框的申报表加载
	bootstrapTableSetting.url = ctx + "/interface/queryAfwtHandsonByPage.do";
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.tzNssb = 2;
		return params;
	};
	bootstrapTableSetting.columns = [ {
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'ONE_MENUS',
		title : '一级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'TWO_MENUS',
		title : '二级项目',
		align : "center",
		valign : "middle"
	}, {
		field : 'AFWT_HTML_NAME',
		title : '三级项目',
		align : "left",
		valign : "middle"
	}, {
		field : 'ACCEPT_ID',
		title : '处理结果',
		align : "center",
		valign : "middle",
		formatter : acceptIdFormatter
	}, {
		field : 'ACCEPT_NAME',
		title : '处理人',
		align : "center",
		valign : "middle"
	}, {
		field : 'ACCEPT_DATE',
		title : '处理时间',
		align : "center",
		valign : "middle"
	}, {
		field : 'export',
		title : '',
		align : "center",
		valign : "middle",
		formatter : export_sb_btn_Formatter,
		events : operateEvents
	}];
	$('#table_bb_export').bootstrapTable(bootstrapTableSetting);
	
	
};
/**
 * 
 * 三级页面保存按钮
 * 
 */
function saveTzData(number, nsrsbhId, type, table1, table2, table3) {
	var data = JSON.stringify(hot.getData());
	$.ajax( {
		url : ctx + "/interface/AddTableData.do",
		type : "post",
		data : {
			"applyId" : applyId,
			"rowData" : data,
			"tableId" : tableId,
			"afwtHtmlName" : tableName,
			"tzNssb" : type,
			"taxDateId" : number,
			"nsrsbhId" : nsrsbhId
		},
		dataType : "json",
		success : function(data) {
			layer.msg("保存成功");
			norSave =1;
			table1.bootstrapTable('refresh', {});
			table2.bootstrapTable('refresh', {});
			table3.bootstrapTable('refresh', {});
		}
	});

}

/*
 * 编辑和导出给所选行赋值
 */
function getSelect(table) {
	selections = table.bootstrapTable('getSelections');
	if (selections.length < 1) {
		layer.msg('请选择列表中1条数据！', {
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
	applyId = selections[0].APPLY_ID;
	dateNumber = selections[0].TAXDATEID;
	return true;
};
/*
 * 按钮初始化
 */
function buttonInit() {
	// 新增一行
	$("#add_row_tz").on("click", function() {
		if (tableId == "8_1") {
			add_row8_1();
		} else if (tableId == "8_2") {
			add_row8_2();

		}else if(tableId=="9_2"){
			add_row9_2();
		
		}else if (tableId == "9_0") {
			add_row9_0();
		} else if (tableId == "9_3") {
			add_row9_3();
		} else {
			var row = hot.countRows() - 1;// 行号，现在为最后一行
			hot.setDataAtCell(row, 0);
			hot.setCellMeta(row, 1, 'type', 'dropdown');// 下拉框（可选）
			hot.setCellMeta(row, 1, 'source', [ '01129914-购置增值税税控系统专用设备抵减增值税',
					'01129924-已使用固定资产减征增值税' ]);
			hot.setDataAtCell(row, 1, '01129914-购置增值税税控系统专用设备抵减增值税');
			hot.setCellMeta(row, 2, 'readOnly', true);// 只读（可选）
		}
		
	});
	// 删除一行
	$("#del_row_tz").on("click", function() {
		if (tableId == "8_1") {
			del_row8_1();
		} else if (tableId == "8_2") {
			del_row8_2();
		} else if (tableId == "9_2") {
			del_row9_2();
		} else if (tableId == "9_0") {
			del_row9_0();
		} else if (tableId == "9_3") {
			del_row9_3();
		} else {

		}
		
	});
	// 新增按钮
	$('#addBtn').click(function() {
		if(sbbz!=0 && sbbz!=1){
			layer.msg('当前用户所属损益确认行不能创建纳税申报表');
			return false;
		}
		$('#queryModal').modal('show');
	});
	// 编辑按钮
	$('#edit').click(function() {
		selections = $("#table").bootstrapTable('getSelections');
		if (selections.length < 1) {
			layer.msg('请选择列表中1条数据！', {
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
		var status = selections[0].ADDIT_STATE;
		var bmid = selections[0].QX_BMID;
		if(orgId!=bmid){
			layer.msg('只能编辑自己机构申请的数据');
			return false;
		}
		
		if(status == 1){
			layer.msg('审核中的数据不能进行编辑操作');
			return false;
		}
		if (status == 2) {
			layer.msg('审核通过后不能进行编辑操作');
			return false;
		}
		if (!getSelect($('#table'))){
			return false;
		}
			
		editClick = true;
		$("#editTitle").html('编辑纳税申报');
		$("#auditBanks").removeAttr("disabled");
		$("#begindates").removeAttr("disabled");
		$("#enddates").removeAttr("disabled");
		$("#ssbb").show();
		$("#editSave").show();
		$('#editModal').modal('show');
		$(".div-upload-file").show();
	});
	// 导出按钮
	$('#export').click(function() {
		if (!getSelect($('#table')))
			return false;
		$('#exportModal').modal('show');
	});
	// 删除按钮
	$('#delete').click(function() {
		delAfwtMore();
	});
	// 提交按钮
	$('#submit').click(function() {
		submitCheck();
	});
	//文件上传--进入文件上传模态框
	$(".third-modal-dialog-body-content").on("click", "button", function(){
		$('#uploadModal').modal('show');
		$('#cellModal').modal('hide');
		
		rowId = $(this).attr("rowId");
		$('#uploadApplyId').val(applyId);
		$('#rowId').val(rowId);
		//文件上传 参数初始化
		$('#upload').fileinput('refresh', {
			uploadExtraData : {
				applyId : applyId,
				rowId : rowId
			}
		});
		//加载数据
		getUploadedInfo();
		//刷新
		$("#table_upload").bootstrapTable('refresh');
	});
	$("#upload_close_btn").on("click", function(){
		uploadFlag = 0;
		$('#cellModal').modal('show');
	});
	$("#save_cell").bind(
			'click',
			function() {
				
				//附表5_1保存前验证不等式
				var info = hot.view.settings.cells;
				info = info.getName();
				if(info.indexOf("5_1")!=-1){
					//7<=1+4+8
					var a = parseFloat(hot.getDataAtCell(7,0));
					var b = parseFloat(hot.getDataAtCell(7,3));
					var c = parseFloat(hot.getDataAtCell(7,7));
					var e;
					var f = parseFloat(hot.getDataAtCell(7,4));
					var g = parseFloat(hot.getDataAtCell(7,5));
				
					var d = FloatAdd(FloatAdd(a,b),c);
					d = Number(d);
					e=f+g;
					if(e > d){
						layer.msg("第7列的值应小于等于第1列,第4列,第8列的和,请确认填写正确后保存！");
						return ;
					}
					
					//9<=1+8
					var m = parseFloat(hot.getDataAtCell(7,0));
					var n = parseFloat(hot.getDataAtCell(7,7));
					var o = parseFloat(hot.getDataAtCell(7,8));
					var p = Number(o);
					var q = Number(FloatAdd(m,n));
					if(p>q){
						layer.msg("第9列应小于等于第1列,第8列的和,请确认填写正确后保存！");
						return ;
					}
				
				}
				
				//附表9_0不允许空行保存
				if(info.indexOf("9_0")!=-1){
					var editRows = hot.countRows();
					var arrEmptyRow = [];
					var arrEmptyDrop = [];
					var arrZeroRow = [];
					for(var z = 5;z<editRows;z++){
						var arrRow =hot.getDataAtRow(z);
						var placeFlag =  0;
						var dropFlag = 1;
						var zeroFlag = 1;
						for(var j = 0;j<arrRow.length;j++){
							if((j==1)||(j==2)){
								if((arrRow[j]==null)||(arrRow[j]=="")){
									placeFlag = 1;
								}
							}else if(j==3){
								if(arrRow[j]=='请选择'){
									dropFlag = 0;
								}
							}else if((j==4)||(j==5)||(j==6)||(j==7)){
								if(arrRow[j]==null||arrRow[j]==""){
									hot.setDataAtCell(z,j,"0.00");
									arrRow[j] = 0;
								}else{
									arrRow[j]=Number(arrRow[j]);
								}
								if((arrRow[j]!=0)){
									zeroFlag = 0;
								}
							}
						}
						if(dropFlag == 0){
							arrEmptyDrop.push(z+1);
						}
						if(placeFlag==1){
							arrEmptyRow.push(z+1);
						}
						if(zeroFlag==1){
							arrZeroRow.push(z+1);
						}
					}
					
					if(arrEmptyRow.length>0){
						layer.msg("第"+arrEmptyRow.join()+"行未填写完整，请填写完整后保存");
						return;
					}
					if(arrEmptyDrop.length>0){
						layer.msg("第"+arrEmptyDrop.join()+"行需要选择调整项目");
						return;
					}
					if(arrZeroRow.length>0){
						layer.msg("第"+arrZeroRow.join()+"行调整项不允许全部为零");
						return;
					}
					
				}
				var sbh = $('#nsrsbhIds').val();// 纳税人识别号
				layer.msg("正在保存中，请稍后 。。。。");
				saveTzData(dateNumber, sbh, 1, $("#table_tz_edit"),
						$("#table_bb_edit"), $("#table"));
				saveChange_flag = 1;
				count_add = 0;
			});
	
	//打印
	$("#export_cell_print").bind('click', function() {
		var $tabHide = $("#table_cell_tz").clone().hide();
		$tabHide = $tabHide.find("table[class=htCore]:first");
		$tabHide.beforePrint();
		console.log($tabHide[0].outerHTML);
		$tabHide.printThis();
	});
	$("#export_cell").bind('click', function() {
		table2Excel('table_cell_tz', tableName);
	});
	// 一键生成
	$("#ssbb").click(function() {
		  too_report=1;
		// $('#cellModal').modal('show');
			$("body").showLoadingEx();

			/*$.ajax({
				url : ctx + "/interface/getDate.do",
				type : "post",
				async : true,
				dataType : "json",
				success : function(data) {
					if (data != []) {
						ssbb_systemTime = data.substring(1,11);
					}
					
				}
			});*/
			//进度条
			var simplebar = new Nanobar({target: document.getElementById('nano')});
			simplebar.go(1);
		
			var start = new Date().getTime();//起始时间
			hotTableSetDataForOnekey(1, '9_0', callback1);
			function callback1() {
				console.info('callback1');
				tableId = '8_1';
				simplebar.go(4);
				hotTableSetDataForOnekey(1, '8_1', callback2);
			}
			function callback2() {
				console.info('callback2');
				simplebar.go(7);
				hotTableSetDataForOnekey(1, '5_1', callback3);
			}
			function callback3() {
				console.info('callback3');
				simplebar.go(10);
				hotTableSetDataForOnekey(1, '5_2', callback4);
			}
			
			function callback4() {
				console.info('callback4');
				simplebar.go(13);
				hotTableSetDataForOnekey(1, '8_2', callback5);
			}
			function callback5() {
				console.info('callback5');
				simplebar.go(16);
				hotTableSetDataForOnekey(1, '4_1', callback6);
			}
			function callback6() {
				console.info('callback6');
				simplebar.go(19);
				hotTableSetDataForOnekey(1, '6_1', callback7);
			}
			function callback7() {
				console.info('callback7');
				simplebar.go(22);
				hotTableSetDataForOnekey(1, '7_1', callback8);
			}
			function callback8() {
				console.info('callback8');
				simplebar.go(25);
				hotTableSetDataForOnekey(1, '9_2', callback9);
			}
			function callback9() {
				console.info('callback9');
				simplebar.go(28);
				hotTableSetDataForOnekey(2, '9', callback10);
			}
			function callback10() {
				console.info('callback10');
				simplebar.go(31);
				hotTableSetDataForOnekey(1, '1_1', callback11);
			}
			function callback11() {
				console.info('callback11');
				simplebar.go(35);
				hotTableSetDataForOnekey(1, '1_2', callback12);
			}
			function callback12() {
				console.info('callback12');
				simplebar.go(38);
				hotTableSetDataForOnekey(1, '1_3', callback13);
			}
			function callback13() {
				console.info('callback13');
				simplebar.go(42);
				hotTableSetDataForOnekey(1, '2_1', callback14);
			}
			function callback14() {
				console.info('callback14');
				simplebar.go(45);
				hotTableSetDataForOnekey(1, '2_2', callback15);
			}
			function callback15() {
				console.info('callback15');
				simplebar.go(50);
				hotTableSetDataForOnekey(1, '2_3', callback16);
			}
			function callback16() {
				console.info('callback16');
				simplebar.go(53);
				hotTableSetDataForOnekey(1, '2_4', callback17);
			}
			function callback17() {
				console.info('callback17');
				simplebar.go(56);
				hotTableSetDataForOnekey(1, '3_1', callback18);
			}
			function callback18() {
				console.info('callback18');
				simplebar.go(60);
				hotTableSetDataForOnekey(2, '1', callback19);
			}
			//申报表
			function callback19() {
				console.info('callback19');
				simplebar.go(63);
				hotTableSetDataForOnekey(2, '5', callback20);
			}
			function callback20() {
				console.info('callback20');
				simplebar.go(66);
				hotTableSetDataForOnekey(2, '2', callback21);
			}
			function callback21() {
				console.info('callback21');
				simplebar.go(70);
				hotTableSetDataForOnekey(2, '3', callback22);
			}
			function callback22() {
				console.info('callback22');
				simplebar.go(74);
				hotTableSetDataForOnekey(2, '4', callback23);
			}
			function callback23() {
				console.info('callback23');
				simplebar.go(78);
				hotTableSetDataForOnekey(2, '6', callback24);
			}
			function callback24() {
				console.info('callback24');
				simplebar.go(82);
				hotTableSetDataForOnekey(2, '7', callback25);
			}
			function callback25() {
				console.info('callback25');
				simplebar.go(86);
				hotTableSetDataForOnekey(2, '0', callback26);
			}
			function callback26() {
				console.info('callback26');
				simplebar.go(90);
				hotTableSetDataForOnekey(2, '8', callback27);
			}
			function callback27() {
				console.info('callback27');
				simplebar.go(94);
				hotTableSetDataForOnekey(1, '9_1', callback);
			}

			function callback() {
				simplebar.go(100);
				$("body").hideLoadingEx();
				$("#bb_tab a").attr("href","#bb2");
				$('#editTab a').click();
				//$('#tz_tab a').tab('show');
				$("#table_tz_edit").bootstrapTable('refresh');
				$("#table_bb_edit").bootstrapTable('refresh');
				layer.msg("一键生成成功！");
				
			    var end = new Date().getTime();//结束时间
			    console.info("一键生成总共执行时间"+(end - start)+"ms");//返回函数执行需要时间
			    
			    //点击一键生成后，才可以查看申报表信息
			    isDateChanged = 0;
			}
			
		});
};
function del_row8_1() {
	if (hot.countRows() > 8) {
		//删除之前先清零 这里要注意公式的计算 例如3=1+2 要先清零1和2再清零3
		for ( var i = 0; i < 9; i++) {
			hot.setDataAtCell(hot.countRows()-1, i + 2, 0);
		}
		hot.alter('remove_row', hot.countRows() - 1);
		hot.render();
	}
}
function del_row8_2() {
	if (hot.countRows() > 10) {
		hot.setDataAtCell(hot.countRows()-1, 5, 0);
		hot.setDataAtCell(hot.countRows()-1, 6, 0);
		hot.setDataAtCell(hot.countRows()-1, 7, 0);
		hot.setDataAtCell(hot.countRows()-1, 2, 0);
		hot.setDataAtCell(hot.countRows()-1, 3, 0);
		hot.setDataAtCell(hot.countRows()-1, 4, 0);
		hot.setDataAtCell(hot.countRows()-1, 8, 0);
		hot.setDataAtCell(hot.countRows()-1, 9, 0);
		hot.setDataAtCell(hot.countRows()-1, 10, 0);
		hot.alter('remove_row', hot.countRows() - 1);
		hot.render();
	}
}
function del_row9_2() {
	if (hot.countRows() > 15) {
		//删除之前先清零 这里要注意公式的计算 例如3=1+2 要先清零1和2再清零3
		for ( var i = 0; i < 15; i++) {
			hot.setDataAtCell(hot.countRows()-1, i + 2, 0);
		}
		hot.alter('remove_row', hot.countRows() - 1);
		hot.render();
	}
}
function del_row9_0_2(){
	if(hot.countRows()>5){
		//删除该行
		hot.alter('remove_row',hot.countRows()-1);
		//删除改行附属的所有文件
		$.ajax({
			url : ctx + "/interface/delRowApFile.do",
			type : "post",
			dataType : "json",
			data : {
				applyId : applyId,
				rowId 	: hot.countRows()
			},
			success : function(data){
				if(data.messageType === "SUCCESS"){
					//layer.msg("删除成功",{icon:1});
				}else{
					layer.msg("关闭失败",{icon:2});
				}
			},
			error : function(){
				layer.msg("服务器出错，请稍后重试", {icon:2});
			}
		});
		hot.render();
	}
}
function del_row9_0(){
	if(hot.countRows()>5){
		//删除该行
		hot.alter('remove_row',hot.countRows()-1);
		//删除改行附属的所有文件
		$.ajax({
			url : ctx + "/interface/delRowApFile.do",
			type : "post",
			dataType : "json",
			data : {
				applyId : applyId,
				rowId 	: hot.countRows()
			},
			success : function(data){
				if(data.messageType === "SUCCESS"){
					layer.msg("删除成功",{icon:1});
				}else{
					layer.msg("删除失败",{icon:2});
				}
			},
			error : function(){
				layer.msg("服务器出错，请稍后重试", {icon:2});
			}
		});
		hot.render();
		count_add = count_add - 1;
		saveChange_flag = 0;
	}
}
function del_row9_3() {
	if (hot.countRows() > 7) {
		hot.alter('remove_row', hot.countRows() - 1);
		hot.render();
	}
}
function add_row8_1() {
	if (hot.countRows() < 13) {
		// 末尾增加一行
		insertAction = true;
		hot.alter('insert_row', hot.countRows());
		var row = hot.countRows() - 1;
		// 栏次
		hot.setDataAtCell(row, 0, row + 1 - 7);
		// 栏次居中
		hot.setCellMeta(row, 0, 'className', 'htCenter htMiddle');
		// 栏次只读
		hot.setCellMeta(row, 0, 'readOnly', true);

		hot.setCellMeta(row, 1, 'editor', 'select');
		hot.setCellMeta(row, 1, 'selectOptions', [
				'01129914-购置增值税税控系统专用设备抵减增值税', '01129924-已使用固定资产减征增值税' ]);
		hot.setDataAtCell(row, 1, '01129914-购置增值税税控系统专用设备抵减增值税');
		// hot.setCellMeta(row,0,'readOnly',true);
		// //其他格子只读和赋初值0
		for ( var i = 0; i < 9; i++) {
			hot.setCellMeta(row, i + 2, 'readOnly', true);
			hot.setDataAtCell(row, i + 2, '0');
		}

		hot.setCellMeta(row, 4, 'readOnly', false);
		hot.setCellMeta(row, 8, 'readOnly', false);
		hot.render();
		insertAction = false;
	} else {
		layer.msg("最多只能增加五行");
	}

}
function add_row8_2() {
	if (hot.countRows() < 17) {
		// 末尾增加一行
		insertAction = true;
		hot.alter('insert_row', hot.countRows());
		var row = hot.countRows() - 1;

		// 栏次
		hot.setDataAtCell(row, 0, row + 1 - 7);
		// 栏次居中
		hot.setCellMeta(row, 0, 'className', 'htCenter htMiddle');
		// 栏次只读
		hot.setCellMeta(row, 0, 'readOnly', true);

		hot.setCellMeta(row, 1, 'editor', 'select');
		hot.setCellMeta(row, 1, 'selectOptions', [
				'01081507-国债、地方政府债利息收入免征增值税优惠', '01083907-熊猫普制金币免征增值税优惠','P1：国债利息','P2：地方债利息','R2：人民银行资金往来业务利息','R3：银行联行往来业务利息','R4：金融机构资金往来业务利息','B1：票据转贴现利息','质押式买入返售金融商品利息','政策性金融债利息' ]);
		hot.setDataAtCell(row, 1, '01081507-国债、地方政府债利息收入免征增值税优惠');
		// hot.setCellMeta(row,0,'readOnly',true);
		// //其他格子只读和赋初值0
		for ( var i = 0; i < 9; i++) {
			hot.setCellMeta(row, i + 2, 'readOnly', true);
			hot.setDataAtCell(row, i + 2, '0');
		}

		hot.setCellMeta(row, 3, 'readOnly', false);
		hot.setCellMeta(row, 6, 'readOnly', false);
		hot.render();
		insertAction = false;
	} else {
		layer.msg("最多只能增加七行");
	}
	
}


function add_row9_2(){
	//末尾增加一行
	insertAction = true;
	hot.alter('insert_row',hot.countRows());
	var row = hot.countRows()-1;	
	hot.setCellMeta(row,0,'type','dropdown');//下拉框（可选）
	hot.setCellMeta(row,0,'source',['050100贷款服务',
	                                '050200直接收费金融服务',
	                                '050498金融商品转让', 
	                                '060502不动产经营租赁',
	                                '090100销售不动产建筑物',
	                                '090200销售不动产构筑物',
	                                '060501不动产融资租赁',
	                                '060503有形动产融资租赁',
	                                '060504有形动产经营租赁']);
	hot.setCellMeta(row,1,'type','dropdown');//下拉框（可选）
	hot.setCellMeta(row,1,'source',['5%',	                                
	                                '6%',
	                                '11%']);
	hot.setDataAtCell(row,2,'5%');
	hot.setDataAtCell(row,1,'6%');
	hot.setDataAtCell(row,0,'090100销售不动产建筑物');
	hot.setCellMeta(row,2,'readOnly',true);
	for(var i=0;i<14;i++){
		hot.setCellMeta(row,i+3,'readOnly',true);
		hot.setDataAtCell(row,i+3,'0');
		//hot.setCellMeta(row,i+1,'className','htMiddle');
	}
	hot.setCellMeta(row,6,'readOnly',false);
	hot.setCellMeta(row,9,'readOnly',false);
	hot.setCellMeta(row,11,'readOnly',false);
	hot.setCellMeta(row,13,'readOnly',false);
	hot.render();
	insertAction = false;
	
	
}


function add_row9_3() {
	// 末尾增加一行
	hot.alter('insert_row', hot.countRows());
	// 行号
	var row = hot.countRows() - 1;
	// 序号

	hot.setDataAtCell(row, 0, row - 6);
	// 是否使用一般计税方法
	hot.setCellMeta(row, 6, 'type', 'dropdown');// 下拉框（可选）
	hot.setCellMeta(row, 6, 'source', [ '是', '否' ]);
	hot.setDataAtCell(row, 6, '是');

	// 预征税
	if (hot.getDataAtCell(row, 6) === "是") {
		hot.setDataAtCell(row, 8, "3%");
	} else if (hot.getDataAtCell(row, 6) === "否") {
		hot.setDataAtCell(row, 8, "5%");
	} else {
		// 以为下拉框默认为是，所以这里默认为3%
		hot.setDataAtCell(row, 8, "3%");
	}
	hot.setCellMeta(row, 8, 'readOnly', true);// 只读

	hot.render();
}
function add_row9_0() {
	// 末尾增加一行
	hot.alter('insert_row', hot.countRows());
	var row = hot.countRows() - 1;
	// 栏次
	hot.setDataAtCell(row, 0, row + 1 - 5);
	hot.setCellMeta(row, 0, 'className', 'htCenter htMiddle');
	for(var j = 0;j<8;j++){
		hot.setCellMeta(row, j, 'className', 'htCenter htMiddle');
	}
	hot.setCellMeta(row,0,'readOnly',true);
	
	hot.setCellMeta(row, 3, 'type', 'dropdown');// 下拉框（可选）
	hot.setCellMeta(row, 3, 'source', [ '请选择','6%征收率', '5%征收率的货物及加工修理修配劳务',
			'5%征收率的服务、不动产和无形资产', '4%征收率', '3%征收率的货物及加工修理修配劳务',
			'3%征收率的服务、不动产和无形资产', '17%税率的货物及加工修理修配劳务', '17%税率的服务、不动产和无形资产',
			'13%税率', '11%税率', '6%税率', '其他' ]);

	hot.setCellMeta(row, 3, 'allowInvalid',false);
	hot.setDataAtCell(row, 3, '请选择');
	hot.setCellMeta(row,8,'readOnly',true);
	hot.render();
	count_add = count_add + 1;
	saveChange_flag = 0;
}
/*
 * modal显示隐藏事件初始化
 */
var uploadFlag = 0;
var count_add = 0;
var saveChange_flag = 0;
Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};
function ModalInit() {
	// 新增模态框的显示事件
	$('#queryModal').bind('show.bs.modal', function() {
		secondModalAdjustScreen();
		evalAddInput();
	});
	// 编辑模态框的显示事件
	$('#editModal').bind('show.bs.modal', function() {
		secondModalAdjustScreen();
		evalEditInput();
		$("#table_tz_edit").bootstrapTable('refresh');
		$("#table_bb_edit").bootstrapTable('refresh');
	});
	// 导出模态框的显示事件
	$('#exportModal').bind('show.bs.modal', function() {
		secondModalAdjustScreen();
		$("#table_tz_export").bootstrapTable('refresh');
		$("#table_bb_export").bootstrapTable('refresh');
	});
	// 报表模态框的隐藏事件
	$('#cellModal').bind('hide.bs.modal', function() {
		var info = hot.view.settings.cells;
		info = info.getName();
		if(info.indexOf("9_0")!=-1){
				if((count_add>0)&&(uploadFlag==0)&&(saveChange_flag==0)){
					for(var i = 0;i<count_add;i++){
						del_row9_0_2();
					}
					count_add = 0;
				}
			
		}
		
	});
	// 报表模态框的显示事件
	$('#cellModal').bind('shown.bs.modal', function() {
		$('#hide_cell_tz').click();
		var data = hot.getDataAtCell(0, 0);
		hot.setDataAtCell(0, 0, data);
		$("body").hideLoading();
	});
	
	
	// 文件上传模态框的显示事件
	$('#uploadModal').bind('show.bs.modal', function() {
		uploadFlag = 1;
		secondModalAdjustScreen();
	});
	$('#uploadModal').bind('shown.bs.modal', function() {
		$("#upload").bind("fileuploaded",
		function(event, data, previewId, index) {
			layer.msg(data.response.message,{icon:1});
			//重置input
			//$("#upload").fileinput('clear');
			$("#upload").fileinput('reset');
			//刷新table
			$("#table_upload").bootstrapTable('refresh');
		});
	});

};
/*
 * tab初始化
 */
function tabInit() {
	// 新增编辑模态框页签设置
	$('#addTab a:first').tab('show');// 初始化显示哪个tab
	$('#addTab a').click(function(e) {
		e.preventDefault();// 阻止a链接的跳转行为
			$(this).tab('show');// 显示当前选中的链接及关联的content
		});
	// 编辑模态框页签设置
	$('#editTab a:first').tab('show');// 初始化显示哪个tab
	$('#editTab a').click(function(e) {
		e.preventDefault();// 阻止a链接的跳转行为
			$(this).tab('show');// 显示当前选中的链接及关联的content
		});
	// 导出模态框页签设置
	$('#exportTab a:first').tab('show');// 初始化显示哪个tab
	$('#exportTab a').click(function(e) {
		e.preventDefault();// 阻止a链接的跳转行为
			$(this).tab('show');// 显示当前选中的链接及关联的content
		});
}

/**
 * 三级模态框show(),hide()
 */
function cellModalShowHide(){
	$("#cellModal").show();
	$("#cellModal").hide();
}

/*
 * 纳税申报管理主界面加载
 */
$(function() {
	window.operateEvents = {
		'click .edit_tz' : function(e, value, row, index) {
		norSave =0;
		thirdModalAdjustScreen();
		tableId = row.MODEL_ID;
		tableName = row.AFWT_HTML_NAME;
		type = 1;
		buttonType = 1;
		hotTableSetData($('#cellModal'), row, type, 1, buttonType);
	},
	'click .edit_sb' : function(e, value, row, index) {
		norSave =0;
		thirdModalAdjustScreen();
		if(row.ACCEPT_ID=="2"){
			ssbb_systemTime = row.ACCEPT_DATE;
		}
		
		tableId = row.MODEL_ID;
		tableName = row.AFWT_HTML_NAME;
		type = 2;
		buttonType = 1;
		hotTableSetData($('#cellModal'), row, type, 1, buttonType);
	},
	'click .export_tz' : function(e, value, row, index) {
		thirdModalAdjustScreen();
		tableId = row.MODEL_ID;
		type = 1;
		buttonType = 2;
		tableName = row.AFWT_HTML_NAME;
		hotTableSetData($('#cellModal'), row, type, 2, buttonType);
	},
	'click .export_sb' : function(e, value, row, index) {
		thirdModalAdjustScreen();
		tableId = row.MODEL_ID;
		type = 2;
		buttonType = 2;
		tableName = row.AFWT_HTML_NAME;
		hotTableSetData($('#cellModal'), row, type, 2, buttonType);
	},
	'click .number_main' : function(e, value, row, index) {
		editClick = false;
		$("#editTitle").html('查看纳税申报');
		$("#auditBanks").attr("disabled","disabled");
		$("#begindates").attr("disabled","disabled");
		$("#enddates").attr("disabled","disabled");
		$("#ssbb").hide();
		$("#editSave").hide();
		$(".div-upload-file").hide();
		applyId = row.APPLY_ID;
		row1 = row;
		$('#editModal').modal('show');
	},
	'click .auditMessage' : function(e, value, row, index) {
		console.log(value);
		$('.audit_p').text("无");
		if(value!=undefined){
			$('.audit_p').text(value);
		}
		
		$('#auditMessageModal').modal('show');
		secondModalAdjustScreen();
	}
	};
	InitTree();
	bootstrapTableInit();
	buttonInit();
	tabInit();
	cellModalShowHide();
	// 浏览器的高度发生改变时，模态框自适应
	window.onresize = function() {
		secondModalAdjustScreen();
		thirdModalAdjustScreen();
	};
	ModalInit();
	loadValidator();
	$("#AddSave").on("click", addSave);
	$("#editSave").on("click", editSave);
	$("#afwt_search").on("click", function() {
		afwt_search();
	});
	$("#afwt_searchReset").on("click", resetSearchCondition);
	
	//ie9.0文件上传提交表单
	$("#ieSubmit").on("click", IE9SubmitUpload);
	//文件上传input框初始化
	initFileInput();
	//文件下载
	$("#download_btn").on("click", downloadFile);
	//文件删除
	$("#delfile_btn").on("click", delFile);
	//点击所属损益行，弹出ztree页面后的保存按钮
	$("#ztreeSave").on("click", ztree_save);
	//ztree初始化
	
	//所属损益行聚焦事件
	$("#sure").on("focus",focus_sssyh);

});
/*
 * 加载validator
 */
var loadValidator = function() {
	// 初始化新增界面查询form的validator和日期选择框的校验事件
	InitValidator($('#queryModal'), $('#AddafwtForm'), AddafwtForm_validator);
	InitDataForForm($('#AddafwtForm'), $('#begindate'), $('#enddate'));

	// 初始化编辑界面的校验
	InitValidator($('#editModal'), $('#editForm'), editForm_validator);
	InitDataForForm($('#editForm'), $('#begindates'), $('#enddates'));
};
/**
 * 提交审核
 * 
 */

function submitCheck() {
	selections = $("#table").bootstrapTable('getSelections');
	var yesorNo = $("#table").bootstrapTable();
	if (selections.length < 1) {
		layer.msg('请至少选择列表中1条数据！', {
			icon : 3,
			offset : '150px'
		});
		return false;

	}
	var status = selections[0].ADDIT_STATE;
	if(status =='1'){
		layer.msg('审核中的不能再提交');
		return false;
	}
	if(status =='2'){
		layer.msg('审核通过的不能再提交');
		return false;
	}
	
	var applyId = [];
	for ( var i = 0; i < selections.length; i++) {
		applyId.push(selections[i].APPLY_ID);
	}
	var applyId = applyId.join(",");
	var applyState = [];
	for ( var j = 0; j < selections.length; j++) {
		applyState.push(selections[j].APPLY_STATE);
	}
	var applyState = applyState.join(",");
	if (applyState.indexOf("1") != -1) {
		layer.msg('有的表您还未处理');
		return false;
	}
	var n = 1;
	for ( var x = 0; x < selections.length; x++) {

		if (selections[x].ADDIT_STATE == "1"
				|| selections[x].ADDIT_STATE == "2") {
			n = 0;
		}
	}
	if (n == 0) {
		layer.msg('此状态不能提交', {
			icon : 3,
			offset : '150px'
		});
		return false;

	}
	submit(applyId);

};

/**
 * 提交
 */

function submit(applyId) {
	
	layer.confirm('是否确定要提交？', {
		btn : [ '确定', '取消' ]
	// 按钮
			}, function() {
				$.ajax( {
					type : "POST",
					url : ctx + "/interface/upAfwtList.do",
					data : {
						applyId : applyId
					},
					success : function(data) {
						var data = eval("(" + data + ")");
						if (data.messageType == "SUCCESS") {
							layer.msg(data.message, {
								icon : 1

							});
							afwt_search();
						} else {
							layer.msg(data.message, {
								icon : 2
							});

						}

					}
				});
			});
};

/*
 * 删除一条数据
 */
function delList(applyId) {
	selections = $("#table").bootstrapTable('getSelections');
	var status = selections[0].ADDIT_STATE;
	if(status!=0){
		layer.msg('只能删除未审核状态的数据');
		return false;
	}
	layer.confirm('是否确定要删除？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax( {
			type : "POST",
			url : ctx + "/interface/delAfwtList.do",
			data : {
				applyId : applyId
			},
			success : function(data) {
				var data = eval("(" + data + ")");
				if (data.messageType == "SUCCESS") {
					layer.msg(data.message, {
						icon : 1
					});
					$("#table").bootstrapTable('refresh');
				} else {
					layer.msg(data.message, {
						icon : 2
					});
				}
			}
		});
	});
};
// 批量删除
function delAfwtMore() {
	selections = $("#table").bootstrapTable('getSelections');
	if (selections.length < 1) {
		layer.msg('请至少选择列表中1条数据！', {
			icon : 3,
			offset : '150px'
		});
		return false;

	}
	var applyId = [];

	for ( var i = 0; i < selections.length; i++) {
		applyId.push(selections[i].APPLY_ID);
	}

	var status = true; // 默认没有2
	for ( var j = 0; j < selections.length; j++) {
		if (selections[j].ADDIT_STATE == "2") {
			status = false;
		}
	}
	if (status != true) {
		layer.msg('审核通过的不能删除');
		return false;

	}
	var applyId = applyId.join(",");

	delList(applyId);
};
/*
 * hotTableInit row 选中的行; type类型1台账表2申报表
 */
function hotTableSetData(modal, row, type, showFlag, buttonType) {
	function doSomething(result) {
		// 保存
		$.ajax( {
			url : ctx + "/interface/AddTableData.do",
			type : "post",
			data : {
				"applyId" : selections[0].APPLY_ID,
				"rowData" : JSON.stringify(hot.getData()),
				"tableId" : tableId,
				"tzNssb" : type,
				"taxDateId" : selections[0].TAXDATEID,
				"nsrsbhId" : selections[0].NSRSBH_ID
			},
			dataType : "json",
			success : function(data) {
				$("#table_tz_edit").bootstrapTable('refresh');
				$("#table_bb_edit").bootstrapTable('refresh');
				modal.modal('show');
			}
		});
		
	};
	$("body").showLoading();
	var tableId = row.MODEL_ID;
	var afwtHtmlName = row.AFWT_HTML_NAME;
	//当点击编辑按钮后
	if(editClick || showFlag == 2){
		if (buttonType == 1) {
			$("#export_cell").hide();
			$("#export_cell_print").hide();
			$("#save_cell").show();
		} else {
			$("#export_cell").show();
			$("#export_cell_print").show();
			$("#save_cell").hide();
		}
		
		
		if (
			(tableId == "9_2" || 
			 tableId == "8_1" || 
			 tableId == "8_2" || 
			 tableId == "9_3" || 
			 tableId == "9_0")
			&& buttonType == 1) {
			$("#add_row_tz").show();
			$("#del_row_tz").show();
		} else {
			$("#add_row_tz").hide();
			$("#del_row_tz").hide();
		}
	}else{
		$("#export_cell").hide();
		$("#export_cell_print").hide();
		$("#save_cell").hide();
		$("#add_row_tz").hide();
		$("#del_row_tz").hide();
	}
	
	
	// 找到title
	modal.find('h4.modal-title').html(afwtHtmlName);
	// 找到table
	var table = modal.find('div.h-three');
	// 发同步请求获得表样
	$.ajax( {
		url : ctx + "/interface/LoadTableModel.do",
		type : "post",
		async : true,
		data : {
			"modelId" : row.MODEL_ID,
			"tzNssb" : type
		},
		dataType : "json",
		success : function(data) {
			var settings = JSON.parse(JSON.parse(data));
			settings['afterChange'] = eval('calculate' + tableId);
			settings['cells'] = eval('setRender' + tableId);
			settings['rowHeaders'] = true;
			settings['colHeaders'] = true;
			settings['enterBeginsEditing'] = false;
			settings['autoWrapCol'] = true;
			settings['autoWrapRow'] = true;
			settings['renderAllRows'] = true;
			settings['beforeChange'] = eval('cellCheck' + tableId);
			var fixedRowsTop = getFixedRowsTop(tableId);
			if (fixedRowsTop != undefined) {
				settings.fixedRowsTop = fixedRowsTop;
			} else {
				delete settings.fixedRowsTop;
			}
			status = row.ACCEPT_ID;
			// 已经处理过的表发同步请求获得表内数据
		if (status == 2) {
			$.ajax( {
				url : ctx + "/interface/selectAfwtHandson.do",
				type : "post",
				async : true,
				data : {
					"applyId" : applyId,
					"afwtHtmlName" : tableName
				},
				dataType : "json",
				success : function(data) {
					
					var arr = JSON.parse(data);
					var data_1 = JSON.parse(arr[0].afwtHandson);
					settings.data = data_1;
					if ($.isEmptyObject(hot)) {
						hot = new Handsontable(table[0], settings);
					} else {
						hot.destroy();
						hot = new Handsontable(table[0], settings);
					}
					//表8_1和8_2查看的时候栏次居中
					if(tableId=='8_1'||tableId=='8_2'){
						for(var i=0;i<hot.countRows()-8;i++){
							hot.setCellMeta(i+8, 0, 'className', 'htCenter htMiddle');
						}
						hot.render();
					}
					//表5_2查看的时候栏次居中
					if(tableId=='5_2'){
						for(var i=0;i<hot.countRows()-7;i++){
							for(var j = 0;j<15;j++){
								hot.setCellMeta(i+7, j, 'className', 'htCenter htMiddle');
							}
						}
						hot.render();
					}
					if (showFlag == 2) {
						setAllReadonly(hot);
						modal.modal('show');
					} else{
						if(editClick){
							eval('setData' + tableId + '(' + doSomething + ')');
						}else{
							setAllReadonly(hot);
							modal.modal('show');
						}
						
					}
						
				}
			});
		} else {
			if ($.isEmptyObject(hot)) {
				hot = new Handsontable(table[0], settings);
			} else {
				hot.destroy();
				hot = new Handsontable(table[0], settings);
			}
			if (showFlag == 2 || editClick == false) {
				setAllReadonly(hot);
				modal.modal('show');
			} else
				eval('setData' + tableId + '(' + doSomething + ')');
		}
	}
	});
};
/**
 * 新增 模态框弹出后，加载默认的信息
 */
var evalAddInput = function() {
	// 为输入框赋值
	$("#nsrsbhId").val(nsrsbhId);
	$("#nsName").val(nsName);
	$("#applyName").val(applyName);
	$("#sssyh").val(sssyh);
	// 下拉框
	$.ajax( {
		url : ctx + "/interface/selectAuditZtree.do",
		type : "post",
		data : {
			yhid : yhid
		},
		success : function(data) {
			var data = JSON.parse(JSON.parse(data));
			document.getElementById("auditBank").innerHTML = "";
			$.each(data, function(idx, obj) {
				$("#auditBank").append(
						"<option value='" + obj.NAMES + "'>" + obj.NAMES
								+ "</option>");
			});

		}
	});
};
/**
 * excel导出
 */
// 导出excel方法
function table2Excel(tabId, filename) {
	$("#" + tabId).table2excel( {
		filename : filename
	});
}

/**
 * 新增的保存按钮
 */
function addSave() {
	// 点击保存之后，先进行数据校验，然后再走保存逻辑
	$('#AddafwtForm').bootstrapValidator('validate');
	if ($('#AddafwtForm').data('bootstrapValidator').isValid()) {
		layer.msg("正在保存，请稍后...");
		// 隐藏保存按钮
		$("#AddSave").hide();
		
		$.ajax({
			url : ctx + "/interface/insertAfwt.do",
			type: "post",
			dataType: "json",
			data: {
				nsrsbhId : $("#nsrsbhId").val(),
				nsName : $("#nsName").val(),
				auditBank : $("#auditBank").val(),
				applyName : $("#applyName").val(),
				skSdate : $("#begindate").val(),
				skEdate : $("#enddate").val(),
				nsBank : sssyh
			},
			success: function(result){
				var data;
				if(typeof(result) === 'string'){
					data = eval("(" + data + ")");
				}else{
					data = result;
				}
				if (data.messageType == "SUCCESS") {
					// 显示保存按钮
					$("#AddSave").show();
					// 关闭模态框
					$("#queryModal").modal("hide");
					$("#table").bootstrapTable('refresh', {});
					layer.msg(data.message, {
						icon : 1
					});
					afwt_search();
				}else {
					// 显示保存按钮
					$("#AddSave").show();
					layer.msg(data.message, {
						icon : 2
					});
				}
			},
			error: function(){
				layer.msg("请求发送失败！",{icon:2});
			}
		});
	} else {
		layer.msg('规范输入信息后才能保存',{icon:2});
		return false;
	}
};

/**
 * 编辑 模态框弹出后，加载默认的信息
 */
var evalEditInput = function() {
	if(editClick){
		selections = $("#table").bootstrapTable('getSelections');
		applyId111 = selections[0].APPLY_ID;
		// var applyId = selections[0].APPLY_ID;
		var nsrsbhId = selections[0].NSRSBH_ID;
		var nsName = selections[0].NS_NAME;
		var auditBank = selections[0].AUDIT_BANK;
		var skSdate = selections[0].SK_SDATE;
		var skEdate = selections[0].SK_EDATE;
		var applyName = selections[0].APPLYNAME;
	}else{
		applyId111 = row1.APPLY_ID;
		var nsrsbhId = row1.NSRSBH_ID;
		var nsName = row1.NS_NAME;
		var auditBank = row1.AUDIT_BANK;
		var skSdate = row1.SK_SDATE;
		var skEdate = row1.SK_EDATE;
		var applyName = row1.APPLYNAME;
	}
	
	// 输入框
	$('#applyId').val(applyId111);
	$('#nsNames').val(nsName);
	$('#nsrsbhIds').val(nsrsbhId);
	
	$('#begindates').val(skSdate);
	$('#enddates').val(skEdate);
	$('#applyNames').val(applyName);

	// 下拉框
	$.ajax( {
		url : ctx + "/interface/selectAuditZtree.do",
		type : "post",
		data : {
			yhid : yhid
		},
		success : function(data) {
			var data1 = JSON.parse(JSON.parse(data));
			document.getElementById("auditBanks").innerHTML = "";
			var selectid=document.getElementById("auditBanks");
		    selectid[0]=new Option(auditBank,auditBank);
			$.each(data1, function(idx, obj) {
				if(obj.NAMES!==auditBank){
					$("#auditBanks").append(
							"<option value='" + obj.NAMES + "'>" + obj.NAMES
								+ "</option>");
				}
				
			});

		}
	});

	//为日期等变量赋值，此时未编辑，未点击保存按钮
	pvt_person = nsName;
	pvt_beginDate = skSdate;
	pvt_endDate = skEdate;
	
	//为日期等变量赋值，此时已经编辑，未点击保存按钮=====================================
	$("#begindates").blur(function(){
		var new_pvt_beginDate = $('#begindates').val();
		var new_pvt_endDate = $('#enddates').val();
		if(pvt_beginDate != new_pvt_beginDate){
			isDateChanged = 1;
		}
		if(pvt_endDate != new_pvt_endDate){
			isDateChanged = 1;
		}
	});
	$("#enddates").blur(function(){
		var new_pvt_beginDate = $('#begindates').val();
		var new_pvt_endDate = $('#enddates').val();
		if(pvt_beginDate != new_pvt_beginDate){
			isDateChanged = 1;
		}
		if(pvt_endDate != new_pvt_endDate){
			isDateChanged = 1;
		}
	});
	
	$("#table_tz_edit").bootstrapTable('refresh', {});
	$("#table_bb_edit").bootstrapTable('refresh', {});
};

/**
 * 编辑的保存按钮
 */
function editSave() {
	//最开始判断有没有点一键生成按钮
	if(too_report!=1 && norSave ==1){
		layer.msg("您保存了报表信息，还没有点击一键生成报表功能");
		return false;
	}

	// 点击保存之后，先进行数据校验，然后再走保存逻辑
	$('#editForm').bootstrapValidator('validate');
	if ($('#editForm').data('bootstrapValidator').isValid()) {
		layer.msg("正在保存，请稍后...");
		// 隐藏保存按钮
		$("#editSave").hide();
		$.ajax({
			url : ctx + "/interface/updateAfwt.do",
			type : "post",
			dataType : "json",
			data : {
				nsrsbhId : $("#nsrsbhIds").val(),
				applyId : $("#applyId").val(),
				nsName : $("#nsNames").val(),
				auditBank : $("#auditBanks").val(),
				applyName : $("#applyNames").val(),
				skSdate : $("#begindates").val(),
				skEdate : $("#enddates").val(),
			},
			success : function(result){
				var data;
				if(typeof(result) === 'string'){
					data = eval("(" + result + ")");
				}else{
					data = result;
				}
				if (data.messageType == "SUCCESS") {
					// 显示保存按钮
					$("#editSave").show();
					layer.msg("保存成功", {
						icon : 1
					});
					//修改了表单，保存成功后，不点击生成报表，不能查询报表信息
					if(isDateChanged == 1){
						$("#bb_tab a").attr("href","#bb3");
					}
					$("#table").bootstrapTable('refresh');
					too_report=0;
				} else {
					// 显示保存按钮
					$("#editSave").show();
					layer.msg(data.message, {
						icon : 2
					});
				}
			}
			,error : function(){
				layer.msg("发送请求失败！",{icon:2});
			}
		});
	} else {
		layer.msg('规范输入信息后才能保存');
		return false;
	}
	$('#editModal').modal('hide');
	selections = $("#table").bootstrapTable('getSelections');
	// 为日期变量赋值，此时点击了保存按钮
	pvt_person = $("#nsNames").val();
	pvt_beginDate = $("#begindates").val();
	pvt_endDate = $("#enddates").val();
}

// 刷新表单
function afwt_search() {
	$("#table").bootstrapTable('refresh');
}

// 清空查询条件
function resetSearchCondition() {
	// 把输入框内的值初始化
	var t = $(".h-cls-input");
	for ( var i = 0; i < t.length; i++) {
		t[i].value = "";
	}
	nodes = '';
	// 把选择条件初始化
	$("#additStatefrom").val("");
	$("#table").bootstrapTable('refresh', {});
};

// 一键生成表格数据加载
function hotTableSetDataForOnekey(type, tableId, callback) {
	var start = new Date().getTime();//起始时间
	function doSomething(result) {

		// 保存
		$.ajax( {
			url : ctx + "/interface/AddTableData.do",
			type : "post",
			data : {
				"applyId" : selections[0].APPLY_ID,
				"rowData" : JSON.stringify(hot.getData()),
				"tableId" : tableId,
				"tzNssb" : type,
				"taxDateId" : selections[0].TAXDATEID,
				"nsrsbhId" : selections[0].NSRSBH_ID
			},
			dataType : "json",
			success : function(data) {
			    var end = new Date().getTime();//接受时间
			    console.info( "table"+tableId+"执行时间"+(end - start)+"ms");//返回函数执行需要时间
				callback();
			}
		});
	}
	;
	// 找到table
	var table = $("#table_cell_tz");
	// 发请求获得表样
	$.ajax( {
		url : ctx + "/interface/LoadTableModel.do",
		type : "post",
		async : true,
		data : {
			"modelId" : tableId,
			"tzNssb" : type
		},
		dataType : "json",
		success : function(data) {
			var settings = JSON.parse(JSON.parse(data));
			settings['afterChange'] = eval('calculate' + tableId);
			settings['cells'] = eval('setRender' + tableId);
			settings['rowHeaders'] = true;
			settings['colHeaders'] = true;
			settings['enterBeginsEditing'] = false;
			settings['autoWrapCol'] = true;
			settings['autoWrapRow'] = true;
			settings['beforeChange'] = eval('cellCheck' + tableId);
			var fixedRowsTop = getFixedRowsTop(tableId);
			if (fixedRowsTop != undefined) {
				settings.fixedRowsTop = fixedRowsTop;
			} else {
				delete settings.fixedRowsTop;
			}
			$.ajax( {
				url : ctx + "/interface/selectAfwtHandson.do",
				type : "post",
				async : true,
				data : {
					applyId : selections[0].APPLY_ID,
					tableId : tableId
				},
				dataType : "json",
				success : function(data) {
					var arr = JSON.parse(data);
					var data_1 = JSON.parse(arr[0].afwtHandson);
					settings.data = data_1;
					if ($.isEmptyObject(hot)) {
						hot = new Handsontable(table[0], settings);
					} else {
						hot.destroy();
						hot = new Handsontable(table[0], settings);
					}
//					setTableData(hot, data_1);
					eval('setData' + tableId + '(' + doSomething + ')');
				}
			});
	}
	});
};



//文件上传模态框的已上传文件列表加载
function getUploadedInfo(){
	if(!Date.now){  
	    Date.now = function(){  
	        return new Date().valueOf();  
	    }  
	}  
	bootstrapTableSetting.url = ctx + "/interface/queryApFileByPage.do?" + Date.now();
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.rowId = rowId;
		return params;
	};
	bootstrapTableSetting.showColumns = false,
	bootstrapTableSetting.columns = [ {
		field : 'id',
		checkbox : true
	},
	{
		field : 'RN',
		title : '编号',
		align : "center",
		valign : "middle"
	}, {
		field : 'FILE_NAME',
		title : '文件名称',
		align : "center",
		valign : "middle"
	}, {
		field : 'UPLOAD_DATE',
		title : '上传时间',
		align : "center",
		valign : "middle"
	}, {
		field : 'FILE_PTAH',
		title : '保存路径',
		align : "left",
		valign : "middle",
		visible: false
	}, {
		field : 'ROW_ID',
		title : '行号',
		align : "left",
		valign : "middle",
		visible: false
	}, {
		field : 'ID',
		title : 'ID',
		align : "left",
		valign : "middle",
		visible: false
	}, {
		field : 'APPLY_ID',
		title : 'APPLY_ID',
		align : "left",
		valign : "middle",
		visible: false
	}];
	$('#table_upload').bootstrapTable(bootstrapTableSetting);
};

//下载文件
function downloadFile(){
	selections = $("#table_upload").bootstrapTable('getSelections');
	if (selections.length < 1) {
		layer.msg('请至少选择列表中1条数据！', {
			icon : 3,
			offset : '150px'
		});
	}else if(selections.length >=2){
		layer.msg('只支持单文件下载！', {
			icon : 3,
			offset : '150px'
		});
	}else{
		var applyId = [];
		for ( var i = 0; i < selections.length; i++) {
			applyId.push(selections[i].APPLY_ID);
		}
		var applyId = applyId.join(",");
		
		var  id=selections[0].ID;
		
		var filePath = [];
		for ( var i = 0; i < selections.length; i++) {
			filePath.push(selections[i].FILE_PTAH);
		}
		var filePath = filePath.join(",");
		
		var downloadUrl = ctx + "/interface/FileDownload.do";
		window.location.href = downloadUrl + "?applyId=" + applyId + "&id=" + id + "&filePath=" + filePath;
	}
};
//删除文件
var delFile = function(){
	selections = $("#table_upload").bootstrapTable('getSelections');//getAllSelections
	if (selections.length < 1) {
		layer.msg('请至少选择列表中1条数据！', {
			icon : 3,
			offset : '150px'
		});
	}else{
		layer.confirm("确定要删除吗？", {
			btn:["确定","取消"] },
			function(){
				var id = [];
				for ( var i = 0; i < selections.length; i++) {
					id.push(selections[i].ID);
				}
				var id = id.join(",");
				$.ajax( {
					url : ctx + "/interface/delApFile.do",
					type : "post",
					async : true,
					data : {
						applyId : applyId,
						id : id,
					},
					dataType : "json",
					success : function(data) {
						if(data.messageType == "SUCCESS"){
							layer.msg("删除成功！",{icon:1});
							//刷新
							$("#table_upload").bootstrapTable('refresh');
						}else{
							layer.msg("删除失败！",{icon:2});
						}
					},
					error : function(){
						layer.msg("请求失败",{icon:2});
					}
					
				});
				
		});
		
	}
};
//初始化文件上传input
var initFileInput = function(){
	$("#upload").fileinput({
	 	uploadAsync: true,
	    maxFileCount: 10,
	    uploadUrl: ctx + "/interface/FileUpload.do", //上传的地址
	    language: 'zh', //设置语言
		allowedPreviewTypes:['image']
	});
};
//所属损益行聚焦事件
var focus_sssyh = function(){
	secondModalAdjustScreen();
	$('#ztreeModal').modal('show');
};

//ztree的初始化
var InitTree = function() {
	var treeNodes;
	var setting = {
			data: {
				simpleData: {
					enable: true,
					idKey: "MEID",
					pIdKey: "SJID",
					rootPId: 0
				},
				key : {
					name : "NAMES",
				}
			},
			check: {
		    	   enable: true,//默认checkbox
		    	   chkboxType : { "Y" : "", "N" : "" }//checkbox 勾选操作，p只影响父节点，s只影响子节点
		    	},
		    view: {
		            showLine: true//设置是否显示节点之间的连线
		        }
		};
	$.ajax( {
		url : ctx + "/interface/selectNsBankZtree.do",
		type : "post",
		data : {
			yhid : yhid
		},
		success : function(data) {
			treeNodes = JSON.parse(JSON.parse(data));
			 $.fn.zTree.init($("#zTree_Bank"), setting, treeNodes);
			 	treeObj = $.fn.zTree.getZTreeObj("zTree_Bank");
			 	//获取第一个根节点
			 	nodes = treeObj.getNodes()[0];
			 	//获取第一个根节点下的所有子节点
			 	//var children = treeObj.getNodes()[0].children;
					treeObj.checkNode(nodes);
					nodes = treeObj.getCheckedNodes(true);
					var str = new Array;
					$.each(nodes, function(idx, obj) {
						str.push(obj.NAMES);
					});
					//$("#sure").val(str.toString());
					/*$.each(children, function(idx, obj) {			
						treeObj.checkNode(obj);
				    });*/
		}
	});
	
   

};



//点击所属损益行保存
var ztree_save = function(){
	
	nodes = treeObj.getCheckedNodes(true);
	
	var str = new Array;
	$.each(nodes, function(idx, obj) {
		str.push(obj.NAMES);
	});
	$("#sure").val(str.toString());
	$("#ztreeModal").modal("hide");
};

var ztree_close = function(){
	//nodes = treeObj.getCheckedNodes(true);
};
//IE9.0文件上传提交表单
var IE9SubmitUpload = function(){	
	var options = {
            url : ctx + "/interface/FileUpload.do",
            dataType:  'json',
            type : 'POST',
            success : function(data) {
            	if(data.messageType == "SUCCESS"){
            		layer.msg("上传成功",{icon:1});
            		$("#table_upload").bootstrapTable('refresh');
            		$("#ieReset").trigger("click");
            	}else{
            		layer.msg("上传失败",{icon:2});
            	}
            },
            error : function(request) {
                alert("服务器异常，请稍后再试");
            }
        };
	if($("#IEupload").val() == "" || $("#IEupload").val() == null){
		layer.msg("请先选择文件，然后上传",{icon:3});
	}else{
		$('#uploadForm').ajaxSubmit(options);
	}
        
};

