package com.aisino.nssb.core.afwt.model;

import java.util.Date;

public class NssbAfwt {
    private String id;

    private String applyId;

    private String nsrsbhId;

	private String nsName;

    private String skSdate;
    
    private String skSdate_end;
    
    private String skEdate;

    private String nsBank;

    private String applyState;

    private Date addDate;

    private Date upDate;

    private String auditor;

    private String auditBank;

    private String readDate;

    private String auditDate;

    private String auditIdea;

    private String aduitEnd;

    private String additState;
    private String applyName;
    //税期号
    private int taxDateId;
    //机构号
    private String qxBmId;
    
    

   
	public String getQxBmId() {
		return qxBmId;
	}

	public void setQxBmId(String qxBmId) {
		this.qxBmId = qxBmId;
	}

	public int getTaxDateId() {
		return taxDateId;
	}

	public void setTaxDateId(int taxDateId) {
		this.taxDateId = taxDateId;
	}

	public String getApplyName() {
		return applyName;
	}

	public void setApplyName(String applyName) {
		this.applyName = applyName;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getApplyId() {
        return applyId;
    }

    public void setApplyId(String applyId) {
        this.applyId = applyId == null ? null : applyId.trim();
    }

    public String getNsrsbhId() {
        return nsrsbhId;
    }

    public void setNsrsbhId(String nsrsbhId) {
        this.nsrsbhId = nsrsbhId == null ? null : nsrsbhId.trim();
    }

    public String getNsName() {
        return nsName;
    }

    public void setNsName(String nsName) {
        this.nsName = nsName == null ? null : nsName.trim();
    }

   

    public String getNsBank() {
        return nsBank;
    }

    public void setNsBank(String nsBank) {
        this.nsBank = nsBank == null ? null : nsBank.trim();
    }

   

    public String getApplyState() {
		return applyState;
	}

	public void setApplyState(String applyState) {
		this.applyState = applyState;
	}

	public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public Date getUpDate() {
        return upDate;
    }

    public void setUpDate(Date upDate) {
        this.upDate = upDate;
    }

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor == null ? null : auditor.trim();
    }

    public String getAuditBank() {
        return auditBank;
    }

    public void setAuditBank(String auditBank) {
        this.auditBank = auditBank == null ? null : auditBank.trim();
    }

   
    public String getSkSdate() {
		return skSdate;
	}

	public void setSkSdate(String skSdate) {
		this.skSdate = skSdate;
	}
	
    public String getSkSdate_end() {
		return skSdate_end;
	}

	public void setSkSdate_end(String skSdate_end) {
		this.skSdate_end = skSdate_end;
	}
	
	public String getSkEdate() {
		return skEdate;
	}

	public void setSkEdate(String skEdate) {
		this.skEdate = skEdate;
	}

	public String getReadDate() {
		return readDate;
	}

	public void setReadDate(String readDate) {
		this.readDate = readDate;
	}

	public String getAuditDate() {
		return auditDate;
	}

	public void setAuditDate(String auditDate) {
		this.auditDate = auditDate;
	}

	public String getAuditIdea() {
        return auditIdea;
    }

    public void setAuditIdea(String auditIdea) {
        this.auditIdea = auditIdea == null ? null : auditIdea.trim();
    }

    public String getAduitEnd() {
        return aduitEnd;
    }

    public void setAduitEnd(String aduitEnd) {
        this.aduitEnd = aduitEnd == null ? null : aduitEnd.trim();
    }

    public String getAdditState() {
        return additState;
    }

    public void setAdditState(String additState) {
        this.additState = additState == null ? null : additState.trim();
    }

	@Override
	public String toString() {
		return "NssbAfwt [addDate=" + addDate + ", additState=" + additState
				+ ", aduitEnd=" + aduitEnd + ", applyId=" + applyId
				+ ", applyName=" + applyName + ", applyState=" + applyState
				+ ", auditBank=" + auditBank + ", auditDate=" + auditDate
				+ ", auditIdea=" + auditIdea + ", auditor=" + auditor + ", id="
				+ id + ", nsBank=" + nsBank + ", nsName=" + nsName
				+ ", nsrsbhId=" + nsrsbhId + ", qxBmId=" + qxBmId
				+ ", readDate=" + readDate + ", skEdate=" + skEdate
				+ ", skSdate=" + skSdate + ", taxDateId=" + taxDateId
				+ ", upDate=" + upDate + "]";
	}

	

	
    
}