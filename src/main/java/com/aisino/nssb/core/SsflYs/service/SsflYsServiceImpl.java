package com.aisino.nssb.core.SsflYs.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.SsflBm.model.SsflBm;
import com.aisino.nssb.core.SsflYs.dao.SsflYsDao;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.SsflYs.model.SsflYs;


@Service
public class SsflYsServiceImpl  implements SsflYsService{
	
	@Autowired
	SsflYsDao syd;

	public List<Map<Object, Object>> querySsflByPage(PageInputBean pageInputBean, SsflYs sy,
			SsflBm sm) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		// 排序
		param.put("sortName", pageInputBean.getSortName());
		param.put("sortOrder", pageInputBean.getSortOrder());
		// 查询条件
		param.put("spmc", sy.getSpmc());//商品名称
		param.put("ssflmc", sm.getSsflmc());//税收分类名称
		
		
		
		return syd.querySsflByPage(param);
	}

	public int querySsflCount(PageInputBean pageInputBean, SsflYs sy, SsflBm sm){
			HashMap<String, Object> param = new HashMap<String, Object>();
			int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
			int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
			// 分页
			param.put("start", start);
			param.put("end", end);
			// 查询条件
			param.put("spmc", sy.getSpmc());//商品名称
			param.put("ssflmc", sm.getSsflmc());//税收分类名称
			
			
			
			return syd.querySsflCount(param);
	}


	



	public void addSsflYs(String spmc, String ssflbm) {
		SsflYs ys = new SsflYs();
		
		ys.setSpmc(spmc);
		ys.setSsflbm(ssflbm);
		syd.insertSelective(ys);
		
	}


	public void updateSsflYs(String spmcId, String spmc, String ssflbm) {
		HashMap<String,String> param = new HashMap<String,String>();
		param.put("spmcId", spmcId);
		param.put("spmc", spmc);
		param.put("ssflbm", ssflbm);
		syd.updateSsflYs(param);
	}


	public void deleleSsflById(String spmc) {
		String[] spmcArray=spmc.split(",");
		List<String> list = Arrays.asList(spmcArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		syd.deleteSsflById(map);
		
	}


	public boolean getAllBySpmc(String spmc) {
		
		List<SsflYs> list =syd.getAllBySpmc(spmc);
		if(list.size()>0){
			return false;
			
		}else{
			return true;
		}
	}

	



}
