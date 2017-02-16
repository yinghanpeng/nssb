package com.aisino.nssb.core.handsonTableModel.dao;



import java.util.List;
import java.util.Map;



import com.aisino.nssb.core.handsonTableModel.model.HandsonTableModel;

public interface HandsonTableModelDao {
	
	 
	void updateModel(HandsonTableModel handsonTableModel);
	
	void delModel(HandsonTableModel handsonTableModel);
	
	void insert(HandsonTableModel   hdsModel);
	
	String  LoadTable(HandsonTableModel handsonTableModel);
	
	List<Map<Object,Object>> selectModelName(Map<String, Object> param);
	
	int selectModelNameCount(Map<String, Object> param); 
	
	List<HandsonTableModel>  selectListHandson(HandsonTableModel handsonTableModel);
	
	
	List<HandsonTableModel>  selectListHandsonOr(HandsonTableModel handsonTableModel);

	
	
	
	

}
