package com.aisino.nssb.core.SsflYs.test;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.aisino.nssb.core.SsflBm.model.SsflBm;
import com.aisino.nssb.core.SsflYs.model.SsflYs;
import com.aisino.nssb.core.SsflYs.service.SsflYsService;
import com.aisino.nssb.core.bean.PageInputBean;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class SsflYsTest {
	@Autowired
	private SsflYsService ys;



	@Test
	public void test() throws Exception {
	    	    ys.addSsflYs("1", "11%税率（销售不动产）");
	}
	@Test
	public void test1() throws Exception {
	    	    ys.deleleSsflById("1");
	}
	@Test
	public void test2() throws Exception {
	    	    ys.updateSsflYs("1", "1", "1");
	}
	@Test
	public void test3() throws Exception {
	    	    ys.getAllBySpmc("1");
	}
	@Test
	public void test4() throws Exception {
		PageInputBean page = new PageInputBean();
		SsflYs sy = new SsflYs();
		SsflBm sm = new SsflBm();
		ys.querySsflByPage(page, sy, sm);
	}
	
	

	
	
}
