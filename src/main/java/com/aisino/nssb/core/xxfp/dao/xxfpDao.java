package com.aisino.nssb.core.xxfp.dao;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.XxfpBean;

public interface xxfpDao {
	//查询机构申报标志
	List<Map<Object, Object>> getJgxx(String jg);

	//取销项发票
	List<Map<Object, Object>> getXxfp(XxfpBean xxfpBean);
	
	//取主表表头信息
	List<Map<Object, Object>> getHeader(Map<String, Object> param);
}
