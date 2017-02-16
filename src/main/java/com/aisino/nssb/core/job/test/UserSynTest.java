package com.aisino.nssb.core.job.test;

import java.text.ParseException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.aisino.nssb.core.job.service.UserSynService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class UserSynTest {

	@Autowired
	private UserSynService userSynService;


	
	@Test
	public void test() throws ParseException {
		userSynService.addUser();
	}

}
