package com.aisino.nssb.core.handsonTableName.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.handsonTableName.model.HandsonTableName;

public interface HandsonTableNameService {
	
	void insert(HandsonTableName handsonTableName);
	void updateTableName(String tableId);
	void delTableName(String tableId);	
	List<Map<Object,Object>> selectTableName();  

}
