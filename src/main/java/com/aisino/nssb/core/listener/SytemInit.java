package com.aisino.nssb.core.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.shiro.ShiroFilerChainManager;

@Service
public class SytemInit implements ApplicationListener<ContextRefreshedEvent> {
	@Autowired
	ShiroFilerChainManager shiroFilerChainManager;

	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		if (event.getApplicationContext().getParent() == null) {
			execute();
		}
	}

	private void execute() {
		shiroFilerChainManager.init();
		shiroFilerChainManager.initFilterChains();
	}

}
