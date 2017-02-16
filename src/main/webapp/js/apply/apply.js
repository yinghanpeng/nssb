		//纳税主体
		var pvt_person;
		
		//起止日期
		var pvt_beginDate;
		var pvt_endDate;
		
		//主页面表格
		$("#table").bootstrapTable(
				{
					url : ctx + "/interface/queryAfwtByPage.do",
					queryParams : function(params) {
						params = $.extend($('#afwtSearch_form').serializeJson(
								","), params);
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
					showToggle : true, //名片格式
					cardView : false,//设置为True时显示名片（card）布局
					detailView : false, //是否显示父子表
					showRefresh : true, //显示刷新按钮
					search : false,//是否显示右上角的搜索框
					clickToSelect : true,//点击行即可选中单选/复选框
					toolbar : "#index_toolbar", //设置工具栏的Id或者class
					pageSize : 10,
					pageList : [ 10, 25, 50, 100, 200 ],
					showColumns : true,
					queryParamsType : '',
					onLoadSuccess : function(data) {
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
					columns: [{
	                    field: 'id',
	                    checkbox:true
	                }, {
	                    field: 'APPLY_ID',
	                    title: '申请单编号',
	                    align : "center",
						valign : "middle",
						sortable : true
	                }, {
	                    field: 'NSRSBH_ID',
	                    title: '纳税人识别号',	                    
	                    align : "center",
						valign : "middle",
						sortable : true
	                }, {
	                    field: 'NS_NAME',
	                    title: '纳税人名称',
	                    align : "center",
						valign : "middle"
	                }, {
	                    field: 'SK_SDATE',
	                    title: '税款所属期起',
	                    align : "center",
						valign : "middle",
						sortable : true
	                }, {
	                    field: 'SK_EDATE',
	                    title: '税款所属期止',
	                    align : "center",
						valign : "middle",
						sortable : true
	                },  {
	                    field: 'NS_BANK',
	                    title: '所属损益确认行',
	                    align : "center",
						valign : "middle"
	                },  {
	                    field: 'APPLYNAME',
	                    title: '创建人',
	                    align : "center",
						valign : "middle"
	                }, {
	                    field: 'ADD_DATE',
	                    title: '创建时间',
	                    align : "center",
						valign : "middle",
						sortable : true
	                },{
	                    field: 'ADDIT_STATE',
	                    title: '状态',
	                    align : "center",
						valign : "middle",
						formatter:statusFormatter,
						sortable : true
	                }]
		  });

		function statusFormatter(row,index,value){
				  	if(row==0){			
						return "未审核";
					}else if(row==1){
						return "审核中";
					}else if(row==2){
					 	return "审核通过";
					}else if( row==3){
					    return "审核不通过";
					}		
	 }
		//刷新表单
		function afwt_search(){
			
			$("#table").bootstrapTable('refresh');
		}
		/**
		 * 编辑的提交按钮
		 */
	      $('#editUpsubmit').on('click',function(){
	    	  var selectionTz = $("#table_tz_edit").bootstrapTable('getSelections');
	    	  var selectionBb = $("#table_bb_edit").bootstrapTable('getSelections');
	    	  var accept = [];
	    	 
			  for ( var i = 0; i < selectionTz.length; i++) {
					accept.push(selectionTz[i].ACCEPT_ID);
			  }
			  var acceptTz = acceptTz.join(",");
			  for ( var i = 0; i < selectionBb.length; i++) {
				  accept.push(selectionBb[i].ACCEPT_ID);
			  }
			  var accept = accept.join(","); 
			  
		      var applyId=('#applyId').val();
		      	  $.ajax( {
								url : ctx + "/interface/upAfwtList.do",
								type : "post",
								data : {
										applyId : applyId
								},
								dataType : "json",
								success : function(data) {
									 var data=eval("("+data+")");
									if (data.messageType=="SUCCESS") {
			       		 				$("#table").bootstrapTable('refresh', {});	
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
	         /**
	          * 新增的提交按钮
	          */
			  $('#AddUpsubmit').on('click',function(){
			      var nsrsbhId =$('#nsrsbhId').val();   
			      
			      var skSdate= $('#begindate').val();  
			      $.ajax( {
								url :  ctx +"/interface/insertUpAfwt.do",
								type : "post",
								data : {
										nsrsbhId:nsrsbhId,
										skSdate:skSdate
								
								},
								dataType : "json",
								success : function(data) {
									 var data=eval("("+data+")");
									if (data.messageType=="SUCCESS") {
			       		 				$("#table").bootstrapTable('refresh', {});	
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
			  
			  $('#AddSave').on('click', function(){
			         $("#AddafwtForm").ajaxSubmit(function(data){
			        	 var data=eval("("+data+")");
			       		 if (data.messageType=="SUCCESS") {
			       		 	$("#table").bootstrapTable('refresh', {});	
							layer.msg(data.message, {
							icon : 1
							});
						   afwt_search();	
						} else {
							layer.msg(data.message, {
							icon : 2
							});
						}

					});
			 	});
			 	

			 	
			  	/**
			  	 * 编辑按钮
			  	 */
			  	
			  function saveBtnclass(){
				  var applyId = $('#applyId').val();
		 			var data = JSON.stringify(hot.getData());
		 			var tableId = $('#tableId').val();
		 			var afwtHtmlName = $('#afwtHtmlName').val();

		         	$.ajax( {
							url :  ctx +"/interface/AddTableData.do",
							type : "post",
							data : {"applyId": applyId, "rowData": data, "tableId": tableId,"afwtHtmlName" : afwtHtmlName,"tzNssb":1},
							dataType : "json",
							success : function(data) {
								layer.msg("保存成功");
								 $("#table_tz_edit").bootstrapTable('refresh', {});
						 		 $("#table_bb_edit").bootstrapTable('refresh', {});
							}
						});
			  }
			  
			 	$("#save_cell_tz").on('click',function(){
			 		saveBtnclass();
			 			
			 	});
			 	
			 	$("#save_cell_sb").on('click',function(){
			 		saveBtnclass();
			 			
			 	});


			 	function editAfwt(){
			 		alert(23);
			 		//同步审核机构

			    	$.ajax( {
								url :ctx + "/interface/selectAuditZtree.do",
								type : "post",
								data : {
								     yhid:yhid
								},				
								success : function(data) {		
								 	var data1 = JSON.parse(JSON.parse(data));
								 	document.getElementById("auditBanks").innerHTML = "";
								 	$.each(data1, function(idx, obj) {
													
													$("#auditBanks").append("<option value='"+obj.NAMES+"'>"+obj.NAMES+"</option>");
												});
								 	
								}
							});	
			 		
			 		var selections = $("#table").bootstrapTable('getSelections');
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
						
			 		   applyId111 = selections[0].APPLY_ID;
			 		   //var applyId = selections[0].APPLY_ID;
			 		   var nsrsbhId=selections[0].NSRSBH_ID;
			 		   var nsName=selections[0].NS_NAME;
			 		   var auditBank=selections[0].AUDIT_BANK;
			 		   var skSdate=selections[0].SK_SDATE;
			 		   var skEdate=selections[0].SK_EDATE;
			 		   var applyName=selections[0].APPLYNAME;
			 		   
			 		  $('#applyId').val(applyId111);
			 		   $('#nsNames').val(nsName);
			 		   $('#nsrsbhIds').val(nsrsbhId);
			 		   $('#auditBanks').val(auditBank);
			 		   $('#begindates').val(skSdate);
			 		   $('#enddates').val(skEdate);
			 		   $('#applyNames').val(applyName);
			 		   
			 		   //为日期变量赋值，此时未点击保存按钮
			 		   pvt_person = "";
			 		   pvt_beginDate = skSdate;
			 		   pvt_endDate   = skEdate;
			 		   
			 		   $("#table_tz_edit").bootstrapTable('refresh', {});
			 		  $("#table_bb_edit").bootstrapTable('refresh', {});
			 		   $('#editModal').modal("show");

			 		   //点击编辑按钮弹出的模态框高度自适应
			 		   document.getElementById("h-sb2").style.height= (document.body.clientHeight * 0.9 - 114) * 1 + "px";
			 		   
			 		  
			 		 
			 		   
			 	}
			 	/**
			 	 * 编辑的保存按钮
			 	 */
			 	$('#editSave').on('click',function(){
			 		    //console.log(data);
			 		    
			 		   $("#editForm").ajaxSubmit(
			 		  
			 		   function(data){			 			   
			 			    var data=eval("("+data+")");			 			 
			       		  	if (data.messageType=="SUCCESS") {
								layer.msg(data.message, {
								icon : 1
								});
							afwt_search();
							} else {
										layer.msg(data.message, {
								icon : 2
							});
						}

					});
			 		   
			 		   //为日期变量赋值，此时点击了保存按钮
			 		   pvt_person = "";
			 		   pvt_beginDate = $("#begindates").val();
			 		   pvt_endDate   = $("#enddates").val();
			 	
			 	});
			 	
			 	
		function tijiaoMore() {
			var selections = $("#table").bootstrapTable('getSelections');
			var yesorNo = $("#table").bootstrapTable();
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
			var applyId = applyId.join(",");
			var applyState =[];
			for ( var j = 0; j < selections.length; j++) {
				applyState.push(selections[j].APPLY_STATE);
			}
			var applyState = applyState.join(",");
			if(applyState.indexOf("1")!=-1 ){
				layer.msg('有的表您还未处理');
				return  false;
			}
			var additState=selections[0].ADDIT_STATE;
	 		   if( (additState !="0" || additState !="3") && applyState.indexOf("1")==-1){
	 			  layer.msg('此状态不能提交', {
						icon : 3,
						offset : '150px'
					});
					return false;
					
			}
	 		   return  false;
			TijiaoList(applyId) ;
			
			} 
		
		
		
		//批量删除
		function delAfwtMore(){
			    var selections = $("#table").bootstrapTable('getSelections');
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
			var applyId = applyId.join(",");
			delList(applyId) ;
			}
		
		
		//删除
		function delList(applyId){
			    layer.confirm('是否确定要删除？', {
				btn : [ '确定', '取消' ]
				//按钮
					}, function() {
						$.ajax( {
							type : "POST",
							url :  ctx +"/interface/delAfwtList.do",
							data : {
								applyId : applyId
							},
							success : function(data) {
								var data=eval("("+data+")");
								if (data.messageType=="SUCCESS") {
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
			
			
			}

			//批量提交

			
			
			
			//提交

			function TijiaoList(applyId) {

				layer.confirm('是否确定要提交？', {
				btn : [ '确定', '取消' ]
				//按钮
					}, function() {
						$.ajax( {
							type : "POST",
							url :  ctx +"/interface/upAfwtList.do",
							data : {
								applyId : applyId
							},
							success : function(data) {
								 var data=eval("("+data+")");
								if (data.messageType=="SUCCESS") {
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
			}
			
			//新增一行
			$("#add_row_tz").on("click", function(){
				var ha = hot.alter('insert_row',hot.countRows()); 
				var row = hot.countRows()-1;
				hot.setDataAtCell(row,0,row+1);
				hot.setCellMeta(row,1,'type','dropdown');
				hot.setCellMeta(row,1,'source',['01129914-购置增值税税控系统专用设备抵减增值税', '01129924-已使用固定资产减征增值税']);
				hot.setDataAtCell(row,1,'01129914-购置增值税税控系统专用设备抵减增值税');
				hot.setCellMeta(row,2,'readOnly',true);
				hot.setDataAtCell(row,2,'只读');
			});
				
	