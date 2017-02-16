package com.aisino.nssb.spring;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * 动态数据源.
 * @author zhaolingfei
 */
public class DynamicDataSource extends AbstractRoutingDataSource {
    /**
     * 写主库.
     * @Fields master
     */
    private DataSource write;
    /**
     * 读从库列表.
     * @Fields slaves
     */
    private List<DataSource> read;
    @Override
    protected Object determineCurrentLookupKey() {
        return null;
    }
    @Override
    public void afterPropertiesSet() {
        // do nothing
    }
    @Override
    protected DataSource determineTargetDataSource() {
        DataSource returnDataSource = null;
        if (DataSourceHolder.isSlave()) {
            // 从库大于1的时候,使用策略获取从库
            returnDataSource = read.get(0);
        } else {
            returnDataSource = write;
        }
        return returnDataSource;
    }
/*    *//**
     * master's getMothed.
     * @return master
     *//*
    public DataSource getWrite() {
        return write;
    }
    *//**
     * master 's setMethod.
     * @param master set master
     *//*
    public void setWrite(DataSource write) {
        this.write = write;
    }
    *//**
     * slaves's getMothed.
     * @return slaves
     *//*
    public List<DataSource> getReads() {
        return read;
    }
    *//**
     * slaves 's setMethod.
     * @param slaves set slaves
     *//*
    public void setReads(List<DataSource> read) {
        this.read = read;
    }*/
	public DataSource getWrite() {
		return write;
	}
	public void setWrite(DataSource write) {
		this.write = write;
	}
	public List<DataSource> getRead() {
		return read;
	}
	public void setRead(List<DataSource> read) {
		this.read = read;
	}
}
