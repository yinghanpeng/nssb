package com.aisino.nssb.core.bean;

public class BusinessBean {
	/**
	 * 一事通机构号
	 */
	private String orgNo;
	/**
	 * 所属期起
	 */
	private String startDate;
	/**
	 * 所属期止
	 */
	private String endDate;
	/**
	 * 发票种类0专票2普票
	 */
	private String invoiceType;
	/**
	 * 税率0.17/0.13
	 */
	private String taxRate;
	/**
	 * 会计科目
	 */
	private String account;
	/**
	 * 认证状态
	 */
	private String verificationStatus;
	/**
	 * 抵扣状态
	 */
	private String deductionStatus;

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getInvoiceType() {
		return invoiceType;
	}

	public void setInvoiceType(String invoiceType) {
		this.invoiceType = invoiceType;
	}

	public String getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(String taxRate) {
		this.taxRate = taxRate;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getVerificationStatus() {
		return verificationStatus;
	}

	public void setVerificationStatus(String verificationStatus) {
		this.verificationStatus = verificationStatus;
	}

	public String getDeductionStatus() {
		return deductionStatus;
	}

	public void setDeductionStatus(String deductionStatus) {
		this.deductionStatus = deductionStatus;
	}

}
