package com.aisino.nssb.core.handsonTableModel.model;



import java.util.Date;





public class HandsonTableModel {
   
    private String  modelId;
    private String tableModel;
    //0是不可用  1是可用
    private String model;
    private Date updateDate ;
    private Date addDate;
    private String modelName;
    
    private  String tzNssb;
   //一级项目
    private String oneMenus;
    //二级项目
    private String twoMenus;
    
    
	public String getOneMenus() {
		return oneMenus;
	}
	public void setOneMenus(String oneMenus) {
		this.oneMenus = oneMenus;
	}
	public String getTwoMenus() {
		return twoMenus;
	}
	public void setTwoMenus(String twoMenus) {
		this.twoMenus = twoMenus;
	}
	public String getModelId() {
		return modelId;
	}
	public void setModelId(String modelId) {
		this.modelId = modelId;
	}
	public String getTableModel() {
		return tableModel;
	}
	public void setTableModel(String tableModel) {
		this.tableModel = tableModel;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
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
	public String getModelName() {
		return modelName;
	}
	public void setModelName(String modelName) {
		this.modelName = modelName;
	}
	@Override
	public String toString() {
		return "HandsonTableModel [addDate=" + addDate + ", model=" + model
				+ ", modelId=" + modelId + ", modelName=" + modelName
				+ ", tableModel=" + tableModel + ", updateDate=" + updateDate
				+ "]";
	}
	public String getTzNssb() {
		return tzNssb;
	}
	public void setTzNssb(String tzNssb) {
		this.tzNssb = tzNssb;
	}
    
    
    
    
    
   

	

  
}