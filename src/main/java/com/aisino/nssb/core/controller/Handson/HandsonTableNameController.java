package com.aisino.nssb.core.controller.Handson;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.core.handsonTableName.service.HandsonTableNameService;

@Controller
@RequestMapping("/interface")
public class HandsonTableNameController {
	
	@Autowired
	HandsonTableNameService  hstns;
	
	/**
	 * 
	 * 查询出所有的表名
	 * @return
	 */
	@RequestMapping(value="/LoadTableName.do")
	@ResponseBody
	public String LoadTableName(){
		
		 List<Map<Object,Object>> listName = hstns.selectTableName();
		return JsonMapper.toJSONString(listName);
		
		
		
	}

}
