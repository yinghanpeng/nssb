var insertAction = false;
function numberCheck(changes){
	if(changes[0][2]=='— —')
		return false;
	var num = changes[0][3];
	if(	!(/^-?\d*(\.|\,)?\d*$/.test(num))){
		if(!insertAction)
			layer.msg("您的输入有误，请输入正确的数字。");
		console.info("您的输入有误，请输入正确的数字。");
		console.info("row:"+changes[0][0]+"\ncol:"+changes[0][1]+"\n原值:"+changes[0][2]+"\n新值:"+changes[0][3]);
		return false;
	}
	var temp;
	//整数长度
	var intLength = 13;
	//小数长度
	var smallIntLength = 2;
	if((typeof num)=='number'){
		temp = num.toString();
	}
	else{
		temp = num;
	}
	if(temp == ''){
		if(!insertAction)
			layer.msg("表格内不允许空值存在。");
		console.info("表格内不允许空值存在。");
		console.info("row:"+changes[0][0]+"\ncol:"+changes[0][1]+"\n原值:"+changes[0][2]+"\n新值:"+changes[0][3]);	
		return false;
	}
	//负数长度+1
	if(temp.indexOf('-')==0){
		intLength = 14;
	}
	var dot = temp.indexOf('.');
	//小数
	if(dot!=-1){
		//小数点前
		var before = temp.substring(0,dot);
		//小数点后
		var after = temp.substring(dot+1,temp.length);
		if(before.length>intLength || after.length>smallIntLength){
			if(!insertAction)
				layer.msg("您输入的数字不正确，小数点前不得大于13位，小数后不得大于2位。");
			console.info("您输入的数字不正确，小数点前不得大于13位，小数后不得大于2位。");
			console.info("row:"+changes[0][0]+"\ncol:"+changes[0][1]+"\n原值:"+changes[0][2]+"\n新值:"+changes[0][3]);
			return false;
		}
	}
	//整数
	else{
		if(temp.length>intLength){
			if(!insertAction)
				layer.msg("您输入的数字不正确，整数不得超过13位");
			console.info("您输入的数字不正确，整数不得超过13位");
			console.info("row:"+changes[0][0]+"\ncol:"+changes[0][1]+"\n原值:"+changes[0][2]+"\n新值:"+changes[0][3]);
			return false;
		}
	}
	if(isNaN(Number(changes[0][3])))
		changes[0][3] = 0;
	//转换成小数点后两位小数
	if(!isNaN(Number(changes[0][3])))
		changes[0][3] = Number(changes[0][3]).toFixed(2);
	return true;
}

function getFixedRowsTop(tableId) {
	var settings = {
//		'1_1' : 6
	};
	return settings[tableId];
}
function setTableData(hot, data) {
	for ( var x = 0; x < data.length; x++) {
		var data_2 = data[x];
		for ( var y = 0; y < data_2.length; y++) {
			if (!(data_2[y] == null || data_2[y] == '')) {
				hot.setDataAtCell(x, y, data_2[y],'loadData');
			}
		}
	}
}
function parseFloatEx(input){
	var temp = parseFloat(input);
	if(isNaN(temp))
		temp = 0;
	return temp;
}
function setAllReadonly(hot) {

	for ( var x = 0; x < hot.countRows(); x++) {
		for ( var y = 0; y < hot.countCols(); y++) {
			hot.setCellMeta(x, y, 'readOnly', true);
			hot.render();
		}
	}
}
function FloatAddEx(arg1,arg2){
	var temp = 0;
	for(var i=0;i<arguments.length;i++){
		var temp2 = parseFloat(arguments[i]);
		if(isNaN(temp2))
			temp2 = 0;
		temp = FloatAdd(temp,temp2);
	}
	return temp;
}
function FloatAddEx2(arguments){
	var temp = 0;
	for(var i=0;i<arguments.length;i++){
		var temp2 = parseFloat(arguments[i]);
		if(isNaN(temp2))
			temp2 = 0;
		temp = FloatAdd(temp,temp2);
	}
	return temp;
}
// float加法运算
function FloatAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
function FloatAddToFixed4(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	return ((arg1 * m + arg2 * m) / m).toFixed(4);
}
// float乘法运算
function FloatMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m)).toFixed(2);
}
//float乘法运算
function FloatMulEx(arg1, arg2) {
	var temp1 = parseFloat(arg1);
	if(isNaN(temp1))
		temp1 = 0;
	var temp2 = parseFloat(arg2);
	if(isNaN(temp2))
		temp2 = 0;
	return FloatMul(temp1,temp2);
}
// float除法运算
function FloatDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return ((r1 / r2) * pow(10, t2 - t1)).toFixed(2);
	}
}
//float乘法运算
function FloatDivEx(arg1, arg2) {
	var temp1 = parseFloat(arg1);
	if(isNaN(temp1))
		temp1 = 0;
	var temp2 = parseFloat(arg2);
	if(isNaN(temp2))
		temp2 = 0;
	return FloatDiv(temp1,temp2);
}
//float除法运算保留4位小数
function FloatDivToFixed4(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return ((r1 / r2) * pow(10, t2 - t1)).toFixed(4);
	}
}
/*
 * 设置报表字体、背景色、计算公式
 * 
 */
// 背景色绿色的render
function greenRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = 'aquamarine';
}
//背景色白色的render
function whiteRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = 'white';
}
// 背景色紫色的render
function purpleRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = '#edb8eb';
}
// 背景色蓝色的render
function blueRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = '#76D7F0';//#76D7F0//#00A0E9
}
// 背景色黄色的render
function yellowRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = 'LightYellow';
}
// 背景色灰色的render
function grayRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.backgroundColor = '#edecf3';
}
// 字体加粗的render
function boldRender(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	td.style.fontWeight = 'bold';
}

// 按钮
function renderButtons(instance, td, row, col, prop, value, cellProperties) {
	  td.innerHTML = "<button class='btn btn-link upload uploadButton' rowId='"+row+"' type='button'>" +
	  		"<span class='glyphicon glyphicon-search'></span>&nbsp;详细" +
	  		"</button>";
};

/*
 * 台账表附表1sheet1配置
 * 
 */
function setRender1_1(row, col, prop) {
	if (row <= 5) {
		this.renderer = boldRender;
	}
	if (row >= 5 && row <= 49 && (row % 3 === 0 || row === 48 || row === 49)
			&& col === 1) {
		this.renderer = boldRender;
	}
	if (col === 0) {
		this.renderer = boldRender;
	}
	if(row >= 6 && row <= 49 &&col>=2&&col<=7){
		if( (row%3==1 || row%3==2) && row<=47 && (col==2||col==5) )
			this.renderer = purpleRender;
		else if( (row==48||row==49) && (col==2||col==5) )
			this.renderer = purpleRender;
		else if( (row%3==1 || row%3==2) && row<=47 && (col==3||col==6) )
			this.renderer = greenRender;
		else if( (row==48||row==49) && (col==3||col==6) )
			this.renderer = greenRender;
		else 
			this.renderer = grayRender;
	}
}

// 台账表（附表一---开具专用发票台账）数据change事件
function calculate1_1(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//销售额合计
			if ((col==2||col==3) && (row>=6&&row<=49)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//税额合计
			if ((col==5||col==6) && (row>=6&&row<=49)) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			//蓝字+红字
			if ((col==3||col==6||col==2||col==5) && (row>=6&&row<=47)) {
				//蓝字
				if(row%3==1){
					temp = parseFloat(this.getDataAtCell(row-1, col));
					this.setDataAtCell(row-1, col, FloatAdd(temp, changeData).toString());				
				}
				//红字
				if(row%3==2){
					temp = parseFloat(this.getDataAtCell(row-2, col));
					this.setDataAtCell(row-2, col, FloatAdd(temp, changeData).toString());				
				}

			}
		}
		
	}
};

// 台账表附表一---开具专用发票台账输入校验
function cellCheck1_1(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 6 && row<=49 && col>=2 && col<=7) {	
			if(!numberCheck(changes))
				return false;
	}
	return true;
};
// 台账表附表一---开具专用发票台账set值
function setData1_1(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 "+ pvt_endDate);
	var count = 0;
	//正数专票
	$.ajax( {
		url : ctx + "/interface/getTable1_*Xxfp.do",
		type : "post",
		async : true,
		data : {
			ystjg : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			//0专票2普票
			fpzl : 0,
			//0正数，1负数
			fplb : 0
		},
		dataType : "json",
		success : function(data) {

			$.each(data, function() {
					switch (this.SSFLBM) {
					case '0001':
						hot.setDataAtCell(7, 2, this.JE);
						hot.setDataAtCell(7, 5, this.SE);
						break;
					case '0002':
						hot.setDataAtCell(10, 2, this.JE);
						hot.setDataAtCell(10, 5, this.SE);
						break;
					case '0003':
						hot.setDataAtCell(13, 2, this.JE);
						hot.setDataAtCell(13, 5, this.SE);
						break;
					case '0004':
						hot.setDataAtCell(16, 2, this.JE);
						hot.setDataAtCell(16, 5, this.SE);
						break;
					case '0005':
						hot.setDataAtCell(19, 2, this.JE);
						hot.setDataAtCell(19, 5, this.SE);
						break;
					case '0006':
						hot.setDataAtCell(22, 2, this.JE);
						hot.setDataAtCell(22, 5, this.SE);
						break;
					case '0007':
						hot.setDataAtCell(25, 2, this.JE);
						hot.setDataAtCell(25, 5, this.SE);
						break;
					case '0008':
						hot.setDataAtCell(28, 2, this.JE);
						hot.setDataAtCell(28, 5, this.SE);
						break;
					case '0009':
						hot.setDataAtCell(31, 2, this.JE);
						hot.setDataAtCell(31, 5, this.SE);
						break;
					case '0010':
						hot.setDataAtCell(34, 2, this.JE);
						hot.setDataAtCell(34, 5, this.SE);
						break;
					case '0011':
						hot.setDataAtCell(37, 2, this.JE);
						hot.setDataAtCell(37, 5, this.SE);
						break;
					case '0012':
						hot.setDataAtCell(40, 2, this.JE);
						hot.setDataAtCell(40, 5, this.SE);
						break;
					case '0013':
						hot.setDataAtCell(43, 2, this.JE);
						hot.setDataAtCell(43, 5, this.SE);
						break;
					case '0014':
						hot.setDataAtCell(46, 2, this.JE);
						hot.setDataAtCell(46, 5, this.SE);
						break;
					case '0015':
						hot.setDataAtCell(49, 2, this.JE);
						hot.setDataAtCell(49, 5, this.SE);
						break;
					}
			});
			count++;
			doSomething();
		}
	});
	$.ajax( {
		url : ctx + "/interface/getTable1_*Xxfp.do",
		type : "post",
		async : true,
		data : {
			ystjg : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			//0专票2普票
			fpzl : 0,
			//0正数，1负数
			fplb : 1
		},
		dataType : "json",
		success : function(data) {
			$.each(data, function() {
				switch (this.SSFLBM) {
				case '0001':
					hot.setDataAtCell(8, 2, this.JE);
					hot.setDataAtCell(8, 5, this.SE);
					break;
				case '0002':
					hot.setDataAtCell(11, 2, this.JE);
					hot.setDataAtCell(11, 5, this.SE);
					break;
				case '0003':
					hot.setDataAtCell(14, 2, this.JE);
					hot.setDataAtCell(14, 5, this.SE);
					break;
				case '0004':
					hot.setDataAtCell(17, 2, this.JE);
					hot.setDataAtCell(17, 5, this.SE);
					break;
				case '0005':
					hot.setDataAtCell(20, 2, this.JE);
					hot.setDataAtCell(20, 5, this.SE);
					break;
				case '0006':
					hot.setDataAtCell(23, 2, this.JE);
					hot.setDataAtCell(23, 5, this.SE);
					break;
				case '0007':
					hot.setDataAtCell(26, 2, this.JE);
					hot.setDataAtCell(26, 5, this.SE);
					break;
				case '0008':
					hot.setDataAtCell(29, 2, this.JE);
					hot.setDataAtCell(29, 5, this.SE);
					break;
				case '0009':
					hot.setDataAtCell(32, 2, this.JE);
					hot.setDataAtCell(32, 5, this.SE);
					break;
				case '0010':
					hot.setDataAtCell(35, 2, this.JE);
					hot.setDataAtCell(35, 5, this.SE);
					break;
				case '0011':
					hot.setDataAtCell(38, 2, this.JE);
					hot.setDataAtCell(38, 5, this.SE);
					break;
				case '0012':
					hot.setDataAtCell(41, 2, this.JE);
					hot.setDataAtCell(41, 5, this.SE);
					break;
				case '0013':
					hot.setDataAtCell(44, 2, this.JE);
					hot.setDataAtCell(44, 5, this.SE);
					break;
				case '0014':
					hot.setDataAtCell(47, 2, this.JE);
					hot.setDataAtCell(47, 5, this.SE);
					break;
				}
			});
			count++;
			doSomething();
		}
	});
	function doSomething() {
		if (count == 2) {
			callback();
		}
	}

}

/*
 * 台账表附表1sheet2配置
 * 
 */
function setRender1_2(row, col, prop) {
	if (row <= 5) {
		this.renderer = boldRender;
	}
	if (row >= 6 && row <= 50 && (row % 3 === 0 || row === 50 || row === 49)
			&& col === 1) {
		this.renderer = boldRender;
	}
	if (col === 0) {
		this.renderer = boldRender;
	}
	if(row >= 6 && row <= 50 &&col>=2&&col<=7){
		if( (row%3==1 || row%3==2) && row<=47 && (col==2||col==5) )
			this.renderer = purpleRender;
		else if( (row==48||row==49||row==50) && (col==2||col==5) )
			this.renderer = purpleRender;
		else if( (row%3==1 || row%3==2) && row<=47 && (col==3||col==6) )
			this.renderer = greenRender;
		else if( (row==48||row==49||row==50) && (col==3||col==6) )
			this.renderer = greenRender;
		else 
			this.renderer = grayRender;
	}
}

function calculate1_2(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//销售额合计
			if ((col==2||col==3) && (row>=6&&row<=50)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//税额合计
			if ((col==5||col==6) && (row>=6&&row<=50)) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			//蓝字+红字
			if ((col==3||col==6||col==2||col==5) && (row>=6&&row<=47)) {
				//蓝字
				if(row%3==1){
					temp = parseFloat(this.getDataAtCell(row-1, col));
					this.setDataAtCell(row-1, col, FloatAdd(temp, changeData).toString());				
				}
				//红字
				if(row%3==2){
					temp = parseFloat(this.getDataAtCell(row-2, col));
					this.setDataAtCell(row-2, col, FloatAdd(temp, changeData).toString());				
				}

			}
		}
		
	}
};
function setData1_2(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 "+ pvt_endDate);
	var count = 0;
	//正数发票
	$.ajax( {
		url : ctx + "/interface/getTable1_*Xxfp.do",
		type : "post",
		async : true,
		data : {
			ystjg : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			//0专票2普票
			fpzl : 2,
			//0正数，1负数
			fplb : 0
		},
		dataType : "json",
		success : function(data) {
			$.each(data, function() {
				switch (this.SSFLBM) {
				case '0001':
					hot.setDataAtCell(7, 2, this.JE);
					hot.setDataAtCell(7, 5, this.SE);
					break;
				case '0002':
					hot.setDataAtCell(10, 2, this.JE);
					hot.setDataAtCell(10, 5, this.SE);
					break;
				case '0003':
					hot.setDataAtCell(13, 2, this.JE);
					hot.setDataAtCell(13, 5, this.SE);
					break;
				case '0004':
					hot.setDataAtCell(16, 2, this.JE);
					hot.setDataAtCell(16, 5, this.SE);
					break;
				case '0005':
					hot.setDataAtCell(19, 2, this.JE);
					hot.setDataAtCell(19, 5, this.SE);
					break;
				case '0006':
					hot.setDataAtCell(22, 2, this.JE);
					hot.setDataAtCell(22, 5, this.SE);
					break;
				case '0007':
					hot.setDataAtCell(25, 2, this.JE);
					hot.setDataAtCell(25, 5, this.SE);
					break;
				case '0008':
					hot.setDataAtCell(28, 2, this.JE);
					hot.setDataAtCell(28, 5, this.SE);
					break;
				case '0009':
					hot.setDataAtCell(31, 2, this.JE);
					hot.setDataAtCell(31, 5, this.SE);
					break;
				case '0010':
					hot.setDataAtCell(34, 2, this.JE);
					hot.setDataAtCell(34, 5, this.SE);
					break;
				case '0011':
					hot.setDataAtCell(37, 2, this.JE);
					hot.setDataAtCell(37, 5, this.SE);
					break;
				case '0012':
					hot.setDataAtCell(40, 2, this.JE);
					hot.setDataAtCell(40, 5, this.SE);
					break;
				case '0013':
					hot.setDataAtCell(43, 2, this.JE);
					hot.setDataAtCell(43, 5, this.SE);
					break;
				case '0014':
					hot.setDataAtCell(46, 2, this.JE);
					hot.setDataAtCell(46, 5, this.SE);
					break;
				case '0015':
					hot.setDataAtCell(49, 2, this.JE);
					hot.setDataAtCell(49, 5, this.SE);
					break;
				case '0016':
					hot.setDataAtCell(50, 2, this.JE);
					hot.setDataAtCell(50, 5, this.SE);
					break;
				}
			});
			count++;
			doSomething();
		}
	});
	//负数发票
	$.ajax( {
		url : ctx + "/interface/getTable1_*Xxfp.do",
		type : "post",
		async : true,
		data : {
			ystjg : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			//0专票2普票
			fpzl : 2,
			//0正数，1负数
			fplb : 1
		},
		dataType : "json",
		success : function(data) {
			$.each(data, function() {
			switch (this.SSFLBM) {
			case '0001':
				hot.setDataAtCell(8, 2, this.JE);
				hot.setDataAtCell(8, 5, this.SE);
				break;
			case '0002':
				hot.setDataAtCell(11, 2, this.JE);
				hot.setDataAtCell(11, 5, this.SE);
				break;
			case '0003':
				hot.setDataAtCell(14, 2, this.JE);
				hot.setDataAtCell(14, 5, this.SE);
				break;
			case '0004':
				hot.setDataAtCell(17, 2, this.JE);
				hot.setDataAtCell(17, 5, this.SE);
				break;
			case '0005':
				hot.setDataAtCell(20, 2, this.JE);
				hot.setDataAtCell(20, 5, this.SE);
				break;
			case '0006':
				hot.setDataAtCell(23, 2, this.JE);
				hot.setDataAtCell(23, 5, this.SE);
				break;
			case '0007':
				hot.setDataAtCell(26, 2, this.JE);
				hot.setDataAtCell(26, 5, this.SE);
				break;
			case '0008':
				hot.setDataAtCell(29, 2, this.JE);
				hot.setDataAtCell(29, 5, this.SE);
				break;
			case '0009':
				hot.setDataAtCell(32, 2, this.JE);
				hot.setDataAtCell(32, 5, this.SE);
				break;
			case '0010':
				hot.setDataAtCell(35, 2, this.JE);
				hot.setDataAtCell(35, 5, this.SE);
				break;
			case '0011':
				hot.setDataAtCell(38, 2, this.JE);
				hot.setDataAtCell(38, 5, this.SE);
				break;
			case '0012':
				hot.setDataAtCell(41, 2, this.JE);
				hot.setDataAtCell(41, 5, this.SE);
				break;
			case '0013':
				hot.setDataAtCell(44, 2, this.JE);
				hot.setDataAtCell(44, 5, this.SE);
				break;
			case '0014':
				hot.setDataAtCell(47, 2, this.JE);
				hot.setDataAtCell(47, 5, this.SE);
				break;
			}
			});
			count++;
			doSomething();
		}
	});	

	function doSomething() {
		if (count == 2) {
			callback();
		}
	}
};

function cellCheck1_2(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >=6 && row<=50 && col>=2 && col<=7) {	
			if(!numberCheck(changes))
				return false;
	}
	return true;
};
/*
 * 台账表附表1sheet3配置
 * 
 */
function setRender1_3(row, col, prop) {
	if (row <= 6) {
		this.renderer = boldRender;
	}
	if (row >= 6 && row <= 21 && (col < 2)) {
		this.renderer = boldRender;
	}
	if(row >= 7 && row <= 21 &&col>=2&&col<=8){
		if( col==4||col==7 )
			this.renderer = greenRender;
		else if( col==5||col==8 )
			this.renderer = grayRender;
		else 
			this.renderer = purpleRender;
	}
};

