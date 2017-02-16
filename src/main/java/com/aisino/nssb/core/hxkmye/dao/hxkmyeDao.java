package com.aisino.nssb.core.hxkmye.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


import com.aisino.nssb.core.hxkmye.model.hxkmye;

/**
 * 查询某一天，某个机构的某个科目的余额
 */
public interface hxkmyeDao {

	List<hxkmye> getHxkmyeOneDay(Map<String, Object> param);
	BigDecimal getAllHxkmyeOneDay(Map<String, Object> param);
//	@Cacheable(value = { "queryKmyeByPage" })
	List<Map<Object, Object>> queryKmyeByPage(Map<String, Object> param);
	
	int queryKmyeCount(Map<String, Object> param);
	
	void addKmye(hxkmye hb);

	void deleteKmye(Map<String, String> map);
}

