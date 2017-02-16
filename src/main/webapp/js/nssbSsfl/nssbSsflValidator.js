//ssfl增加 validator
var ssflAddForm_validator = {
		container : 'popover',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			spmcName : {
				validators : {
					notEmpty : {
						message : '商品名称不能为空'
					}
				}
			},
			ssflbm_user : {
				enabled : false,
				validators : {
					notEmpty : {
						message : '税收分类名称不能为空'
					}
				}
			}		
		}
	};

//ssfl修改 validator
var ssflUpdateForm_validator = {
		container : 'popover',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			spmc_edit : {
				validators : {
					notEmpty : {
						message : '商品名称不能为空'
					}
				}
			},
			ssflbm_edit_sel : {
				enabled : false,
				validators : {
					notEmpty : {
						message : '税收分类名称不能为空'
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