function calculate1_3(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			if(changeData=='NaN')
				changeData = 0;
			//销售额合计
			if ((col==3||col==4) && (row>=7&&row<=21)) {
				temp = parseFloat(this.getDataAtCell(row, 5));
				this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
			}
			//税额合计
			if ((col==6||col==7) && (row>=7&&row<=21)) {
				temp = parseFloat(this.getDataAtCell(row, 8));
				this.setDataAtCell(row, 8, FloatAdd(temp, changeData).toString());
			}
		}
		
	}
};
function setData1_3(callback) {
	var count = 0;
	function doSomething() {
			
				//根据需求将此列更改为合计/税率FloatDivhot.getDataAtCell(7,8)
				hot.setDataAtCell(7,3,FloatDiv(hot.getDataAtCell(7,8),0.17).toString());
				hot.setDataAtCell(8,3,FloatDiv(hot.getDataAtCell(8,8),0.17).toString());
				hot.setDataAtCell(9,3,FloatDiv(hot.getDataAtCell(9,8),0.13).toString());
				hot.setDataAtCell(10,3,FloatDiv(hot.getDataAtCell(10,8),0.11).toString());
				hot.setDataAtCell(11,3,FloatDiv(hot.getDataAtCell(11,8),0.06).toString());
				hot.setDataAtCell(12,3,FloatDiv(hot.getDataAtCell(12,8),0.06).toString());
				hot.setDataAtCell(13,3,FloatDiv(hot.getDataAtCell(13,8),0.06).toString());
				hot.setDataAtCell(14,3,FloatDiv(hot.getDataAtCell(14,8),0.06).toString());
				hot.setDataAtCell(15,3,FloatDiv(hot.getDataAtCell(15,8),0.05).toString());
				hot.setDataAtCell(16,3,FloatDiv(hot.getDataAtCell(16,8),0.05).toString());
				hot.setDataAtCell(17,3,FloatDiv(hot.getDataAtCell(17,8),0.03).toString());
				hot.setDataAtCell(18,3,FloatDiv(hot.getDataAtCell(18,8),0.03).toString());
				callback('');
				
	};
	
	$.ajax( {
		url : ctx + "/xall.do",
		type : "post",
		async : true,
		data : {
			"ystjgh" : selections[0].QX_BMID,
			"sbqq" : selections[0].SK_SDATE,
			"sbqz" : selections[0].SK_EDATE
		},
		dataType : "json",
		success : function(data) {
	
			// 1.通过接口取数，取出销售额对应格子金额
		for ( var a in data) {
			if (data[a].interface_name == 'x3c8') {
				//带出销售额
				hot.setDataAtCell(7, 2, data[a].data);
				hot.setDataAtCell(7, 6, data[a].data);
				//计算税额
			}
			
			if (data[a].interface_name == 'x3c11') {
				hot.setDataAtCell(10, 2, data[a].data);
				hot.setDataAtCell(10, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c12') {
				hot.setDataAtCell(11, 2, data[a].data);
				hot.setDataAtCell(11, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c13') {
				hot.setDataAtCell(12, 2, data[a].data);
				hot.setDataAtCell(12, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c14') {
				hot.setDataAtCell(13, 2, data[a].data);
				hot.setDataAtCell(13, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c15') {
				hot.setDataAtCell(14, 2, data[a].data);
				hot.setDataAtCell(14, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c17') {
				console.log(data[a].data);
				hot.setDataAtCell(16, 2, data[a].data);
				hot.setDataAtCell(16, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3c18') {
				hot.setDataAtCell(17, 2, data[a].data);
				hot.setDataAtCell(17, 6, data[a].data);
			}
			if (data[a].interface_name == 'x3d21') {
				hot.setDataAtCell(20, 3, data[a].data);
			}
	}

	

	
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 "
			+ pvt_endDate);
	count++;
	doSomething();
},
error : function() {
	layer.msg("请求失败!");
}
});
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
};
function cellCheck1_3(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7 && row <= 21 && col>=2 &&col<=8) {
			if(!numberCheck(changes))
				return false;
	}
	return true;
};

/*
 * 台账表附表2sheet1配置
 * 
 */
function setRender2_1(row, col, prop) {

	if (row < 5) {
		this.renderer = boldRender;
	}
	if (row > 4 && row < 17 && col < 2) {
		this.renderer = boldRender;
	}
	if(row>=5&&row<=16&&col>=2&&col<=10){
		if(row==5||row==8||row==16){
			this.renderer = grayRender;
		}
		else if(col==2||col==5||col==8){
			this.renderer = purpleRender;
		}
		else if(col==3||col==6||col==9){
			this.renderer = greenRender;
		}
		else if(col==4||col==7||col==10){
			this.renderer = grayRender;
		}
	}
}

function calculate2_1(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//份数合计
			if ((col==2||col==3) && (row>=5&&row<=16)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//金额合计
			if ((col==5||col==6) && (row>=5&&row<=16)) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			//税额合计
			if ((col==8||col==9) && (row>=5&&row<=16)) {
				temp = parseFloat(this.getDataAtCell(row, 10));
				this.setDataAtCell(row, 10, FloatAdd(temp, changeData).toString());
			}
			//a1=a2+a3
			if( (row==6||row==7) && (col==3||col==6||col==9||col==2||col==5||col==8) ){
				temp = parseFloat(this.getDataAtCell(5, col));
				this.setDataAtCell(5, col, FloatAdd(temp, changeData).toString());
			}
			//a4=a5+a6+a7+a8
			if( (row>=9&&row<=12) && (col==3||col==6||col==9||col==2||col==5||col==8) ){
				temp = parseFloat(this.getDataAtCell(8, col));
				this.setDataAtCell(8, col, FloatAdd(temp, changeData).toString());
			}
			//a12=a1+a4-a9+a10+a11
			if( ((row>=13&&row<=15)||row==5||row==8) && (col==3||col==6||col==9||col==2||col==5||col==8) ){
				temp = parseFloat(this.getDataAtCell(16, col));
				if(row==14)
					this.setDataAtCell(16, col, FloatAdd(temp, -changeData).toString());
				else
					this.setDataAtCell(16, col, FloatAdd(temp, changeData).toString());
			}
		}
		
	}
};
function setData2_1(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	//其中：本期认证相符且本期申报抵扣
	$.ajax( {
		url : ctx + "/interface/getTable2_*JxJeSeFs.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			rzjg:0, 
			dkzt:1
		},
		dataType : "json",
		success : function(data) {
				hot.setDataAtCell(6, 2, data.FS);
				hot.setDataAtCell(6, 5, data.JE);
				hot.setDataAtCell(6, 8, data.SE);
			count++;
			doSomething();
		}
	});
	//（二）其他扣税凭证
	$.ajax( {
		url : ctx + "/interface/getTable2_*Kkpz.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			dkzt:1
		},
		dataType : "json",
		success : function(data) {
			//清零
//			for(var i=0;i<4;i++){
//				hot.setDataAtCell(9+i, 2, 0);
//				hot.setDataAtCell(9+i, 5, 0);
//				hot.setDataAtCell(9+i, 8, 0);
//			}
			$.each(data,function(){
				//1：农产品收购发票或者销售发票，2：代扣代缴税收缴款凭证，3：海关进口增值税专用缴款书，4：其他小票
				if(this.FPLB=='3'){
						hot.setDataAtCell(9, 2, this.FS);
						hot.setDataAtCell(9, 5, this.JE);
						hot.setDataAtCell(9, 8, this.SE);
				}
				if(this.FPLB=='1'){
						hot.setDataAtCell(10 , 2, this.FS);
						hot.setDataAtCell(10, 5, this.JE);
						hot.setDataAtCell(10, 8, this.SE);
				}
				if(this.FPLB=='2'){
						hot.setDataAtCell(11, 2, this.FS);
						hot.setDataAtCell(11, 5, this.JE);
						hot.setDataAtCell(11, 8, this.SE);
				}
				if(this.FPLB=='4'){
						hot.setDataAtCell(12, 2, this.FS);
						hot.setDataAtCell(12, 5, this.JE);
						hot.setDataAtCell(12, 8, this.SE);
				}
			});
			count++;
			doSomething();
		}
	});
	//（三）本期用于购建不动产的扣税凭证
	$.ajax( {
		url : ctx + "/interface/getBdc.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
		},
		dataType : "json",
		success : function(data) {
					hot.setDataAtCell(13, 2, data.FS);
					hot.setDataAtCell(13, 5, data.JE);
					hot.setDataAtCell(13, 8, data.SE);
			count++;
			doSomething();
		}
	});
	
	//（四）本期不动产允许抵扣进项税额
	$.ajax( {
		url : ctx + "/interface/getTable2_1BdcSe.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
		},
		dataType : "json",
		success : function(data) {
					hot.setDataAtCell(14, 8, data);
			count++;
			doSomething();
		}
	});	
	function doSomething() {
		if (count == 4) {
			callback();
		}
	}
};
function cellCheck2_1(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (col >=2 && col<=10 && row >=5 ) {
		if(!numberCheck(changes))
			return false;
	}
	return true;
};

/*
 * 台账表附表2sheet2配置
 * 
 */
function setRender2_2(row, col, prop) {
	if (row < 5) {
		this.renderer = boldRender;
	}
	if (row > 4 && row < 14 && col < 2) {
		this.renderer = boldRender;
	}
	if(row>=5&&row<=13&&col>=2&&col<=4){
		if(row==5)
			this.renderer = grayRender;
		else if(col==2)
			this.renderer = purpleRender;
		else if(col==3)
			this.renderer = greenRender;
		else
			this.renderer = grayRender;	
	}
};

function calculate2_2(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//税额合计
			if ((col==2||col==3) && (row>=5&&row<=13)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//b1=b2+b3+b4+b5+b6+b7+b8+b9+b10
			if ((col>=2&&col<=3) && (row>=6&&row<=13)) {
				temp = parseFloat(this.getDataAtCell(5, col));
				this.setDataAtCell(5, col, FloatAdd(temp, changeData).toString());
			}
		}
		
	}
};
function setData2_2(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	var b3 = 0,b6 = 0,b7=0;
	//b3集体福利、个人消费
	$.ajax( {
		url : ctx + "/interface/getTable2_*JxJeSeFs.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			rzjg:0, 
			dkzt:1,
			fpyt:3
		},
		dataType : "json",
		success : function(data) {
			b3 = data.SE;
			hot.setDataAtCell(7, 2,b3);
			count++;
			doSomething();
		}
	});	
	//b6纳税检查调减进项税额  跨表取数纳税检查调整台账
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '9_0'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					var length = tableData.length - 5;
					for(var i=0;i<length;i++){
						b6 = FloatAddEx(b6,tableData[i+5][6]);
					}
				}
			}
			hot.setDataAtCell(10, 2,b6);
			count++;
			doSomething();
		}
	});	
	//b7 红字专用发票信息表注明的进项税额
	$.ajax( {
		url : ctx + "/interface/getTable2_*HzfpSe.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
		},
		dataType : "json",
		success : function(data) {
			var se = '0';
			if(!isNaN(Number(data)))
				se = data;
			hot.setDataAtCell(11, 2,se);
			count++;
			doSomething();
		}
	});	
	//申报抵扣进项税额 跨表取2_1的16_10
	var dkse = 0;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					dkse = tableData[16][10];
				}
			}
			count++;
			doSomething();
		}
	});		
	//1_1
	var tableData1_1;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
					tableData1_1 = tableData;
			}
			count++;
			doSomething();
		}
	});		
	//1_2
	var tableData1_2;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
					tableData1_2 = tableData;
			}
			count++;
			doSomething();
		}
	});	
	//1_3
	var tableData1_3;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_3'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
					tableData1_3 = tableData;
			}
			count++;
			doSomething();
		}
	});	
	
	
	function doSomething(){
		if(count==7){
			var b2=0,b5=0;
		/*	b2、b5公式：当期无法划分的全部进项税额×销售额÷当期全部销售额
		*	当期无法划分的全部进项税额=申报抵扣的进项税额-b3-b4-b6-b7-b8-b9 其中b4b8b9无 
		*	b2 销售额 = 附表1中“免税货物及加工修理修配劳务”（开具发票+未开具发票）
		*	b5销售额 = 附表1中“简易计税”的开具增值税发票+开具其他发票+未开发票
		*	当期全部销售额 = 附表1中所有项目金额汇总
		*/
			//当期无法划分的全部进项税额 = dkse-b3-b6-b7
			var qbse = FloatAddEx(dkse,-b3,-b6,-b7);
			//b2 销售额 附表1中“免税货物及加工修理修配劳务”（开具发票+未开具发票）
			var b2xse = FloatAddEx(tableData1_1[49][4],tableData1_2[49][4],tableData1_3[20][5]);
			//b5 销售额 附表1中“简易计税”的开具增值税发票+开具其他发票+未开发票
			var input = new Array();
			input.push(tableData1_1[36][4]);
			input.push(tableData1_1[39][4]);
			input.push(tableData1_1[42][4]);
			input.push(tableData1_1[45][4]);
			input.push(tableData1_1[48][4]);
			input.push(tableData1_2[36][4]);
			input.push(tableData1_2[39][4]);
			input.push(tableData1_2[42][4]);
			input.push(tableData1_2[45][4]);
			input.push(tableData1_2[48][4]);
			input.push(tableData1_3[15][5]);
			input.push(tableData1_3[16][5]);
			input.push(tableData1_3[17][5]);
			input.push(tableData1_3[18][5]);
			input.push(tableData1_3[19][5]);
			var b5xse = FloatAddEx2(input);
			//当期全部销售额
			var input2 = new Array();
			for(var row=6;row<=48;row++){
				if(row%3==0){
					input2.push(tableData1_1[row][4]);
					input2.push(tableData1_2[row][4]);
				}
			}
			input2.push(tableData1_1[49][4]);
			input2.push(tableData1_2[49][4]);
			input2.push(tableData1_2[50][4]);
			for(row=7;row<=21;row++){
				input2.push(tableData1_3[row][5]);
			}
			var qbxse = FloatAddEx2(input2);
			//b2=qbse*b2xse/qbxse
			b2 = FloatDivEx(FloatMulEx(qbse,b2xse),qbxse);
			//b5=qbse*b5xse/qbxse
			b5 = FloatDivEx(FloatMulEx(qbse,b5xse),qbxse);
			insertAction = true;
			hot.setDataAtCell(6,2,b2);
			hot.setDataAtCell(9,2,b5);
			insertAction = false;
			callback('');
		}
		
	}

};
function cellCheck2_2(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row>=5 && col >= 2 && col <=4) {
		if(!numberCheck(changes))
			return false;
	}
	return true;
};

/*
 * 台账表附表2sheet3配置
 * 
 */
function setRender2_3(row, col, prop) {
	if (row < 5) {
		this.renderer = boldRender;
	}
	if (row > 4 && row < 15 && col < 2) {
		this.renderer = boldRender;
	}
	if(row>=5&&row<=14&&col>=2&&col<=10){
		if(row==10)
			this.renderer = grayRender;
		else if(col==2||col==5||col==8)
			this.renderer = purpleRender;
		else if(col==3||col==6||col==9)
			this.renderer = greenRender;
		else
			this.renderer = grayRender;	
	}
};

function calculate2_3(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//份数合计
			if ((col==2||col==3) && (row>=5&&row<=14)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//金额合计
			if ((col==5||col==6) && (row>=5&&row<=14)) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			//税额合计
			if ((col==8||col==9) && (row>=5&&row<=14)) {
				temp = parseFloat(this.getDataAtCell(row, 10));
				this.setDataAtCell(row, 10, FloatAdd(temp, changeData).toString());
			}
			//c6=c7+c8+c9+c10
			if( (row>=11&&row<=14) && (col==3||col==6||col==9||col==2||col==5||col==8) ){
				temp = parseFloat(this.getDataAtCell(10, col));
				this.setDataAtCell(10, col, FloatAdd(temp, changeData).toString());
			}
		}
		

	}
};
function setData2_3(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	var c3_c = 0.00, c3_f = 0.00, c3_i = 0.00; // 表中C3行 后台取数
	var c2_c = 0.00, c2_f = 0.00, c2_i = 0.00; // 表中c2行 跨表取上期的C4
	// 表中C4=C2+C3-A3
	var a3_c = 0.00, a3_f = 0.00, a3_i = 0.00; // 同期2_1表中a3行
	// 后台取数得到c3
	$.ajax( {
		url : ctx + "/interface/getTable2_*JxJeSeFs.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			rzjg:0, //认证通过
			dkzt:2 //未抵扣
		},
		dataType : "json",
		success : function(data) {
				c3_c = data.FS;
				c3_f = data.JE;
				c3_i = data.SE;
			hot.setDataAtCell(7, 2, c3_c);
			hot.setDataAtCell(7, 5, c3_f);
			hot.setDataAtCell(7, 8, c3_i);
			count++;
			doSomething();
		}
	});
	// 跨表取数取2_1表的a3
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				a3_c = tableData[7][4];
				a3_f = tableData[7][7];
				a3_i = tableData[7][10];
			}
				count++;
				doSomething();
			
		}
	});
	// 跨表跨表取上期的C4
	if (selections[0].TAXDATEID > 1) {
		$.ajax( {
			url : ctx + "/interface/selectAfwtHandson.do",
			type : "post",
			async : true,
			data : {
				nsrsbhId : selections[0].NSRSBH_ID,
				tableId : '2_3',
				taxDateId : selections[0].TAXDATEID - 1
			},
			dataType : "json",
			success : function(data) {
				if (data != "[]") {
					var temp = JSON.parse(data);
					var tableData = JSON.parse(temp[0].afwtHandson);
					c2_c = tableData[8][4];
					c2_f = tableData[8][7];
					c2_i = tableData[8][10];
					hot.setDataAtCell(6, 2, c2_c);
					hot.setDataAtCell(6, 5, c2_f);
					hot.setDataAtCell(6, 8, c2_i);
				}
				count++;
				doSomething();
			}
		});
	} else {
		c2_c = 0;
		c2_f = 0;
		c2_i = 0;
		hot.setDataAtCell(6, 2, c2_c);
		hot.setDataAtCell(6, 5, c2_f);
		hot.setDataAtCell(6, 8, c2_i);
		count++;
		doSomething();
	}
	function doSomething() {
		if (count == 3) {
			hot.setDataAtCell(8, 2, FloatAdd(
					FloatAdd(parseFloat(c2_c), parseFloat(c3_c)),
					-parseFloat(a3_c)).toString());
			hot.setDataAtCell(8, 5, FloatAdd(
					FloatAdd(parseFloat(c2_f), parseFloat(c3_f)),
					-parseFloat(a3_f)).toString());
			hot.setDataAtCell(8, 8, FloatAdd(
					FloatAdd(parseFloat(c2_i), parseFloat(c3_i)),
					-parseFloat(a3_i)).toString());
			callback('');
		}
	}
};
function cellCheck2_3(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row > 4) {
		if (col>=2 && col <=10) {
			if(!numberCheck(changes))
				return false;		
			}
	}
	return true;
};

/*
 * 台账表附表2sheet4配置
 * 
 */
function setRender2_4(row, col, prop) {
	if (row < 5) {
		this.renderer = boldRender;
	}
	if (row > 4 && row < 7 && col < 2) {
		this.renderer = boldRender;
	}
	if(row>=5&&row<=6&&col>=2&&col<=10){
		if(col==2||col==5||col==8)
			this.renderer = purpleRender;
		else if(col==3||col==6||col==9)
			this.renderer = greenRender;
		else
			this.renderer = grayRender;	
	}
};

function calculate2_4(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			//份数合计
			if ((col==2||col==3) && (row>=5&&row<=6)) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			//份数合计
			if ((col==5||col==6) && (row>=5&&row<=6)) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			//份数合计
			if ((col==8||col==9) && (row>=5&&row<=6)) {
				temp = parseFloat(this.getDataAtCell(row, 10));
				this.setDataAtCell(row, 10, FloatAdd(temp, changeData).toString());
			}
		}
		
	}
};
function setData2_4(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	// 后台取数
	$.ajax( {
		url : ctx + "/interface/getTable2_*JxJeSeFs.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			rzjg:0, //认证通过
			dkzt:1
		},
		dataType : "json",
		success : function(data) {
				if(data.FS!=0){
					hot.setDataAtCell(5, 2, data.FS);
					hot.setDataAtCell(5, 5, data.JE);
					hot.setDataAtCell(5, 8, data.SE);
				}
			count++;
			doSomething();
		}
	});
	//（二）代扣代缴税收缴款凭证
	$.ajax( {
		url : ctx + "/interface/getTable2_*Kkpz.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,
			begindate : selections[0].SK_SDATE,
			enddate : selections[0].SK_EDATE,
			dkzt:1,
			fplb:2
		},
		dataType : "json",
		success : function(data) {
			//清零
			hot.setDataAtCell(6, 8, 0);
			$.each(data,function(){
				//1：农产品收购发票或者销售发票，2：代扣代缴税收缴款凭证，3：海关进口增值税专用缴款书，4：其他小票
				if(this.FPLB=='2'){
					hot.setDataAtCell(6, 8, this.SE);
				}
			});
			count++;
			doSomething();
		}
	});
	function doSomething(){
		if(count==2){
			callback('');
		}
	}
};
function cellCheck2_4(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if ( row>=5 && row<=6 && col>=2 && col<=10) {
			if(!numberCheck(changes))
				return false;
	}
	return true;
};

/*
 * 台账表附表3配置
 * 
 */
function setRender3_1(row, col, prop) {
	if(row >= 8 && row <= 14){
		if(col === 5){
			this.renderer = greenRender;			
		}
		if(col===2 || col===3 || col===4|| col===8){
			
			this.renderer =purpleRender;
		}
		if(col===6 || col===7 || col===9){
			this.renderer =grayRender;
		}				
	}
	if (row <= 7) {
		this.renderer = boldRender;
	}
	if (row >= 8 && row <= 14 && (col === 1)) {
		this.renderer = boldRender;
	}

};

