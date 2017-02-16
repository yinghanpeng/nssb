package com.aisino.nssb.spring;

import com.aisino.nssb.common.Constant;

/*
 * 
 */
public class DataSourceHolder {
    /**
     * 主库标识.
     * @Fields MASTER
     */
    private static final String WRITE = "write";
    /**
     * 从库标识.
     * @Fields SLAVE
     */
    private static final String READ = "read";
    /**
     * 数据源对象  主库/从库.
     * @Fields dataSources
     */
    private static String dataSources = Constant.EMPTY_STRING;
    /**
     * 设置数据源.
     * @param dataSource void
     */
    private static void setDataSource(String dataSource) {
        DataSourceHolder.dataSources = dataSource;
    }
    /**
     * 获取数据源.
     * @return String
     */
    private static String getDataSource() {
        return DataSourceHolder.dataSources;
    }
    /**
     * 设置主库.
     */
    public static void setWRITE() {
        setDataSource(WRITE);
    }
    /**
     * 设置从库.
     */
    public static void setREAD() {
        setDataSource(READ);
    }
    /**
     * 判断是否主库.
     * @return boolean
     */
    public static boolean isMaster() {
        return getDataSource().equals(WRITE);
    }
    /**
     * 判断是否从库.
     * @return boolean
     */
    public static boolean isSlave() {
        return getDataSource().equals(READ);
    }
    /**
     * 清除数据源.
     */
    public static void clearDataSource() {
        dataSources = Constant.EMPTY_STRING;
    }
}
