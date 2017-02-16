package com.aisino.nssb.core.controller.Handson;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTableModel.model.HandsonTableModel;
import com.aisino.nssb.core.handsonTableModel.service.HandsonTableModelSerivce;
import com.alibaba.fastjson.JSONObject;


@Controller
@RequestMapping("/interface")
public class HandsonModelController {
	
	
	@Autowired
	HandsonTableModelSerivce hstms;
	
	
	/**
	 * 删除表样
	 * @param hstm
	 */
	@RequestMapping(value="/delTableModel.do")
	@ResponseBody
	public void delTableModel(HandsonTableModel hstm){
		
		hstms.delModel(hstm);
	
	}
	
	/**
	 * 根据modelId更新表样和表名
	 * @param hstm
	 */
	@RequestMapping(value="/updateTableModel.do")
	@ResponseBody
	public void updateTableModel(HandsonTableModel hstm){
		
		hstms.updateModel(hstm.getModelId());
	
	}
	/**
	 * 表样、表名保存
	 * @param hstm
	 * @return
	 */
	@RequestMapping(value="/addTableModel.do")
	@ResponseBody
	public String addTableModel(HandsonTableModel hstm){
		try {
			hstms.insertSelective(hstm);
			return "ok";
		} catch (Exception e) {
		    e.printStackTrace();
			return "error";
		}
		
		
		
	
	}
	
	/**
	 * 
	 * 根据modelId加载表样
	 * @param modelId
	 * @return
	 */
	@RequestMapping(value="/LoadTableModel.do")
	@ResponseBody
	public String LoadTableModel(HandsonTableModel handsonTableModel){
		
		String hstm = hstms.queryLoadTable(handsonTableModel);
		
		return JsonMapper.toJSONString(hstm);
	}
	/**
	 * 
	 * 查询出所有的表样名
	 * @return
	 */
	@RequestMapping(value="/LoadModelName.do")
	@ResponseBody
	public JSONObject LoadModelName(PageInputBean pageInputBean,HandsonTableModel handsonTableModel){
		
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		rowList =hstms.selectModelName(pageInputBean, handsonTableModel);
		int total =hstms.selectModelNameCount(pageInputBean, handsonTableModel); 
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);

		return rt;
		
		
		
	}
	
	
	
	
	
	

}
