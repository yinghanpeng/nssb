package com.aisino.nssb.core.afwthd.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.afwthd.Bean.NssbAfwtHandsonBean;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTable.bean.AfwtHandsonBean;
public interface NssbAfwtHandsonService {
	
	
	NssbAfwtHandson selectByApplyId(String applyId);
	 void delAfwtByApplyId(NssbAfwtHandson nssbAfwtHandson, AfwtHandsonBean afwtHandsonBean);
	 void insertAfwths(NssbAfwtHandson nssbAfwtHandson);

	 
	  /**
	   * 测试导出
	   * @param nssbAfwtHandson
	   */
	  void  insertSelective(NssbAfwtHandson nssbAfwtHandson);
	  List<NssbAfwtHandson>  selectListByApplyId(NssbAfwtHandsonBean nssbAfwtHandsonBean);
	  /**
	   * 批量 导入
	   * @param nssbList
	   */
	  void insertList(List<NssbAfwtHandson> nssbList);
	  
	  List<Map<Object, Object>> queryAfwtHdByPage(PageInputBean pageInputBean,NssbAfwtHandson nssbAfwtHandson);
	  int queryAfwtHdCount(PageInputBean pageInputBean,NssbAfwtHandson nssbAfwtHandson);
	  
	  /**
	   * 通过流水单号查询受理状态
	   * @param ApplyId
	   * @return
	   */
	  List<String>  selectStateByApplyId(String applyId);
}
