package com.aisino.nssb.core.controller;

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
import org.springframework.web.servlet.ModelAndView;
import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;

@Controller
@RequestMapping("/nssbAudit")
public class NssbAuditController {

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
		ModelAndView mv = new ModelAndView("pages/nssbAudit/nssbAudit");
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
			mv = new ModelAndView("pages/nssbAudit/nssbAudit");
		}
		mv.addObject("awftMap", awftMap);
		mv.addObject("bmmc", bmmc);
		return mv;
	}
}
