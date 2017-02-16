package com.aisino.nssb.core.user.dao;


import java.util.List;
import java.util.Map;

import com.aisino.nssb.core.user.model.User;


public interface UserDao {

	User findByName(String yhid);//用户名
	
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