function calculate3_1(change, source) {

	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		if(change[0][2]!=change[0][3]){			
			$("#bb_tab a").attr("href","#bb3");
			if (row < 15 && row >= 8) {
				if(col===2  || col===7){
					
					col2= parseFloat(this.getDataAtCell(row, 2));
					col7= parseFloat(this.getDataAtCell(row, 7));
					if(col2-col7>0){
						this.setDataAtCell(row, 8, col7.toString());
					}else{
						this.setDataAtCell(row, 8, col2.toString());
					}
				}
				if (col === 5) {

					col4 = parseFloat(this.getDataAtCell(row, col - 1));
					if (this.getDataAtCell(row, col) == "") {
						col5 = 0;
					} else {
						col5 = parseFloat(this.getDataAtCell(row, col));
					}
					if (this.getDataAtCell(row, col - 1) == "") {
						col6 = FloatAdd(0, col5);
					} else {
						col6 = FloatAdd(col4, col5);
					}

					this.setDataAtCell(row, col + 1, col6.toString());
				}
				if(col===3 ||  col===6){
					col6 = parseFloat(this.getDataAtCell(row, 6 ));
					col3 = parseFloat(this.getDataAtCell(row, 3 ));
					col7=FloatAdd(col3, col6);															
					this.setDataAtCell(row, 7, col7.toString());
				}
			    if(col===7 ||  col===8){
			    	
			    	col7 = parseFloat(this.getDataAtCell(row,7 ));
					col8 = parseFloat(this.getDataAtCell(row, 8 ));
					col9=FloatAdd(col7, -col8);	
					this.setDataAtCell(row, 9, col9.toString());
			    }
			}
		}
		
	}

};
function setData3_1(callback) {
   //跨表取数取上一期的数据	
	var  count=0;
	var taxDateId= selections[0].TAXDATEID-1;
	var nsrsbhId= selections[0].NSRSBH_ID;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "3_1",  //表ID
			taxDateId : taxDateId,//上一期的税期号
			nsrsbhId: nsrsbhId  //纳税人识别号
		
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				var arr = JSON.parse(data);
				var data_1 = JSON.parse(arr[0].afwtHandson);
				if (selections[0].TAXDATEID > 1) {
				hot.setDataAtCell(8, 3,data_1[8][9]);
				hot.setDataAtCell(9, 3,data_1[9][9]);
				hot.setDataAtCell(10, 3,data_1[10][9]);
				hot.setDataAtCell(11, 3,data_1[11][9]);
				hot.setDataAtCell(12, 3,data_1[12][9]);
				hot.setDataAtCell(13, 3,data_1[13][9]);
				hot.setDataAtCell(14, 3,data_1[14][9]);
				}
			}
			
			count++;
			doSomething();
		}
	});
	//取申报表的数据
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//17%税率的项目
					hot.setDataAtCell(8, 2,tableData[8][14]);
					//11%税率的项目
					hot.setDataAtCell(9, 2,tableData[10][14]);
					//6%税率的项目（不含金融商品转让）
					//col102=tableData[11][14];
					hot.setDataAtCell(10, 2,tableData[11][14]);
					//6%税率的金融商品转让项目
					
					//5%征收率的项目
					hot.setDataAtCell(12, 2,tableData[16][14]);
					//3%征收率的项目
					hot.setDataAtCell(13, 2,tableData[19][14]);
					//免税的项目
					hot.setDataAtCell(14, 2,tableData[28][14]);
					
				}
			}
			count++;
			doSomething();
		}
	});
	function doSomething(){
		if(count===2){
			callback("");				
		}
	}
	
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 " + selections[0].SK_EDATE);
	var StrDate=selections[0].SK_SDATE;
	if(StrDate.charAt(6)=='1' && StrDate.charAt(5)=='0'){
		hot.setDataAtCell(8, 3,'0');
		hot.setDataAtCell(9, 3,'0');
		hot.setDataAtCell(10, 3,'0');
		hot.setDataAtCell(11, 3,'0');
		hot.setDataAtCell(12, 3,'0');
		hot.setDataAtCell(14, 3,'0');
		
	}
};
function cellCheck3_1(changes) {
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if (row > 6) {
		if (col >=3) {
			if(!numberCheck(changes))
				return false;
		}
	}
	//7<=1&&7<=6
	if(row >= 8 && col===8){
		if(Number(changes[0][3])>Number(this.getDataAtCell(row,2)) || Number(changes[0][3])>Number(this.getDataAtCell(row,7)))
			return false;
		
	}
	return true;

};
/*
 * 台账表附表4配置
 * 
 */
function setRender4_1(row, col, prop) {
	if (row >= 7 && row <= 10 && (col === 4) || (col === 8)) {
		this.renderer = greenRender;
	}
	if(row >= 7 && row <= 10){
		if(col===2 || col===3 || col==7){
			this.renderer = purpleRender;
		}
		if(col===5 || col===6 || col===9 || col===10){
			this.renderer = grayRender;
		}
		
	}
	if (row <= 6) {
		this.renderer = boldRender;
	}
	if (row >= 7 && row <= 10 && (col === 1)) {
		this.renderer = boldRender;
	}

};

function calculate4_1(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(row >=7 && row<=10){
				if(col===2){
					col2 = parseFloat(this.getDataAtCell(row,2 ));
					col5 = parseFloat(this.getDataAtCell(row, 5 ));
					col6=FloatAdd(col2, col5);	
					this.setDataAtCell(row, 6, col6.toString());
					
				}
				if(col===3 ||  col===4){
					col3 = parseFloat(this.getDataAtCell(row,3 ));
					col4 = parseFloat(this.getDataAtCell(row, 4 ));
					col5=FloatAdd(col3, col4);	
					this.setDataAtCell(row, 5, col5.toString());
				}
				if(col===5){
					col2 = parseFloat(this.getDataAtCell(row,2 ));
					col5 = parseFloat(this.getDataAtCell(row, 5 ));
					col6=FloatAdd(col2, col5);	
					this.setDataAtCell(row, 6, col6.toString());				
				}
				if(col===5){				
					col5 = parseFloat(this.getDataAtCell(row, 5 ));				
					this.setDataAtCell(row, 7, col5.toString());				
				}
				if(col===6){
					col6 = parseFloat(this.getDataAtCell(row,6 ));
					col9 = parseFloat(this.getDataAtCell(row, 9 ));
					col10=FloatAdd(col6, -col9);	
					this.setDataAtCell(row, 10, col10.toString());				
				}
				if(col===7 ){
					col7 = parseFloat(this.getDataAtCell(row,7 ));
					col8 = parseFloat(this.getDataAtCell(row, 8 ));
					col9=FloatAdd(col7, col8);	
					this.setDataAtCell(row, 9, col9.toString());
				}
				if(col===8){
					col7 = parseFloat(this.getDataAtCell(row,7 ));
					col8 = parseFloat(this.getDataAtCell(row, 8 ));
					col9=FloatAdd(col7, col8);	
					this.setDataAtCell(row, 9, col9.toString());				
				}
				if(col===9){
					col6 = parseFloat(this.getDataAtCell(row,6 ));
					col9 = parseFloat(this.getDataAtCell(row, 9 ));
					col10=FloatAdd(col6, -col9);	
					this.setDataAtCell(row, 10, col10.toString());					
				}
			}
		}
		

		
	}
};
function setData4_1(callback) {
	
	//跨表取数取上一期的数据
	var taxDateId= selections[0].TAXDATEID-1;
	var nsrsbhId= selections[0].NSRSBH_ID;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "4_1",  //表ID
			taxDateId : taxDateId,//上一期的税期号
			nsrsbhId:nsrsbhId  //纳税人识别号
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				var arr = JSON.parse(data);
				var data_1 = JSON.parse(arr[0].afwtHandson);
				if (selections[0].TAXDATEID > 1) {
					hot.setDataAtCell(7, 2,data_1[7][10]);
					hot.setDataAtCell(8, 2,data_1[8][10]);
					hot.setDataAtCell(9, 2,data_1[9][10]);
					hot.setDataAtCell(10, 2,data_1[10][10]);
					
				}
			}
			

			
			doSomething();
		}
		
	});
	function doSomething(){
		callback("");
	}
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 " + selections[0].SK_EDATE);
	var StrDate=selections[0].SK_SDATE;
	if(StrDate.charAt(6)=='1' && StrDate.charAt(5)=='0'){
		hot.setDataAtCell(7, 2,'0');
		hot.setDataAtCell(8, 2,'0');
		hot.setDataAtCell(9, 2,'0');
		hot.setDataAtCell(10, 2,'0');
	}

};
function cellCheck4_1(changes) {
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if (row > 6) {
		if (col >=1) {
			if(!numberCheck(changes))
				return false;
		}
	}
	//8<=5
//if((row >= 7&& row<=10)&&col===9){
//		if(Number(changes[0][3])>Number(this.getDataAtCell(row,col-3)))
//		return false;
	//}
	return true;
}
/*
 * 台账表附表5配置
 * 
 */
function setRender5_1(row, col, prop) {
	if(row >= 7){
		if((col === 2) || (col === 5) || (col === 7) || (col === 8)){
			this.renderer = greenRender;
		}else if((col ===1) || (col === 4)){
			this.renderer = purpleRender;
		}else if((col ===3) || (col === 6) || (col === 9)){
			this.renderer = grayRender;
		}else if((col ===0)){
			this.renderer = purpleRender;
		}
		
	}
	if (row <= 4) {
		this.renderer = boldRender;
	}

};

function calculate5_1(change, source) {
	if (change) {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		
		var col0 = 0;
		var col1 = 0;
		var col2 = 0;
		var col3 = 0;
		var col4 = 0;
		var col5 = 0;
		var col6 = 0;
		var col7 = 0;
		var col8 = 0;
		var col9 = 0;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if (row === 7) {
				
				if (col === 2) {

					col1 = parseFloat(this.getDataAtCell(row, col - 1));
					if (this.getDataAtCell(row, col) == "") {
						col2 = 0;
					} else {
						col2 = parseFloat(this.getDataAtCell(row, col));
					}
					if (this.getDataAtCell(row, col - 1) == "") {
						col3 = FloatAdd(0, col2);
					} else {
						col3 = FloatAdd(col1, col2);
					}

					this.setDataAtCell(row, col + 1, col3.toString());

				}
				if (col === 5) {

					col4 = parseFloat(this.getDataAtCell(row, col - 1));
					if (this.getDataAtCell(row, col) == "") {
						col5 = 0;
					} else {
						col5 = parseFloat(this.getDataAtCell(row, col));
					}
					if (this.getDataAtCell(row, col - 1) == "") {

						col6 = FloatAdd(0, col5);
					} else {
						col6 = FloatAdd(col4, col5);
					}

					this.setDataAtCell(row, col + 1, col6.toString());

				}
				if(col === 0 || col === 3 || col === 6 || col === 7 || col === 8){
					col0 = parseFloat(this.getDataAtCell(row, 0));
					col3 = parseFloat(this.getDataAtCell(row, 3));
					col6 = parseFloat(this.getDataAtCell(row, 6));
					col7 = parseFloat(this.getDataAtCell(row, 7));
					col8 = parseFloat(this.getDataAtCell(row, 8));
					col9 = FloatMulAdd(col0,col3,-col6,col7,-col8,0,0,0,0);
					this.setDataAtCell(row, 9, col9.toString());
				}
				
			}
		}
		
	}

};
function setData5_1(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	var a9 = 0;
	var a10 = 0;
	// 跨表取数取2_1表的a9税额,a10税额
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				a9 = tableData[13][8];
				a10 = tableData[14][8];
			}
			count++;
			//doSomething(count,a9,a10);
			doSomething();
		}
	});
	// 跨表跨表取上期的第10列
	if (selections[0].TAXDATEID > 1) {
		$.ajax( {
			url : ctx + "/interface/selectAfwtHandson.do",
			type : "post",
			async : true,
			data : {
				nsrsbhId : selections[0].NSRSBH_ID,
				tableId : '5_1',
				taxDateId : selections[0].TAXDATEID - 1
			},
			dataType : "json",
			success : function(data) {
				if (data != "[]") {
					var temp = JSON.parse(data);
					var tableData = JSON.parse(temp[0].afwtHandson);
					var a = tableData[7][9];
					hot.setDataAtCell(7, 0, a);
				}
				count++;
				doSomething();
			}
		});
	} else {
		a = '0.00';
		hot.setDataAtCell(7, 0, a);
		count++;
		doSomething();
	}
	function doSomething() {
		if (count == 2) {
			hot.setDataAtCell(7,1,a9.toString());
			var b = parseFloat(a9.toString());
			//第四列合计
			var a = parseFloat(hot.getDataAtCell(7,2));
			var c = FloatAdd(a,b);
			hot.setDataAtCell(7,3,c.toString());
			
			hot.setDataAtCell(7,4,a10.toString());
			//第七列合计
			var d = parseFloat(a10.toString());
			var e = parseFloat(hot.getDataAtCell(7,5));
			var f = FloatAdd(d,e);
			hot.setDataAtCell(7,6,f.toString());
			callback('');
		}
	}

};
function cellCheck5_1(changes) {

	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if (row == 7) {
		if ((col == 2) || (col == 5) || (col === 7) || (col === 8)) {
			if(!numberCheck(changes))
				return false;
		}
	}		
	return true;

};


/*
 * 台账表附表5_2配置
 * 
 */
function setRender5_2(row, col, prop) {
	
	if((row > 6)&&(col >0)){
		this.renderer = purpleRender;
	}
	if (row >= 7 && ((col === 2) || (col === 6))) {
		this.renderer = greenRender;
	}
	if (row <= 1) {
		this.renderer = boldRender;
	}

};
function calculate5_2(change, source) {
	if (change) {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if((row>6)&&(col==10)){
				//11列可抵扣进项税额
				var a = parseFloat(this.getDataAtCell(row,10));
				var str;
				var str2;
				if(isNaN(a)){
					str = "";
					str2 = "";
				}else{
					
					this.setDataAtCell(row, 12, FloatMul(a, 0.60));
					this.setDataAtCell(row, 14, FloatMul(a, 0.40));
					var now = new Date();
					var ye = now.getFullYear();
					var mon = now.getMonth()+1;
					str = "申报期间"+ye+"年"+mon+"月";
				    str2 = "申报期间"+(ye+1)+"年"+(mon+1-12)+"月";
					
				}
				this.setDataAtCell(row, 11, str);
				this.setDataAtCell(row, 13, str2);
				
				
				
			}
		}
		
		
		
	
	}
}

function setData5_2(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	$.ajax( {
		url : ctx + "/interface/getTable5_2.do",
		type : "post",
		async : true,
		data : {
			bmid : selections[0].QX_BMID,//"02571AK210",//
			begindate : selections[0].SK_SDATE,//"2016-01-01",//
			enddate : selections[0].SK_EDATE,//"2017-12-31",//
		},
		dataType : "json",
		success : function(data) {
			
			if (data.length>0) {
				
				var rowcount = data.length;
				for(var i = 0;i < rowcount;i++){
					for(var j = 0;j<15;j++){
						hot.setCellMeta(i+7, j, 'className', 'htCenter htMiddle');
					}
					var r = data[i];
					hot.setDataAtCell(i+7, 0, i+1);
					hot.setCellMeta(i+7,0,'readOnly',true);
					//PZH
					hot.setDataAtCell(i+7, 1, r.PZH);
					hot.setCellMeta(i+7,1,'readOnly',true);
					//XMLX
					hot.setDataAtCell(i+7, 3, r.XMLX);
					hot.setCellMeta(i+7,3,'readOnly',true);
					//XMYT
					hot.setDataAtCell(i+7, 4, r.XMYT);
					hot.setCellMeta(i+7,4,'readOnly',true);
					//XFSH
					hot.setDataAtCell(i+7, 5, r.XFSH);
					hot.setCellMeta(i+7,5,'readOnly',true);
					//FPDM
					hot.setDataAtCell(i+7, 7, r.FPDM);
					hot.setCellMeta(i+7,7,'readOnly',true);
					//FPHM
					hot.setDataAtCell(i+7, 8, r.FPHM);
					hot.setCellMeta(i+7,8,'readOnly',true);
					//JE
					hot.setDataAtCell(i+7, 9, r.JE);
					hot.setCellMeta(i+7,9,'readOnly',true);
					//SE
					hot.setDataAtCell(i+7, 10, r.SE);
					hot.setCellMeta(i+7,10,'readOnly',true);
					hot.render();
				}
			}
					callback("");
		}
	});
};

function cellCheck5_2(changes) {
	
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	
	if((col == 10)&&(row > 6)){
		if(!numberCheck(changes))
			return false;
	}
	
	return true;
}


/*
 * 台账表附表6配置
 * 
 */
function setRender6_1(row, col, prop) {
	
	if((row == 7) || (row == 8)){
		
		if(col == 2){
			this.renderer = purpleRender;
		}else if(col == 4){
			this.renderer = grayRender;
		}
		
		
	}
	
	if((col == 5)&&((row == 7)||(row == 8))){
		this.renderer = purpleRender;
	}
	
	if((row == 9)&&((col == 2)||(col == 3)||(col == 4)||(col == 5))){
		this.renderer = grayRender;
	}
	
	
	if (row >= 7 && row < 9 && (col === 3)) {
		this.renderer = greenRender;
	}
	
	
	
	
	if (row <= 4) {
		this.renderer = boldRender;
	}
	if (row >= 7 && row <= 9 && col === 1) {
		this.renderer = boldRender;
	}

};

function calculate6_1(change, source) {

	if (change) {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if ((col >= 2 && col <= 5) && (row === 7 || row === 8)) {
				//sum = FloatAdd(parseFloat(this.getDataAtCell(8, col)),parseFloat(this.getDataAtCell(7, col)));
				//sum = parseFloat(this.getDataAtCell(7, col));
				sum = this.getDataAtCell(7, col);
				this.setDataAtCell(9, col, sum.toString());
			}
			
			if (row <= 9 && row >= 7) {

				if (col === 3) {
					col2 = parseFloat(this.getDataAtCell(row, col - 1));
					if (this.getDataAtCell(row, col) == "") {
						col3 = 0;
					} else {
						col3 = parseFloat(this.getDataAtCell(row, col));
					}
					if (this.getDataAtCell(row, col - 1) == "") {

						col4 = FloatAdd(0, col3);
					} else {

						col4 = FloatAdd(col2, col3);
					}

					var c = this.getDataAtCell(row, col + 1);
					this.setDataAtCell(row, col + 1, col4.toString());
					var a = this.getDataAtCell(row, col + 2);
					var b = FloatAdd(a, col4);
					var d = FloatAdd(b, -c); 
					this.setDataAtCell(row, col + 2, d.toString());

				}
			}
		}
		
	}

};
function setData6_1(callback) {
	hot.setDataAtCell(3, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(4, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	
	var count = 0;
	var se = 0;
	var selj = 0;//累计值
	var firstTaxId = 0;
	
	//获得一年第一期期数
	$.ajax( {
		url : ctx + "/interface/getTaxdId.do",
		type : "post",
		async : true,
		data : {
			qxBmId  : selections[0].QX_BMID,
			skSdate : selections[0].SK_SDATE.substring(0,10),
			skSdate_end : selections[0].SK_EDATE.substring(0,10),
			skEdate : (parseInt(selections[0].SK_SDATE.substring(0,4))-1).toString()
		},
		dataType : "json",
		success : function(data) {
					//固定资产（不包括不动产）税额
					$.ajax( {
						url : ctx + "/interface/getTable2_*JxJeSeFs.do",
						type : "post",
						async : true,
						data : {
							bmid : selections[0].QX_BMID,
							begindate : selections[0].SK_SDATE,
							enddate : selections[0].SK_EDATE,
						},
						dataType : "json",
						success : function(data) {
									se = data.SE;
									count++;
									doSomething();
						}
					});
					//固定资产进项税额累计
					var dlist = JSON.parse(data);
					if(dlist.length>0){
						firstTaxId = Number(dlist[0]);
					}
					if (selections[0].TAXDATEID > firstTaxId) {
						$.ajax( {
							url : ctx + "/interface/selectAfwtHandson.do",
							type : "post",
							async : true,
							data : {
								nsrsbhId : selections[0].NSRSBH_ID,
								tableId : '6_1',
								taxDateId : selections[0].TAXDATEID - 1
							},
							dataType : "json",
							success : function(data) {
								if (data != "[]") {
									var temp = JSON.parse(data);
									var tableData = JSON.parse(temp[0].afwtHandson);
									selj = tableData[7][5];//上期累计
									/*sehj = tableData[7][4];//上期合计
									selj = FloatAdd(sehj,selj);*/
								}
								count++;
								doSomething();
							}
						});
					} else {
						//第一期的时候 
						selj = "0.00";
						count++;
						doSomething();
						/*$.ajax( {
							url : ctx + "/interface/getTable6_1BdcSeBefore1.do",
							type : "post",
							async : true,
							data : {
								bmid : selections[0].QX_BMID,
								begindate : selections[0].SK_SDATE,
								enddate : selections[0].SK_EDATE,
							},
							dataType : "json",
							success : function(data) {
										selj = data;
										count++;
										doSomething();
							}
						});*/
						
					}
					
		}
	});
	function doSomething() {
		if (count == 2) {
			hot.setDataAtCell(7,2,se.toString());
			var c = parseFloat(hot.getDataAtCell(7,2));
			var d = parseFloat(hot.getDataAtCell(7,3));
			var e = FloatAdd(c,d);
			hot.setDataAtCell(7,4,e.toString());
			var g = FloatAdd(selj,e);
			hot.setDataAtCell(7,5,g.toString());
			callback('');
		}
	}

};
function cellCheck6_1(changes) {

	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 6) {
		if ((col == 3)||(col == 2)||(col == 5)) {
			if(!numberCheck(changes))
				return false;
		}
	}
	
	return true;

};
/*
 * 台账表附表7配置
 * 
 */
function setRender7_1(row, col, prop) {

	if (row > 6 && row < 35) {
		if(col === 3 || col === 6){
			this.renderer = greenRender;
		}else if(col === 2 || col === 5){
			this.renderer = purpleRender;
		}else if(col === 4 || col === 7){
			this.renderer = grayRender;
		}
	}
	if (row === 6 && col>=2 && col<=7){
		this.renderer = grayRender;
	}
	if (row < 6) {
		this.renderer = boldRender;
	}
	if (row > 6 && row < 35 && col < 2) {
		this.renderer = boldRender;
	}

};

function calculate7_1(change, source) {
	if (change) {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var col2;
		var col3;
		var col4;
		var col5;
		var col6;
		var col7;
		var cell2;
		var cell4;
		var cell5;
		var cell11;
		var cell16;
		var cell18;
		var cell27;
		var cell28;
		var cell29;
		var sum;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if (row > 6) {
				//第一类操作：金额手工调整
				if (col === 3) {
					//1.1 计算合计金额 col4
					col2 = getRealDataAtCell(hot, row, col - 1);
					if (this.getDataAtCell(row, col) === "") {
						col3 = 0;
					}else if(this.getDataAtCell(row, col) === null){
						col3 = 0;
					}else{
						col3 = parseFloat(this.getDataAtCell(row, col));
					}
					col4 = FloatAdd(col2, col3);
					this.setDataAtCell(row, col + 1, col4.toString());
					
					//cell值改变之后要进行纵列求和, 求和规则  栏次1 = 2+4+5+11+16+18+27+28+29
					//手工调整求和col3
					this.setDataAtCell(6, col, getSum(hot,3).toString());
					//合计金额求和col4
					this.setDataAtCell(6, col + 1, getSum(hot,4).toString());
				}
				
				//第二类操作：税额手工调整
				if (col === 6) {
					// 调整合计税额
					if (this.getDataAtCell(row, col - 1) === "") {
						col5 = 0;
					}else if(this.getDataAtCell(row, col - 1) === null){
						col5 = 0;
					}else{
						col5 = parseFloat(this.getDataAtCell(row, col - 1));
					}
					if (this.getDataAtCell(row, col) === "") {
						col6 = 0;
					}else if(this.getDataAtCell(row, col) === null){
						col6 = 0;
					}else{
						col6 = parseFloat(this.getDataAtCell(row, col));
					}
					col7 = FloatAdd(col5, col6);
					this.setDataAtCell(row, col + 1, col7.toString());
					
					//cell值改变之后要进行纵列求和, 求和规则  栏次1 = 2+4+5+11+16+18+27+28+29
					//手工调整求和col6
					this.setDataAtCell(6, col, getSum(hot,6).toString());
					//合计税额求和col7
					this.setDataAtCell(6, col +1, getSum(hot,7).toString());
					
				}
				
				//金额改变的时候，重新计算合计金额
				if (col === 2) {
					col2 = getRealDataAtCell(hot,row,col);
					col3 = getRealDataAtCell(hot,row,col + 1);
					col4 = FloatAdd(col2, col3);
					this.setDataAtCell(row, col + 2, col4.toString());
					
					//cell值改变之后要进行纵列求和, 求和规则  栏次1 = 2+4+5+11+16+18+27+28+29
					//纵列求和col2
					this.setDataAtCell(6, col, getSum(hot,2).toString());
					//纵列求和col3
					this.setDataAtCell(6, col +1, getSum(hot,3).toString());
					//纵列求和col4
					this.setDataAtCell(6, col +2, getSum(hot,4).toString());
					
				}
				//税额改变的时候，重新计算合计税额
				if (col === 5) {
					col5 = getRealDataAtCell(hot,row,col);
					col6 = getRealDataAtCell(hot,row,col + 1);
					col7 = FloatAdd(col5, col6);
					this.setDataAtCell(row, col + 2, col7.toString());
					
					//cell值改变之后要进行纵列求和, 求和规则  栏次1 = 2+4+5+11+16+18+27+28+29
					//纵列求和col5
					this.setDataAtCell(6, col, getSum(hot,5).toString());
					//纵列求和col6
					this.setDataAtCell(6, col +1, getSum(hot,6).toString());
					//纵列求和col7
					this.setDataAtCell(6, col +2, getSum(hot,7).toString());
					
				}
			}
		}
		
	}

};
// 获取单元格内的数值，如果没有值，则默认0
function getRealDataAtCell(ihot, row, col) {
	if (ihot.getDataAtCell(row, col) === "") {
		return 0;
	} else if (ihot.getDataAtCell(row, col) === null) {
		return 0;
	} else if(ihot.getDataAtCell(row, col) === "— —"){
		return 0;
	}else{
		return parseFloat(ihot.getDataAtCell(row, col));
	}
};
// float 多项相加
function FloatMulAdd(add1, add2, add3, add4, add5, add6, add7, add8, add9) {
	var mid;
	mid = FloatAdd(add1, add2);
	mid = FloatAdd(mid, add3);
	mid = FloatAdd(mid, add4);
	mid = FloatAdd(mid, add5);
	mid = FloatAdd(mid, add6);
	mid = FloatAdd(mid, add7);
	mid = FloatAdd(mid, add8);
	mid = FloatAdd(mid, add9);
	return mid;
};
// 统计求和
function getSum(hot, col) {
	var sum;
	var add2 = getRealDataAtCell(hot, 7, col);
	var add4 = getRealDataAtCell(hot, 9, col);
	var add5 = getRealDataAtCell(hot, 10, col);
	var add11 = getRealDataAtCell(hot, 16, col);
	var add16 = getRealDataAtCell(hot, 21, col);
	var add18 = getRealDataAtCell(hot, 23, col);
	var add27 = getRealDataAtCell(hot, 32, col);
	var add28 = getRealDataAtCell(hot, 33, col);
	var add29 = getRealDataAtCell(hot, 34, col);
	sum = FloatMulAdd(add2, add4, add5, add11, add16, add18, add27, add28, add29);
	return sum;
};

