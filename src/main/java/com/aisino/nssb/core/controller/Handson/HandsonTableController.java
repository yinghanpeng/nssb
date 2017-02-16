package com.aisino.nssb.core.controller.Handson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aisino.nssb.common.AjaxResponse;
import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.common.AjaxResponse.MessageType;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.afwthd.service.NssbAfwtHandsonService;
import com.aisino.nssb.core.handsonTable.bean.AfwtHandsonBean;
import com.aisino.nssb.core.handsonTable.model.HandsonTable;
import com.aisino.nssb.core.handsonTable.service.HandsonTableService;
import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;

@Controller
@RequestMapping("/interface")
public class HandsonTableController {
	
	@Autowired
	private HandsonTableService hdts;
	
	@Autowired
	private NssbAfwtHandsonService   nahs;
	@Autowired
	UserService userService;
	
	
	/**
	 * 获取报表数据
	 * @return
	 */
	
	@RequestMapping(value="/AddTableData.do")
	@ResponseBody
	public AjaxResponse AddTableData(AfwtHandsonBean afwtHandsonBean,NssbAfwtHandson nssbAfwtHandson){
		
		try {
			    if((!"".equals(afwtHandsonBean.getApplyId()) && afwtHandsonBean.getApplyId()!=null )
			    	  && (!"".equals(afwtHandsonBean.getTableId()) &&   afwtHandsonBean.getTableId()!=null )  ){
			    
			    	
			    nssbAfwtHandson.setAfwtHandson(afwtHandsonBean.getRowData());	
			    String userName=(String) SecurityUtils.getSubject().getPrincipal();
			    User user1 = userService.getUserByName(userName);
			    nssbAfwtHandson.setAcceptName(user1.getYhmc());
			    nssbAfwtHandson.setAcceptId("2");
			   
			    nssbAfwtHandson.setAcceptDate(new Date());
			    nssbAfwtHandson.setModelId(afwtHandsonBean.getTableId());
				nahs.delAfwtByApplyId(nssbAfwtHandson,afwtHandsonBean);//更新中间表
				
			      return new AjaxResponse(MessageType.SUCCESS, "保存成功");
			}else{
				return new AjaxResponse(MessageType.ERROR, "保存失败");
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "保存失败");
		}				
		
		
	        
	}    
	/**
	 * 
	 * 根据tableId加载表的数据
	 * @return
	 */
	@RequestMapping(value="/LoadTableData.do")
	@ResponseBody
	public String LoadTableData(HandsonTable handsonTable,String applyId){		
		handsonTable.setHandsonId(applyId);
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		rowList=hdts.queryLoadHdTable(handsonTable);
		return JsonMapper.toJSONString(rowList);
	}
	

}
