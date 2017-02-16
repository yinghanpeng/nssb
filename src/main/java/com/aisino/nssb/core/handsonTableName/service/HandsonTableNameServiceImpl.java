package com.aisino.nssb.core.handsonTableName.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.handsonTableName.dao.HandsonTableNameDao;
import com.aisino.nssb.core.handsonTableName.model.HandsonTableName;

@Service
public class HandsonTableNameServiceImpl implements HandsonTableNameService {
	
	@Autowired
	HandsonTableNameDao   hstn;
	

	public void delTableName(String tableId) {
		hstn.delTableName(tableId);
		
	}

	public void insert(HandsonTableName handsonTableName) {
		hstn.insert(handsonTableName);
		
	}

	public List<Map<Object, Object>> selectTableName() {
		return hstn.selectTableName();
	
	}

	public void updateTableName(String tableId) {
		hstn.updateTableName(tableId);
		
	}

}
