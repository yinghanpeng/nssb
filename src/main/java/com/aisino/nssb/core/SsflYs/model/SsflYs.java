package com.aisino.nssb.core.SsflYs.model;

public class SsflYs {
	 private String id;

	    private String spmc;

	    private String ssflbm;

	    public String getId() {
	        return id;
	    }

	    public void setId(String id) {
	        this.id = id == null ? null : id.trim();
	    }

	    public String getSpmc() {
	        return spmc;
	    }

	    public void setSpmc(String spmc) {
	        this.spmc = spmc == null ? null : spmc.trim();
	    }

	    public String getSsflbm() {
	        return ssflbm;
	    }

	    public void setSsflbm(String ssflbm) {
	        this.ssflbm = ssflbm == null ? null : ssflbm.trim();
	    }

}
