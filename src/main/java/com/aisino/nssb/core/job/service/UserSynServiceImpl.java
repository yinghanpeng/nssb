package com.aisino.nssb.core.job.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.job.dao.UserSynDao;

@Service
public class UserSynServiceImpl implements UserSynService {
	@Autowired
	UserSynDao userSynDao;

	public void addUser() {
		userSynDao.addUser();

	}

}
