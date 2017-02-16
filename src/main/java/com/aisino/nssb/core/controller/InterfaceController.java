package com.aisino.nssb.core.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.aisino.nssb.core.bean.JxrzBean;
import com.aisino.nssb.core.bean.XxfpBean;
import com.aisino.nssb.core.hxkmye.service.hxkmyeService;
import com.aisino.nssb.core.jxrz.service.JxrzService;
import com.aisino.nssb.core.xxfp.service.xxfpService;

@Controller
@RequestMapping("/interface")
public class InterfaceController {

	@Autowired
	xxfpService xs;// 销项

	@Autowired
	JxrzService js;
	@Autowired
	hxkmyeService hs;



	@RequestMapping("/getTable1_*Xxfp.do")
	@ResponseBody
	public List<Map<Object, Object>> getXxfp(XxfpBean xxfpBean) {
		String sbbz = xs.getJgxx(xxfpBean.getYstjg()).get(0).get("SBBZ").toString();
		xxfpBean.setSbbz(sbbz);
		List<Map<Object, Object>> JeSeJxp = xs.getXxfp(xxfpBean);
		return JeSeJxp;
	}



	@RequestMapping("/getTable2_*JxJeSeFs.do")
	@ResponseBody
	public Map<Object, Object> getJeSeJxp(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		Map<Object, Object> JeSeJxp = js.getJeSeJxp(jxrzBean);
		return JeSeJxp;
	}
	@RequestMapping("/getTable2_*Kkpz.do")
	@ResponseBody
	public List<Map<Object, Object>> getKkpz(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		List<Map<Object, Object>> JeSeJxp = js.getKkpz(jxrzBean);
		return JeSeJxp;
	}
	
	@RequestMapping("/getTable2_*HzfpSe.do")
	@ResponseBody
	public String getHzfpSe(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getHzfpSe(jxrzBean);
	}
	//表2_1不动产税额
	@RequestMapping("/getTable2_1BdcSe.do")
	@ResponseBody
	public String getBdcSe(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getBdcSe(jxrzBean);
	}
	
	//取表头信息
	@RequestMapping("/getMainTable_header.do")
	@ResponseBody
	public List<Map<Object, Object>> getHeader(String nsrsbh) {
		return xs.getHeader(nsrsbh);
	}
	
	//表6_1固定资产税额
	@RequestMapping("/getTable6_1BdcSe.do")
	@ResponseBody
	public String getGdzcSe(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getGdzcSe(jxrzBean);
	}
	
	//表6_1固定资产税额，第一期之前值
	@RequestMapping("/getTable6_1BdcSeBefore1.do")
	@ResponseBody
	public String getGdzcSe1(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getGdzcSe1(jxrzBean);
	}
	
	//表5_2不动产发票明细数据
	@RequestMapping("/getTable5_2.do")
	@ResponseBody
	public List<Map<Object, Object>> getTable5_2(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getJxpMx(jxrzBean);
	}
	//表2_1不动产发票明金额税额份数
	@RequestMapping("/getBdc.do")
	@ResponseBody
	public Map<Object, Object> getBdc(JxrzBean jxrzBean) {
		String sbbz = xs.getJgxx(jxrzBean.getBmid()).get(0).get("SBBZ").toString();
		jxrzBean.setSbbz(sbbz);
		return js.getBdc(jxrzBean);
	}
}
