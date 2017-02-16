package com.aisino.nssb.core.apfile.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.aisino.nssb.core.apfile.model.NssbApplyFile;

public interface NssbApplyFileDao {
	
    List<Map<Object, Object>> queryApFileByPage(Map<String, Object> param);	
	int queryApFileCount(Map<String, Object> param); 
	void insertList(List<NssbApplyFile> nssbFileList);
	
	/**
	 * 批量删除
	 * @param map
	 */
	void deleteApFileById(@Param("map")Map<Object,Object> map);
	List<String> queryFileById(@Param("map")Map<Object,Object> map);
	
	String queryFileLoadById(String id);
   
	
	List<NssbApplyFile>  SelectDelByRowId(NssbApplyFile nssbApplyFile);
	void deleteByFile(NssbApplyFile nssbApplyFile);
}