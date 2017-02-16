package com.aisino.nssb.core.handsonTableModel.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTableModel.dao.HandsonTableModelDao;
import com.aisino.nssb.core.handsonTableModel.model.HandsonTableModel;



@Service
public class HandsonTableModelServiceImpl implements HandsonTableModelSerivce {

	@Autowired
	HandsonTableModelDao hdsd;
	
	
	public void delModel(HandsonTableModel handsonTableModel) {
		hdsd.delModel(handsonTableModel);
		
	}


	public void updateModel(HandsonTableModel handsonTableModel) {
		hdsd.delModel(handsonTableModel);
		
	}

	public String queryLoadTable(HandsonTableModel handsonTableModel) {
		return hdsd.LoadTable(handsonTableModel);
		
	}


	public void insertSelective(HandsonTableModel hstm
			) {
		hstm.setModel("1");
		hstm.setAddDate(new Date());//创建时间
		hdsd.delModel(hstm);//保存之前 先删除以前的数据
		hdsd.insert(hstm);//add表样
	}


	public List<Map<Object, Object>> selectModelName(
			PageInputBean pageInputBean, HandsonTableModel handsonTableModel) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("tzNssb", handsonTableModel.getTzNssb());
		param.put("model", "1");
		return hdsd.selectModelName(param);
	}


	public int selectModelNameCount(PageInputBean pageInputBean,
			HandsonTableModel handsonTableModel) {
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("tzNssb", handsonTableModel.getTzNssb());
		param.put("model", "1");
		return hdsd.selectModelNameCount(param);
	}


	public List<HandsonTableModel> selectListHandson(
			HandsonTableModel handsonTableModel) {
		
		return hdsd.selectListHandson(handsonTableModel);
	}


	public List<HandsonTableModel> selectListHandsonOr(
			HandsonTableModel handsonTableModel) {
		
		return hdsd.selectListHandsonOr(handsonTableModel);
	}


	public void updateModel(String modelId) {
		// TODO Auto-generated method stub
		
	}

}
