package com.aisino.nssb.core.jxrz.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.JxrzBean;

public interface JxrzService {

	Map<Object, Object> getJeSeJxp(JxrzBean jxrzBean);
	List<Map<Object, Object>> getKkpz(JxrzBean jxrzBean);
	String getHzfpSe(JxrzBean jxrzBean);
	String getBdcSe(JxrzBean jxrzBean);
	//固定资产（不包括不动产）税额
	String getGdzcSe(JxrzBean jxrzBean);
	//固定资产（不包括不动产）税额,第一期之前
	String getGdzcSe1(JxrzBean jxrzBean);
	//进项票明细
	List<Map<Object, Object>> getJxpMx(JxrzBean jxrzBean);
	//不动产发票金额税额份数
	Map<Object, Object> getBdc(JxrzBean jxrzBean);
}
