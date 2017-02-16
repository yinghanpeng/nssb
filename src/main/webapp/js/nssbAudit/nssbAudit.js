//全局变量用来记录用户选择的流水的id
var applyId = '';
var rowId;//行号
var hot;
var selections;
var nodes = '';//用户在所属损益行点击完ztree，所勾选所有选项组成的对象
var treeObj;//ztree对象
// bootstrpTable通用设置
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
	paginationLoop : false,
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
$(function() {
	// 点击审核按钮
	$("#auditBtn").on("click", function() {
		selections = $("#auditTable").bootstrapTable('getSelections');
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
		var additState = selections[0].ADDIT_STATE;
		if (additState == '2') {
			layer.msg('已经审核通过的申请信息不能再审核', {
				icon : 3,
				offset : '150px'
			});
			return false;

		}
		if (additState == '0') {
			layer.msg('未提交的不能进行审核', {
				icon : 3,
				offset : '150px'
			});
			return false;
		}
		// 给modal的form的input和textarea赋值
		$('#auditForm').find('input,textarea').each(function() {
			if (selections[0][this.name] != undefined)
				$(this).val(selections[0][this.name]);
		});
		//给radio赋值
		if(additState === "2"){
			$("input:radio[value = '2']").attr("checked", "checked");
		}else if(additState === "3"){
			$("input:radio[value = '3']").attr("checked", "checked");
		}
		// 给全局变量applyId赋值
		applyId = selections[0].APPLY_ID;
		//获取系统时间给审核时间赋值
		$.ajax( {
			url : ctx + "/interface/getDate.do",
			type : "get",
			success : function(data) {
				$('#auditDate').val(JSON.parse(JSON.parse(data)));
			}
		});
		//取登录用户名称给审核人赋值
		$("#saveAuditor").val(globalAuditor);// 审核人
		secondModalAdjustScreen();
		// 刷新报表table
		$("#shtzTable").bootstrapTable('refresh');
		$("#shbbTable").bootstrapTable('refresh');
		$('#auditModal').modal('show');
		secondModalAdjustScreen();
		});

	// 查询按钮
	$('#auditQuery').click(function() {
		$("#auditTable").bootstrapTable('refresh');

	});
	// 清空按钮
	$('#audit_searchReset').click(function() {
		$('#indexSearch_form')[0].reset();
		nodes = '';
		$('#auditTable').bootstrapTable('refresh', {});
	});
});

$(function() {
	// 初始化新增界面查询form的validator和日期选择框的校验事件
	InitValidator($('#auditModal'), $('#auditForm'), auditForm_validator);
	// InitDataForForm($('#AddafwtForm'), $('#begindate'), $('#enddate'));
	// 初始化提交按钮事件：校验和提交
	$("#auditSave").on('click', function() {
		$('#auditForm').bootstrapValidator('validate');
		if ($('#auditForm').data('bootstrapValidator').isValid()) {

			$.ajax( {
				url : ctx+'/interface/updateAfwt.do',
				type : "post",
				data : {
				   applyId:selections[0].APPLY_ID,
				   auditor:globalAuditor,
				   additState:$('input[name="additState"]:checked').val(),
				   auditDate:$('#auditDate').val(),
				   auditIdea:$('#saveAuditIdea').val()
				},
				

				success :function(data) {
				var data = eval("(" + data + ")");
				if (data.messageType == "SUCCESS") {
					$("#table").bootstrapTable('refresh', {});
					layer.msg(data.message, {
						icon : 1
					});
					$("#auditTable").bootstrapTable('refresh');
				} else {
					layer.msg(data.message, {
						icon : 2
					});
				}
			}
			});

		} else {
			layer.msg('完善审核信息之后再保存');
			return false;
		}
	});
});

