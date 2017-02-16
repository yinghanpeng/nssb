package com.aisino.nssb.core.apfile.model;

import java.util.Date;

public class NssbApplyFile {
    private String id;

    private String applyId;

    private String fileName;

    private String filePtah;

    private Date uploadDate;

    private String rowId;

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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName == null ? null : fileName.trim();
    }

    public String getFilePtah() {
        return filePtah;
    }

    public void setFilePtah(String filePtah) {
        this.filePtah = filePtah == null ? null : filePtah.trim();
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId == null ? null : rowId.trim();
    }
}