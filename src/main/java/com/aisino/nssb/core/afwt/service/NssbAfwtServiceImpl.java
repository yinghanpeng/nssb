package com.aisino.nssb.core.afwt.service;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aisino.nssb.core.afwt.dao.NssbAfwtDao;
import com.aisino.nssb.core.afwt.model.NssbAfwt;
import com.aisino.nssb.core.afwthd.dao.NssbAfwtHandsonDao;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.afwthdm.dao.NssbAfwtHandsonModelDao;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTable.dao.HandsonTableDao;
import com.aisino.nssb.core.handsonTableModel.dao.HandsonTableModelDao;
import com.aisino.nssb.core.handsonTableModel.model.HandsonTableModel;
import com.aisino.nssb.core.user.dao.UserDao;

@Service
public class NssbAfwtServiceImpl implements NssbAfwtService {
	@Autowired
	NssbAfwtDao   nad;
	@Autowired
	NssbAfwtHandsonDao nahd;
	@Autowired
	HandsonTableDao  hdstd;
	@Autowired
	HandsonTableModelDao  model;	
	@Autowired
	NssbAfwtHandsonModelDao nahdm;
	@Autowired
	UserDao userDao;

	public List<Map<Object, Object>> queryAfwtByPage(
			PageInputBean pageInputBean,NssbAfwt  nssbAfwt) {
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
		param.put("applyId", nssbAfwt.getApplyId());//申请单 号
		param.put("nsrsbhId", nssbAfwt.getNsrsbhId());
		param.put("nsName", nssbAfwt.getNsName());	
		param.put("skEdate",nssbAfwt.getSkEdate() );
		param.put("skSdate", nssbAfwt.getSkSdate());
		param.put("auditDate", nssbAfwt.getAuditDate());
		param.put("readDate", nssbAfwt.getReadDate());
		param.put("additState", nssbAfwt.getAdditState());
		
		String[] nsBanksws=nssbAfwt.getNsBank().split(",");
		List<String> list = Arrays.asList(nsBanksws);
		param.put("list", list);
		return nad.queryAfwtByPage(param);
	}

