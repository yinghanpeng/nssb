package com.aisino.nssb.core.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;

public class LoginRealm extends AuthorizingRealm {
	@Autowired
	ShiroFilerChainManager shiroFilerChainManager;

	@Autowired
	UserService userService;

	/**
	 * 权限认证
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

		// SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		// 查询当前用户拥有的权限，并注册
		// info.addStringPermission("/kmye.jsp");
		// info.addStringPermission("ssfl");
		return null;
	}

	/**
	 * 登录认证
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		// 每次用户登录都先刷新权限列表
		// shiroFilerChainManager.initFilterChains();
		UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
		// 根据userId查找用户
		User user = userService.getUserByName(token.getUsername());
		if (user == null)
			return null;
		return new SimpleAuthenticationInfo(token.getUsername(), user.getPassword(), getName());
	}
}
