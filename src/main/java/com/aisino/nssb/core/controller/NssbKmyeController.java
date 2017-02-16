package com.aisino.nssb.core.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.aisino.nssb.core.bean.PageInputBean;
import com.aisino.nssb.core.hxkmye.model.hxkmye;
import com.aisino.nssb.core.hxkmye.model.hxkmyeBean;
import com.aisino.nssb.core.hxkmye.service.hxkmyeService;
import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Controller
@RequestMapping("/nssbKmye")
public class NssbKmyeController {
	@Autowired
	hxkmyeService hs;
	@Autowired
	UserService userService;// 用户表

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
		ModelAndView mv = new ModelAndView("pages/nssbKmye/nssbKmye");
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
			mv = new ModelAndView("pages/nssbKmye/nssbKmye");
		}
		mv.addObject("awftMap", awftMap);
		mv.addObject("bmmc", bmmc);
		return mv;
	}

	@RequestMapping("/queryKmyeByPage.do")
	@ResponseBody
	public JSONObject queryKmyeByPage(PageInputBean pageInputBean, hxkmyeBean hb) {
		// Map rt = new HashMap();
		if(hb.getYstjg()==null||hb.getYstjg()=="")
		{
			Subject currentUser = SecurityUtils.getSubject();
			User user = userService.getUserByName((String) currentUser.getPrincipal());
			hb.setYstjg(user.getQxBmid());
		}
		List<Map<Object, Object>> rowList = new ArrayList<Map<Object, Object>>();
		rowList = hs.queryKmyeByPage(pageInputBean, hb);
		int total = hs.queryKmyeCount(pageInputBean, hb);
		JSONObject rt = new JSONObject();
		rt.put("rows", rowList);
		rt.put("total", total);
		return rt;
	}

	@RequestMapping(value = "/addKmye.do")
	public String addKmye(hxkmye hb) {
		if (hb != null) {
			hs.addKmye(hb);
		}
		// return "redirect:queryKmyeByPage.do";
		return "index.jsp";
	}

	@RequestMapping(value = "/deleteKmye.do")
	@ResponseBody
	public String deleteKmye(HttpServletRequest request, HttpServletResponse response) {

		try {
			String rows = request.getParameter("jsonrows");
			JSONArray jsonArray = JSON.parseArray(rows);
			for (int i = 0; i < jsonArray.size(); i++) {

				JSONObject json = (JSONObject) jsonArray.get(i);
				Map<String, String> map = new HashMap<String, String>();
				for (Object k : json.keySet()) {
					String key = "" + k;
					String val = "" + json.get(k);
					map.put(key, val);
				}
				hs.deleteKmye(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "index.jsp";
	}
}
