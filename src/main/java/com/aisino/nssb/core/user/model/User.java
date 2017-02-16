package com.aisino.nssb.core.user.model;

import java.util.Date;


public class User {
	
	//id
    private String yhid;

    //用户名称
    private String yhmc;

    //用户登陆密码
    private String password;

    
    private String czryid;

    private String qxBmid;

    private Date lrrq;

    private String lrryid;

    private String lrrymc;

    private String lryhid;

    private String by1;

    private String by2;

    //锁定标记：0或者空-未锁定，1-已锁定
    private String sdbj;

    private String usrtoken;

    private Date xgrq;

    private String yhsx;

    //有效标志：1-有效；0-无效
    private String yxbz;

    private String zjhm;

    private String dh;

    private String dzyx;

    private String sdxgbz;
    
    private String bmmc;
    

    public String getBmmc() {
		return bmmc;
	}

	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}

	public String getYhid() {
        return yhid;
    }

    public void setYhid(String yhid) {
        this.yhid = yhid == null ? null : yhid.trim();
    }

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc == null ? null : yhmc.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getCzryid() {
        return czryid;
    }

    public void setCzryid(String czryid) {
        this.czryid = czryid == null ? null : czryid.trim();
    }

    public String getQxBmid() {
        return qxBmid;
    }

    public void setQxBmid(String qxBmid) {
        this.qxBmid = qxBmid == null ? null : qxBmid.trim();
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getLrryid() {
        return lrryid;
    }

    public void setLrryid(String lrryid) {
        this.lrryid = lrryid == null ? null : lrryid.trim();
    }

    public String getLrrymc() {
        return lrrymc;
    }

    public void setLrrymc(String lrrymc) {
        this.lrrymc = lrrymc == null ? null : lrrymc.trim();
    }

    public String getLryhid() {
        return lryhid;
    }

    public void setLryhid(String lryhid) {
        this.lryhid = lryhid == null ? null : lryhid.trim();
    }

    public String getBy1() {
        return by1;
    }

    public void setBy1(String by1) {
        this.by1 = by1 == null ? null : by1.trim();
    }

    public String getBy2() {
        return by2;
    }

    public void setBy2(String by2) {
        this.by2 = by2 == null ? null : by2.trim();
    }

    public String getSdbj() {
        return sdbj;
    }

    public void setSdbj(String sdbj) {
        this.sdbj = sdbj == null ? null : sdbj.trim();
    }

    public String getUsrtoken() {
        return usrtoken;
    }

    public void setUsrtoken(String usrtoken) {
        this.usrtoken = usrtoken == null ? null : usrtoken.trim();
    }

    public Date getXgrq() {
        return xgrq;
    }

    public void setXgrq(Date xgrq) {
        this.xgrq = xgrq;
    }

    public String getYhsx() {
        return yhsx;
    }

    public void setYhsx(String yhsx) {
        this.yhsx = yhsx == null ? null : yhsx.trim();
    }

    public String getYxbz() {
        return yxbz;
    }

    public void setYxbz(String yxbz) {
        this.yxbz = yxbz == null ? null : yxbz.trim();
    }

    public String getZjhm() {
        return zjhm;
    }

    public void setZjhm(String zjhm) {
        this.zjhm = zjhm == null ? null : zjhm.trim();
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh == null ? null : dh.trim();
    }

    public String getDzyx() {
        return dzyx;
    }

    public void setDzyx(String dzyx) {
        this.dzyx = dzyx == null ? null : dzyx.trim();
    }

    public String getSdxgbz() {
        return sdxgbz;
    }

    public void setSdxgbz(String sdxgbz) {
        this.sdxgbz = sdxgbz == null ? null : sdxgbz.trim();
    }
}
  
  

