 function vali(){
		//开始时间
		var begindate = document.getElementById("begindate").value;
		//结束时间
		var enddate = document.getElementById("enddate").value;
		if((begindate != null || begindate!="") && (enddate != null || enddate!="")){								
			if( !(3 == dateCompare(begindate, enddate))){
				$("#enddate_msg").show();
			}if( (3 == dateCompare(begindate, enddate))){
				$("#enddate_msg").hide();
			}
		}
	}
	
	function dateCompare(date1,date2){
			date1 = date1.replace(/\-/gi,"/");
			date2 = date2.replace(/\-/gi,"/");
			var time1 = new Date(date1).getTime();
			var time2 = new Date(date2).getTime();
			//alert("开始日期" + date1);
			//alert("结束日期" + date2);
			if(time1 > time2){
				return 1;
			}else{
				return 3;
			}
		}