function setData7_1(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	//目前不会有数据的两个格子
	hot.setDataAtCell(33, 2, "— —");
	hot.setDataAtCell(33, 5, "— —");
//	//取数接口待定 12.16
//	$.ajax({
//		url 	: ctx + "/interface/allFpsl.do",
//		type 	: "post",
//		async	: true,
//		data 	: {
//			"ystjgh" : selections[0].QX_BMID,
//			"sbqq" : selections[0].SK_SDATE,
//			"sbqz" : selections[0].SK_EDATE
//		},
//		dataType : "json",
//		success  : function(data){
//			//带出默认的数据
//			hot.setDataAtCell(7, 2, data.sl017);
//			hot.setDataAtCell(9, 2, data.sl013);
//			hot.setDataAtCell(10, 2, data.sl011);
//			hot.setDataAtCell(18, 2, data.sl005);
//			hot.setDataAtCell(20, 2, data.sl003);
//			hot.setDataAtCell(22, 2, data.sl0015);
//			//根据合计金额，计算出税额
//			//17%
//			var a = parseFloat(getRealDataAtCell(hot, 7, 4));
//			var b = FloatMul(a, 0.17);
//			hot.setDataAtCell(7, 5, b.toString());
//			
//			//13%
//			var a = parseFloat(getRealDataAtCell(hot, 9, 4));
//			var b = FloatMul(a, 0.13);
//			hot.setDataAtCell(9, 5, b.toString());
//			
//			//11%
//			var a = parseFloat(getRealDataAtCell(hot, 10, 4));
//			var b = FloatMul(a, 0.11);
//			hot.setDataAtCell(10, 5, b.toString());
//			
//			//5%
//			var a = parseFloat(getRealDataAtCell(hot, 18, 4));
//			var b = FloatMul(a, 0.05);
//			hot.setDataAtCell(18, 5, b.toString());
//			
//			//3%
//			var a = parseFloat(getRealDataAtCell(hot, 20, 4));
//			var b = FloatMul(a, 0.03);
//			hot.setDataAtCell(20, 5, b.toString());
//			
//			//1.5%
//			var a = parseFloat(getRealDataAtCell(hot, 22, 4));
//			var b = FloatMul(a, 0.015);
//			hot.setDataAtCell(22, 5, b.toString());
//			
//		},
//		error 	 : function(){
//			console.log("get data failed");
//		}
//	});
	callback("");
};
function cellCheck7_1(changes) {
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if(row > 5 && row < 33 && col >= 2 && col <= 7){
		if(!numberCheck(changes))
			return false;
	}else if(row === 33 && (col === 3 || col === 4 || col === 6 || col === 7)){
		if(!numberCheck(changes))
			return false;
	}else if(row === 34 && col >= 2 && col <= 7){
		if(!numberCheck(changes))
			return false;
	}
	return true;
};

/*
 * 台账表附表8_1配置
 * 
 */
function setRender8_1(row, col, prop) {

//	// if (row > 7 && row < 35 && (col === 3 || col === 6)) {
//	if (row >= 8 && (col === 4 || col === 8)) {
//		this.renderer = greenRender;
//	}
	if (row < 7) {
		this.renderer = boldRender;
	}
	// if (row > 7 && row < 35 && col < 2) {
	if (row > 6 && col < 2) {
		this.renderer = boldRender;
	}
	if(row==7 && col>=2 && col<=10){
		this.renderer = grayRender;
	}
	if(row>=8&&col>=2&&col<=10){
		if(col==2||col==3){
			this.renderer = purpleRender;
		}
		else if(col==4||col==8){
			this.renderer = greenRender;
		}
		else{
			this.renderer = grayRender;
		}
	}

};

function calculate8_1(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			// 合计
			if (col >= 2 && row >= 8 ) {
				temp = parseFloat(this.getDataAtCell(7, col));
				this.setDataAtCell(7, col, FloatAdd(temp, changeData).toString());
			}
			// 期初余额
			if (col === 2 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 6));
				this.setDataAtCell(row, 6, FloatAdd(temp, changeData).toString());
			}
			// 本期金额
			if (col === 3 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 5));
				this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
			}
			if (col === 4 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 5));
				this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
			}
			if (col === 5 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 6));
				this.setDataAtCell(row, 6, FloatAdd(temp, changeData).toString());
			}
			if (col === 6 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
				temp = parseFloat(this.getDataAtCell(row, 10));
				this.setDataAtCell(row, 10, FloatAdd(temp, changeData).toString());
			}
			if (col === 7 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 9));
				this.setDataAtCell(row, 9, FloatAdd(temp, changeData).toString());
			}
			if (col === 8 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 9));
				this.setDataAtCell(row, 9, FloatAdd(temp, changeData).toString());
			}
			if (col === 9 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 10));
				this.setDataAtCell(row, 10, FloatAdd(temp, -changeData).toString());
			}
		}
		
	}
};
function setData8_1(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	//新增的行增加样式
	var insertRows = hot.countRows()-8;
	for(var i=0;i<insertRows;i++){
		var row = i+8;
		//栏次居中
		hot.setCellMeta(row,0,'className','htCenter htMiddle');
		//栏次只读
		hot.setCellMeta(row,0,'readOnly',true);
		
		hot.setCellMeta(row,1,'editor','select');
		hot.setCellMeta(row,1,'selectOptions',['01129914-购置增值税税控系统专用设备抵减增值税', '01129924-已使用固定资产减征增值税']);
//		//其他格子只读
		for(var j=0;j<9;j++){
			hot.setCellMeta(row,j+2,'readOnly',true);
		}
		hot.setCellMeta(row,4,'readOnly',false);
		hot.setCellMeta(row,8,'readOnly',false);
	}
	hot.render();
	callback('');
};
function cellCheck8_1(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7 && col>=2 && col<=10) {
		if(!numberCheck(changes))
			return false;
	}
	//7<=0
	if(row >= 8&&col==8){
		if(Number(changes[0][3])>0){
			layer.msg("您的输入有误，第7列应小于零");
			return false;
		}
	}	
	if( (col==4 || col==8) && row>=8){
		if(   !insertAction && FloatAddEx(Number(changes[0][3]),Number(this.getDataAtCell(row,col-1)) )  <  0){
			layer.msg('合计值必须大于等于零');
			return false;
		}
	}
	return true;
};

/*
 * 台账表附表8_2配置
 * 
 */
function setRender8_2(row, col, prop) {
	if (row >= 10 && col == 6) {
		this.renderer = greenRender;
	}
	if (row < 7) {
		this.renderer = boldRender;
	}
	// if (row > 7 && row < 35 && col < 2) {
	if (row > 6 && col < 2) {
		this.renderer = boldRender;
	}
	if(row>=7&&col>=2&&col<=10){
		if(row==7)
			this.renderer = grayRender;	
		else if(col==2||col==5||col==9||col==10)
			this.renderer = purpleRender;
		else if(col==3||col==6)
			this.renderer = greenRender;
		else
			this.renderer = grayRender;	
	}
};

function calculate8_2(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(changeData=='NaN')
				changeData = 0;
			// 合计 不带第七列 第七列特殊处理
			if (col >= 2 && row >= 8 && row!=9 && col!=8) {
				temp = parseFloat(this.getDataAtCell(7, col));
				this.setDataAtCell(7, col, FloatAdd(temp, changeData).toString());
			}
			//合计的7=3-6
			if(row==7 && (col==4||col==7)){
				temp = parseFloat(this.getDataAtCell(7, 8));
				if(col==4)
					this.setDataAtCell(7, 8, FloatAdd(temp, changeData).toString());	
				if(col==7)
					this.setDataAtCell(7, 8, FloatAdd(temp, -changeData).toString());
			}
			if (col === 2 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			if (col === 3 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 4));
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
			}
			if (col === 4 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 8));
				this.setDataAtCell(row, 8, FloatAdd(temp, changeData).toString());
			}
			if (col === 5 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			if (col === 6 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 7));
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}
			if (col === 7 && row >= 8) {
				temp = parseFloat(this.getDataAtCell(row, 8));
				this.setDataAtCell(row, 8, FloatAdd(temp, -changeData).toString());
			}
		}
		
	}
};
function setData8_2(callback) {
	hot.setDataAtCell(2, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	//新增的行增加样式
	var insertRows = hot.countRows()-10;
	for(var i=0;i<insertRows;i++){
		var row = i+10;
		//栏次居中
		hot.setCellMeta(row,0,'className','htCenter htMiddle');
		//栏次只读
		hot.setCellMeta(row,0,'readOnly',true);
		
		hot.setCellMeta(row,1,'editor','select');
//		hot.setCellMeta(row,1,'selectOptions',['01081507-国债、地方政府债利息收入免征增值税优惠', '01083907-熊猫普制金币免征增值税优惠']);
		hot.setCellMeta(row, 1, 'selectOptions', ['01081507-国债、地方政府债利息收入免征增值税优惠', '01083907-熊猫普制金币免征增值税优惠','P1：国债利息','P2：地方债利息','R2：人民银行资金往来业务利息','R3：银行联行往来业务利息','R4：金融机构资金往来业务利息','B1：票据转贴现利息','质押式买入返售金融商品利息','政策性金融债利息' ]);

//		//其他格子只读
		for(var j=0;j<9;j++){
			hot.setCellMeta(row,j+2,'readOnly',true);
		}
		hot.setCellMeta(row,3,'readOnly',false);
		hot.setCellMeta(row,6,'readOnly',false);
	}
	hot.render();
	callback('');
};
function cellCheck8_2(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7) {
		if (col >= 2) {
			if(!numberCheck(changes))
				return false;
		}
	}
	if( row==8 && col==3){
		if(Number(changes[0][3])<Number(this.getDataAtCell(9,3))){
			layer.msg('出口免税金额必须大于跨境服务金额');
			return false;
		}
	}
	if( row==9 && col==3){
		if(Number(changes[0][3])>Number(this.getDataAtCell(8,3))){
			layer.msg('出口免税金额必须大于跨境服务金额');
			return false;
		}
	}
	if( col==3 && row>=8){
		if(   !insertAction && FloatAddEx(Number(changes[0][3]),Number(this.getDataAtCell(row,col-1)) )  <  Number(this.getDataAtCell(row,7))){
			layer.msg('第3列必须大于等于第6列');
			return false;
		}
		if(   !insertAction && FloatAddEx(Number(changes[0][3]),Number(this.getDataAtCell(row,col-1)) )  <  0){
			layer.msg('合计值必须大于等于零');
			return false;
		}
	}	
	if( col==6 && row>=8){
		if(  !insertAction &&  FloatAddEx(Number(changes[0][3]),Number(this.getDataAtCell(row,col-1)) )  >  Number(this.getDataAtCell(row,4))){
			layer.msg('第3列必须大于等于第6列');
			return false;
		}
		if(   !insertAction && FloatAddEx(Number(changes[0][3]),Number(this.getDataAtCell(row,col-1)) )  <  0){
			layer.msg('合计值必须大于等于零');
			return false;
		}
	}
	return true;
};

/*
 * 台账表附表9配置
 * 
 */
function setRender9_0(row, col, prop) {
	
	
	if (row == 3 && col <= 7) {
		this.renderer = blueRender;
	}
	if (row <= 2) {// || row == 4
		this.renderer = boldRender;
	}
	if(row > 4 && col == 8){
		this.renderer =  renderButtons;
	}
	if (row >4 && (col < 8 && col > 0)) {
		if(col != 3){
			this.renderer = greenRender;
		}
	}
	
	
};

function calculate9_0(change, source) {
	
	

};
function setData9_0(callback) {
	
		var insertRows = hot.countRows()-5;
		for(var i=0;i<insertRows;i++){
			var row = i+5;
			for(var j = 1;j<8;j++){
				hot.setCellMeta(row, j, 'className', 'htCenter htMiddle');
			}
			//栏次居中
			hot.setCellMeta(row,0,'className','htCenter htMiddle');
			//栏次只读
			hot.setCellMeta(row,0,'readOnly',true);
			hot.setCellMeta(row,3,'type','dropdown');//下拉框（可选）
			hot.setCellMeta(row,3,'source',['请选择',
			                                '6%征收率',
			                                '5%征收率的货物及加工修理修配劳务',
			                                '5%征收率的服务、不动产和无形资产',
			                                '4%征收率',
			                                '3%征收率的货物及加工修理修配劳务',
			                                '3%征收率的服务、不动产和无形资产',
			                                '17%税率的货物及加工修理修配劳务',
			                                '17%税率的服务、不动产和无形资产',
			                                '13%税率',
			                                '11%税率',
			                                '6%税率',
			                                '其他']);
			hot.setCellMeta(row, 3, 'allowInvalid',false);
			hot.setDataAtCell(row,3,hot.getSourceDataAtCell(row,3));
			/*if(status==1){
				hot.setCellMeta(row,3,'type','dropdown');//下拉框（可选）
				hot.setCellMeta(row,3,'source',['6%征收率',
				                                '5%征收率的货物及加工修理修配劳务',
				                                '5%征收率的服务、不动产和无形资产',
				                                '4%征收率',
				                                '3%征收率的货物及加工修理修配劳务',
				                                '3%征收率的服务、不动产和无形资产',
				                                '17%税率的货物及加工修理修配劳务',
				                                '17%税率的服务、不动产和无形资产',
				                                '13%税率',
				                                '11%税率',
				                                '6%税率',
				                                '其他']);
				
				hot.setDataAtCell(row,3,'6%征收率');
			}*/
	}
	hot.setDataAtCell(1, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(2, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	hot.render();
	callback('');
};
function cellCheck9_0(changes) {
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	
	
	if(row > 4 &&(col < 8 && col > 3)){
		
		if(!numberCheck(changes))
			return false;
		
		
		
		
	
	}
	

};

/*
 * 台账表附表9_1配置 其实是附表十
 * 
 */
function setRender9_1(row, col, prop) {
	if (col === 2) {
		if(row === 4 || row === 5 || row === 6 || row === 8){
			this.renderer = purpleRender;
		}
		if(row === 7 || row === 9 || row === 10){
			this.renderer = grayRender;
		}
	}
	if (row >= 4 && row <= 10 && (col === 3)) {
		this.renderer = greenRender;
	}
	if (row >= 4 && row <= 10 && (col === 4)) {
		this.renderer = grayRender;
	}
	if (row <= 3) {
		this.renderer = boldRender;
	}
	if (row >= 4 && row <= 10 && (col === 1)) {
		this.renderer = boldRender;
	}

};

function calculate9_1(change, source) {
	if (change) {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];

		var col2;
		var col3;
		var col4;
		
		var cell4 = 1;
		var cell5;
		var cell6;
		var cell7;
		var cell8;
		var cell9;
		var cell10;
		
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if (row < 11) {
				// 操作：取出金额后，重新计算合计值
				if (col === 2) {
					// 计算合计值 col4
					if(row === 7){
						// 计算合计值 col4,这个格子要计算百分数，特殊！！！
						//col2为百分数，要转换为小数
						var col2_per = hot.getDataAtCell(7, 2);
						if(col2_per === "0" || col2_per === "0.00"){
							var col2 = 0;
						}else{
							var col2 = parseFloat(col2_per.substring(0, col2_per.length));
						}
						col2 = FloatDivToFixed4(col2, 100);
						col3 = getRealDataAtCell(hot, row, col+1);
						col4 = FloatAddToFixed4(col2, col3);
						col4 = FloatMul(col4, 100).toString() + "%";
						this.setDataAtCell(row, col + 2, col4);
					}else{
						col2 = getRealDataAtCell(hot, row, col);
						col3 = getRealDataAtCell(hot, row, col + 1);
						col4 = FloatAdd(col2, col3);
						hot.setDataAtCell(row, col + 2, col4.toString());
					}
					
					//计算栏次4
					if(row === 5 || row === 6){
						if(getRealDataAtCell(hot, 6, 2) === 0){
							hot.setDataAtCell(7, 2, "0.00");
						}else{
							cell7 = FloatDivToFixed4(getRealDataAtCell(hot, 5, 2) , getRealDataAtCell(hot, 6, 2));
							hot.setDataAtCell(7, 2, FloatMul(cell7, 100).toString() + "%");
						}
					}
					
					//计算栏次6  42  82
					if(row === 4 || row === 8){
						var temp = getRealDataAtCell(hot, 4, 2) - getRealDataAtCell(hot, 8, 2);
						if(temp > 0){
							hot.setDataAtCell(9, 2, getRealDataAtCell(hot, 8, 2).toString());
						}else{
							hot.setDataAtCell(9, 2, getRealDataAtCell(hot, 4, 2).toString());
						}
					}
					
					//计算栏次7
					if(row === 4 || row ===9){
						var temp = getRealDataAtCell(hot, 4, 2) - getRealDataAtCell(hot, 9, 2);
						hot.setDataAtCell(10, 2, temp.toString());
					}
					
					
				}
				// 操作：手工调整之后，重新计算合计值
				if (col === 3) {
					if(row === 7){
						// 计算合计值 col4,这个格子要计算百分数，特殊！！！
						//col2为百分数，要转换为小数
						var col2_per = hot.getDataAtCell(7, 2);
						if(col2_per === "0" || col2_per === "0.00"){
							var col2 = 0;
						}else{
							var col2 = parseFloat(col2_per.substring(0, col2_per.length));
						}
						col2 = FloatDivToFixed4(col2, 100);
						col3 = getRealDataAtCell(hot, row, col);
						col4 = FloatAddToFixed4(col2, col3);
						col4 = FloatMul(col4, 100).toString() + "%";
						this.setDataAtCell(row, col + 1, col4);
					}else{
						// 计算合计值 col4
						col2 = getRealDataAtCell(hot, row, col - 1);
						col3 = getRealDataAtCell(hot, row, col);
						col4 = FloatAdd(col2, col3);
						this.setDataAtCell(row, col + 1, col4.toString());
					}
				}
				

			}
			
		}
		

	}
};