	public int queryAfwtCount(PageInputBean pageInputBean,NssbAfwt  nssbAfwt) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("applyId", nssbAfwt.getApplyId());//申请单 号
		param.put("nsrsbhId", nssbAfwt.getNsrsbhId());
		param.put("nsName", nssbAfwt.getNsName());
		//param.put("nsBank", nssbAfwt.getNsBank());
		param.put("skEdate",nssbAfwt.getSkEdate() );
		param.put("skSdate", nssbAfwt.getSkSdate());
		param.put("auditDate", nssbAfwt.getAuditDate());
		param.put("readDate", nssbAfwt.getReadDate());
		param.put("additState", nssbAfwt.getAdditState());
		String[] nsBanksws=nssbAfwt.getNsBank().split(",");
		List<String> list = Arrays.asList(nsBanksws);
		param.put("list", list);
		return nad.queryAfwtCount(param);
	}

	public void insertSelective(NssbAfwt nssbAfwt,NssbAfwtHandson nssbAfwtHandson) {
		
		java.text.SimpleDateFormat   formatter   = 
			new   SimpleDateFormat("yyyyMMddHHmmss");
			String ApplyId = formatter.format(new Date());//格式化数据
			nssbAfwt.setApplyId(ApplyId);
			nssbAfwt.setAddDate(new Date());
			nssbAfwt.setAdditState("0");//未审核
			nssbAfwt.setApplyState("1");//申请状态
			nad.insertSelective(nssbAfwt);
			
			HandsonTableModel handsonTableModel=new HandsonTableModel();
			handsonTableModel.setModel("1");
			List<HandsonTableModel> list = model.selectListHandsonOr(handsonTableModel);				
			for(int i=0;list.size()>i;i++){
				NssbAfwtHandson  NssbAfwtHandson=new NssbAfwtHandson();
				if(list.get(i) !=null){
					if("1".equals(list.get(i).getTzNssb())){
						NssbAfwtHandson.setTzNssb("1");
						
					}else{
						NssbAfwtHandson.setTzNssb("2");
					}
					NssbAfwtHandson.setModelId(list.get(i).getModelId());
					JSONObject jsonobject = JSONObject.fromObject(list.get(i).getTableModel());
			        String handson = (jsonobject.get("data").toString());
					NssbAfwtHandson.setAfwtHandson(handson);
					NssbAfwtHandson.setAfwtHtmlName(list.get(i).getModelName());
					NssbAfwtHandson.setApplyId(ApplyId);
					NssbAfwtHandson.setAcceptId("1");
					//objectlist.add(NssbAfwtHandson);
					nahd.insertSelective(NssbAfwtHandson);
				}
			}
		//nahdm.insertSelective(nssbAfwtHandsonModel);//插入表样流水中间的中间表
	    //nahd.insertList(objectlist);
		
		
		
	}

	public void updateAfwt(NssbAfwt nssbAfwt) {
		nad.updateAfwt(nssbAfwt);
		
	}

	
	public void deleleAfwtById(String applyId) {
		String[] applyIdArray=applyId.split(",");
		List<String> list = Arrays.asList(applyIdArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		hdstd.deleteByHandsonIdList(map);
		nad.deleteAfwtById(map);
		nahd.deleteAfwthsById(map);
		
	}

	public void upAfwtById(String applyId) {
		String[] applyIdArray=applyId.split(",");
		List<String> list = Arrays.asList(applyIdArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		nad.upAfwtById(map);
	}

	public NssbAfwt selectAfwt(NssbAfwt nssbAfwt) {
		return nad.selectAfwt(nssbAfwt);
	}

	public void queryauditAfwtById(String applyId) {
		String[] applyIdArray=applyId.split(",");
		List<String> list = Arrays.asList(applyIdArray);
		Map<Object,Object> map = new HashMap<Object,Object>();
		map.put("list", list);
		nad.auditAfwtById(map);
	}

	public int queryTaxDateIdCount(NssbAfwt nssbAfwt) {
		
		return nad.queryTaxDateIdCount(nssbAfwt);
	}

	public List<NssbAfwt> queryAfwtBynsr(NssbAfwt nssbAfwt) {
		
		return nad.queryAfwtBynsr(nssbAfwt);
	}

	public List<Map<Object, Object>> queryAuditByPage(String auditDateBegin,
			String auditDateEnd, PageInputBean pageInputBean,
			NssbAfwt nssbAfwt, String applyDateBegin, String applyDateEnd) {
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
		param.put("applyId", nssbAfwt.getApplyId());//申请单 号
		param.put("nsrsbhId", nssbAfwt.getNsrsbhId());
		param.put("nsName", nssbAfwt.getNsName());
		param.put("skEdate",nssbAfwt.getSkEdate() );
		param.put("skSdate", nssbAfwt.getSkSdate());
		param.put("auditDate", nssbAfwt.getAuditDate());
		param.put("readDate", nssbAfwt.getReadDate());
		param.put("additState", nssbAfwt.getAdditState());
		//申请 审核起止时间
		param.put("auditDateBegin", auditDateBegin);
		param.put("auditDateEnd", auditDateEnd);
		param.put("applyDateBegin", applyDateBegin);
		param.put("applyDateEnd", applyDateEnd);
		param.put("auditBank", nssbAfwt.getAuditBank());
		param.put("applyName",nssbAfwt.getApplyName() );
		String[] nsBanksws=nssbAfwt.getNsBank().split(",");
		List<String> list = Arrays.asList(nsBanksws);
		param.put("list", list);
		return nad.queryAuditByPage(param);
	}

	public int queryAuditCount(String auditDateBegin, String auditDateEnd,
			PageInputBean pageInputBean, NssbAfwt nssbAfwt,
			String applyDateBegin, String applyDateEnd) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		int start = pageInputBean.getPageSize() * (pageInputBean.getPageNumber() - 1) + 1;
		int end = pageInputBean.getPageSize() * pageInputBean.getPageNumber();
		// 分页
		param.put("start", start);
		param.put("end", end);
		param.put("applyId", nssbAfwt.getApplyId());//申请单 号
		param.put("nsrsbhId", nssbAfwt.getNsrsbhId());
		param.put("nsName", nssbAfwt.getNsName());
		param.put("skEdate",nssbAfwt.getSkEdate() );
		param.put("skSdate", nssbAfwt.getSkSdate());
		param.put("auditDate", nssbAfwt.getAuditDate());
		param.put("readDate", nssbAfwt.getReadDate());
		param.put("additState", nssbAfwt.getAdditState());
		//申请 审核起止时间
		param.put("auditDateBegin", auditDateBegin);
		param.put("auditDateEnd", auditDateEnd);
		param.put("applyDateBegin", applyDateBegin);
		param.put("applyDateEnd", applyDateEnd);
		
		param.put("auditBank", nssbAfwt.getAuditBank());
		param.put("applyName",nssbAfwt.getApplyName() );
		String[] nsBanksws=nssbAfwt.getNsBank().split(",");
		List<String> list = Arrays.asList(nsBanksws);
		param.put("list", list);
		return nad.queryAuditCount(param);
	}

	public List<String> queryTaxdBy(NssbAfwt nssbAfwt) {
		
		return nad.queryTaxdBy( nssbAfwt);
	}

}
