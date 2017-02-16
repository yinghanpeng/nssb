package com.aisino.nssb.core.table1.service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aisino.nssb.core.bean.InputBean;
import com.aisino.nssb.core.hxkmye.service.hxkmyeService;
import com.aisino.nssb.core.xxfp.service.xxfpService;
import com.aisino.nssb.utils.DateUtil;

@Service
public class table1ServiceImpl implements table1Service {
	@Autowired
	private hxkmyeService hxkmyeservice;
	@Autowired
	xxfpService xs;// 销项

	private Date qsrq;
	private Date jsrq;
	private InputBean inputBean;

	public void init(InputBean inputBean) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		qsrq = sdf.parse(inputBean.getSbqq());
		jsrq = sdf.parse(inputBean.getSbqz());
		this.inputBean = inputBean;
	}

	// 第三张表
	private BigDecimal getHxkmye(List<String> km, Date qsrq, Date jsrq, String ystjg) throws Exception {
		int sbbz = Integer.parseInt(xs.getJgxx(ystjg).get(0).get("SBBZ").toString());
		String bmid=ystjg;
		BigDecimal rt = new BigDecimal("0");
		// 获得月份
		List<Date> months = DateUtil.getMonth(qsrq, jsrq);
		// 按月循环
		for (Date tmp : months) {
			// 每月1日
			Date monthStart = DateUtil.getMinMonthDate(tmp);
			// 每月末日
			Date monthEnd = DateUtil.getMaxMonthDate(tmp);
			// 按科目循环
			for (String tmpKm : km) {
				// 查询月初余额
				BigDecimal start = new BigDecimal(0);
				start = hxkmyeservice.getAllHxkmyeOneDay(ystjg, tmpKm, monthStart,bmid,sbbz);
				//月末余额
				BigDecimal end = new BigDecimal(0);
				end = hxkmyeservice.getAllHxkmyeOneDay(ystjg, tmpKm, monthEnd,bmid,sbbz);
				rt = rt.add(end).subtract(start);
			}
		}
		return rt;
	}
	
	/**
	 * 17%税率的货物及加工修理修配劳务 未开具发票金额 （科目余额216509+216514）
	 */
	public BigDecimal getSheet3C3R8() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216509");
		km.add("216514");
//		km.add("208102");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 11%税率 未开具发票金额 （科目余额216510+216515）
	 */
	public BigDecimal getSheet3C3R11() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216510");
		km.add("216515");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 6%税率（利息收入） 未开具发票金额 （科目余额216501）
	 */
	public BigDecimal getSheet3C3R12() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216501");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 6%税率（手续费收入） 未开具发票金额 （科目余额216502）
	 */
	public BigDecimal getSheet3C3R13() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216502");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 6%税率（金融商品转让） 未开具发票金额
	 * （科目余额21650399+21650499+21650599+21650699+21650799+21650899）
	 */
	public BigDecimal getSheet3C3R14() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("21650399");
		km.add("21650499");
		km.add("21650599");
		km.add("21650699");
		km.add("21650799");
		km.add("21650899");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 6%税率（其他） 未开具发票金额 （科目余额216511+216516）
	 */
	public BigDecimal getSheet3C3R15() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216511");
		km.add("216516");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 5%征收率的服务、不动产和无形资产 未开具发票金额 （科目余额216512）
	 */
	public BigDecimal getSheet3C3R17() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216512");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	/**
	 * 3%征收率的货物及加工修理修配劳务 未开具发票金额 （科目余额216513）
	 */
	public BigDecimal getSheet3C3R18() throws Exception {
		BigDecimal rt = new BigDecimal("0");
		// 科目
		List<String> km = new ArrayList<String>();
		km.add("216513");
		rt = getHxkmye(km, qsrq, jsrq, inputBean.getYstjgh());
		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	public BigDecimal getSheet3C4R21() {
		BigDecimal rt = new BigDecimal(0);
//		// 免税收入
//		// 一事通机构
//		// 判断是否为总行
//
//		// 如果是总行
//		if (inputBean.getYstjgh() == "0000") {
//			// 取opics表总额
//			// 取交易流水表ms=1且djlybs=资金业务管理系统的金额汇总
//			rt = rt.add(jylsservice.getJylsFnJe(inputBean.getYstjgh(), qsrq, jsrq));
//		}
//		// rt = rt.add(jylsservice.getJylsJe(ystjgh, qsrq, jsrq));
//		//logger.info("机构"+inputBean.getYstjgh()+"查询" + Thread.currentThread().getStackTrace()[1].getMethodName() + "数据:" + rt.stripTrailingZeros().toPlainString());
		return rt;
	}

	public BigDecimal getSheet3C4R22() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet2C3R43() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet2C3R46() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet2C3R52() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R10() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R11() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R12() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R13() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R14() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R15() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R16() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R17() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R18() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R19() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R8() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

	public BigDecimal getSheet3C4R9() {
		// TODO Auto-generated method stub
		return new BigDecimal("0");
	}

}
