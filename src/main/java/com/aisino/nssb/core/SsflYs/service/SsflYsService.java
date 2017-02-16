package com.aisino.nssb.core.SsflYs.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.SsflBm.model.SsflBm;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.SsflYs.model.SsflYs;


public interface SsflYsService {
	
	
	List<Map<Object, Object>> querySsflByPage(PageInputBean pageInputBean,SsflYs sy,SsflBm sm);
	int querySsflCount(PageInputBean pageInputBean,SsflYs sy,SsflBm sm);

	
	void deleleSsflById(String spmc);


	void addSsflYs(String spmc,String ssflbm);
	
	void updateSsflYs(String spmcId, String spmc, String ssflbm);

	public boolean getAllBySpmc(String spmc);
}
