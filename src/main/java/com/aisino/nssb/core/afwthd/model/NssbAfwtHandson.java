package com.aisino.nssb.core.afwthd.model;

import java.util.Date;

public class NssbAfwtHandson {
    
    private String applyId;

    private String id;
    
    private String afwtHtml;
    private String afwtHandson;
    
    private String afwtHtmlName;
    private String acceptId;
    private String acceptName;
    private Date acceptDate;
    private String tzNssb;
    private String modelId;
    
   
    public String getAcceptId() {
		return acceptId;
	}

	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}

	public String getAcceptName() {
		return acceptName;
	}

	public void setAcceptName(String acceptName) {
		this.acceptName = acceptName;
	}

	public Date getAcceptDate() {
		return acceptDate;
	}

	public void setAcceptDate(Date acceptDate) {
		this.acceptDate = acceptDate;
	}

	public String getAfwtHtmlName() {
		return afwtHtmlName;
	}

	public void setAfwtHtmlName(String afwtHtmlName) {
		this.afwtHtmlName = afwtHtmlName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAfwtHtml() {
		return afwtHtml;
	}

	public void setAfwtHtml(String afwtHtml) {
		this.afwtHtml = afwtHtml;
	}

	public String getAfwtHandson() {
		return afwtHandson;
	}

	public void setAfwtHandson(String afwtHandson) {
		this.afwtHandson = afwtHandson;
	}

	public String getApplyId() {
        return applyId;
    }

    public void setApplyId(String applyId) {
        this.applyId = applyId == null ? null : applyId.trim();
    }

	public String getTzNssb() {
		return tzNssb;
	}

	public void setTzNssb(String tzNssb) {
		this.tzNssb = tzNssb;
	}

	public String getModelId() {
		return modelId;
	}

	public void setModelId(String modelId) {
		this.modelId = modelId;
	}
 
}