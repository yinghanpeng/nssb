package com.aisino.nssb.core.afwthd.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.afwt.dao.NssbAfwtDao;
import com.aisino.nssb.core.afwt.model.NssbAfwt;
import com.aisino.nssb.core.afwthd.Bean.NssbAfwtHandsonBean;
import com.aisino.nssb.core.afwthd.dao.NssbAfwtHandsonDao;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTable.bean.AfwtHandsonBean;
@Service
public class NssbAfwtHandsonServiceImpl implements NssbAfwtHandsonService{
	
	@Autowired
	NssbAfwtDao   nad;
	@Autowired
	NssbAfwtHandsonDao nahd;//中间表

	//@Autowired
//	private HandsonTableDao hdtsd;

	public NssbAfwtHandson selectByApplyId(String applyId) {
		
		return nahd.selectByApplyId(applyId);
		
	}

	public void delAfwtByApplyId(NssbAfwtHandson nssbAfwtHandson, AfwtHandsonBean afwtHandsonBean) {
		
		nahd.delAfwtByApplyId(nssbAfwtHandson);
		NssbAfwt	nssbAfwt=new NssbAfwt();
		nssbAfwt.setApplyId(afwtHandsonBean.getApplyId());
		 List<String> apply = nahd.selectStateByApplyId(afwtHandsonBean.getApplyId());
		 if(apply.indexOf("1")!=-1){
		 }else{

				nssbAfwt.setApplyState("2");//表示报表已经处理过了
				nad.updateAfwt(nssbAfwt);//改变流水表的状态
		 }
	  
		
		/*HandsonTable handsonTable1=new HandsonTable();
		handsonTable1.setHandsonId(afwtHandsonBean.getApplyId());
		handsonTable1.setTableId(afwtHandsonBean.getTableId());				
		hdtsd.delByHandsonId(handsonTable1);//删除之前的 数据
	    //List<HandsonTable> tableList=new ArrayList<HandsonTable>();
		HANDSONString list=afwtHandsonBean.getRowData();
		
		JSONArray arr = JSONArray.fromObject(list);
		   	int  y=0; 
	        for(Object o :arr){	        	
	        	y++;	        	
	            JSONArray a = (JSONArray)o;
	            for(int i = 1 ; i < a.size()+1 ; i++){
	            	HandsonTable handsonTable=new HandsonTable();
	            	String data = String.valueOf(a.get(i-1));
	            	handsonTable.setRowX(y-1);
	            	handsonTable.setCol(i-1);
	            	handsonTable.setRowData(data);
	            	handsonTable.setTableId(afwtHandsonBean.getTableId());
	            	handsonTable.setHandsonId(afwtHandsonBean.getApplyId());
	            	handsonTable.setNsrsbhId(afwtHandsonBean.getNsrsbhId());
	            	handsonTable.setTaxDateId(afwtHandsonBean.getTaxDateId());
	            	//hdts.insertTable(hangsonTable);//一条条的插入
	         	   tableList.add(handsonTable);//批量插入
	            }
	       }
	      hdtsd.insertList(tableList);//保存新的数据存到数据表
	      */
	}

	public void insertAfwths(NssbAfwtHandson nssbAfwtHandson) {
		nahd.insertSelective(nssbAfwtHandson);
		
	}

	public void insertSelective(NssbAfwtHandson nssbAfwtHandson) {
		nahd.insertSelective(nssbAfwtHandson);
		
	}

	public List<NssbAfwtHandson> selectListByApplyId(NssbAfwtHandsonBean nssbAfwtHandsonBean) {
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("acceptId", nssbAfwtHandsonBean.getAcceptId());
		param.put("applyId", nssbAfwtHandsonBean.getApplyId());
		param.put("afwtHtmlName", nssbAfwtHandsonBean.getAfwtHtmlName());
		param.put("modelId", nssbAfwtHandsonBean.getModelId());
		param.put("nsrsbhId", nssbAfwtHandsonBean.getNsrsbhId());
		param.put("tzNssb", nssbAfwtHandsonBean.getTzNssb());
		param.put("taxDateId", nssbAfwtHandsonBean.getTaxDateId());
		return nahd.selectListByApplyId(param);
		
	}

	public void insertList(List<NssbAfwtHandson> nssbList) {
		nahd.insertList(nssbList);
	}

	public List<Map<Object, Object>> queryAfwtHdByPage(
			PageInputBean pageInputBean, NssbAfwtHandson nssbAfwtHandson) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("applyId", nssbAfwtHandson.getApplyId());
		param.put("tzNssb", nssbAfwtHandson.getTzNssb());
		return nahd.queryAfwtHdByPage(param);
	}

	public int queryAfwtHdCount(PageInputBean pageInputBean,
			NssbAfwtHandson nssbAfwtHandson) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("applyId", nssbAfwtHandson.getApplyId());
		param.put("tzNssb", nssbAfwtHandson.getTzNssb());
		return  nahd.queryAfwtHdCount(param);
	}

	public List<String> selectStateByApplyId(String applyId) {
		
		return nahd.selectStateByApplyId(applyId);
	}

}
