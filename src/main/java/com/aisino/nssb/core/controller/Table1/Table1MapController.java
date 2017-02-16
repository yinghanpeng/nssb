package com.aisino.nssb.core.controller.Table1;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.aisino.nssb.core.bean.InputBean;
import com.aisino.nssb.core.table1.service.table1Service;

@Controller
public class Table1MapController {
	@Resource
	private table1Service table1;

	@RequestMapping("/main.do")
	public String execute() {
		String a = "index";
		return a;
	}

	@RequestMapping("/xall.do")
	@ResponseBody
	@SuppressWarnings("unchecked")
	public List<Map<Object,Object>> getTable1All(InputBean bean) throws Exception {
		if (bean.getYstjgh().isEmpty() || bean.getSbqq().isEmpty()
				|| bean.getSbqz().isEmpty()) {
			return new ArrayList<Map<Object,Object>>();
		}
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		HashMap<String, String> rowMap = new HashMap<String, String>();
		table1.init(bean);

		rowMap.clear();
		rowMap.put("project", "17%税率的货物及加工修理修配劳务 未开具发票金额 （科目余额216509+216514）");
		rowMap.put("interface_name", "x3c8");
		rowMap.put("data", table1.getSheet3C3R8().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put("project", "11%税率 未开具发票金额 （科目余额216510+216515）");
		rowMap.put("interface_name", "x3c11");
		rowMap.put("data", table1.getSheet3C3R11().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put("project", "6%税率（利息收入） 未开具发票金额 （科目余额216501）");
		rowMap.put("interface_name", "x3c12");
		rowMap.put("data", table1.getSheet3C3R12().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put("project", "6%税率（手续费收入） 未开具发票金额 （科目余额216502）");
		rowMap.put("interface_name", "x3c13");
		rowMap.put("data", table1.getSheet3C3R13().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put(
				"project",
				"6%税率（金融商品转让） 未开具发票金额（科目余额21650399+21650499+21650599+21650699+21650799+21650899）");
		rowMap.put("interface_name", "x3c14");
		rowMap.put("data", table1.getSheet3C3R14().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put("project", "6%税率（其他） 未开具发票金额 （科目余额216511+216516）");
		rowMap.put("interface_name", "x3c15");
		rowMap.put("data", table1.getSheet3C3R15().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());

		rowMap.clear();
		rowMap.put("project", "5%征收率的服务、不动产和无形资产 未开具发票金额 （科目余额216512）");
		rowMap.put("interface_name", "x3c17");
		rowMap.put("data", table1.getSheet3C3R17().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());
		rowMap.clear();
		rowMap.put("project", "3%征收率的货物及加工修理修配劳务 未开具发票金额 （科目余额216513）");
		rowMap.put("interface_name", "x3c18");
		rowMap.put("data", table1.getSheet3C3R18().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());
		rowMap.clear();
		rowMap.put("project", "货物及加工修理修配劳务免税销售额");
		rowMap.put("interface_name", "x3d21");
		rowMap.put("data", table1.getSheet3C4R21().stripTrailingZeros()
				.toPlainString());
		rowList.add((HashMap<Object,Object>) rowMap.clone());
		return rowList;
	}

}
