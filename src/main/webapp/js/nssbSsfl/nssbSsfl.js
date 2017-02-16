$(function(){
	//初始化新增界面查询form的validator
	InitValidator($('#myModal'),$('#addSsflForm'),ssflAddForm_validator);
	//初始化增加按钮事件：校验和提交
	$("#addSubmit").on("click",function(){
		$('#addSsflForm').bootstrapValidator('validate');
		if($('#addSsflForm').data('bootstrapValidator').isValid()){
			//校验通过，进行提交事件
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
		}else{
			layer.msg('请完善信息之后再保存');
	 		return false;
		}		
	});
	
	
	//初始化修改界面查询form的validator
	InitValidator($('#ssbl_edit'),$('#updateSsflForm'),ssflUpdateForm_validator);
	//初始化修改按钮事件：校验和提交
	$("#ssflEdit").on("click",function(){
		$('#updateSsflForm').bootstrapValidator('validate');
		if($('#updateSsflForm').data('bootstrapValidator').isValid()){
			//校验通过，进行提交事件
			var spmcId = $("#spmcId").val();
			var spmc = $("#spmc_edit").val();
			var ssflbm = $("#ssflbm_edit_sel").val();
			
			if (spmc == "" || spmc == null) {
				layer.msg('商品名称不允许为空', {
					icon : 3,
					offset : '150px'
				});
			}
			var spmc_original = $('#spmc_edit_hide').val();
			if (spmc == spmc_original) {
				layer.msg('修改后的名称不能与原名称相同', {
					icon : 3,
					offset : '150px'
				});
			}

			$.ajax( {
				url : ctx + "/nssbSsfl/updateSpmc.do",
				type : "post",
				data : {
					"spmcId" : spmcId,
					"spmc" : spmc,
					"ssflbm" : ssflbm
				},
				dataType : "json",
				success : function(data) {
					if (data == "success") {
						layer.msg('更新成功', {
							icon : 1
						});
						$('#ssbl_edit').modal('hide');
						$("#ssfl_table").bootstrapTable('refresh');
					} else if (data == "existed") {
						layer.msg('此名称已存在', {
							icon : 1
						});
					} else {
						layer.msg('修改失败', {
							icon : 2
						});
					}

				}
			});
			
		}else{
			layer.msg('请完善信息之后再修改');
	 		return false;
		}		
	});
	
	
});