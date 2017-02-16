package com.aisino.nssb.core.hxkmye.model;

import java.math.BigDecimal;


public class hxkmye {
	private String glOrgId;

	private String dtlActOrgId;

	private String actItmId;

	private String ccyCd;

	private BigDecimal bal;

	private BigDecimal dbtAmt;

	private BigDecimal crdAmt;
	
	private String pstDt;

	private String dataDt;

	public String getGlOrgId() {
		return glOrgId;
	}

	public void setGlOrgId(String glOrgId) {
		this.glOrgId = glOrgId == null ? null : glOrgId.trim();
	}

	public String getDtlActOrgId() {
		return dtlActOrgId;
	}

	public void setDtlActOrgId(String dtlActOrgId) {
		this.dtlActOrgId = dtlActOrgId == null ? null : dtlActOrgId.trim();
	}

	public String getActItmId() {
		return actItmId;
	}

	public void setActItmId(String actItmId) {
		this.actItmId = actItmId == null ? null : actItmId.trim();
	}

	public String getCcyCd() {
		return ccyCd;
	}

	public void setCcyCd(String ccyCd) {
		this.ccyCd = ccyCd == null ? null : ccyCd.trim();
	}

	public BigDecimal getBal() {
		return bal;
	}

	public void setBal(BigDecimal bal) {
		this.bal = bal;
	}

	public BigDecimal getDbtAmt() {
		return dbtAmt;
	}

	public void setDbtAmt(BigDecimal dbtAmt) {
		this.dbtAmt = dbtAmt;
	}

	public BigDecimal getCrdAmt() {
		return crdAmt;
	}

	public void setCrdAmt(BigDecimal crdAmt) {
		this.crdAmt = crdAmt;
	}

	public String getPstDt() {
		return pstDt;
	}

	public void setPstDt(String pstDt) {
		this.pstDt = pstDt;
	}

	public String getDataDt() {
		return dataDt;
	}

	public void setDataDt(String dataDt) {
		this.dataDt = dataDt;
	}

	
}
