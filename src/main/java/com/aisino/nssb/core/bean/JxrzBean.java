package com.aisino.nssb.core.bean;

public class JxrzBean {

	private String begindate;
	private String enddate;
	private String rzjg;
	private String dkzt;
	private String bmid;
	private String sbbz;
	private String gdzcbs;
	private String zcbs;
	// 发票用途（1：用于简易计税方法计税项目；2：用于免征或不征增值税项目；3：用于集体福利、个人消费；4：非正常损失；5：购进的旅客运输服务、贷款服务、餐饮服务、居民日常、娱乐服务等；6：用于视同销售项目,全部；7：用于不可抵扣用途；8：用于不可抵扣用途）
	private String fpyt;
	private String fplb;

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

	public String getRzjg() {
		return rzjg;
	}

	public void setRzjg(String rzjg) {
		this.rzjg = rzjg;
	}

	public String getDkzt() {
		return dkzt;
	}

	public void setDkzt(String dkzt) {
		this.dkzt = dkzt;
	}

	public String getBmid() {
		return bmid;
	}

	public void setBmid(String bmid) {
		this.bmid = bmid;
	}

	public String getSbbz() {
		return sbbz;
	}

	public void setSbbz(String sbbz) {
		this.sbbz = sbbz;
	}

	public String getGdzcbs() {
		return gdzcbs;
	}

	public void setGdzcbs(String gdzcbs) {
		this.gdzcbs = gdzcbs;
	}

	public String getZcbs() {
		return zcbs;
	}

	public void setZcbs(String zcbs) {
		this.zcbs = zcbs;
	}

	public String getFpyt() {
		return fpyt;
	}

	public void setFpyt(String fpyt) {
		this.fpyt = fpyt;
	}

	public String getFplb() {
		return fplb;
	}

	public void setFplb(String fplb) {
		this.fplb = fplb;
	}

}
