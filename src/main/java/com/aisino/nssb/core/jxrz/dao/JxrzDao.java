package com.aisino.nssb.core.jxrz.dao;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.JxrzBean;

public interface JxrzDao {

	//进项发票金额税额份数
	Map<Object, Object> getJeSeJxp(JxrzBean jxrzBean);
	//扣款凭证
	List<Map<Object, Object>> getKkpz(JxrzBean jxrzBean);
	//以当前机构为购方的红字发票的税额
	String getHzfpSe(JxrzBean jxrzBean);
	//不动产可抵扣税额
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
