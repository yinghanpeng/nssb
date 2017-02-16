package com.aisino.nssb.core.bean;

public class XxfpBean {
	//开票时间起
	private String begindate;
	//开票时间止
	private String enddate;

	
	//申报标志 0属地1汇总
	private String sbbz;
	//发票种类 0专票1普票
	private String fpzl;
	//发票类别 0正数1负数
	private String fplb;
	private String ystjg;
	public String getBegindate() {
		return begindate;
	}
	public void setBegindate(String begindate) {
		this.begindate = begindate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public String getSbbz() {
		return sbbz;
	}
	public void setSbbz(String sbbz) {
		this.sbbz = sbbz;
	}
	public String getFpzl() {
		return fpzl;
	}
	public void setFpzl(String fpzl) {
		this.fpzl = fpzl;
	}
	public String getFplb() {
		return fplb;
	}
	public void setFplb(String fplb) {
		this.fplb = fplb;
	}
	public String getYstjg() {
		return ystjg;
	}
	public void setYstjg(String ystjg) {
		this.ystjg = ystjg;
	}

}
