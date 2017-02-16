package com.aisino.nssb.core.handsonTableName.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.aisino.nssb.core.handsonTableName.model.HandsonTableName;
import com.aisino.nssb.core.handsonTableName.service.HandsonTableNameService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class HandsonTest {
	
	
	@Autowired
	private HandsonTableNameService  hs;
	
	@Test
	public void test(){
		
		 HandsonTableName  handsonTableName=new HandsonTableName();
		 
		// handsonTableName.setTableId("4");
		 handsonTableName.setTableName("测试我测试");
		 
		 hs.insert(handsonTableName);
		
		
		
		
		
	}

}