$(function() {
	//所属损益行聚焦事件
	$("#sure").on("focus",focus_sssyh);
	$("#ztreeSave").on("click",ztree_save);
	InitTree();
	$("#auditTable").bootstrapTable(
			{
				url : ctx + "/interface/queryAuditByPage.do",
				queryParams : function(params) {
					params = $.extend(
							$('#indexSearch_form').serializeJson(","), params);
					params.idate = new Date().getTime();
					var str = new Array;
					$.each(nodes, function(idx, obj) {
						str.push(obj.NAMES);
					});
					params.nsBank = str.toString();
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
				showToggle : true, // 名片格式
				cardView : false,// 设置为True时显示名片（card）布局
				detailView : false, // 是否显示父子表
				showRefresh : true, // 显示刷新按钮
				search : false,// 是否显示右上角的搜索框
				clickToSelect : true,// 点击行即可选中单选/复选框
				toolbar : "#index_toolbar", // 设置工具栏的Id或者class
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
					field : 'id',
					checkbox : true
				}, {
					field : 'APPLY_ID',
					title : '申请单编号',
					align : "center",
					valign : "middle",
					sortable : true,
					formatter : applyIdFormatter,
					events : operateEvents
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
					valign : "middle",
					sortable : true
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
					valign : "middle",
					sortable : true
				}, {
					field : 'APPLYNAME',
					title : '创建人',
					align : "center",
					valign : "middle",
					sortable : true
				}, {
					field : 'READ_DATE',
					title : '申请日期',
					align : "center",
					valign : "middle",
					sortable : true
				}, {
					field : 'AUDIT_DATE',
					title : '审核日期',
					align : "center",
					valign : "middle",
					sortable : true
				}, {
					field : 'ADDIT_STATE',
					title : '审核状态',
					align : "center",
					valign : "middle",
					formatter : statusFormatter,
					sortable : true
				}, {
					field : 'AUDIT_IDEA',
					title : '审核意见',
					align : "center",
					valign : "middle",
					formatter : auditMessageFormatter,
					events : operateEvents
				}  ]
			});
});

function statusFormatter(row, index, value) {
	if (row == 0) {
		return "未审核";
	} else if (row == 1) {
		return "审核中";
	} else if (row == 2) {
		return "审核通过";
	} else if (row == 3) {
		return "审核不通过";
	}
}
//审核意见formatter
function auditMessageFormatter(row, index, value){
	return "<a href='#' class='auditMessage'>" + '审核意见' + "</a>";
}

