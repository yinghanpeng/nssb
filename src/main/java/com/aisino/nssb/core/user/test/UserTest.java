package com.aisino.nssb.core.user.test;


import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.aisino.nssb.core.user.model.User;
import com.aisino.nssb.core.user.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class UserTest {
	@Autowired
	private UserService us;


	@Test
	public void test() throws Exception {
		User user =new User();
		user.setYhid("lyb");
	 List<Map<String, Object>> list = us.selectAuditByName(user);
	 
	 System.out.println(list.toString());
	 	
	}

}
