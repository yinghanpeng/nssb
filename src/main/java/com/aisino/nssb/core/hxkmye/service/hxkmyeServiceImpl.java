package com.aisino.nssb.core.hxkmye.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.hxkmye.dao.hxkmyeDao;
import com.aisino.nssb.core.hxkmye.model.hxkmye;
import com.aisino.nssb.core.hxkmye.model.hxkmyeBean;
import com.aisino.nssb.core.user.service.UserService;
import com.aisino.nssb.utils.BeanUtil;

@Service
public class hxkmyeServiceImpl implements hxkmyeService {

	@Autowired
	private hxkmyeDao jd;
	@Autowired
	UserService userService;// 用户表

	public List<hxkmye> getHxkmyeOneDay(String hxjg, String km, Date sjrq) {

		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("hxjg", hxjg);
		param.put("km", km);
		param.put("sjrq", sjrq);
		return jd.getHxkmyeOneDay(param);
	}

	public List<Map<Object, Object>> queryKmyeByPage(PageInputBean pb, hxkmyeBean hb) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pb.getPageSize() * (pb.getPageNumber() - 1) + 1;
		int end = pb.getPageSize() * pb.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		// 排序
		param.put("sortName", pb.getSortName());
		param.put("sortOrder", pb.getSortOrder());
		// 查询条件
		try {
			BeanUtil.reflect(hb, param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jd.queryKmyeByPage(param);
	}

	public int queryKmyeCount(PageInputBean pb, hxkmyeBean hxkmyebean) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pb.getPageSize() * (pb.getPageNumber() - 1) + 1;
		int end = pb.getPageSize() * pb.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		// 查询条件
		try {
			BeanUtil.reflect(hxkmyebean, param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jd.queryKmyeCount(param);
	}
	
	public void addKmye(hxkmye hb) {
		jd.addKmye(hb);
	}
	public void deleteKmye(Map<String, String> map) {
		jd.deleteKmye(map);
	}

	public BigDecimal getAllHxkmyeOneDay(String ystjg, String km, Date sjrq,String bmid,int sbbz) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("ystjg", ystjg);
		param.put("km", km);
		param.put("sjrq", sjrq);
		param.put("bmid", bmid);
		param.put("sbbz", sbbz);
		
		BigDecimal rt = new BigDecimal(0);
		rt = jd.getAllHxkmyeOneDay(param);
		if (rt == null)
			rt = new BigDecimal(0);
		return rt;
	}
	
	
	
	

}
