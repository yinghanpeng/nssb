package com.aisino.nssb.core.user.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.user.dao.UserDao;
import com.aisino.nssb.core.user.model.User;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserDao userDao;
	
//	@Autowired
//	private RoleDao roleDao;
//	
//	@Autowired
//	private PermissionDao permissionDao;
	
	
	
	
	/**
     * 根据用户名查找用户
     * @param username
     * @return
     * 
     */
	public User getUserByName(String yhid) {
		return userDao.findByName(yhid);
	}

	public Map<String, Object> selectAwftByName(User user) {
		
		return userDao.selectAwftByName(user);
	}

	public List<Map<String, Object>> selectAuditByName(User user) {
		
		return userDao.selectAuditByName(user);
	}

	public List<String> selectNsbankByName(User user) {
		
		return userDao.selectNsbankByName(user);
	}

	public List<Map<String, Object>> selectNsBankByName(User user) {
		
		return userDao.selectNsBankByName(user);
	}


	
	
	
	

//	/**
//     * 根据用户名查找其角色
//     * @param username
//     * @return
//     * 
//     */
//	public List<Role> findRoles(String yhmc){
//		return roleDao.findRoles(yhmc); 
//	}
//
//
//    /**
//     * 根据用户名查找其权限
//     * @param username
//     * @return
//     * 
//     */
//	public List<Permission> findPermissions(String roleName) {
//		
//		return permissionDao.findPermissions(roleName);
//	}
	
	




}
