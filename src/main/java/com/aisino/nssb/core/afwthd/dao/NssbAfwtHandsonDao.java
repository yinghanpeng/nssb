package com.aisino.nssb.core.afwthd.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;




public interface NssbAfwtHandsonDao {
   
	void insertAfwths(NssbAfwtHandson nssbAfwtHandson);
	void insertList(List<NssbAfwtHandson> nssbList);
	
	/**
	 * 批量删除
	 * @param map
	 */
	void deleteAfwthsById(@Param("map")Map<Object,Object> map);
	
	
	NssbAfwtHandson selectByApplyId(String applyId);
	/**
	 * 批量查询
	 * @param map
	 * @return
	 */
	  List<String> queryHandsonByIds(Map<Object, Object> map); 
	  void delAfwtByApplyId(NssbAfwtHandson nssbAfwtHandson);
	  
	  /**
	   * 测试导出
	   * @param nssbAfwtHandson
	   */
	  void  insertSelective(NssbAfwtHandson nssbAfwtHandson);
	  /**
	   * 
	   * @param nssbAfwtHandson
	   * @return
	   */
	  List<NssbAfwtHandson>  selectListByApplyId(Map<String, Object> param);

	  /**
	   * 分页查询表名
	   * @param param
	   * @return
	   */
	  List<Map<Object, Object>> queryAfwtHdByPage(Map<String, Object> param);
	/**
	 * 流水的所有表的总数	
	 * @param param
	 * @return
	 */
	  int queryAfwtHdCount(Map<String, Object> param); 
	  
	  /**
	   * 通过流水单号查询受理状态
	   * @param ApplyId
	   * @return
	   */
	  List<String>  selectStateByApplyId(String applyId);
	
   
}