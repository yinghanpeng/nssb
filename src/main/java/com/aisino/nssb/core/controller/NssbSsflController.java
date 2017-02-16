package com.aisino.nssb.core.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.aisino.nssb.common.JsonMapper;
import com.aisino.nssb.core.SsflBm.model.SsflBm;
import com.aisino.nssb.core.SsflBm.service.SsflBmService;
import com.aisino.nssb.core.SsflYs.service.SsflYsService;
import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;
import com.aisino.nssb.core.SsflYs.model.SsflYs;
import com.alibaba.fastjson.JSONObject;

@Controller
@RequestMapping("/nssbSsfl")
public class NssbSsflController {
	@Autowired
	SsflYsService ss;
	@Autowired
	UserService userService;// 用户表
	
	@Autowired
	SsflBmService ssflBmService;
	@RequestMapping("/main.do")
	// @ResponseBody
	public ModelAndView main() {
		Subject currentUser = SecurityUtils.getSubject();
		User user = new User();
		user.setYhid((String) currentUser.getPrincipal());
		String bmmc = null;
		List<String> list = userService.selectNsbankByName(user);
		if (list.size() > 1) {
			bmmc = list.get(1);

		} else {
			bmmc = list.get(0);
		}
		Map<String, Object> awftMap = userService.selectAwftByName(user);
		ModelAndView mv = new ModelAndView("pages/nssbSsfl/nssbSsfl");
		mv.addObject("awftMap", awftMap);
		mv.addObject("bmmc", bmmc);
		return mv;
	}

	@RequestMapping("/login.do")
	public ModelAndView login(String userName, String password) {
		Subject currentUser = SecurityUtils.getSubject();
//		if (currentUser.isAuthenticated()) {
//			currentUser.logout();
//		}
		UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
		token.setRememberMe(false);
		try {
			currentUser.login(token);
		} catch (IncorrectCredentialsException ice) {
			// 捕获密码错误异常
			ModelAndView mv = new ModelAndView("pages/404");
			mv.addObject("message", "password error!");
			return mv;
		} catch (UnknownAccountException uae) {
			// 捕获未知用户名异常
			ModelAndView mv = new ModelAndView("pages/404");
			mv.addObject("message", "username error!");
			return mv;
		} catch (ExcessiveAttemptsException eae) {
			// 捕获错误登录过多的异常
			ModelAndView mv = new ModelAndView("pages/404");
			mv.addObject("message", "times error");
			return mv;
		}
		User user = new User();
		user.setYhid(userName);// 查询新增表单的参数
		String bmmc = null;
		List<String> list = userService.selectNsbankByName(user);
		if (list.size() > 1) {
			bmmc = list.get(1);

		} else {
			bmmc = list.get(0);
		}
		Map<String, Object> awftMap = userService.selectAwftByName(user);
		ModelAndView mv;
		String msg = "";
		if(awftMap == null){
			msg = "您当前登陆的所属损益行无纳税申报权限！";
			mv = new ModelAndView("pages/404noAccess","msg",msg);
		}else if(awftMap.get("NSRMC").toString().isEmpty()){
			msg = "很抱歉！禁止访问！当前用户所属损益确认行无销方信息，请在编码管理-》销方管理中配置！"; 
			mv = new ModelAndView("pages/404noAccess","msg",msg);
		}else{
			mv = new ModelAndView("pages/nssbSsfl/nssbSsfl");
		}
		mv.addObject("awftMap", awftMap);
		mv.addObject("bmmc", bmmc);
		return mv;
	}

	/**
	 * 分页查询的列表
	 * 
	 * @param pageInputBean
	 * @param sy
	 * @param sm
	 * @return
	 */
	@RequestMapping("/querySsflByPage.do")
	@ResponseBody
	public JSONObject querySsflByPage(PageInputBean pageInputBean, SsflYs sy, SsflBm sm) {
		List<Map<Object, Object>> rowList = new ArrayList<Map<Object, Object>>();
		rowList = ss.querySsflByPage(pageInputBean, sy, sm);
		int total = ss.querySsflCount(pageInputBean, sy, sm);
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);

		return rt;

	}

	@RequestMapping(value = "/updateSpmc.do", method = RequestMethod.POST)
	@ResponseBody
	public String updateSsfl(String spmcId, String spmc, String ssflbm) {

		try {

			ss.updateSsflYs(spmcId, spmc, ssflbm);
			return "success";

		} catch (Exception e) {
			return "error";
		}
	}

	/**
	 * 批量删除
	 * 
	 * @param spmc
	 * @return
	 */

	@RequestMapping(value = "/delSsflById.do", method = RequestMethod.POST)
	public @ResponseBody
	String delSsflId(String spmc) {

		try {
			ss.deleleSsflById(spmc);

			return "success";
		} catch (Exception e) {
			return "error";

		}

	}

	/**
	 * 商品名的验证
	 * 
	 * @param spmc
	 * @return
	 */
	@RequestMapping(value = "/checkSpmc.do", method = RequestMethod.POST)
	@ResponseBody
	public String checkSpmc(String spmc) {

		boolean bool = ss.getAllBySpmc(spmc);
		if (bool) {
			return "true";
		} else {
			return "已存在";
		}
	}

	/**
	 * 新增
	 * 
	 * @param spmc
	 * @param ssflbm
	 * @return
	 */

	@RequestMapping("/add.do")
	@ResponseBody
	public String addSsfl(String spmc, String ssflbm) {
		ss.addSsflYs(spmc, ssflbm);
		return "success";
	}
	
	@RequestMapping("/selectSsflList.do")
	@ResponseBody
	public String selectAuditZtree() {
		
		
		List<SsflBm> listZtree = ssflBmService.selectBmlist();
		
		return JsonMapper.toJSONString(listZtree);
		
	}
}
