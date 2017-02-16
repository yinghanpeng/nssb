//申报管理 主表 AddafwtForm
var AddafwtForm_validator = {
	container : 'popover',
	feedbackIcons : {
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields : {
		auditBank : {
			validators : {
				notEmpty : {
					message : '审核机构不能为空'
				}
			}
		},
		skSdate : {
			enabled : true,
			validators : {
				notEmpty : {
					message : '税款所属期起不能为空'
				},
				callback : {
					message : '税款所属期起不能大于税款所属期止',
					callback : function(value, validator, $field, options) {
						var endDate = $('#enddate').val();
						var beginYear = value.substring(0, 4);
						var endYear = endDate.substring(0, 4);
						if(beginYear === endYear){
							return value.substring(5, 10) < endDate.substring(5, 10);
						}else{
							return false;
						}
					}
				}
			}
		},
		skEdate : {
			enabled : true,
			validators : {
				notEmpty : {
					message : '税款所属期止不能为空'
				},
				callback : {
					message : '税款所属期止不能小于税款所属期起',
					callback : function(value, validator, $field, options) {
						var beginDate = $('#begindate').val();
						var beginYear = beginDate.substring(0, 4);
						var endYear = value.substring(0, 4);
						if(beginYear === endYear){
							if(beginDate.substring(5,10) > value.substring(5, 10)){
								layer.msg("税款所属期止不能小于税款所属期起", {icon:2});
								return false;
							}else{
								return value.substring(5, 10) > beginDate.substring(5, 10);
							}
						}else{
							layer.msg("税款所属期必须在同一年",{icon:2});
							return false;
						}
					}
				}
			}
		}
	}
};

//申报管理 编辑界面validator
var editForm_validator = {
		container : 'popover',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			auditBank : {
				validators : {
					notEmpty : {
						message : '审核机构不能为空'
					}
				}
			},
			skSdate : {
				enabled : true,
				validators : {
					notEmpty : {
						message : '税款所属期起不能为空'
					},
					callback : {
						message : '税款所属期起不能大于税款所属期止',
						callback : function(value, validator, $field, options) {
							var endDate = $('#enddates').val();
							var beginYear = value.substring(0, 4);
							var endYear = endDate.substring(0, 4);
							if(beginYear === endYear){
								return value.substring(5, 10) < endDate.substring(5, 10);
							}else{
								return false;
							}
						}
					}
				}
			},
			skEdate : {
				enabled : true,
				validators : {
					notEmpty : {
						message : '税款所属期止不能为空'
					},
					callback : {
						message : '税款所属期止不能小于税款所属期起',
						callback : function(value, validator, $field, options) {
							var beginDate = $('#begindates').val();
							var beginYear = beginDate.substring(0, 4);
							var endYear = value.substring(0, 4);
							if(beginYear === endYear){
								if(beginDate.substring(5,10) > value.substring(5, 10)){
									layer.msg("税款所属期止不能小于税款所属期起", {icon:2});
									return false;
								}else{
									return value.substring(5, 10) > beginDate.substring(5, 10);
								}
							}else{
								layer.msg("税款所属期必须在同一年",{icon:2});
								return false;
							}
						}
					}
				}
			}
		}
	};
// 初始化一个form中的两个事件选择框和它的校验事件,beginName为input的name属性
	function InitDataForForm(form, begin, end) {
		begin.bind("focus",
				function() {
					WdatePicker( {
						dateFmt : 'yyyy-MM-dd',
						// startDate : '%y-%M-01',//当月的第一天
						// alwaysUseStartDate : true,
						isShowClear : false,
						readOnly : true,
						onpicked : function() {
							form.data('bootstrapValidator').updateStatus(
									begin.attr('name'), 'VALIDATING', '');
							form.data('bootstrapValidator').updateStatus(
									end.attr('name'), 'VALIDATING', '');
							form.data('bootstrapValidator').validateField(
									begin.attr('name'));
							form.data('bootstrapValidator').validateField(
									end.attr('name'));
						}
					});
				});
		end.bind("focus",
				function() {
					WdatePicker( {
						dateFmt : 'yyyy-MM-dd',
						isShowClear : false,
						readOnly : true,
						onpicked : function() {
							form.data('bootstrapValidator').updateStatus(
									begin.attr('name'), 'VALIDATING', '');
							form.data('bootstrapValidator').updateStatus(
									end.attr('name'), 'VALIDATING', '');
							form.data('bootstrapValidator').validateField(
									begin.attr('name'));
							form.data('bootstrapValidator').validateField(
									end.attr('name'));
						}
					});
				});
	};
// 初始化form的校验
function InitValidator(modal, form, ValidatOption) {
	// 初始化modal的隐藏事件，隐藏时刷新validator
	modal.bind('hide.bs.modal', function() {
		form.bootstrapValidator('resetForm');
		form.get(0).reset();
	});
	form.bootstrapValidator(ValidatOption).bind('success.form.bv', function(e) {
		e.preventDefault();
	});
}