function setData9_1(callback) {
	hot.setDataAtCell(1, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(2, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	
	var sb_main_19_18;
	var sb_main_26_18;
	var sb_main_21_19;//主表13栏本年累计列
	
	var fb1_10_1;
	var fb1_10_3;
	var fb1_10_6;
	var fb1_14_2;
	var fb1_14_4;
	var fb1_14_5;
	var fb1_14_7;
	
	var count = 0;
	
	function doSomething(){
		if(count === 2){
			//初期留底税额 赋值
			hot.setDataAtCell(4, 2, "0");
			
			//为  一般货物销项税额  赋值
			var temp_sample;
			temp_sample = FloatAdd(fb1_10_1, fb1_10_3);
			temp_sample = FloatAdd(temp_sample, -fb1_10_6);
			hot.setDataAtCell(5, 2, temp_sample.toString());
			
			//为 全部销项税额 赋值
			//附表一（第10列第1、3行之和－第10列第6行）＋（第14列第2、4、5行之和－第14列第7行）
			var temp_all;
			temp_all = FloatAddEx(fb1_14_2, fb1_14_4, fb1_14_5, -fb1_14_7);
			temp_all = FloatAdd(temp_sample, temp_all);
			hot.setDataAtCell(6, 2, temp_all.toString());  //栏次3  金额值
			
			//栏次5  金额值
			//取主表（第11栏“销项税额”“一般项目”列“本月数”-第18栏“实际抵扣税额”“一般项目”列“本月数”）*4栏占比
			
				var temp = FloatAdd(parseFloat(sb_main_19_18), -parseFloat(sb_main_26_18));
				temp = FloatMul(temp, 4);
				hot.setDataAtCell(8, 2, temp.toString());
			
			
			callback("");
		}
	};
	
	//跨表取数取附表一 fb1
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId : "1",
			applyId : selections[0].APPLY_ID
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				
				fb1_10_1 =  tableData[7][13];
				fb1_10_3 =  tableData[9][13];
				fb1_10_6 =  tableData[12][13];
				fb1_14_2 =  tableData[8][17];
				fb1_14_4 =  tableData[10][17];
				fb1_14_5 =  tableData[11][17];
				fb1_14_7 =  tableData[13][17];
			}
			count++;
			doSomething();
			
	},
	error : function() {
		layer.msg("获取附表一数值失败");
	}
	});
	
	//跨表取数取主表   可能涉及到不同期的，暂不确定
	
	/*tableId: "3_1",  //表ID
	taxDateId : taxDateId,//上一期的税期号
	nsrsbhId: nsrsbhId  //纳税人识别号
*/	
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId : "0",
			applyId : selections[0].APPLY_ID
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				sb_main_19_18 = tableData[19][18];
				sb_main_26_18 = tableData[26][18];
			}
			count++;
			doSomething();
			
	},
	error : function() {
		layer.msg("获取主表数值失败");
	}
	});

};
function cellCheck9_1(changes) {
	// 定义变量
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 4) {
		if(col == 2 && row != 7){
			if(!numberCheck(changes))
				return false;
		}
		if (col == 3) {
			if(!numberCheck(changes))
				return false;
		}
		if(col == 4 && row != 7){
			if(!numberCheck(changes))
				return false;
		}
	}

};

/*
 * 台账表附表9_2表 11配置
 * 
 */
function setRender9_2(row, col, prop) {
	if(row===8 && col>=3){
		this.renderer = grayRender;
	}
	if(row>=9){
		
		if(col===4 || col===5|| col===7 || col===8 ||
			col===12 || col===14 || col===15 || col===16){
			this.renderer = grayRender;
		}
		if(col===10|| col===3|| col===6 || col===9 || col===11){ 
			this.renderer = purpleRender;
		}
		if( col===13){
			this.renderer = greenRender;			
		}
	}
	
	if (row <= 7) {
		this.renderer = boldRender;
	}
	if (row >= 8 && (col === 0)) {
		this.renderer = boldRender;
	}

};

function calculate9_2(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			if(row>=9){
				
				 //合计
				 if(col>=3 ){ 
					    if(changeData=='NaN'){
					    	changeData=0;
					    	
					    }
						temp = parseFloat(this.getDataAtCell(8,col));				
						this.setDataAtCell(8, col, FloatAdd(temp, changeData).toString());	
				
				}
				 
				if(col===1){
					temp3 = parseFloat(this.getDataAtCell(row,3));
					temp = parseFloat(this.getDataAtCell(row,1));
					this.setDataAtCell(row, 4, FloatMul(temp,temp3).toString());
					
				}
				if(col===1){
					temp = parseFloat(this.getDataAtCell(row,7));
					temp1 = parseFloat(this.getDataAtCell(row,1));
					var tep=	FloatMul(temp1,0.01);
					var tep=	FloatAdd(tep,1);
					var tep=    FloatDiv(temp, tep);
					var tep=	FloatMul(tep,FloatMul(temp1,0.01));
					this.setDataAtCell(row, 8, tep.toString());
				}
				if( col===2){
					temp = parseFloat(this.getDataAtCell(row,15));
					temp2=parseFloat(this.getDataAtCell(row,2));
					temp2=FloatMul(0.01,temp2);
					//temp2=temp2.substring(0,temp.length-1); 
					this.setDataAtCell(row, 16, FloatMul(temp, temp2).toString());
					
				}
				if(col===3 ){
					temp = parseFloat(this.getDataAtCell(row,3));
					temp1 = parseFloat(this.getDataAtCell(row,1));
					temp1=FloatMul(0.01,temp1);
					this.setDataAtCell(row, 4, FloatMul(temp,temp1).toString());				
				}
				if( col===3){
					temp = parseFloat(this.getDataAtCell(row,5));
					this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
				}
				if(col===4 ){
					temp = parseFloat(this.getDataAtCell(row,5));
					this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
				}
				if(col===5 ){
					temp = parseFloat(this.getDataAtCell(row,7));
					this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
				}
				if(col===5 ){
					temp = parseFloat(this.getDataAtCell(row,15));
					this.setDataAtCell(row, 15, FloatAdd(temp, changeData).toString());
				}
				/*if(col===5 || col===12){
					col5 = parseFloat(this.getDataAtCell(row,5));
					col12 = parseFloat(this.getDataAtCell(row,12));
					if(col5-col12>0){
						this.setDataAtCell(row, 13, col12.toString());
					}else{
						this.setDataAtCell(row, 13, col5.toString());
					}
				}*/
				if( col===6){
					temp = parseFloat(this.getDataAtCell(row,7));
					this.setDataAtCell(row, 7, FloatAdd(temp, -changeData).toString());
				}
				//销项(应纳)税额
				if(col===7 ){
					temp = parseFloat(this.getDataAtCell(row,7));
					temp1 = parseFloat(this.getDataAtCell(row,1));
					var tep=	FloatMul(temp1,0.01);
					var tep=	FloatAdd(tep,1);
					var tep=    FloatDiv(temp, tep);
					var tep=	FloatMul(tep,FloatMul(temp1,0.01));
					this.setDataAtCell(row, 8, tep.toString());
				}
				if(col===10 ){
					temp = parseFloat(this.getDataAtCell(row,12));
					this.setDataAtCell(row, 12, FloatAdd(temp, changeData).toString());
				}
				if( col===11){
					temp = parseFloat(this.getDataAtCell(row,12));
					this.setDataAtCell(row, 12, FloatAdd(temp, changeData).toString());
				}
				if(col===12 ){
					temp = parseFloat(this.getDataAtCell(row,14));
					this.setDataAtCell(row, 14, FloatAdd(temp, changeData).toString());
				}
				if(col===13){
					temp = parseFloat(this.getDataAtCell(row,14));
					this.setDataAtCell(row, 14, FloatAdd(temp, -changeData).toString());
				}
				
				if(col===13){
					temp = parseFloat(this.getDataAtCell(row,15));
					this.setDataAtCell(row, 15, FloatAdd(temp, -changeData).toString());
				}
				if(col===15){
					temp2 = parseFloat(this.getDataAtCell(row,2));
					temp2=FloatMul(0.01,temp2);
					temp15 = parseFloat(this.getDataAtCell(row,15));
					this.setDataAtCell(row, 16, FloatMul(temp2, temp15).toString());
				}
				
			}
		}
		

	
	}
};

function setData9_2(callback) {
	var insertRows = hot.countRows()-15;
	for(var i=0;i<insertRows;i++){
		var row = i+15;
	for(var j=0;j<13;j++){
		hot.setCellMeta(row,j+4,'readOnly',true);
		
	}
	hot.setCellMeta(row,2,'readOnly',true);
	hot.setCellMeta(row,0,'readOnly',true);
	hot.setCellMeta(row,6,'readOnly',false);
	hot.setCellMeta(row,9,'readOnly',false);
	hot.setCellMeta(row,11,'readOnly',false);
	hot.setCellMeta(row,13,'0');
	hot.setCellMeta(row,13,'readOnly',false);
	hot.render();
	}
	//跨表取数取上一期的数据	
	var count=0;
	var taxDateId= selections[0].TAXDATEID-1;
	var nsrsbhId= selections[0].NSRSBH_ID;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "9_2",  //表ID
			taxDateId : taxDateId,//上一期的税期号
			nsrsbhId: nsrsbhId  //纳税人识别号
		
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				var arr = JSON.parse(data);
				var data_1 = JSON.parse(arr[0].afwtHandson);
				if (selections[0].TAXDATEID > 1) {
					hot.setDataAtCell(9, 10,data_1[9][14]);
					hot.setDataAtCell(10, 10,data_1[10][14]);
					hot.setDataAtCell(11,10,data_1[11][14]);
					hot.setDataAtCell(12, 10,data_1[12][14]);
					hot.setDataAtCell(13, 10,data_1[13][14]);
					hot.setDataAtCell(14, 10,data_1[14][14]);
				}
			}
			
			
		}
		
	});
	
	
	
	
	var a96_1,a96_2,a96_3;
	var b96_1,b96_2,b96_3;
	var c96_1,c96_2,c96_3;
	// 跨表取数取1_1表 开具专用发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//贷款服务
					a96_1=tableData[24][4];
					//直接收费金融服务
					 a96_2=tableData[27][4];                  
					//金融商品转让
					a96_3=tableData[30][4];
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取1_2表 开具专用发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//贷款服务
					b96_1=tableData[24][4];
					//直接收费金融服务
					 b96_2=tableData[27][4];                  
					//金融商品转让
					b96_3=tableData[30][4];
					
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取1_3表 开具专用发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_3'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){					
					//金融商品转让
					c96_3=tableData[13][5];
					
				}
			}
			count++;
			doSomething();
		}
	});
	function doSomething(){
		
		if(count===3){
			col93 = FloatAdd(parseFloat(a96_1), parseFloat(b96_1));
			if(col93=='NaN'){
				hot.setDataAtCell(9, 3,'0');
			}else{
				hot.setDataAtCell(9, 3, col93.toString());
			}	
			col103 = FloatAdd(parseFloat(a96_2), parseFloat(b96_2));
			if(col103=='NaN'){
				hot.setDataAtCell(10, 3,'0');
			}else{
				hot.setDataAtCell(10, 3, col103.toString());
			}	
			
			col113 = FloatAdd(parseFloat(a96_3), parseFloat(b96_3));
			col113 = FloatAdd(col113, parseFloat(c96_3));
			if(col113=='NaN'){
				hot.setDataAtCell(11, 3,'0');
			}else{
				hot.setDataAtCell(11, 3, col113.toString());
			}	
			callback("");
		}
	}
	hot.setDataAtCell(2, 0, "纳税主体:" + selections[0].NS_NAME);
	hot.setDataAtCell(3, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "

			+ selections[0].SK_EDATE);
};
function cellCheck9_2(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 8) {
		//if (col === 1 ||  col===2) {
		//	if(!numberCheck(changes[0][3]))
		//		return false;
		//}
		if(col>=3){
		
		if(!numberCheck(changes))
				return false;
		}
	}
	//11<=3&&11<=10
	if(row >= 8&& col==13){
		
		if(Number(changes[0][3])>Number(this.getDataAtCell(row,5)) || Number(changes[0][3])>Number(this.getDataAtCell(row,12))){
			layer.msg("您的输入有误，本列应小于等于第三列和第十列");
			return false;
		}		
	}
	return true;

};

/*
 * 台账表附表9_3配置
 * 
 */
function setRender9_3(row, col, prop) {

	if (row <= 6) {
		this.renderer = boldRender;
	}

};

