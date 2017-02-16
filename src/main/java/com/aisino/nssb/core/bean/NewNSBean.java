package com.aisino.nssb.core.bean;

/**
 * @author haopeng
 *
 */
public class NewNSBean {
	/**
	 * 纳税人识别号
	 */
	public String nsrId;
	/**
	 * 纳税人名称
	 */
	public String nsrName;
	/**
	 * 审核机构
	 */
	public String auditingOrg;
	/**
	 * 申请人
	 */
	public String applicant;
	
	public String getNsrId() {
		return nsrId;
	}
	public void setNsrId(String nsrId) {
		this.nsrId = nsrId;
	}
	public String getNsrName() {
		return nsrName;
	}
	public void setNsrName(String nsrName) {
		this.nsrName = nsrName;
	}
	public String getAuditingOrg() {
		return auditingOrg;
	}
	public void setAuditingOrg(String auditingOrg) {
		this.auditingOrg = auditingOrg;
	}
	public String getApplicant() {
		return applicant;
	}
	public void setApplicant(String applicant) {
		this.applicant = applicant;
	}
	
	

}
