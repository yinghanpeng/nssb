package com.aisino.nssb.core.xxfp.test;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class xxfpTest {
	private static Logger logger = LoggerFactory.getLogger(xxfpTest.class);

	@Test
	public void test() throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sdf.parse("2016-04-01");
		Date jsrq = sdf.parse("2016-04-30");
		jsrq.toString();
		logger.info("开始");
		List<String> sh = new ArrayList<String>();
		
		sh.add("110101201603098");
		sh.add("110101201604140");
		sh.add("914408000553912051");
		sh.add("666666666");
		List<String> sl = new ArrayList<String>();
		sl.add("0.17");
		//sl.add("0.170000");
		List<String> fpzl = new ArrayList<String>();
		fpzl.add("0");
		fpzl.add("2");

	}
}
