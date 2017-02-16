package com.aisino.nssb.core.handsonTableName.model;

import java.util.Date;

public class HandsonTableName {
    private String tableId;

    private String tableName;
    
    private Date updateDate;
    private Date addDate;
    //0是不可用 1是可用
    private String nameId;
    //审核状态   0是 未审核
    private String tableAudit;
    
    
    
    
    

    public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public String getNameId() {
		return nameId;
	}

	public void setNameId(String nameId) {
		this.nameId = nameId;
	}

	public String getTableAudit() {
		return tableAudit;
	}

	public void setTableAudit(String tableAudit) {
		this.tableAudit = tableAudit;
	}

	public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId == null ? null : tableId.trim();
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName == null ? null : tableName.trim();
    }
}