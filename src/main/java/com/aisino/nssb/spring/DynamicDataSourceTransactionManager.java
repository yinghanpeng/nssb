package com.aisino.nssb.spring;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;

/**
 * 动态数据源事务管理.
 * @author zhaolingfei
 */
public class DynamicDataSourceTransactionManager extends DataSourceTransactionManager {
    /**
     * 序列化串.
     * @Fields serialVersionUID
     */
    private static final long serialVersionUID = 7160082287881717832L;
    /**
     * 只读事务到从库.读写事务到主库.
     */
    @Override
    protected void doBegin(Object transaction, TransactionDefinition definition) {
        boolean readOnly = definition.isReadOnly();
        if (readOnly) {
            DataSourceHolder.setREAD();
        } else {
            DataSourceHolder.setWRITE();
        }
        super.doBegin(transaction, definition);
    }
    /**
     * 清理本地线程的数据源.
     */
    @Override
    protected void doCleanupAfterCompletion(Object transaction) {
        super.doCleanupAfterCompletion(transaction);
        DataSourceHolder.clearDataSource();
    }
}
