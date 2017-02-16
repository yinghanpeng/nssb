package com.aisino.nssb.core.handsonTableModel.service;



import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTableModel.model.HandsonTableModel;

public interface HandsonTableModelSerivce {
	
    void updateModel(String modelId);
	
	void delModel(HandsonTableModel handsonTableModel);
	
	void insertSelective(HandsonTableModel hstm);
	
	String queryLoadTable(HandsonTableModel handsonTableModel);
    List<Map<Object,Object>> selectModelName(PageInputBean pageInputBean,HandsonTableModel handsonTableModel);
	
	int selectModelNameCount(PageInputBean pageInputBean,HandsonTableModel handsonTableModel); 
	
	List<HandsonTableModel>  selectListHandson(HandsonTableModel handsonTableModel);
	
	List<HandsonTableModel>  selectListHandsonOr(HandsonTableModel handsonTableModel);
	
	

}
