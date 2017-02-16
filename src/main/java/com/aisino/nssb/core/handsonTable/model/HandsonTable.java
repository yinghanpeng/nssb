package com.aisino.nssb.core.handsonTable.model;

public class HandsonTable {
    private String id;
    private String tableId;
    private int rowX;
    private int col;
    private String rowData;    
    private String handsonId;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getHandsonId() {
		return handsonId;
	}

	public void setHandsonId(String handsonId) {
		this.handsonId = handsonId;
	}
    
   
}