function hotTableSetData(row, callback) {
	$('#cellName').html(row.AFWT_HTML_NAME);
	var table = $('#cellTable');
	// 发请求获得表样
	$.ajax( {
		url : ctx + "/interface/LoadTableModel.do",
		type : "post",
		async : true,
		data : {
			"modelId" : row.MODEL_ID,
			"tzNssb" : row.TZ_NSSB
		},
		dataType : "json",
		success : function(data) {
			var settings = JSON.parse(JSON.parse(data));
			settings['cells'] = eval('setRender' + row.MODEL_ID);
			settings['rowHeaders'] = true;
			settings['colHeaders'] = true;
			settings['enterBeginsEditing'] = false;
			settings['autoWrapCol'] = true;
			settings['autoWrapRow'] = true;
			var fixedRowsTop = getFixedRowsTop(row.MODEL_ID);
			if (fixedRowsTop != undefined) {
				settings.fixedRowsTop = fixedRowsTop;
			} else {
				delete settings.fixedRowsTop;
			}
			// 已经处理过的表发请求获得表内数据
			$.ajax( {
				url : ctx + "/interface/selectAfwtHandson.do",
				type : "post",
				async : true,
				data : {
					applyId : row.APPLY_ID,
					tableId : row.MODEL_ID
				},
				dataType : "json",
				success : function(data) {
					var arr = JSON.parse(data);
					var data_1 = JSON.parse(arr[0].afwtHandson);
//					setTableData(hot, data_1);
					settings.data = data_1;
					if ($.isEmptyObject(hot)) {
						hot = new Handsontable(table[0], settings);
					} else {
						hot.destroy();
						hot = new Handsontable(table[0], settings);
					}
					//表8_1和8_2查看的时候栏次居中
					if(row.MODEL_ID=='8_1'||row.MODEL_ID=='8_2'){
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
					setAllReadonly(hot);
					callback();
				}
			});

	}
	});
}
function applyIdFormatter(row, index, value) {
	return "<a href='#' class='showLookUpModal'>" + row + "</a>";
}
window.operateEvents = {
		// 主表点击申请单号事件
	'click .showLookUpModal' : function(e, value, row, index) {
		// 给modal的form的input和textarea赋值
		$('#lookUpForm').find('input,textarea').each(function() {
			if (this.name == 'ADDIT_STATE') {
				if (row.ADDIT_STATE == 0) {
					$(this).val('未审核');
				} else if (row.ADDIT_STATE == 1) {
					$(this).val('审核中');
				} else if (row.ADDIT_STATE == 2) {
					$(this).val('审核通过');
				} else if (row.ADDIT_STATE == 3) {
					$(this).val('审核不通过');
				}
			} else if (row[this.name] != undefined)
				$(this).val(row[this.name]);
		});
		// 给全局变量applyId赋值
		applyId = row.APPLY_ID;
		// 刷新台账table
		$("#tzTable").bootstrapTable('refresh');
		$("#bbTable").bootstrapTable('refresh');
		$('#lookUpModal').modal('show');
		secondModalAdjustScreen();
	},
	// 报表点开
	'click .lookup_tz_click' : cellModalShow,
	'click .auditMessage' : function(e, value, row, index) {
		secondModalAdjustScreen();
		$('.audit_p').text("无");
		if(value!=undefined){
			$('.audit_p').text(value);
		}
		$('.audit_p').text(value);
		$('#auditMessageModal').modal('show');
	}
};
function cellModalShow(e, value, row, index) {
	$("body").showLoading();
	hotTableSetData(row,function(){
		$('#cellModal').modal('show');
		thirdModalAdjustScreen();
	});
}
// 报表点开
function titleFormatter(row, index, value) {
	return "<a href='#' class='lookup_tz_click'>" + row + "</a>";
}

// 处理结果格式化
function acceptIdFormatter(row, index, value) {
	if (row == 1) {
		return "未处理";
	} else if (row == 2) {
		return "已处理";
	}
}
// 表格初始化
$(function() {
	// 查看页签设置
	$('#lookUpTab a:first').tab('show');// 初始化显示哪个tab
	$('#lookUpTab a').click(function(e) {
		e.preventDefault();// 阻止a链接的跳转行为
			$(this).tab('show');// 显示当前选中的链接及关联的content
		});
	// 审核页签设置
	$('#shTab a:first').tab('show');// 初始化显示哪个tab
	$('#shTab a').click(function(e) {
		e.preventDefault();// 阻止a链接的跳转行为
			$(this).tab('show');// 显示当前选中的链接及关联的content
		});
	// 台账表初始化
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
	$('#tzTable').bootstrapTable(bootstrapTableSetting);
	$('#shtzTable').bootstrapTable(bootstrapTableSetting);
	// 申报表初始化
	bootstrapTableSetting.queryParams = function(params) {
		params.applyId = applyId;
		params.tzNssb = 2;
		return params;
	};
	$('#bbTable').bootstrapTable(bootstrapTableSetting);
	$('#shbbTable').bootstrapTable(bootstrapTableSetting);
	// 报表模态框的显示事件
	$('#cellModal').bind('shown.bs.modal', function() {
		$('#hide_cell').click();
		var data = hot.getDataAtCell(0, 0);
		hot.setDataAtCell(0, 0, data);
		$("body").hideLoading();
	});
});
$(function(){
	//自适应
	window.onresize = function() {
		secondModalAdjustScreen();
		thirdModalAdjustScreen();
	};
	$("#cellModal").show();
	$("#cellModal").hide();
	//文件上传--进入文件上传模态框
	$(".third-modal-dialog-body-content").on("click", "button", function(){
		$('#uploadModal').modal('show');
		rowId = $(this).attr("rowId");
		//加载数据
		getUploadedInfo();
		//刷新
		$("#table_upload").bootstrapTable('refresh');
	});
	$("#upload_close_btn").on("click", function(){
		$('#uploadModal').modal('hide');
		$('#cellModal').modal('show');
	});
});

//文件上传模态框的已上传文件列表加载
var getUploadedInfo = function(){
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
var downloadFile = function(){
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
	selections = $("#table_upload").bootstrapTable('getSelections');
	if (selections.length < 1) {
		layer.msg('请至少选择列表中1条数据！', {
			icon : 3,
			offset : '150px'
		});
	}else{
		
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
	}
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

//所属损益行聚焦事件
var focus_sssyh = function(){
	secondModalAdjustScreen();
	$('#ztreeModal').modal('show');
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
}

