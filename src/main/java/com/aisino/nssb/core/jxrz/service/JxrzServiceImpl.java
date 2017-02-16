package com.aisino.nssb.core.jxrz.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.bean.JxrzBean;
import com.aisino.nssb.core.jxrz.dao.JxrzDao;

@Service
public class JxrzServiceImpl implements JxrzService {
	@Autowired
	private JxrzDao jxrzdao;

	public Map<Object, Object> getJeSeJxp(JxrzBean jxrzBean) {
		return jxrzdao.getJeSeJxp(jxrzBean);
	}

	public List<Map<Object, Object>> getKkpz(JxrzBean jxrzBean) {
		return jxrzdao.getKkpz(jxrzBean);
	}

	public String getHzfpSe(JxrzBean jxrzBean) {
		return jxrzdao.getHzfpSe(jxrzBean);
	}

	public String getBdcSe(JxrzBean jxrzBean) {
		return jxrzdao.getBdcSe(jxrzBean);
	}

	public String getGdzcSe(JxrzBean jxrzBean) {
		return jxrzdao.getGdzcSe(jxrzBean);
	}
	
	public String getGdzcSe1(JxrzBean jxrzBean) {
		return jxrzdao.getGdzcSe1(jxrzBean);
	}

	public List<Map<Object, Object>> getJxpMx(JxrzBean jxrzBean) {
		return jxrzdao.getJxpMx(jxrzBean);
	}

	public Map<Object, Object> getBdc(JxrzBean jxrzBean) {
		return jxrzdao.getBdc(jxrzBean);
	}

}
