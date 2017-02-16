package com.aisino.nssb.core.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aisino.nssb.common.AjaxResponse;
import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.common.AjaxResponse.MessageType;
import com.aisino.nssb.core.afwt.service.NssbAfwtService;
import com.aisino.nssb.core.afwthd.Bean.NssbAfwtHandsonBean;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.afwthd.service.NssbAfwtHandsonService;
import com.aisino.nssb.core.bean.PageInputBean;
import com.alibaba.fastjson.JSONObject;

@Controller
@RequestMapping("/interface")
public class AfwthdController {
	
	@Autowired
	NssbAfwtService nas;
	
	@Autowired
	NssbAfwtHandsonService  nahs;
	
	
	
	/**
	 * 分页查询
	 * @param pageInputBean
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/queryAfwtHandsonByPage.do")
	@ResponseBody
	public JSONObject queryAfwtByPage(PageInputBean pageInputBean,NssbAfwtHandson nssbAfwtHandson) {
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		rowList = nahs.queryAfwtHdByPage(pageInputBean, nssbAfwtHandson);
		int total =nahs.queryAfwtHdCount(pageInputBean, nssbAfwtHandson); 
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);

		return rt;
		
	}
	
	@RequestMapping("/insertAfwtHandson.do")
	@ResponseBody
	public AjaxResponse insertAfwtHandson(NssbAfwtHandson nssbAfwtHandson) {
		
		try {
			nahs.insertSelective(nssbAfwtHandson);
			return new AjaxResponse(MessageType.SUCCESS, "添加成功");
		} catch (Exception e) {
		
			e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "添加失败");
		}
		
		
		
	}
	/**
	 * 查询表样和 数据的 统一接口，只是传的参数不同
	 * @param nssbAfwtHandson
	 * @return
	 */
	@RequestMapping("/selectAfwtHandson.do")
	@ResponseBody
	public String selectAfwtHandson(NssbAfwtHandsonBean nssbAfwtHandsonBean,String tableId) {
		nssbAfwtHandsonBean.setModelId(tableId);
		
		List<NssbAfwtHandson> nssbAfwtHandsonList=nahs.selectListByApplyId(nssbAfwtHandsonBean);
		
		return 	JsonMapper.toJSONString(nssbAfwtHandsonList);
		
		
		
	}

}