function calculate9_3(change, source) {
	if(change){
		var row = change[0][0];
		var col = change[0][1];
		if(change[0][2]!=change[0][3]){
			$("#bb_tab a").attr("href","#bb3");
			//根据计税方法来改变预征率
			if(col === 6){
				if(hot.getDataAtCell(row, col) === "是"){
					hot.setDataAtCell(row, col + 2, "3%");
				}else if(hot.getDataAtCell(row, col) === "否"){
					hot.setDataAtCell(row, col + 2, "5%");
				}
			}
			
			//根据计税方法来改变预征税额
			if(col === 6){
				if(hot.getDataAtCell(row, col) === "是"){
					//8列/(1+11%)*3% 
					var cell7 = parseFloat(getRealDataAtCell(hot, row, col + 1));
					var a = FloatDiv(cell7, 1.11);
					var cell9 = FloatMul(a, 0.03);
					hot.setDataAtCell(row, col + 3, cell9.toString());
				}else if(hot.getDataAtCell(row, col) === "否"){
					//8列/(1+5%)*5%
					var cell7 = parseFloat(getRealDataAtCell(hot, row, col + 1));
					var a = FloatDiv(cell7, 1.05);
					var cell9 = FloatMul(a, 0.05);
					hot.setDataAtCell(row, col + 3, cell9.toString());
				}
			}
			
			if(col === 7){
				if(hot.getDataAtCell(row, col - 1) === "是"){
					//8列/(1+11%)*3% 
					var cell7 = parseFloat(getRealDataAtCell(hot, row, col));
					var a = FloatDiv(cell7, 1.11);
					var cell9 = FloatMul(a, 0.03);
					hot.setDataAtCell(row, col + 2, cell9.toString());
				}else if(hot.getDataAtCell(row, col - 1) === "否"){
					//8列/(1+5%)*5%
					var cell7 = parseFloat(getRealDataAtCell(hot, row, col));
					var a = FloatDiv(cell7, 1.05);
					var cell9 = FloatMul(a, 0.05);
					hot.setDataAtCell(row, col + 2, cell9.toString());
				}
			}
		}
		
		
	}

};
function setData9_3(callback) {
	hot.setDataAtCell(4, 0, "纳税主体:" + pvt_person);
	hot.setDataAtCell(5, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	
	callback("");
};
function cellCheck9_3() {

};

/*
 * 台账表附表9_4配置
 * 
 */
function setRender9_4(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if (row === 8) {
		this.renderer = boldRender;
	}

};

function calculate9_4(change, source) {
	
};
function setData9_4(callback) {

	hot.setDataAtCell(2, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	callback("");
};
function cellCheck9_4() {

};

/**
 * 申报表0
 */
function setRender0(row, col, prop) {

	if(row >= 9 && row<=46 && col>=33 && col<=38){
		this.renderer = grayRender;
	}
	if(row >= 9 && row<=46 && col>=18 && col<=26){
		this.renderer = purpleRender;
	}
	if((row < 9 || row > 46 ) || (row>=9 && row<=46 && col<18)){
		this.renderer = boldRender;
	}
	

};

function calculate0(change, source) {
	if(change&&source!='loadData'){
		
		var row = change[0][0];
		var col = change[0][1];
		
		
	}
	
	
};
function setData0(callback) {

	var count = 0;
	function doSomething() {
		
				if(count==7){
					
					//表头相关信息
					//税款所属时间
					hot.setDataAtCell(3,0,"税款所属时间: "+$("#begindates").val()+" 至 "+$("#enddates").val());
					//填表日期
					hot.setDataAtCell(3,16,"填表时间: "+ssbb_systemTime.substring(0,11),'loadData');
					//纳税人识别号
					for(var a = 0,b = 4;a<$("#nsrsbhIds").val().length,b<24;a++,b++){
						hot.setDataAtCell(4,b,$("#nsrsbhIds").val().substring(a,a+1));
					}
					
					//所属行业
					hot.setDataAtCell(4,25,"所属行业: "+mainHeader_sshy,'loadData');
					//纳税人名称
					hot.setDataAtCell(5,4,mainHeader_nsrmc+"(公章)",'loadData');
					//法定代表人姓名
					hot.setDataAtCell(5,18,mainHeader_frmc,'loadData');
					//注册地址
					hot.setDataAtCell(5,25,mainHeader_zcdz,'loadData');
					//生产经营地址
					hot.setDataAtCell(5,37,mainHeader_scjydz,'loadData');
					//开户银行及账号
					hot.setDataAtCell(6,4,mainHeader_khyhzh,'loadData');
					//登记注册类型
					//hot.setDataAtCell(6,21,mainHeader_djzclx,'loadData');
					//电话号码
					hot.setDataAtCell(6,34,mainHeader_dhhm,'loadData');
					
					//一般项目-本年累计-本年度内的每月数之和
					//1.按适用税率计税销售额-本月数
					hot.setDataAtCell(9,18,FloatAddEx(s1m7,s1m8,s1m9,s1m10,s1m11,s1m12,s1m13),'loadData');
					
					//2.应税货物销售额-本月数
					
					hot.setDataAtCell(10,18,FloatAddEx(s1m7,s1m8,s1m9,s1m10,s1m11,s1m12,s1m13),'loadData');
					//3.应税劳务销售额-本月数(待定，需求文档不同，暂时按照需求的来)
					hot.setDataAtCell(11,18,0,'loadData');
					//4.纳税检查调整的销售额-本月数（待定）
					hot.setDataAtCell(12,18,FloatAddEx(s1k7,s1k8,s1k9,s1k10,s1k11));
					//5.按简易办法计税销售额-本月数（待定）
					hot.setDataAtCell(13,18,FloatAddEx(s1m14,s1m15,s1m16,s1m17,s1m18,s1m19,s1m20,s1m21,-s1m23,-s1m24,data_6zsl,
							data_5zsl_xplw,data_5zsl_wxzc,data_4zsl,data_3zsl_xplw,data_3zsl_wxzc),'loadData');
					//6.纳税检查调整的销售额(待定)
					hot.setDataAtCell(14,18,FloatAddEx(data_6zsl,data_5zsl_xplw,data_5zsl_wxzc,data_4zsl,data_3zsl_xplw,data_3zsl_wxzc));
					//7.免、抵、退办法出口销售额
					//hot.setDataAtCell(15,18,FloatAddEx(s1q12,s1q13));
					//8.免税销售额
					hot.setDataAtCell(16,18,FloatAddEx(s1m27,s1m28),'loadData');
					//9.免税货物销售额
					//hot.setDataAtCell(17,18,0,'loadData');
					//10.免税劳务销售额
					//hot.setDataAtCell(18,18,0,'loadData');
					//11.销项税额
					hot.setDataAtCell(19,18,FloatAddEx(s1n7,s1n9,-s1n12,s1r8,s1r10,s1r11,-s1r13),'loadData');
					//12.进项税额
					hot.setDataAtCell(20,18,s2d18,'loadData');
					//13.上期留抵税额
					hot.setDataAtCell(21,18,s1s28_before,'loadData');
					//14进项税额转出额
					hot.setDataAtCell(22,18,s2d21,'loadData');
					//15.免、抵、退应退税额(招行不涉及)
					//16.按适用税率计算的纳税检查应补缴税额
					hot.setDataAtCell(24,18,FloatAddEx(data_xplw_xx,data_xplw_jx,data_wxzc_xx,data_wxzc_jx,data_13sl_xx,data_13sl_jx,data_11sl_xx,data_11sl_jx,data_6sl_xx,data_6sl_jx),'loadData');
					//17.应抵扣税额合计
					hot.setDataAtCell(25,18,FloatAddEx(hot.getDataAtCell(20,18),hot.getDataAtCell(21,18),-(hot.getDataAtCell(22,18)),-(hot.getDataAtCell(23,18)),hot.getDataAtCell(24,18)),'loadData');
					//18.实际抵扣税额
					var a11 = hot.getDataAtCell(19,18);
					var a17 = hot.getDataAtCell(25,18);
					if(parseFloat(a11)>parseFloat(a17)){
						hot.setDataAtCell(26,18,a17,'loadData');
					}else{
						hot.setDataAtCell(26,18,a11);
					}
					//19.应纳税额
					hot.setDataAtCell(27,18,FloatAddEx(hot.getDataAtCell(19,18),-(hot.getDataAtCell(26,18)),-(hot.getDataAtCell(26,18))),'loadData');
					//20.期末留抵税额
					hot.setDataAtCell(28,18,FloatAddEx(hot.getDataAtCell(25,18),-(hot.getDataAtCell(26,18))),'loadData');
					//21.简易计税办法计算的应纳税额
					hot.setDataAtCell(29,18,FloatAddEx(s1n14,s1n15,s1n17,s1n18,-s1n23,s1r16,s1r19,s1r20,s1r21,-s1r24),'loadData');
					//22.按简易计税办法计算的纳税检查应补缴税额
					hot.setDataAtCell(30,18,FloatAddEx(data_6zsl_xx,data_5zsl_xplw_xx,data_5zsl_wxzc_xx,data_4zsl_xx,data_3zsl_xplw_xx,data_3zsl_wxzc_xx,
							data_6zsl_jx,data_5zsl_xplw_jx,data_5zsl_wxzc_jx,data_4zsl_jx,data_3zsl_xplw_jx,data_3zsl_wxzc_jx));
					//23.应纳税额减征额
					hot.setDataAtCell(31,18,s2f6);
					var a1 = parseFloat(hot.getDataAtCell(27,18));
					var a2 = parseFloat(hot.getDataAtCell(29,18));
					var a3 = parseFloat(hot.getDataAtCell(31,18));
					var a4 = FloatAddEx(a1,a2);
					if(a3>a4){
						hot.setDataAtCell(31,18,a4);
					}
					
					//24应纳税额合计(写不了，上面那栏取不出来)
					hot.setDataAtCell(32,18,FloatAddEx(hot.getDataAtCell(27,18),hot.getDataAtCell(29,18),-(hot.getDataAtCell(31,18))).toString());
					//25.期末未缴税额（多缴为负数）
					hot.setDataAtCell(33,18,s1s40_before);
					//26.(招行无此业务)
					
					//28.分次预缴税额
					hot.setDataAtCell(36,18,FloatAddEx(s4f8,s4f9,s4f10,s4f11));
					//27.本期已缴税额
					hot.setDataAtCell(35,18,FloatAddEx(hot.getDataAtCell(36,18),hot.getDataAtCell(37,18),hot.getDataAtCell(38,18),hot.getDataAtCell(39,18)),'loadData');
					//29.出口开具专用缴款书预缴税额
					//30.本期缴纳上期应纳税额
					//31.本期缴纳欠缴税额
					//32.期末未缴税额（多缴为负数）
					hot.setDataAtCell(40,18,FloatAddEx((hot.getDataAtCell(32,18)),(hot.getDataAtCell(33,18)),(hot.getDataAtCell(34,18)),-(hot.getDataAtCell(35,18))));
					//33.其中：欠缴税额（≥0）
					hot.setDataAtCell(41,18,FloatAddEx((hot.getDataAtCell(33,18)),(hot.getDataAtCell(34,18)),-(hot.getDataAtCell(35,18))));
					//34.本期应补(退)税额
					hot.setDataAtCell(42,18,FloatAddEx(hot.getDataAtCell(32,18),-(hot.getDataAtCell(36,18)),-(hot.getDataAtCell(37,18))).toString());
					//35.招行无此业务
					//36.期初未缴查补税额
					hot.setDataAtCell(44,18,s1s46_before);
					//37.本期入库查补税额
					hot.setDataAtCell(45,18,cbse_all);
					//38.期末未缴查补税额
					hot.setDataAtCell(46,18,FloatAddEx(hot.getDataAtCell(24,18),hot.getDataAtCell(30,18),hot.getDataAtCell(44,18),-(hot.getDataAtCell(45,18))).toString());
					hot.setDataAtCell(9,26,FloatAddEx(hot.getDataAtCell(9,18),z9_1));
					hot.setDataAtCell(10,26,FloatAddEx(hot.getDataAtCell(10,18),z10_1));
					hot.setDataAtCell(11,26,FloatAddEx(hot.getDataAtCell(11,18),z11_1));
					hot.setDataAtCell(12,26,FloatAddEx(hot.getDataAtCell(12,18),z12_1));
					hot.setDataAtCell(13,26,FloatAddEx(hot.getDataAtCell(13,18),z13_1));
					hot.setDataAtCell(14,26,FloatAddEx(hot.getDataAtCell(14,18),z14_1));
					hot.setDataAtCell(15,26,FloatAddEx(hot.getDataAtCell(15,18),z15_1));
					hot.setDataAtCell(16,26,FloatAddEx(hot.getDataAtCell(16,18),z16_1));
					hot.setDataAtCell(17,26,FloatAddEx(hot.getDataAtCell(17,18),z17_1));
					hot.setDataAtCell(18,26,FloatAddEx(hot.getDataAtCell(18,18),z18_1));
					hot.setDataAtCell(19,26,FloatAddEx(hot.getDataAtCell(19,18),z19_1));
					hot.setDataAtCell(20,26,FloatAddEx(hot.getDataAtCell(20,18),z20_1));
					hot.setDataAtCell(21,26,FloatAddEx(hot.getDataAtCell(21,18),z21_1));
					hot.setDataAtCell(22,26,FloatAddEx(hot.getDataAtCell(22,18),z22_1));
					hot.setDataAtCell(23,26,FloatAddEx(hot.getDataAtCell(23,18),z23_1));
					hot.setDataAtCell(24,26,FloatAddEx(hot.getDataAtCell(24,18),z24_1));
					hot.setDataAtCell(25,26,FloatAddEx(hot.getDataAtCell(25,18),z25_1));
					hot.setDataAtCell(26,26,FloatAddEx(hot.getDataAtCell(26,18),z26_1));
					hot.setDataAtCell(27,26,FloatAddEx(hot.getDataAtCell(27,18),z27_1));
					hot.setDataAtCell(28,26,FloatAddEx(hot.getDataAtCell(28,18),z28_1));
					hot.setDataAtCell(29,26,FloatAddEx(hot.getDataAtCell(29,18),z29_1));
					hot.setDataAtCell(30,26,FloatAddEx(hot.getDataAtCell(30,18),z30_1));
					hot.setDataAtCell(31,26,FloatAddEx(hot.getDataAtCell(31,18),z31_1));
					hot.setDataAtCell(32,26,FloatAddEx(hot.getDataAtCell(32,18),z32_1));
					hot.setDataAtCell(33,26,s1m40_last);
					hot.setDataAtCell(34,26,FloatAddEx(hot.getDataAtCell(34,18),z34_1));
					hot.setDataAtCell(35,26,FloatAddEx(hot.getDataAtCell(35,18),z35_1));
					hot.setDataAtCell(36,26,0.00);
					hot.setDataAtCell(37,26,0.00);
					hot.setDataAtCell(38,26,FloatAddEx(hot.getDataAtCell(38,18),z38_1));
					hot.setDataAtCell(39,26,FloatAddEx(hot.getDataAtCell(39,18),z39_1));
					hot.setDataAtCell(40,26,hot.getDataAtCell(40,18));
					hot.setDataAtCell(41,26,0);
					hot.setDataAtCell(42,26,0);
					hot.setDataAtCell(43,26,0);
					hot.setDataAtCell(44,26,s1m46_last);
					hot.setDataAtCell(45,26,FloatAddEx(hot.getDataAtCell(45,18),z45_1));
					hot.setDataAtCell(46,26,FloatAddEx(hot.getDataAtCell(46,18),z46_1));
					
					callback('');
				}
		
		
	}
	
	//1.取期数
	var z9_1 = 0;  var z10_1 = 0; var z11_1 = 0;
	 var z12_1 = 0;  var z13_1 = 0;
	var z14_1 = 0;  var z15_1 = 0;  var z16_1 = 0;  var z17_1 = 0; var z18_1 = 0; 
	var z19_1 = 0; var z20_1 = 0; var z21_1 = 0; var z22_1 = 0; var z23_1 = 0;  var z24_1 = 0;
	var z25_1 = 0; var z26_1 = 0; var z27_1 = 0; var z28_1 = 0; 
	var z29_1 = 0; var z30_1 = 0;  var z31_1 = 0;
	 var z32_1 = 0; var z33_1 = 0; var z34_1 = 0; var z35_1 = 0;
	 var z36_1 = 0; var z37_1 = 0; var z38_1 = 0; var z39_1 = 0;
	 var z40_1 = 0;var z41_1 = 0;var z42_1 = 0;var z43_1 = 0;var z44_1 = 0;
	 var z45_1 = 0; var z46_1 = 0;
	 var dataNumber = 0;var s1m46_last = 0;var s1m40_last = 0;
	 var b = 1;var s1s40_before = 0;var s1s46_before = 0; var s1s28_before = 0;
	 var sk = (parseInt(selections[0].SK_SDATE.substring(0,4))-1).toString();
	 
	 
	$.ajax({
		url : ctx + "/interface/getTaxdId.do ",
		type : "post",
		async : true,
		data : {
			qxBmId  : selections[0].QX_BMID,
			skSdate : selections[0].SK_SDATE.substring(0,10),
			skSdate_end : selections[0].SK_EDATE.substring(0,10),
			skEdate : (parseInt(selections[0].SK_SDATE.substring(0,4))-1).toString()
		},
		dataType : "json",
		success : function(data) {
			console.log(JSON.parse(data));
			dataNumber = JSON.parse(data).length
			console.log(dataNumber);
			console.log(selections[0].TAXDATEID);
			if(dataNumber>1){
				for(var a = 0;a<dataNumber-1;a++){
					console.log("----------------------");
					$.ajax( {
						url : ctx + "/interface/selectAfwtHandson.do",
						type : "post",
						async : false,
						data : {
							nsrsbhId : selections[0].NSRSBH_ID,
							tableId : '0',
							taxDateId : selections[0].TAXDATEID - b
						},
						dataType : "json",
						success : function(data) {
							
							if (data != "[]") {
								console.log("进入循环");
								console.log(selections[0].TAXDATEID - b);
								var temp = JSON.parse(data);
								var tableData = JSON.parse(temp[0].afwtHandson);
								z9_1 = FloatAddEx(z9_1,tableData[9][18]);
								z10_1 = FloatAddEx(z10_1,tableData[10][18]);
								z11_1 = FloatAddEx(z11_1,tableData[11][18]);
								z12_1 = FloatAddEx(z12_1,tableData[12][18]);
								z13_1 = FloatAddEx(z13_1,tableData[13][18]);
								z14_1 = FloatAddEx(z14_1,tableData[14][18]);
								z15_1 = FloatAddEx(z15_1,tableData[15][18]);
								z16_1 = FloatAddEx(z16_1,tableData[16][18]);
								z17_1 = FloatAddEx(z17_1,tableData[17][18]);
								z18_1 = FloatAddEx(z18_1,tableData[18][18]);
								z19_1 = FloatAddEx(z19_1,tableData[19][18]);
								z20_1 = FloatAddEx(z20_1,tableData[20][18]);
								z21_1 = FloatAddEx(z21_1,tableData[21][18]);
								z22_1 = FloatAddEx(z22_1,tableData[22][18]);
								z23_1 = FloatAddEx(z23_1,tableData[23][18]);
								z24_1 = FloatAddEx(z24_1,tableData[24][18]);
								z25_1 = FloatAddEx(z25_1,tableData[25][18]);
								z26_1 = FloatAddEx(z26_1,tableData[26][18]);
								z27_1 = FloatAddEx(z27_1,tableData[27][18]);
								z28_1 = FloatAddEx(z28_1,tableData[28][18]);
								z29_1 = FloatAddEx(z29_1,tableData[29][18]);
								z30_1 = FloatAddEx(z30_1,tableData[30][18]);
								z31_1 = FloatAddEx(z31_1,tableData[31][18]);
								z32_1 = FloatAddEx(z32_1,tableData[32][18]);
								z33_1 = FloatAddEx(z33_1,tableData[33][18]);
								z34_1 = FloatAddEx(z34_1,tableData[34][18]);
								z35_1 = FloatAddEx(z35_1,tableData[35][18]);
								z36_1 = FloatAddEx(z36_1,tableData[36][18]);
								z37_1 = FloatAddEx(z37_1,tableData[37][18]);
								z38_1 = FloatAddEx(z38_1,tableData[38][18]);
								z39_1 = FloatAddEx(z39_1,tableData[39][18]);
								z40_1 = FloatAddEx(z40_1,tableData[40][18]);
								z41_1 = FloatAddEx(z41_1,tableData[41][18]);
								z42_1 = FloatAddEx(z42_1,tableData[42][18]);
								z43_1 = FloatAddEx(z43_1,tableData[43][18]);
								z44_1 = FloatAddEx(z44_1,tableData[46][18]);
								z45_1 = FloatAddEx(z45_1,tableData[45][18]);
								z46_1 = FloatAddEx(z46_1,tableData[46][18]);
							}
						
						}
					});
					b++;
				}
				
				
				$.ajax( {
					url : ctx + "/interface/selectAfwtHandson.do",
					type : "post",
					async : false,
					data : {
						nsrsbhId : selections[0].NSRSBH_ID,
						tableId : '0',
						taxDateId : selections[0].TAXDATEID - 1
					},
					dataType : "json",
					success : function(data) {
						
						if (data != "[]") {
							var temp = JSON.parse(data);
							var tableData = JSON.parse(temp[0].afwtHandson);
							s1s28_before = tableData[28][18];
							s1s40_before = tableData[40][18]; 
							s1s46_before = tableData[46][18];
						}
					
					}
				});
				
				
			}
			var a = selections[0].TAXDATEID - dataNumber;
			if(a>0){
				//取去年最后一期数据
				$.ajax( {
					url : ctx + "/interface/selectAfwtHandson.do",
					type : "post",
					async : false,
					data : {
						nsrsbhId : selections[0].NSRSBH_ID,
						tableId : '0',
						taxDateId : a
					},
					dataType : "json",
					success : function(data) {
						if (data != "[]") {
							var temp = JSON.parse(data);
							var tableData = JSON.parse(temp[0].afwtHandson);
							s1m46_last =  tableData[46][26];
							s1m40_last = tableData[40][26];
						}
						
					}
				});
			}
			
			
			count++;
			doSomething();
		}
	});
	
	//2.跨表取数取申报表1
	var s1e6,s1e9,s1e12,s1e15,s1e18,s1e21,s1e24,s1e27,s1e30,s1e33,s1e36,s1e39,s1e42,s1e45;
	$.ajax({
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				console.log("进入申报表1了");
				console.log(tableData);
				s1k7 = tableData[7][10];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销售额)
				s1k8 = tableData[8][10];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销售额)
				s1k9 = tableData[9][10];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销售额)
				s1k10 = tableData[10][10];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销售额)
				s1k11 = tableData[11][10];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销售额)
				s1l7 = tableData[7][11];//17%税率的货物及加工修理修配劳务合计(纳税检查调整销项(应纳)税额)
				s1l8 = tableData[8][11];//17%税率的服务、不动产和无形资产合计(纳税检查调整销项(应纳)税额)
				s1l9 = tableData[9][11];//13%税率合计(纳税检查调整销项(应纳)税额)
				s1l10 = tableData[10][11];//11%税率合计(纳税检查调整销项(应纳)税额)
				s1l11 = tableData[11][11];//6%税率合计(纳税检查调整销项(应纳)税额)
				s1m7 = tableData[7][12];//17%税率的货物及加工修理修配劳务合计
				s1m8 = tableData[8][12];//17%税率的服务、不动产和无形资产合计
				s1m9 = tableData[9][12];//13%税率合计
				s1m10 = tableData[10][12];//11%税率合计
				s1m11 = tableData[11][12];//6%税率合计
				s1m12 = tableData[12][12];//即征即退货物及加工修理修配劳务
				s1m13 = tableData[13][12];//即征即退服务、不动产和无形资产
				s1m14 = tableData[14][12];//6%征收率
				s1m15 = tableData[15][12];//5%征收率的货物及加工修理修配劳务
				s1m16 = tableData[16][12];//5%征收率的服务、不动产和无形资产
				s1m17 = tableData[17][12];//4%征收率
				s1m18 = tableData[18][12];//3%征收率的货物及加工修理修配劳务
				s1m19 = tableData[19][12];//3%征收率的服务、不动产和无形资产
				s1m20 = tableData[20][12];//预征率   %
				s1m21 = tableData[21][12];//预征率   %
				s1m22 = tableData[22][12];//预征率   %
				s1m23 = tableData[23][12];//
				s1m24 = tableData[24][12];//
				s1m27 = tableData[27][12];//免税-货物及加工修理修配劳务
				s1m28 = tableData[28][12];//免税-服务、不动产和无形资产
				s1n7 = tableData[7][13];//17%税率的货物及加工修理修配劳务合计(销项税额)
				s1n8 = tableData[8][13];//17%税率的服务、不动产和无形资产合计(销项税额)
				s1n9 = tableData[9][13];//13%税率合计(销项税额)
				s1n10 = tableData[10][13];//11%税率合计(销项税额)
				s1n11 = tableData[11][13];//6%税率合计(销项税额)
				s1n12 = tableData[12][13];//即征即退货物及加工修理修配劳务
				s1n13 = tableData[13][13];//即征即退服务、不动产和无形资产
				s1n14 = tableData[14][13];//6%征收率合计(销项（应纳）税额)
				s1n15 = tableData[15][13];//5%征收率的货物及加工修理修配劳务(销项（应纳）税额)
				s1n16 = tableData[16][13];//5%征收率的服务、不动产和无形资产(销项（应纳）税额)
				s1n17 = tableData[17][13];//4%征收率(销项（应纳）税额)
				s1n18 = tableData[18][13];//3%征收率的货物及加工修理修配劳务(销项（应纳）税额)
				s1n19 = tableData[19][13];//3%征收率的服务、不动产和无形资产(销项（应纳）税额)
				s1n20 = tableData[20][13];//预征率   %(销项（应纳）税额)
				s1n21 = tableData[21][13];//预征率   %(销项（应纳）税额)
				s1n22 = tableData[22][13];//预征率   %(销项（应纳）税额)
				s1n23 = tableData[23][13];//即征即退货物及加工修理修配劳务
				
				s1q12 = tableData[12][17];//货物及加工修理修配劳务免税合计
				console.log(s1q12);
				s1q13 = tableData[13][17];//服务、不动产和无形资产免税合计
				s1r8 = tableData[8][17];//17%税率的货物及加工修理修配劳务合计(扣除后销项税额)
				s1r10 = tableData[10][17];//11%税率(扣除后销项税额)
				s1r11 = tableData[11][17];//6%税率(扣除后销项税额)
				s1r13 = tableData[13][17];//即征即退服务、不动产和无形资产(扣除后销项税额)
				s1r16 = tableData[16][17];//5%征收率的服务、不动产和无形资产(扣除后销项税额)
				s1r19 = tableData[19][17];//3%征收率的服务、不动产和无形资产(扣除后销项税额)
				s1r20 = tableData[20][17];//预征率%(扣除后销项税额)
				s1r21 = tableData[21][17];//预征率%(扣除后销项税额)
				s1r24 = tableData[24][17];//即征即退服务、不动产和无形资产(扣除后销项税额)
			}
			count++;
			doSomething();
		}
	});
	
	//3.跨表取数取申报表2
	var s2d18,s2d21;
	$.ajax({
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				console.log("进入申报表2了");
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				console.log(tableData);
				s2d18 = tableData[18][4];
				s2d21 = tableData[21][2]; 
			}
			count++;
			doSomething();
		}
	});
	
	
	//4.跨表取数取申报表4
	var s4f8 = 0;
	var s4f9 = 0;
	var s4f10 = 0;
	var s4f11 = 0;
	
	$.ajax({
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '4'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				console.log("进入申报表4了");
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				s4f8 = tableData[7][5];//分支机构预征缴纳税款-本期实际抵减税额
				s4f9 = tableData[8][5];//建筑服务预征缴纳税款-本期实际抵减税额
				s4f10 = tableData[9][5];//销售不动产预征缴纳税款-本期实际抵减税额
				s4f11 = tableData[10][5];//出租不动产预征缴纳税款-本期实际抵减税额
	
			}
			count++;
			doSomething();
		}
	});
	
	//5.跨表取数纳税检查调整台账9_0
	var data_xplw = 0;var data_xplw_xx = 0;var data_xplw_jx = 0;
	var data_wxzc = 0;var data_wxzc_xx = 0;var data_wxzc_jx = 0;
	var data_13sl = 0;var data_13sl_xx = 0;var data_13sl_jx = 0;
	var data_11sl = 0;var data_11sl_xx = 0;var data_11sl_jx = 0;
	var data_6sl = 0;var data_6sl_xx = 0;var data_6sl_jx = 0;
	var data_6zsl = 0;var data_6zsl_xx = 0;var data_6zsl_jx = 0;
	var data_5zsl_xplw = 0;var data_5zsl_xplw_xx = 0;var data_5zsl_xplw_jx = 0;
	var data_5zsl_wxzc = 0;var data_5zsl_wxzc_xx = 0;var data_5zsl_wxzc_jx = 0;
	var data_4zsl = 0;var data_4zsl_xx = 0;var data_4zsl_jx = 0;
	var data_3zsl_xplw = 0;var data_3zsl_xplw_xx = 0;var data_3zsl_xplw_jx = 0;
	var data_3zsl_wxzc = 0;var data_3zsl_wxzc_xx = 0;var data_3zsl_wxzc_jx = 0;
	var data_other = 0;var data_other_xx = 0;var data_other_jx = 0;
	var cbse_all = 0;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '9_0'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				console.log("进入台账表9了");
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				
				$.each(tableData,function(idx,obj){
					console.log(obj);
					
					if(obj[3]=="17%税率的货物及加工修理修配劳务"){
						data_xplw = FloatAddEx(data_xplw , obj[4]); 
						data_xplw_xx = FloatAddEx(data_xplw_xx , obj[5]); 
						data_xplw_jx = FloatAddEx(data_xplw_jx , obj[6]); 
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="17%税率的服务、不动产和无形资产"){
						data_wxzc = FloatAddEx(data_wxzc , obj[4]); 
						data_wxzc_xx = FloatAddEx(data_wxzc_xx ,　obj[5]);
						data_wxzc_jx = FloatAddEx(data_wxzc_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="13%税率"){
						data_13sl = FloatAddEx(data_13sl , obj[4]); 
						data_13sl_xx = FloatAddEx(data_13sl_xx , obj[5]);
						data_13sl_jx = FloatAddEx(data_13sl_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="11%税率"){
						data_11sl = FloatAddEx(data_11sl , obj[4]); 
						data_11sl_xx = FloatAddEx(data_11sl_xx , obj[5]); 
						data_11sl_jx = FloatAddEx(data_11sl_jx , obj[6]); 
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="6%税率"){
						data_6sl = FloatAddEx(data_6sl , obj[4]); 
						data_6sl_xx = FloatAddEx(data_6sl_xx , obj[5]);
						data_6sl_jx = FloatAddEx(data_6sl_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="6%征收率"){
						data_6zsl = FloatAddEx(data_6zsl , obj[4]);
						data_6zsl_xx = FloatAddEx(data_6zsl_xx , obj[5]);
						data_6zsl_jx = FloatAddEx(data_6zsl_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="5%征收率的货物及加工修理修配劳务"){
						data_5zsl_xplw = FloatAddEx(data_5zsl_xplw + obj[4]); 
						data_5zsl_xplw_xx = FloatAddEx(data_5zsl_xplw_xx + obj[5]); 
						data_5zsl_xplw_jx = FloatAddEx(data_5zsl_xplw_jx + obj[6]); 
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="5%征收率的服务、不动产和无形资产"){
						data_5zsl_wxzc = FloatAddEx(data_5zsl_wxzc , obj[4]); 
						data_5zsl_wxzc_xx = FloatAddEx(data_5zsl_wxzc_xx , obj[5]);
						data_5zsl_wxzc_jx = FloatAddEx(data_5zsl_wxzc_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="4%征收率"){
						data_4zsl = FloatAddEx(data_4zsl , obj[4]); 
						data_4zsl_xx = FloatAddEx(data_4zsl_xx , obj[5]);
						data_4zsl_jx = FloatAddEx(data_4zsl_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="3%征收率的货物及加工修理修配劳务"){
						data_3zsl_xplw = FloatAddEx(data_3zsl_xplw , obj[4]); 
						data_3zsl_xplw_xx = FloatAddEx(data_3zsl_xplw_xx , obj[5]);
						data_3zsl_xplw_jx = FloatAddEx(data_3zsl_xplw_jx , obj[6]);
						cbse_all = parseFloat(cbse_all) + parseFloat(obj[7]);
					}
					if(obj[3]=="3%征收率的服务、不动产和无形资产"){
						data_3zsl_wxzc = FloatAddEx(data_3zsl_wxzc , obj[4]);
						data_3zsl_wxzc_xx = FloatAddEx(data_3zsl_wxzc_xx , obj[5]);
						data_3zsl_wxzc_jx = FloatAddEx(data_3zsl_wxzc_jx , obj[6]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
					if(obj[3]=="其他"){
						data_other = FloatAddEx(data_other , obj[4]);
						data_other_xx = FloatAddEx(data_other_xx , obj[4]);
						data_other_jx = FloatAddEx(data_other_jx , obj[4]);
						cbse_all = FloatAddEx(cbse_all , obj[7]);
					}
				})
				
			}
			count++;
			doSomething();
		}
	});	
	
	
	var mainHeader_sshy = "";
	var mainHeader_dhhm = "";
	var mainHeader_frmc = "";
	var mainHeader_khyhzh = "";
	var mainHeader_scjydz = "";
	var mainHeader_zcdz = "";
	var mainHeader_nsrmc = "";
	var mainHeader_djzclx = "";
	//6.取主表表头信息
	$.ajax({
		url : ctx + "/interface/getMainTable_header.do",
		type : "post",
		async : true,
		data : {
			nsrsbh:selections[0].NSRSBH_ID
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				$.each(data,function(idx,obj){
					if(obj.SSHY!=undefined){
						mainHeader_sshy = obj.SSHY;
					}
					if(obj.DHHM!=undefined){
						mainHeader_dhhm = obj.DHHM;
					}
					if(obj.FRMC!=undefined){
						mainHeader_frmc = obj.FRMC;
					}
					if(obj.KHYHZH!=undefined){
						mainHeader_khyhzh = obj.KHYHZH;
					}
					if(obj.SCJYDZ!=undefined){
						mainHeader_scjydz = obj.SCJYDZ;
					}
					if(obj.ZCDZ!=undefined){
						mainHeader_zcdz = obj.ZCDZ;
					}
					if(obj.NSRMC!=undefined){
						mainHeader_nsrmc = obj.NSRMC;
					}
					if(obj.DJZCLX!=undefined){
						mainHeader_djzclx = obj.DJZCLX;
					}

				})
			}
			
			
			count++;
			doSomething();
		}
	});
	
	//7.跨表去申报表8的数据
	var s2f6 = 0;
	$.ajax({
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '8'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				console.log("进入申报表8了");
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				console.log(tableData);
				if(tableData[6][5]!=''){
					s2f6 = tableData[6][5];
				}
				
			}
			count++;
			doSomething();
		}
	});
	
	
	
	
	

};
function cellCheck0(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 9 && row<=46 && col>=18 && col<=26) {	
			if(!numberCheck(changes)){
				return false;
			}
				
	}
	return true;
};

