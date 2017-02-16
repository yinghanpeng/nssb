package com.aisino.nssb.core.xxfp.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.XxfpBean;

public interface xxfpService {
	// 查询申报标志
	List<Map<Object, Object>> getJgxx(String jg);

	// table1_1 1_2取销项发票
	List<Map<Object, Object>> getXxfp(XxfpBean xxfpBean);

	/**
	 * 1月13日新增接口，取主表表头信息
	 * 
	 * @param nsrsbh
	 *            纳税人识别号
	 * @return
	 */
	List<Map<Object, Object>> getHeader(String nsrsbh);
}
