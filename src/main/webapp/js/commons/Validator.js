$(document).ready(function() {
    $('#kmye_searchForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
        	valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, 
        fields: {
        	glOrgId: {
                message: 'The username is not valid',
                validators: {
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '总账机构只能由数字组成'
                    }
                }
            },
            dtlActOrgId: {
                message: 'The username is not valid',
                validators: {
                    
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '明细账机构只能由数字组成'
                    }
                }
            },
            actItmId: {
                message: 'The username is not valid',
                validators: {
                    
                    
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '会计科目只能由数字组成'
                    }
                }
            },
            ccyCd: {
                message: 'The username is not valid',
                validators: {
                    
                   
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '币种代码只能由数字组成'
                    }
                }
            },
            bal: {
                message: 'The username is not valid',
                validators: {
                    
                    
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '余额只能由数字组成'
                    }
                }
            },
            dbtAmt: {
                message: 'The username is not valid',
                validators: {
                    
                    
                    regexp: {
                        regexp: /^[0-9_\.]+$/,
                        message: '借方发生额只能由数字组成'
                    }
                }
            },
            crdAmt: {
                message: 'The username is not valid',
                validators: {
                    
                    p: {
                        regexp: /^[0-9_\.]+$/,
                        message: '贷方发生额只能由数字组成'
                    }
                }
            }
            
        }
        });
    
  
    });