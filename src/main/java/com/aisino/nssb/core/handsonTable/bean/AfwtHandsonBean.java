package com.aisino.nssb.core.handsonTable.bean;

public class AfwtHandsonBean {
	
	private String tableId;
	private int rowX;
	private int col;
	private String rowData;	    
    private String applyId;
    private int taxDateId;
    private String nsrsbhId;
    
    
	
	public int getTaxDateId() {
		return taxDateId;
	}
	public void setTaxDateId(int taxDateId) {
		this.taxDateId = taxDateId;
	}
	public String getNsrsbhId() {
		return nsrsbhId;
	}
	public void setNsrsbhId(String nsrsbhId) {
		this.nsrsbhId = nsrsbhId;
	}
	public String getTableId() {
		return tableId;
	}
	public void setTableId(String tableId) {
		this.tableId = tableId;
	}
	public int getRowX() {
		return rowX;
	}
	public void setRowX(int rowX) {
		this.rowX = rowX;
	}
	public int getCol() {
		return col;
	}
	public void setCol(int col) {
		this.col = col;
	}
	public String getRowData() {
		return rowData;
	}
	public void setRowData(String rowData) {
		this.rowData = rowData;
	}
	
	public String getApplyId() {
		return applyId;
	}
	public void setApplyId(String applyId) {
		this.applyId = applyId;
	}
	
	    
	
	

}
