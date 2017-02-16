package com.aisino.nssb.core.handsonTable.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.handsonTable.dao.HandsonTableDao;
import com.aisino.nssb.core.handsonTable.model.HandsonTable;

@Service
public class HandsonTableServiceImpl implements HandsonTableService{
	@Autowired
	private HandsonTableDao hdt;
	
	public List<Map<Object, Object>> queryLoadHdTable(HandsonTable handsonTable) {
		
		return hdt.LoadHdTable( handsonTable);
		
	}

	public void insertTable(HandsonTable handsonTable) {
		hdt.insertSelective(handsonTable);
	}

	public void insertList(List<HandsonTable> tableList) {
		hdt.insertList(tableList);
		
	}

	public void delTable(String tableId) {
		hdt.delTable(tableId);
		
	}

	public void delByHandsonId(HandsonTable handsonTable) {
		hdt.delByHandsonId( handsonTable);
		
	}

	

}
