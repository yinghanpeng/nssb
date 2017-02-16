(function($){
	//表单序列化为json
    //相同存为数组
	$.fn.serializeJsonArray=function(){
		var serializeObj={};
		var array=this.serializeArray();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
				  serializeObj[this.name].push(this.value);
				}else{
				  serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
			  serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
	
	//表单序列化为json
    //相同转化为str分割字符串
	$.fn.serializeJson=function(str){
		var serializeObj={};
		var array=this.serializeArray();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
				  serializeObj[this.name]=serializeObj[this.name].join(str)+str+this.value;
				}else{
				  serializeObj[this.name]+=str+this.value;
				}
			}else{
			  serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);

/*
 *　功能:删除数组元素.
 *　参数:数组和index.
 *　返回:在原数组上修改数组
 */
ArrayRemoveIndex = function(array,index){
	for(var i=0,n=0;i<array.length;i++)
    {
        if(i!=index)
        {
            array[n++]=array[i];
        }
    }
    array.length-=1;
};