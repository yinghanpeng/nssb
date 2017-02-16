package com.aisino.nssb.core.job;

import org.springframework.beans.factory.annotation.Autowired;

import com.aisino.nssb.core.job.service.UserSynService;

public class UserSynJob {
	@Autowired
	UserSynService userSynService;
	public void execute() throws Exception {
		System.out.println("执行同步任务~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		userSynService.addUser();
	}
}
