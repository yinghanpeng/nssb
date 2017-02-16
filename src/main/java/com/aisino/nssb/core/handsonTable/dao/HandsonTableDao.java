package com.aisino.nssb.core.handsonTable.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.aisino.nssb.core.handsonTable.model.HandsonTable;

public interface HandsonTableDao {
	
	List<Map<Object, Object>> LoadHdTable(HandsonTable handsonTable);
	
	void insertSelective(HandsonTable handsonTable);
	
	void insertList(List<HandsonTable> tableList);
	
	void  delTable(String tableId);
	/**
	 * 批量删除
	 * @param map
	 */
	void deleteByHandsonIdList(@Param("map")Map<Object, Object> map);
	
	void delByHandsonId(HandsonTable handsonTable);
    
}