package com.aisino.nssb.core.xxfp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.bean.XxfpBean;
import com.aisino.nssb.core.xxfp.dao.xxfpDao;

@Service
public class xxfpServiceImpl implements xxfpService {
	@Autowired
	private xxfpDao xxfpdao;

	public List<Map<Object, Object>> getJgxx(String ystjg) {
		return xxfpdao.getJgxx(ystjg);
	}

	public List<Map<Object, Object>> getHeader(String nsrsbh) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("nsrsbh", nsrsbh);
		return xxfpdao.getHeader(param);
	}

	public List<Map<Object, Object>> getXxfp(XxfpBean xxfpBean) {
		return xxfpdao.getXxfp(xxfpBean);
	}

}
