package com.aisino.nssb.core.SsflYs.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.aisino.nssb.core.SsflYs.model.SsflYs;

public interface SsflYsDao {
	
	
	List<Map<Object, Object>> querySsflByPage(Map<String, Object> param);
	
	int querySsflCount(Map<String, Object> param);
	
	void deleteSsflById(@Param("map")Map<Object,Object> map);

	void insertSelective(SsflYs ys);
	/**
	 * 商品名的验证
	 * @param spmc
	 * @return
	 */
	List<SsflYs> getAllBySpmc(String spmc);

	void updateSsflYs(HashMap<String, String> param);

}
