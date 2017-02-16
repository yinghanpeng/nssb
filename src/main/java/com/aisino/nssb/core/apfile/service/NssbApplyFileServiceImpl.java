package com.aisino.nssb.core.apfile.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.apfile.dao.NssbApplyFileDao;
import com.aisino.nssb.core.apfile.model.NssbApplyFile;
import com.aisino.nssb.core.bean.PageInputBean;
@Service
public class NssbApplyFileServiceImpl implements NssbApplyFileService{
	
	@Autowired
	NssbApplyFileDao nssbApplyFileDao;
	public void insertList(List<NssbApplyFile> nssbFileList) {
		nssbApplyFileDao.insertList(nssbFileList);
		
	}
	public List<Map<Object, Object>> queryApFileByPage(
			PageInputBean pageInputBean, NssbApplyFile nssbApplyFile) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		String sortName = pageInputBean.getSortName();
		String sortOrder = pageInputBean.getSortOrder();
		param.put("sortName", sortName);
		param.put("sortOrder", sortOrder);
		// 分页
		param.put("start", start);
		param.put("end", end);
		//查询条件
		param.put("applyId", nssbApplyFile.getApplyId());
		param.put("rowId",nssbApplyFile.getRowId() );
		return nssbApplyFileDao.queryApFileByPage(param);
	}
	public int queryApFileCount(PageInputBean pageInputBean,
			NssbApplyFile nssbApplyFile) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		String sortName = pageInputBean.getSortName();
		String sortOrder = pageInputBean.getSortOrder();
		param.put("sortName", sortName);
		param.put("sortOrder", sortOrder);
		// 分页
		param.put("start", start);
		param.put("end", end);
		//查询条件
		param.put("applyId", nssbApplyFile.getApplyId());
		param.put("rowId",nssbApplyFile.getRowId() );
		return nssbApplyFileDao.queryApFileCount(param);
	}
	public void deleteApFileById(String id) {
		String[] FileIdArray=id.split(",");
		List<String> list = Arrays.asList(FileIdArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		nssbApplyFileDao.deleteApFileById(map);
		
	}
	public  List<String> queryFileById(String id) {
		String[] FileIdArray=id.split(",");
		List<String> list = Arrays.asList(FileIdArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		return nssbApplyFileDao.queryFileById(map);
	}
	public String queryFileLoadById(String id) {
	
		return nssbApplyFileDao.queryFileLoadById(id);
	}
	public List<NssbApplyFile> SelectDelByRowId(NssbApplyFile nssbApplyFile) {
		
		return nssbApplyFileDao.SelectDelByRowId(nssbApplyFile);
	}
	public void deleteByFile(NssbApplyFile nssbApplyFile) {
		nssbApplyFileDao.deleteByFile(nssbApplyFile);
		
	}

}
