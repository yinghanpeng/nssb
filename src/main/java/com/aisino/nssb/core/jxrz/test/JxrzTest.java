package com.aisino.nssb.core.jxrz.test;

import java.text.SimpleDateFormat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class JxrzTest {
	@Test
	public void test() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sdf.parse("2016-04-01");
		sdf.parse("2016-04-30");
		
	}

}
