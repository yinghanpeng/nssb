package com.aisino.nssb.core.controller;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aisino.nssb.common.AjaxResponse;
import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.common.AjaxResponse.MessageType;
import com.aisino.nssb.core.afwt.model.NssbAfwt;
import com.aisino.nssb.core.afwt.service.NssbAfwtService;
import com.aisino.nssb.core.afwthd.model.NssbAfwtHandson;
import com.aisino.nssb.core.afwthd.service.NssbAfwtHandsonService;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.handsonTableModel.service.HandsonTableModelSerivce;
import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;


@Controller
@RequestMapping("/interface")
public class AfwtController {
	
	@Autowired
	NssbAfwtService nas;
	
	@Autowired
	NssbAfwtHandsonService  nahs;
	

	@Autowired
	HandsonTableModelSerivce  model;
	
	@Autowired
	UserService  userService;
	
	
	/**
	 * 申请页面的分页查询
	 * @param pageInputBean
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/queryAfwtByPage.do")
	@ResponseBody
	public JSONObject queryAfwtByPage(PageInputBean pageInputBean,NssbAfwt  nssbAfwt,String nsBankArray) {
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		if(nssbAfwt.getNsBank()==null || nssbAfwt.getNsBank()==""){
				Subject currentUser = SecurityUtils.getSubject();
			User user = userService.getUserByName((String) currentUser.getPrincipal());
			nssbAfwt.setNsBank(user.getBmmc());
		}
		rowList = nas.queryAfwtByPage(pageInputBean, nssbAfwt);
		int total =nas.queryAfwtCount(pageInputBean, nssbAfwt); 
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);

		return rt;
		
	}
	/**
	 * 审核页面的查询
	 * @param auditDateBegin
	 * @param auditDateEnd
	 * @param pageInputBean
	 * @param nssbAfwt
	 * @param applyDateBegin
	 * @param applyDateEnd
	 * @return
	 */
	@RequestMapping("/queryAuditByPage.do")
	@ResponseBody
	public JSONObject queryAuditByPage(String auditDateBegin,String auditDateEnd,PageInputBean pageInputBean,NssbAfwt  nssbAfwt,String applyDateBegin,String applyDateEnd) {
		List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
		Subject currentUser = SecurityUtils.getSubject();
		User user=new User();
		user = userService.getUserByName((String) currentUser.getPrincipal());
		if(nssbAfwt.getNsBank()==null || nssbAfwt.getNsBank()==""){
			
				nssbAfwt.setNsBank(user.getBmmc());
		}
		
		//user.setYhid((String)currentUser.getPrincipal());
		/*String bmmc=null;
		List<String> list = userService.selectNsbankByName(user);
			if(list.size()>1){  	
				bmmc= list.get(1);
   	 
			}else{
				bmmc=list.get(0); 
			}*/
		nssbAfwt.setAuditBank(user.getBmmc());
		rowList = nas.queryAuditByPage(auditDateBegin, auditDateEnd, pageInputBean, nssbAfwt, applyDateBegin, applyDateEnd);
		int total =nas.queryAuditCount(auditDateBegin, auditDateEnd, pageInputBean, nssbAfwt, applyDateBegin, applyDateEnd); 
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);

