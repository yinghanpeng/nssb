package com.aisino.nssb.core.user.service;


import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.user.model.User;

public interface UserService {

	User getUserByName(String yhid);  
	//List<Role> findRoles(String yhmc);
	//List<Permission> findPermissions(String roleName);
	Map<String, Object>  selectAwftByName(User user);
	
	List<Map<String, Object>>  selectAuditByName(User user);
	
	/**
	 * 查询所属的行
	 * @param user
	 * @return
	 */
	List<Map<String, Object>>  selectNsBankByName(User user);
	
	List<String>  selectNsbankByName(User user);
}
