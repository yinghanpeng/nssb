package com.aisino.nssb.core.handsonTable.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.handsonTable.model.HandsonTable;

public interface HandsonTableService {
	
	List<Map<Object, Object>> queryLoadHdTable(HandsonTable handsonTable);
	
	void insertTable(HandsonTable  handsonTable);
	
	void insertList(List<HandsonTable> tableList);
	
	void  delTable(String tableId);
	
	void delByHandsonId(HandsonTable handsonTable);

}