		return rt;
		
	}
	/**
	 * 
	 * 新增申请水流表 数据
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/insertAfwt.do")
	@ResponseBody
	public AjaxResponse insertAfwt(NssbAfwt  nssbAfwt,NssbAfwtHandson nssbAfwtHandson) {
		
		try {
			Subject currentUser = SecurityUtils.getSubject();
			User user=new User();
			user = userService.getUserByName((String) currentUser.getPrincipal());
			nssbAfwt.setNsBank(user.getBmmc());
			user.setYhid((String)currentUser.getPrincipal());
			nssbAfwt.setQxBmId(user.getYhid());
			List<NssbAfwt> listcount = nas.queryAfwtBynsr(nssbAfwt);
			if(listcount.size()>0){
				
				return new AjaxResponse(MessageType.ERROR, "每个申报期只能新增一条数据！");
			}
			Map<String, Object> bmid = userService.selectAwftByName(user);
	    
			int  count= nas.queryTaxDateIdCount(nssbAfwt);  
			int taxId=count+1;
			nssbAfwt.setTaxDateId(taxId);
		    nssbAfwt.setQxBmId(bmid.get("QX_BMID").toString());
		 	nas.insertSelective(nssbAfwt, nssbAfwtHandson);//插入流水表 
		 	return new AjaxResponse(MessageType.SUCCESS, "新增成功");
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "新增失败");
		}
	}
	
	
	
	/**
	 * 
	 * 新增的提交功能申请水流表 数据
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/insertUpAfwt.do")
	@ResponseBody
	public AjaxResponse insertUpAfwt(NssbAfwt  nssbAfwt) {
		
		
			try {
				NssbAfwt   Apply=	nas.selectAfwt(nssbAfwt);
				if("1".equals(Apply.getApplyState())){
					
					return new AjaxResponse(MessageType.ERROR, "报表还没有处理,不能提交！！");
				}
				nas.upAfwtById(Apply.getApplyId());
				return new AjaxResponse(MessageType.SUCCESS, "提交成功");
			} catch (Exception e) {
				
				e.printStackTrace();
				return new AjaxResponse(MessageType.ERROR, "提交失败");
				
			}
		
		
		
		
	}
	
	
	
	
	
	
	/**
	 * 
	 * 编辑申请水流表 数据和审核功能
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/updateAfwt.do")
	@ResponseBody
	public AjaxResponse updateAfwt(NssbAfwt  nssbAfwt) {
		try {
			if(!"".equals(nssbAfwt.getApplyId()) && nssbAfwt.getApplyId()!=null ){
			    if(nssbAfwt.getAuditor() ==null  || "".equals(nssbAfwt.getAuditor())){
				   nssbAfwt.setUpDate(new Date());

			    }			
			    nas.updateAfwt(nssbAfwt);
			   return new AjaxResponse(MessageType.SUCCESS, "编辑成功");
			}else{
				return new AjaxResponse(MessageType.ERROR, "编辑失败");
			}
		} catch (Exception e) {			
			e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "编辑失败");
		}
		
	}
	
	
	/**
	 * 批量修改
	 * @param hangsonId
	 * @param applyId
	 * @return
	 */
	@RequestMapping("/upAfwtList.do")
	@ResponseBody
	public AjaxResponse upAfwtLsit(String applyId) {
		
		try {
			if(applyId !=null){
				nas.upAfwtById(applyId);
				return new AjaxResponse(MessageType.SUCCESS, "提交成功");
			}else{
				return new AjaxResponse(MessageType.ERROR, "提交失败");
			}						
		} catch (Exception e) {			
			e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "提交失败");
		}
	}
	
	/**
	 * 批量删除
	 * @param hangsonId
	 * @param applyId
	 * @return
	 */
	@RequestMapping("/delAfwtList.do")
	@ResponseBody
	public AjaxResponse delAfwtLsit(String applyId) {
		
		try {
			if(applyId !=null){
			    nas.deleleAfwtById(applyId);
			    return new AjaxResponse(MessageType.SUCCESS, "删除成功");
			}else{
				return new AjaxResponse(MessageType.ERROR, "删除失败");
			}			
		} catch (Exception e) {
			
			  e.printStackTrace();
			return new AjaxResponse(MessageType.ERROR, "删除失败");			  
		}
	}
	
	
	/**
	 * 查询审核机构的ztree
	 * @param user
	 * @return
	 */
	@RequestMapping("/selectAuditZtree.do")
	@ResponseBody
	public String selectAuditZtree(User user) {
		
		
		List<Map<String, Object>> listZtree = userService.selectAuditByName(user);
		
		return JsonMapper.toJSONString(listZtree);
		
	}
	
	/**
	 * 查询所属行
	 * @param user
	 * @return
	 */
	@RequestMapping("/selectNsBankZtree.do")
	@ResponseBody
	public String selectNsBankZtree(User user) {
		
		
		List<Map<String, Object>> nsBankZtree = userService.selectNsBankByName(user);
		
		return JsonMapper.toJSONString(nsBankZtree);
		
	}
	/**
	 * 取系统时间
	 * @return
	 */
	@RequestMapping("/getDate.do")
	@ResponseBody
	public String getDate(){
		
		return JsonMapper.toJSONStringWithDateFormat(new Date());
		
	}
	/**
	 * 取税期号的集合
	 * @param nssbAfwt
	 * @return
	 */
	@RequestMapping("/getTaxdId.do")
	@ResponseBody
	public String getTaxdId(NssbAfwt  nssbAfwt){
	 List<String> listTaxd = nas.queryTaxdBy(nssbAfwt);
		return JsonMapper.toJSONString(listTaxd);
		
	}
	
	
}


