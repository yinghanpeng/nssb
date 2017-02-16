
var IE9_UploadDOM_String = '<form name="uploadForm" id="uploadForm" enctype="multipart/form-data" target="hidden_iframe" method="post">' + 
						   '<input type="hidden" id="uploadApplyId" name="applyId" />' +
						   '<input type=hidden id="rowId" name="rowId" />' +
						   '<iframe id="hidden_iframe" name="hidden_iframe" style="display:none"></iframe>' +
						   '<label class="control-label">请选择待上传的文件：</label>' +
						   '<input id="IEupload" type="file" name="file">' +
						   '<br/>' +
						   '<button type="reset" class="btn btn-warning" id="ieReset">重置</button>' +
						   '&nbsp;&nbsp;' +
						   '<button type="button" class="btn btn-success" id="ieSubmit">确定上传</button>' +
						   '</form>';

var Pro_UploadDOM_String = '<label class="control-label">请选择待上传的文件：</label>' +
						   '<input id="upload" name="kartik-input-700[]" type="file" multiple class="file-loading" data-show-upload="true" data-show-caption="true">' +
						   '<input type="hidden" id="uploadApplyId" name="applyId" />' +
						   '<input type=hidden id="rowId" name="rowId" />';

if(getBrowserTypeAndVersion() == "IE9.0"){
	document.write(IE9_UploadDOM_String);
}else{
	document.write(Pro_UploadDOM_String);
}