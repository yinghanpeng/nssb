package com.aisino.nssb.core.afwt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.aisino.nssb.core.afwt.model.NssbAfwt;



public interface NssbAfwtDao {
	
	
	List<Map<Object, Object>> queryAfwtByPage(Map<String, Object> param);
	
	int queryAfwtCount(Map<String, Object> param); 
	
	List<Map<Object, Object>> queryAuditByPage(Map<String, Object> param);
	
	int queryAuditCount(Map<String, Object> param); 
	
	void insertSelective(NssbAfwt nssbAfwt);
	
	void updateAfwt(NssbAfwt nssbAfwt);
	/**
	 * 批量删除
	 * @param map
	 */
	void deleteAfwtById(@Param("map")Map<Object,Object> map);
	
	
	/**
	 * 批量修改
	 * @param map
	 */
	void upAfwtById(@Param("map")Map<Object,Object> map);
	
	void  auditAfwtById(@Param("map")Map<Object,Object> map);
	
	NssbAfwt  selectAfwt(NssbAfwt nssbAfwt);
	/**
	 * 判断税期号
	 * @param nsrsbhId
	 * @return
	 */
	int queryTaxDateIdCount(NssbAfwt nssbAfwt); 
	
	/**
	 * 判断此识别号未审核的只有一条 
	 * @param nssbAfwt
	 * @return
	 */
	List<NssbAfwt>  queryAfwtBynsr(NssbAfwt nssbAfwt);
	/**
	 * 根据时间查同一个机构号的税期号
	 * @param sdate
	 * @param qxBmId
	 * @return
	 */
	List<String> queryTaxdBy(NssbAfwt nssbAfwt);

	
   
}