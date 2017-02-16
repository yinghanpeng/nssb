package com.aisino.nssb.core.apfile.service;

import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.apfile.model.NssbApplyFile;
import com.aisino.nssb.core.bean.PageInputBean;

public interface NssbApplyFileService {
	
	List<Map<Object, Object>> queryApFileByPage(PageInputBean pageInputBean,NssbApplyFile nssbApplyFile);
	
	int queryApFileCount(PageInputBean pageInputBean,NssbApplyFile nssbApplyFile); 
	
	void insertList(List<NssbApplyFile> nssbFileList);
	
	/**
	 * 批量删除
	 * @param map
	 */
	void deleteApFileById(String id);
	List<String> queryFileById(String id);
	String queryFileLoadById(String id);
	
	List<NssbApplyFile>  SelectDelByRowId(NssbApplyFile nssbApplyFile);
	void deleteByFile(NssbApplyFile nssbApplyFile);

}
