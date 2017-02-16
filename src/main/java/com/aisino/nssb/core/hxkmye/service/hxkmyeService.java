package com.aisino.nssb.core.hxkmye.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.hxkmye.model.hxkmye;
import com.aisino.nssb.core.hxkmye.model.hxkmyeBean;

/**
 * 查询某一天，某个机构的某个科目的余额
 * 
 * @param hxjg
 *            核心机构
 * @param km
 *            会计科目
 * @param date
 *            日期
 * 
 *            return hxkmye 科目余额
 */
public interface hxkmyeService {

	/**
	 * 
	 * @param hxjg
	 *            核心机构号
	 * @param km
	 *            科目
	 * @param date
	 *            日期
	 * @return 科目余额对象
	 */
	List<hxkmye> getHxkmyeOneDay(String hxjg, String km, Date date);
	BigDecimal getAllHxkmyeOneDay(String ystjg, String km, Date sjrq,String bmid,int sbbz);
	List<Map<Object, Object>> queryKmyeByPage(PageInputBean pageInputBean,hxkmyeBean hxkmyebean);
	int queryKmyeCount(PageInputBean pb,hxkmyeBean hxkmyebean);
	void addKmye(hxkmye hb);
	void deleteKmye(Map<String, String> map);

}
