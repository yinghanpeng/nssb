package com.aisino.nssb.core.table1.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.aisino.nssb.core.bean.InputBean;
import com.aisino.nssb.core.table1.service.table1Service;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class table1ServiceTest {
	@Autowired
	private table1Service tb1;

	private static Logger logger = LoggerFactory.getLogger(table1ServiceTest.class);

	@Test
	public void test() throws Exception {


		InputBean in = new InputBean();
		
		in.setSbqz("2016-05-31");
		in.setSbqq("2016-04-01");
		in.setYstjgh("0000");
		tb1.init(in);
		tb1.getSheet3C3R18();
		tb1.getSheet3C4R21();
		
	    logger.info("测试结束");

	}

}
