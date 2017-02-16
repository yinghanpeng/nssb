package com.aisino.nssb.core.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.aisino.nssb.core.user.service.UserService;

@Controller
@RequestMapping
public class LoginController {
	
	@Autowired
	UserService userService;//用户表

	@RequestMapping("/login.do")
	@ResponseBody
	public String login(String userName, String password) {
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
			return "密码错误";
		} catch (UnknownAccountException uae) {
			// 捕获未知用户名异常
			return "用户名错误";
		} catch (ExcessiveAttemptsException eae) {
			// 捕获错误登录过多的异常
			return "用户已经被锁定1小时";
		}
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		return df.format(new Date()) + ":用户" + userName + "登录成功";
	}

	@RequestMapping("/logout.do")
	@ResponseBody
	public String logout() {
		String ret = "用户" + SecurityUtils.getSubject().getPrincipal().toString() + "退出登录";
		SecurityUtils.getSubject().logout();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		return df.format(new Date()) + ":" + ret;
	}

}