/**
 * 申报表1
 */
function setRender1(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if(row>=7&&row<=28&&col>=4&&col<=17){
		if( (col>=4&&col<=11) || col==15){
			this.renderer = purpleRender;
		}
		else{
			this.renderer = grayRender;
		}
	}

};

function calculate1(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		if(change[0][2]!=change[0][3]){
		if(changeData=='NaN')
			changeData = 0;
		var temp;
		//9=1+3+5+7
		if ((col === 4 || col === 6 ||col === 8 ||col === 10)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 12));
			this.setDataAtCell(row, 12, FloatAdd(temp, changeData).toString());
		}
		//10=2+4+6+8
		if ((col === 5 || col === 7 ||col === 9 ||col === 11)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 13));
			this.setDataAtCell(row, 13, FloatAdd(temp, changeData).toString());
		}
		//11=9+10
		if ((col === 12 || col === 13)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 14));
			this.setDataAtCell(row, 14, FloatAdd(temp, changeData).toString());
		}
		//13=11-12
		if ((col === 14 || col === 15)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 16));
			if(col===14){
				this.setDataAtCell(row, 16, FloatAdd(temp, changeData).toString());
			}
			if(col===15){
				this.setDataAtCell(row, 16, FloatAdd(temp, -changeData).toString());
			}
		}
		//14=13(税率/税率+1)
		if (col === 16 && row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 17));
			//17% 0.145299
			if(row===7||row===8){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.145299)).toString());
			}
			//13% 0.115044
			if(row===9){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.115044)).toString());
			}
			//11% 0.099099
			if(row===10){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.099099)).toString());
			}
			//6% 0.056603
			if(row===11 || row===14){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.056603)).toString());
			}
			//5% 0.047619
			if(row===15 || row===16){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.047619)).toString());
			}
			//4% 0.038461
			if(row===17){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.038461)).toString());
			}
			//3% 0.029126
			if(row===18||row===19){
				this.setDataAtCell(row, 17, FloatAdd(temp, FloatMul(changeData,0.029126)).toString());
			}
		}
		}
	}
};
function setData1(callback) {

	hot.setDataAtCell(2, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	hot.setDataAtCell(3, 0, "纳税人名称：（公章）" + pvt_person);
	var count = 0;
	var a,b,c,d;
	// 跨表取数取1_1表 开具专用发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
				//17%税率的货物及加工修理修配劳务
				hot.setDataAtCell(7,4,tableData[6][4]);
				hot.setDataAtCell(7,5,tableData[6][7]);
				//17%税率的服务、不动产和无形资产
				hot.setDataAtCell(8,4,tableData[9][4]);
				hot.setDataAtCell(8,5,tableData[9][7]);
				//13%税率
				hot.setDataAtCell(9,4,tableData[12][4]);
				hot.setDataAtCell(9,5,tableData[12][7]);
				//11%税率
				a = FloatAdd(parseFloat(tableData[15][4]), parseFloat(tableData[18][4]));
				hot.setDataAtCell(10,4,FloatAdd(a,parseFloat(tableData[21][4])).toString());
				b = FloatAdd(parseFloat(tableData[15][7]), parseFloat(tableData[18][7]));
				hot.setDataAtCell(10,5,FloatAdd(b,parseFloat(tableData[21][7])).toString());
				//6%税率
				a = FloatAdd(parseFloat(tableData[24][4]), parseFloat(tableData[27][4]));
				b = FloatAdd(parseFloat(tableData[30][4]), parseFloat(tableData[33][4]));
				hot.setDataAtCell(11,4,FloatAdd(a,b).toString());
				c = FloatAdd(parseFloat(tableData[24][7]), parseFloat(tableData[27][7]));
				d = FloatAdd(parseFloat(tableData[30][7]), parseFloat(tableData[33][7]));
				hot.setDataAtCell(11,5,FloatAdd(c,d).toString());	
				//5%征收率的货物及加工修理修配劳务
				hot.setDataAtCell(15,4,tableData[36][4]);
				hot.setDataAtCell(15,5,tableData[36][7]);
				//5%征收率的服务、不动产和无形资产
				hot.setDataAtCell(16,4,tableData[39][4]);
				hot.setDataAtCell(16,5,tableData[39][7]);
				//3%征收率的货物及加工修理修配劳务
				hot.setDataAtCell(18,4,tableData[42][4]);
				hot.setDataAtCell(18,5,tableData[42][7]);
				//3%征收率的服务、不动产和无形资产
				hot.setDataAtCell(19,4,tableData[45][4]);
				hot.setDataAtCell(19,5,tableData[45][7]);
				//预征率%
				hot.setDataAtCell(20,4,tableData[48][4]);
				hot.setDataAtCell(20,5,tableData[48][7]);
				//货物及加工修理修配劳务
				hot.setDataAtCell(27,4,tableData[49][4]);
				hot.setDataAtCell(27,5,tableData[49][7]);
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取1_2表 开具其他发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//17%税率的货物及加工修理修配劳务
					hot.setDataAtCell(7,6,tableData[6][4]);
					hot.setDataAtCell(7,7,tableData[6][7]);
					//17%税率的服务、不动产和无形资产
					hot.setDataAtCell(8,6,tableData[9][4]);
					hot.setDataAtCell(8,7,tableData[9][7]);
					//13%税率
					hot.setDataAtCell(9,6,tableData[12][4]);
					hot.setDataAtCell(9,7,tableData[12][7]);
					//11%税率
					a = FloatAdd(parseFloat(tableData[15][4]), parseFloat(tableData[18][4]));
					hot.setDataAtCell(10,6,FloatAdd(a,parseFloat(tableData[21][4])).toString());
					b = FloatAdd(parseFloat(tableData[15][7]), parseFloat(tableData[18][7]));
					hot.setDataAtCell(10,7,FloatAdd(b,parseFloat(tableData[21][7])).toString());
					//6%税率
					a = FloatAdd(parseFloat(tableData[24][4]), parseFloat(tableData[27][4]));
					b = FloatAdd(parseFloat(tableData[30][4]), parseFloat(tableData[33][4]));
					hot.setDataAtCell(11,6,FloatAdd(a,b).toString());
					c = FloatAdd(parseFloat(tableData[24][7]), parseFloat(tableData[27][7]));
					d = FloatAdd(parseFloat(tableData[30][7]), parseFloat(tableData[33][7]));
					hot.setDataAtCell(11,7,FloatAdd(c,d).toString());	
					//5%征收率的货物及加工修理修配劳务
					hot.setDataAtCell(15,6,tableData[36][4]);
					hot.setDataAtCell(15,7,tableData[36][7]);
					//5%征收率的服务、不动产和无形资产
					hot.setDataAtCell(16,6,tableData[39][4]);
					hot.setDataAtCell(16,7,tableData[39][7]);
					//3%征收率的货物及加工修理修配劳务
					hot.setDataAtCell(18,6,tableData[42][4]);
					hot.setDataAtCell(18,7,tableData[42][7]);
					//3%征收率的服务、不动产和无形资产
					hot.setDataAtCell(19,6,tableData[45][4]);
					hot.setDataAtCell(19,7,tableData[45][7]);
					//预征率%
					hot.setDataAtCell(20,6,tableData[48][4]);
					hot.setDataAtCell(20,7,tableData[48][7]);
					//货物及加工修理修配劳务
					hot.setDataAtCell(27,6,tableData[49][4]);
					hot.setDataAtCell(27,7,tableData[49][7]);
					//服务、不动产和无形资产
					hot.setDataAtCell(28,6,tableData[50][4]);
					hot.setDataAtCell(28,7,tableData[50][7]);
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取1_3表 未开具
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '1_3'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
				//17%税率的货物及加工修理修配劳务
				hot.setDataAtCell(7,8,tableData[7][5]);
				hot.setDataAtCell(7,9,tableData[7][8]);
				//17%税率的服务、不动产和无形资产
				hot.setDataAtCell(8,8,tableData[8][5]);
				hot.setDataAtCell(8,9,tableData[8][8]);
				//13%税率
				hot.setDataAtCell(9,8,tableData[9][5]);
				hot.setDataAtCell(9,9,tableData[9][8]);
				//11%税率
				hot.setDataAtCell(10,8,tableData[10][5]);
				hot.setDataAtCell(10,9,tableData[10][8]);
				//6%税率
				a = FloatAdd(parseFloat(tableData[11][5]), parseFloat(tableData[12][5]));
				b = FloatAdd(parseFloat(tableData[13][5]), parseFloat(tableData[14][5]));
				hot.setDataAtCell(11,8,FloatAdd(a,b).toString());
				c = FloatAdd(parseFloat(tableData[11][8]), parseFloat(tableData[12][8]));
				d = FloatAdd(parseFloat(tableData[13][8]), parseFloat(tableData[14][8]));
				hot.setDataAtCell(11,9,FloatAdd(c,d).toString());	
				//5%征收率的货物及加工修理修配劳务
				hot.setDataAtCell(15,8,tableData[15][5]);
				hot.setDataAtCell(15,9,tableData[15][8]);
				//5%征收率的服务、不动产和无形资产
				hot.setDataAtCell(16,8,tableData[16][5]);
				hot.setDataAtCell(16,9,tableData[16][8]);
				//3%征收率的货物及加工修理修配劳务
				hot.setDataAtCell(18,8,tableData[17][5]);
				hot.setDataAtCell(18,9,tableData[17][8]);
				//3%征收率的服务、不动产和无形资产
				hot.setDataAtCell(19,8,tableData[18][5]);
				hot.setDataAtCell(19,9,tableData[18][8]);
				//预征率%
				hot.setDataAtCell(20,8,tableData[19][5]);
				hot.setDataAtCell(20,9,tableData[19][8]);
				//货物及加工修理修配劳务
				hot.setDataAtCell(27,8,tableData[20][5]);
				hot.setDataAtCell(27,9,tableData[20][8]);
				//服务、不动产和无形资产
				hot.setDataAtCell(28,8,tableData[21][5]);
				hot.setDataAtCell(28,9,tableData[21][8]);
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取9_0表 纳税检查调整
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '9_0'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					var length = tableData.length - 5;
//			0		6%征收率
//			1		5%征收率的货物及加工修理修配劳务
//			2		5%征收率的服务、不动产和无形资产
//			3		4%征收率
//			4		3%征收率的货物及加工修理修配劳务
//			5		3%征收率的服务、不动产和无形资产
//			6		17%税率的货物及加工修理修配劳务
//			7		17%税率的服务、不动产和无形资产
//			8		13%税率      
//			9		11%税率
//			10		6%税率
//			11		其他
					//调整销售额
					var dataArray1 = [0,0,0,0,0,0,0,0,0,0,0,0];
					//调整销项税额
					var dataArray2 = [0,0,0,0,0,0,0,0,0,0,0,0];
					function myAdd(arg1,arg2){
						arg1 = FloatAdd(arg1,parseFloat(arg2));
						return arg1;
					}
					for(var i=0;i<length;i++){
						var temp = tableData[i+5];
						if(temp[3]=='6%征收率'){
							dataArray1[0] = myAdd(dataArray1[0],temp[4]);
							dataArray2[0] = myAdd(dataArray2[0],temp[5]);
						}
						if(temp[3]=='5%征收率的货物及加工修理修配劳务'){
							dataArray1[1] = myAdd(dataArray1[1],temp[4]);
							dataArray2[1] = myAdd(dataArray2[1],temp[5]);
						}
						if(temp[3]=='5%征收率的服务、不动产和无形资产'){
							dataArray1[2] = myAdd(dataArray1[2],temp[4]);
							dataArray2[2] = myAdd(dataArray2[2],temp[5]);
						}
						if(temp[3]=='4%征收率'){
							dataArray1[3] = myAdd(dataArray1[3],temp[4]);
							dataArray2[3] = myAdd(dataArray2[3],temp[5]);
						}
						if(temp[3]=='3%征收率的货物及加工修理修配劳务'){
							dataArray1[4] = myAdd(dataArray1[4],temp[4]);
							dataArray2[4] = myAdd(dataArray2[4],temp[5]);
						}
						if(temp[3]=='3%征收率的服务、不动产和无形资产'){
							dataArray1[5] = myAdd(dataArray1[5],temp[4]);
							dataArray2[5] = myAdd(dataArray2[5],temp[5]);
						}
						if(temp[3]=='17%税率的货物及加工修理修配劳务'){
							dataArray1[6] = myAdd(dataArray1[6],temp[4]);
							dataArray2[6] = myAdd(dataArray2[6],temp[5]);
						}
						if(temp[3]=='17%税率的服务、不动产和无形资产'){
							dataArray1[7] = myAdd(dataArray1[7],temp[4]);
							dataArray2[7] = myAdd(dataArray2[7],temp[5]);
						}
						if(temp[3]=='13%税率'){
							dataArray1[8] = myAdd(dataArray1[8],temp[4]);
							dataArray2[8] = myAdd(dataArray2[8],temp[5]);
						}
						if(temp[3]=='11%税率'){
							dataArray1[9] = myAdd(dataArray1[9],temp[4]);
							dataArray2[9] = myAdd(dataArray2[9],temp[5]);
						}
						if(temp[3]=='6%税率'){
							dataArray1[10] = myAdd(dataArray1[10],temp[4]);
							dataArray2[10] = myAdd(dataArray2[10],temp[5]);
						}
						if(temp[3]=='其他'){
							dataArray1[11] = myAdd(dataArray1[11],temp[4]);
							dataArray2[11] = myAdd(dataArray2[11],temp[5]);
						}
					}
					for(var j=0;j<5;j++){
						hot.setDataAtCell(7+j,10,dataArray1[6+j]);
						hot.setDataAtCell(7+j,11,dataArray2[6+j]);
					}
					for(var k=0;k<6;k++){
						hot.setDataAtCell(14+k,10,dataArray1[0+k]);
						hot.setDataAtCell(14+k,11,dataArray2[0+k]);
					}
				}
			}
			count++;
			doSomething();
		}
	});
	//服务、不动产和无形资产扣除项目台账3_1
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '3_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
				//17%税率的服务、不动产和无形资产
				hot.setDataAtCell(8,15,tableData[8][8]);
				//11%税率的服务、不动产和无形资产
				hot.setDataAtCell(10,15,tableData[9][8]);
				//6%税率的服务、不动产和无形资产
				a = FloatAdd(parseFloat(tableData[10][8]), parseFloat(tableData[11][8]));
				hot.setDataAtCell(11,15,a.toString());
				//5%税率的服务、不动产和无形资产
				hot.setDataAtCell(16,15,tableData[12][8]);	
				//3%税率的服务、不动产和无形资产
				hot.setDataAtCell(19,15,tableData[13][8]);	
				//免税的服务、不动产和无形资产
				hot.setDataAtCell(28,15,tableData[14][8]);
				}
			}
			count++;
			doSomething();
		}
	});
	function doSomething() {
		if (count == 5) {
			callback('');
		}
	}
};
function cellCheck1(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7 && row<=28 && col>=4 && col<=17) {
		if(!numberCheck(changes))
			return false;
	}
};

/**
 * 申报表2
 */
function setRender2(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if (row === 4) {
		this.renderer = boldRender;
	}
	if (row === 19) {
		this.renderer = boldRender;
	}
	if (row === 32) {
		this.renderer = boldRender;
	}
	if (row === 45) {
		this.renderer = boldRender;
	}
	if(row>=7&&row<=18&&col>=2&&col<=4){
		if(row==7||row==10||row==18)
			this.renderer = grayRender;
		else
			this.renderer = purpleRender;	
	}
	if(row>=21&&row<=31&&col==2){
		if(row==22)
			this.renderer = grayRender;
		else
			this.renderer = purpleRender;	
	}
	if(row>=34&&row<=44&&col>=2&&col<=4){
		if(row==39)
			this.renderer = grayRender;
		else
			this.renderer = purpleRender;	
	}
	if(row>=47&&row<=48&&col>=2&&col<=4){
			this.renderer = purpleRender;	
	}
};

function calculate2(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(change[0][2]!=change[0][3]){
		if(changeData=='NaN')
			changeData = 0;
		//1=2+3
		if ((row === 8 || row === 9)&& col >= 2) {
			temp = parseFloat(this.getDataAtCell(7, col));
			this.setDataAtCell(7, col, FloatAdd(temp, changeData).toString());
		}
		//4=5+6+7+8
		if ((row === 11 || row === 12 || row === 13||row === 14)&& col >= 2) {
			temp = parseFloat(this.getDataAtCell(10, col));
			this.setDataAtCell(10, col, FloatAdd(temp, changeData).toString());
		}
		//12=1+4-9+10+11
		if ((row === 7 || row === 10 || row === 15||row === 16||row === 17)&& col >= 2) {
			temp = parseFloat(this.getDataAtCell(18, col));
			if(row===15){
				this.setDataAtCell(18, col, FloatAdd(temp, -changeData).toString());
			}
			else{
				this.setDataAtCell(18, col, FloatAdd(temp, changeData).toString());
			}
		}
		//13=14至23之和
		if ((row >=22 && row<=31)&& col >= 2) {
			temp = parseFloat(this.getDataAtCell(21, col));
			this.setDataAtCell(21, col, FloatAdd(temp, changeData).toString());
		}
		//29=30至33之和
		if ((row >=40 && row<=43)&& col >= 2) {
			temp = parseFloat(this.getDataAtCell(39, col));
			this.setDataAtCell(39, col, FloatAdd(temp, changeData).toString());
		}
		}
	}
};
function setData2(callback) {

	hot.setDataAtCell(2, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	hot.setDataAtCell(3, 0, "纳税人名称：（公章）" + pvt_person);
	
	var count = 0;
	var a,b,c,d;
	// 跨表取数取2_1
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
				//其中：本期认证相符且本期申报抵扣
				hot.setDataAtCell(8,2,tableData[6][4]);
				hot.setDataAtCell(8,3,tableData[6][7]);
				hot.setDataAtCell(8,4,tableData[6][10]);
				//前期认证相符且本期申报抵扣
				hot.setDataAtCell(9,2,tableData[7][4]);
				hot.setDataAtCell(9,3,tableData[7][7]);
				hot.setDataAtCell(9,4,tableData[7][10]);
				//5-11行
				for(var i=0;i<7;i++){
					hot.setDataAtCell(i+11,2,tableData[i+9][4]);
					hot.setDataAtCell(i+11,3,tableData[i+9][7]);
					hot.setDataAtCell(i+11,4,tableData[i+9][10]);					
				}
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取2_2表 开具其他发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//14-17
					for(var i=0;i<4;i++){
						hot.setDataAtCell(i+22,2,tableData[i+6][4]);					
					}
					//19-21
					for(var j=0;j<3;j++){
						hot.setDataAtCell(j+27,2,tableData[j+10][4]);					
					}
					//23
					hot.setDataAtCell(31,2,tableData[13][4]);
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取2_3
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_3'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//24-28行
					for(var i=0;i<5;i++){
						hot.setDataAtCell(i+34,2,tableData[i+5][4]);
						hot.setDataAtCell(i+34,3,tableData[i+5][7]);
						hot.setDataAtCell(i+34,4,tableData[i+5][10]);					
					}
					//30-33行
					for(var j=0;j<4;j++){
						hot.setDataAtCell(j+40,2,tableData[j+11][4]);
						hot.setDataAtCell(j+40,3,tableData[j+11][7]);
						hot.setDataAtCell(j+40,4,tableData[j+11][10]);					
					}
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取2_4
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '2_4'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//35
					hot.setDataAtCell(47,2,tableData[5][4]);
					hot.setDataAtCell(47,3,tableData[5][7]);
					hot.setDataAtCell(47,4,tableData[5][10]);
					//36
					hot.setDataAtCell(48,2,tableData[6][4]);
					hot.setDataAtCell(48,3,tableData[6][7]);
					hot.setDataAtCell(48,4,tableData[6][10]);
					
				}
			}
			count++;
			doSomething();
		}
	});
	function doSomething() {
		if (count == 4) {
			callback('');
		}
		
	}
};
function cellCheck2(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7) {
		if (col >= 2 ) {
			if(!numberCheck(changes))
				return false;
		}
	}
};

/**
 * 申报表3
 */
function setRender3(row, col, prop) {
	if(row>=7 && row<=14){
		
		if(col===2 || col===3 || col===4 || col===6){
			this.renderer=purpleRender;
		}
		if(col===5 || col===7){
			this.renderer=grayRender;
		}
	}

	if (row <= 1) {
		this.renderer = boldRender;
	}

};

