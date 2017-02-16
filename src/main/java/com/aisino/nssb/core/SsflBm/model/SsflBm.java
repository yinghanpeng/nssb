package com.aisino.nssb.core.SsflBm.model;

public class SsflBm {
	
	 private String ssflbm;

	    private String ssflmc;

	    public String getSsflbm() {
	        return ssflbm;
	    }

	    public void setSsflbm(String ssflbm) {
	        this.ssflbm = ssflbm == null ? null : ssflbm.trim();
	    }

	    public String getSsflmc() {
	        return ssflmc;
	    }

	    public void setSsflmc(String ssflmc) {
	        this.ssflmc = ssflmc == null ? null : ssflmc.trim();
	    }

}
