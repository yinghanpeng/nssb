package com.aisino.nssb.core.afwt.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.afwt.model.NssbAfwt;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.bean.PageInputBean;

public interface NssbAfwtService {

	
	List<Map<Object, Object>> queryAfwtByPage(PageInputBean pageInputBean,NssbAfwt  nssbAfwt);
	int queryAfwtCount(PageInputBean pageInputBean,NssbAfwt  nssbAfwt);
	List<Map<Object, Object>> queryAuditByPage(String auditDateBegin,String auditDateEnd,PageInputBean pageInputBean,NssbAfwt  nssbAfwt,String applyDateBegin,String applyDateEnd);
	int queryAuditCount(String auditDateBegin,String auditDateEnd,PageInputBean pageInputBean,NssbAfwt  nssbAfwt,String applyDateBegin,String applyDateEnd);
	
	void insertSelective(NssbAfwt nssbAfwt,NssbAfwtHandson nssbAfwtHandson);
	
	void updateAfwt(NssbAfwt nssbAfwt);
	
	void deleleAfwtById(String applyId);
	
	void upAfwtById(String applyId); 
	void  queryauditAfwtById(String applyId);
	
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
	List<String> queryTaxdBy(NssbAfwt nssbAfwt);
	
	

}