function calculate3(change, source) {

	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(changeData=='NaN')
			changeData = 0;
		//4=2+3
		if ((col === 3 || col === 4)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 5));
			this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
		}
		//6=4-5
		if ((col === 5 || col === 6)&& row >= 7) {
			temp = parseFloat(this.getDataAtCell(row, 7));
			if(col===5){
				this.setDataAtCell(row, 7, FloatAdd(temp, changeData).toString());
			}else{
				this.setDataAtCell(row, 7, FloatAdd(temp, -changeData).toString());
			}
		}
	}

};

function setData3(callback) {
	 //跨表取数取上一期的数据	
	var count = 0;
	var taxDateId= selections[0].TAXDATEID-1;
	var nsrsbhId= selections[0].NSRSBH_ID;
	var applyId= selections[0].APPLY_ID;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "3",  //表ID
			taxDateId : taxDateId,//上一期的税期号
			nsrsbhId: nsrsbhId  //纳税人识别号
		
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				var arr = JSON.parse(data);
				var data_1 = JSON.parse(arr[0].afwtHandson);
				if (selections[0].TAXDATEID > 1) {
					hot.setDataAtCell(7, 3,data_1[7][7]);
					hot.setDataAtCell(8, 3,data_1[8][7]);
					hot.setDataAtCell(9, 3,data_1[9][7]);
					hot.setDataAtCell(10, 3,data_1[10][7]);
					hot.setDataAtCell(11, 3,data_1[11][7]);
					hot.setDataAtCell(12, 3,data_1[12][7]);
					hot.setDataAtCell(14, 3,data_1[14][7]);
				}
			}
			
			count++;
			doSomething();
		}
	});
	//取其他格式的接口
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "3_1",  //表ID
			
			applyId: applyId  //纳税人识别号
		
		},
		dataType : "json",
		success : function(data) {
			var arr = JSON.parse(data);
			var data_1 = JSON.parse(arr[0].afwtHandson);
			//本期服务、不动产和无形资产价税合计额（免税销售额）
			hot.setDataAtCell(7, 2,data_1[8][2]);
			hot.setDataAtCell(8, 2,data_1[9][2]);
			hot.setDataAtCell(9, 2,data_1[10][2]);
			hot.setDataAtCell(10, 2,data_1[11][2]);
			hot.setDataAtCell(11, 2,data_1[12][2]);
			hot.setDataAtCell(12, 2,data_1[13][2]);
			hot.setDataAtCell(14, 2,data_1[14][2]);
			//本期发生额
			hot.setDataAtCell(7, 4,data_1[8][6]);
			hot.setDataAtCell(8, 4,data_1[9][6]);
			hot.setDataAtCell(9, 4,data_1[10][6]);
			hot.setDataAtCell(10, 4,data_1[11][6]);
			hot.setDataAtCell(11, 4,data_1[12][6]);
			hot.setDataAtCell(12, 4,data_1[13][6]);
			hot.setDataAtCell(14, 4,data_1[14][6]);
			//本期实际扣除金额
			hot.setDataAtCell(7, 6,data_1[8][8]);
			hot.setDataAtCell(8, 6,data_1[9][8]);
			hot.setDataAtCell(9, 6,data_1[10][8]);
			hot.setDataAtCell(10, 6,data_1[11][8]);
			hot.setDataAtCell(11, 6,data_1[12][8]);
			hot.setDataAtCell(12, 6,data_1[13][8]);
			hot.setDataAtCell(14, 6,data_1[14][8]);
			count++;
			doSomething();
		}
	});
	function doSomething(){
		if(count===2){
			callback("");
		}
		
	}
	
	hot.setDataAtCell(2, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 " + selections[0].SK_EDATE);
	hot.setDataAtCell(3 ,0,  "纳税人名称："+selections[0].NS_NAME);

};
function cellCheck3(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 7) {
		if (col >= 2 ) {
			if(!numberCheck(changes))
				return false;
		}
	}
	//5<=1 5<=4
	if(row>=7&&col===6){
		if(Number(changes[0][3])>Number(this.getDataAtCell(row,col-1))||Number(changes[0][3])>Number(this.getDataAtCell(row,col-4)))
			return false;
	}
	return true;
};

/**
 * 申报表4
 */
function setRender4(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if(row ===6 || row===7 ||row===8 || row===9 || row===10){
		if(col===2 || col===3 || col===5){
			
			this.renderer = purpleRender;
		}

	}
	if(row>=6 && row <=10){
		if(col===4 || col===6){
			this.renderer = grayRender;			
		}
	}

};

function calculate4(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(changeData=='NaN')
			changeData = 0;
		//3=1+2
		if ((col === 2 || col === 3)&& row >= 6) {
			temp = parseFloat(this.getDataAtCell(row, 4));
			this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());
		}
		//5=3-4
		if ((col === 4 || col === 5)&& row >= 6) {
			temp = parseFloat(this.getDataAtCell(row, 6));
			if(col===4){
				this.setDataAtCell(row, 6, FloatAdd(temp, changeData).toString());
			}else{
				this.setDataAtCell(row, 6, FloatAdd(temp, -changeData).toString());
			}
		}
	}
};
function setData4(callback) {
	 //跨表取数取上一期的数据	
	var count = 0;
	var taxDateId= selections[0].TAXDATEID-1;
	var nsrsbhId= selections[0].NSRSBH_ID;
	var applyId= selections[0].APPLY_ID;
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "4",  //表ID
			taxDateId : taxDateId,//上一期的税期号
			nsrsbhId: nsrsbhId  //纳税人识别号
		
		},
		dataType : "json",
		success : function(data) {
			if(data != "[]"){
				var arr = JSON.parse(data);
				var data_1 = JSON.parse(arr[0].afwtHandson);
				if (selections[0].TAXDATEID > 1) {
					hot.setDataAtCell(6, 2,data_1[6][6]);
					hot.setDataAtCell(7, 2,data_1[7][6]);
					hot.setDataAtCell(9, 2,data_1[9][6]);
					hot.setDataAtCell(10, 2,data_1[10][6]);
			
				}
			}
			
			count++;
			doSomething();
		}
	});
	//去其他接口的数
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId: "4_1",  //表ID
			applyId :applyId
		},
		dataType : "json",
		success : function(data) {
			var arr = JSON.parse(data);
			var data_1 = JSON.parse(arr[0].afwtHandson);
			hot.setDataAtCell(6, 3,data_1[7][5]);
			hot.setDataAtCell(7, 3,data_1[8][5]);
			hot.setDataAtCell(9, 3,data_1[9][5]);
			hot.setDataAtCell(10, 3,data_1[10][5]);
			//本期实际抵减税额
			hot.setDataAtCell(6, 5,data_1[7][9]);
			hot.setDataAtCell(7, 5,data_1[8][9]);
			hot.setDataAtCell(9, 5,data_1[9][9]);
			hot.setDataAtCell(10, 5,data_1[10][9]);
			count++;
			doSomething();
		}
	});	
	function doSomething(){
		if(count === 2){
			callback("");
		}
		
	}
	
	hot.setDataAtCell(2, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 " + selections[0].SK_EDATE);
	hot.setDataAtCell(3 ,0,  "纳税人名称："+selections[0].NS_NAME);
};
function cellCheck4(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 6) {
		if (col >= 2 ) {
			if(!numberCheck(changes))
				return false;
		}
	}
	//4<=3
	if(row>=6&&col===5){
		if(Number(changes[0][3])>Number(this.getDataAtCell(row,col-1)))
			return false;
	}
	return true;
};

/**
 * 申报表5
 */
function setRender5(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if(row == 6){
		if(col < 5){
			this.renderer = purpleRender;
		}else if(col == 5){
			this.renderer = grayRender;
		}
		
		
		
	}
	
	
	
	
};

function calculate5(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(changeData=='NaN')
			changeData = 0;
		//6=1+2-3+4-5
		if (col>=0 && col<= 4 && row >= 6) {
			temp = parseFloat(this.getDataAtCell(row, 5));
			if(col==2||col==4)
				this.setDataAtCell(row, 5, FloatAdd(temp, -changeData).toString());
			else
				this.setDataAtCell(row, 5, FloatAdd(temp, changeData).toString());
		}
	}
};
function setData5(callback) {
	hot.setDataAtCell(2, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	var count = 0;
	// 跨表取数取5_1表
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '5_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				
				var arr = [0,3,6,7,8,9];
				var arr2 = [];
				for(var i = 0;i<arr.length;i++){
					arr2[i] = tableData[7][arr[i]];
				}
				//console.log("arr2:"+arr2);
				/*var a = tableData[7][0];
				var b = tableData[7][3];
				var c = tableData[7][6];
				var d = tableData[7][7];
				var e = tableData[7][8];
				var f = tableData[7][9];*/
			}
			count++;
			doSomething(count,arr2);
		}
	});
	
	function doSomething(count,arr2) {
		if (count == 1) {
			for(var j = 0;j<arr2.length;j++){
				
				hot.setDataAtCell(6,j,arr2[j].toString());
			}
			/*	hot.setDataAtCell(6,0,a.toString());
			hot.setDataAtCell(6,1,b.toString());
			hot.setDataAtCell(6,2,c.toString());
			hot.setDataAtCell(6,3,d.toString());
			hot.setDataAtCell(6,4,e.toString());
			hot.setDataAtCell(6,5,f.toString());*/
			hot.setDataAtCell(3,0, "纳税人名称:" + selections[0].NS_NAME);
			callback('');
		}
	}
};
function cellCheck5(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 6) {
		if(!numberCheck(changes))
			return false;
	}
	//3<=1+2+4
	if(row==6&&col==2){
		var a = parseFloat(this.getDataAtCell(row,0));
		var b = parseFloat(this.getDataAtCell(row,1));
		var c = parseFloat(this.getDataAtCell(row,3));
		if(Number(changes[0][3])>FloatAdd(FloatAdd(a,b),c))
			layer.msg("您的输入有误，第3列应小于第1列,第2列,第4列的和");
			return false;
	}
	//5<=1+4
	if(row==6&&col==4){
		var a = parseFloat(this.getDataAtCell(row,0));
		var b = parseFloat(this.getDataAtCell(row,3));
		if(Number(changes[0][3])>FloatAdd(a,b))
			layer.msg("您的输入有误，第5列应小于第1列,第4列的和");
			return false;
	}
	return true;
};

/**
 * 申报表6
 */
function setRender6(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if((row == 6)&&(col > 0)){
		this.renderer = grayRender;
	}
	if(((row == 4)||(row == 5))&&((col == 1)||(col == 2))){
		this.renderer = purpleRender;
	}
	
	
	
	
};

function calculate6(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		if(changeData=='NaN')
			changeData = 0;
		//合计
		//if (col>=1 && col<= 2 && row >= 4 && row<=5) {
		if (col>=1 && col<= 2 && row == 4) {
			temp = parseFloat(this.getDataAtCell(6, col));
			this.setDataAtCell(6, col, FloatAdd(temp, changeData).toString());
		}
	}
};
function setData6(callback) {
	var count = 0;
	// 跨表取数取6_1表
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '6_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				
				var a = tableData[7][4];
				var b = tableData[7][5];
				var c = tableData[8][4];
				var d = tableData[8][5];
				var e = tableData[9][4];
				var f = tableData[9][5];
				var arr2 = [a,b,c,d,e,f];
				count++;
				doSomething(count,a,b,c,d,e,f);
			}
		}
	});
	
	function doSomething(count,a,b,c,d,e,f) {
		if (count == 1) {
			
			hot.setDataAtCell(4,1,a.toString());
			hot.setDataAtCell(4,2,b.toString());
			hot.setDataAtCell(5,1,c.toString());
			hot.setDataAtCell(5,2,d.toString());
			hot.setDataAtCell(6,1,e.toString());
			hot.setDataAtCell(6,2,f.toString());
			//填表日期
			hot.setDataAtCell(2,1,"填表时间: "+ssbb_systemTime.substring(0,11),'loadData');
			//hot.setDataAtCell(2,1,"填表时间: "+formateStr(ssbb_systemTime));
			
			hot.setDataAtCell(2,0, "纳税人名称:" + selections[0].NS_NAME);
		}
		callback('');
	}
	
	
	//callback('');
};

function formateStr(str){
	var d = str.substring(0,10);
	var dlst = d.split('-');
	if(dlst.length==3){
		
		return dlst[0]+'年'+dlst[1]+'月'+dlst[2]+'日';
	};
	
}
function cellCheck6(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row >= 4) {
		if (col >= 1 ) {
			if(!numberCheck(changes))
				return false;
		}
	}
	return true;
};
/**
 * 申报表7
 */
function setRender7(row, col, prop) {
	if(row === 4 && col>=2 && col<=3){
		this.renderer = grayRender;
	}
	if(col ===2 && row>=6 && row<=35 && row!=33){
		this.renderer = purpleRender;
	}
	if(col ===3 && row>=6 && row<=35 && row!=33){
		this.renderer = purpleRender;
	}
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if (row === 5) {
		this.renderer = boldRender;
	}
	if (row === 33) {
		this.renderer = boldRender;
	}

};

function calculate7(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		//合计
		if (col>=2 && ((row>=6&&row<=32)||(row>=34&&row<=35))) {
			temp = parseFloat(this.getDataAtCell(4, col));
			this.setDataAtCell(4, col, FloatAdd(temp, changeData).toString());
		}
	}
};
function setData7(callback) {
	hot.setDataAtCell(1, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	hot.setDataAtCell(2, 0, "纳税人名称：（公章）" + pvt_person);
	var count = 0;
	
	$.ajax({
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			tableId : "7_1",
			applyId : selections[0].APPLY_ID
		},
		dataType : "json",
		success  : function(data){
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				
				var getRealTableData = function(i, j, tableData){
					if(tableData[i][j] === null || tableData[i][j] === ""){
						return 0;
					}else{
						return tableData[i][j].toString();
					}
				};
				
				for(var i = 6; i <= 31; i++){
					hot.setDataAtCell(i,2,getRealTableData(i+1,4,tableData));
					hot.setDataAtCell(i,3,getRealTableData(i+1,7,tableData));
				}
				
				hot.setDataAtCell(34,2,getRealTableData(33,4,tableData));
				hot.setDataAtCell(34,3,getRealTableData(33,7,tableData));
				hot.setDataAtCell(35,2,getRealTableData(34,4,tableData));
				hot.setDataAtCell(35,3,getRealTableData(34,7,tableData));
			}
			count++;
			doSomething();
		},
		error	 : function(){
			console.log("获取附表七--本期抵扣进项税额结构台账数据失败");
		}
	});
	
	function doSomething(){
		if(count === 1){
			
			callback("");
		}
	};
};
function cellCheck7(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if (row == 4 || (row>=6&&row<=32)||(row>=34&&row<=35)) {
		if (col >= 2 ) {
			if(!numberCheck(changes))
				return false;
		}
	}
	return true;
};

/**
 * 申报表8
 */
function setRender8(row, col, prop) {
	if (row <= 1) 
		this.renderer = boldRender;
	if(row>=6&&row<=11&&col>=2&&col<=6){
		if (row==6)
			this.renderer = grayRender;
		else if(col==4||col==6)
			this.renderer = grayRender;
		else
			this.renderer = purpleRender;
	}
	if(row>=15&&row<=24&&col>=2&&col<=6){
		if (row==15)
			this.renderer = grayRender;
		else if(col==4||col==6)
			this.renderer = grayRender;
		else
			this.renderer = purpleRender;
	}
};

function calculate8(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
	
		var befor = parseFloatEx(change[0][2]);
		var after = parseFloatEx(change[0][3]);

		var changeData = FloatAdd(after, -befor);

		var temp;
		if(change[0][2]!=change[0][3]){
			if(changeData=='NaN')
				changeData = 0;
		//合计
		if (col>=2 && (row>=7&&row<=11)) {
			temp = parseFloatEx(this.getDataAtCell(6, col));
			this.setDataAtCell(6, col, FloatAdd(temp, changeData).toString());
		}
		//合计
		if (col>=2 && (row>=16&&row<=24) && row!=17 && col!=4) {
			temp = parseFloatEx(this.getDataAtCell(15, col));
			this.setDataAtCell(15, col, FloatAdd(temp, changeData).toString());
		}
		//合计的3=1-2
		if(row==15 && (col==2||col==3)){
			temp = parseFloatEx(this.getDataAtCell(15, 4));
			if(col==2)
				this.setDataAtCell(15, 4, FloatAdd(temp, changeData).toString());	
			if(col==3)
				this.setDataAtCell(15, 4, FloatAdd(temp, -changeData).toString());
		}
		//3=1+2 3=1-2
		if ((col==2 || col==3)&& ((row>=7&&row<=11)||(row>=16&&row<=24))) {
			temp = parseFloatEx(this.getDataAtCell(row, 4));
			if(row>=16&&row<=24&&col==3)
				this.setDataAtCell(row, 4, FloatAdd(temp, -changeData).toString());
			else
				this.setDataAtCell(row, 4, FloatAdd(temp, changeData).toString());

		}
		//5=3-4
		if ((col==4 || col==5)&& (row>=7&&row<=11)) {
			temp = parseFloatEx(this.getDataAtCell(row, 6));
			if(col==4)
				this.setDataAtCell(row, 6, FloatAdd(temp, changeData).toString());
			if(col==5)
				this.setDataAtCell(row, 6, FloatAdd(temp, -changeData).toString());
		}
		}
	}
};
function setData8(callback) {
	hot.setDataAtCell(1, 0, " 税款所属时间：" + pvt_beginDate + " 至 " + pvt_endDate);
	hot.setDataAtCell(2, 0, "纳税人名称：（公章）" + pvt_person);
	var count = 0;
	// 跨表取数取8_1
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '8_1'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//2-6
					var length = tableData.length - 8;
					//先清零
					for(var i=0;i<6;i++){
//						hot.setDataAtCell(i+6,0,'','loadData');
						hot.setDataAtCell(i+6,2,'','loadData');
						hot.setDataAtCell(i+6,3,'','loadData');
						hot.setDataAtCell(i+6,4,'','loadData');
						hot.setDataAtCell(i+6,5,'','loadData');
						hot.setDataAtCell(i+6,6,'','loadData');
					}
					for( i=0;i<length;i++){
						hot.setDataAtCell(i+7,0,tableData[i+8][1]);
						hot.setDataAtCell(i+7,2,tableData[i+8][2]);
						hot.setDataAtCell(i+7,3,tableData[i+8][5]);
						hot.setDataAtCell(i+7,5,tableData[i+8][9]);
					}
				}
			}
			count++;
			doSomething();
		}
	});
	// 跨表取数取8_2表 开具其他发票
	$.ajax( {
		url : ctx + "/interface/selectAfwtHandson.do",
		type : "post",
		async : true,
		data : {
			applyId : selections[0].APPLY_ID,
			tableId : '8_2'
		},
		dataType : "json",
		success : function(data) {
			if (data != "[]") {
				var temp = JSON.parse(data);
				var tableData = JSON.parse(temp[0].afwtHandson);
				if(temp[0].acceptId=='2'){
					//2-6
					var length = tableData.length - 8;
					//清零
					for(var i=0;i<10;i++){
//						hot.setDataAtCell(i+15,0,'','loadData');
						hot.setDataAtCell(i+15,2,'','loadData');
						hot.setDataAtCell(i+15,3,'','loadData');
						hot.setDataAtCell(i+15,4,'','loadData');
						hot.setDataAtCell(i+15,5,'','loadData');
						hot.setDataAtCell(i+15,6,'','loadData');
					}
					for(i=0;i<length;i++){
						hot.setDataAtCell(i+16,0,tableData[i+8][1]);
						hot.setDataAtCell(i+16,2,tableData[i+8][4]);
						hot.setDataAtCell(i+16,3,tableData[i+8][7]);
						hot.setDataAtCell(i+16,5,tableData[i+8][9]);
						hot.setDataAtCell(i+16,6,tableData[i+8][10]);
					}
				}
			}
			count++;
			doSomething();
		}
	});
	function doSomething() {
		if (count == 2) {
			callback('');
		}
	}
};
function cellCheck8(changes) {
	var row = changes[0][0];
	var col = changes[0][1];
	if(changes[0][3]=='NaN'||changes[0][2]==changes[0][3])
		return false;
//	if (((row >= 6&& row<=11)||(row>=15&&row<=24)) && (col>=2&&col<=6) ){
//		if(!numberCheck(changes))
//			return false;
//	}
	//4<=3
	if((row >= 6&& row<=11)&&col==5){
		if(Number(changes[0][3])>Number(this.getDataAtCell(row,4)))
			return false;
	}
	if(changes[0][2]=='— —')
		return false;
	return true;
};

/**
 * 申报表9
 */
function setRender9(row, col, prop) {
	if (row <= 1) {
		this.renderer = boldRender;
	}
	if(row>=9 && row<=13){
		if(col===2 || col===3 || col===4 || col===5){
			this.renderer = greenRender;
		}
		
	}
	if(row===14){
		if(col>=2 && col<=5){
			this.renderer = grayRender;
		}
	}
	
};

function calculate9(change, source) {
	if (change&&source!='loadData') {
		// 定义变量
		var row = change[0][0];
		var col = change[0][1];
		var befor = parseFloat(change[0][2]);
		var after = parseFloat(change[0][3]);
		var changeData = FloatAdd(after, -befor);
		var temp;
		
		if (col>=2 && (row>=9&&row<14)) {
			//合计
			if(changeData=='NaN'){
	    	     changeData=0;	    	
	    	}
			temp = parseFloat(this.getDataAtCell(14, col));
			this.setDataAtCell(14, col, FloatAdd(temp, changeData).toString());
		}
	}

};
function setData9(callback) {
	hot.setDataAtCell(3, 0, " 纳税人识别号：" + selections[0].NSRSBH_ID);
	hot.setDataAtCell(2, 0, " 税款所属时间：" + selections[0].SK_SDATE + " 至 "
			+ selections[0].SK_EDATE);
	hot.setDataAtCell(4 ,1,  selections[0].NS_NAME);
	callback('');
};
function cellCheck9(changes) {
var row = changes[0][0];
var col = changes[0][1];
if (row >= 9&& row<=14) {
	if (col >= 1 ) {
		if(!numberCheck(changes))
			return false;
	}
}
return true;
}

