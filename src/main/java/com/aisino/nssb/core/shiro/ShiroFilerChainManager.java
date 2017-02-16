package com.aisino.nssb.core.shiro;

import java.util.LinkedHashMap;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.mgt.DefaultFilterChainManager;
import org.apache.shiro.web.filter.mgt.NamedFilterList;
import org.apache.shiro.web.filter.mgt.PathMatchingFilterChainResolver;
import org.apache.shiro.web.servlet.AbstractShiroFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShiroFilerChainManager {

	/**
	 * shiro中的filterChain管理类
	 */
	private DefaultFilterChainManager filterChainManager;

	/**
	 * 保存配置文件中默认的部分
	 */
	private LinkedHashMap<String, NamedFilterList> defaultFilterChains;

	/**
	 * shiroFilterFactoryBean对象注入
	 */
	@Autowired
	private ShiroFilterFactoryBean shiroFilterFactoryBean;

	/**
	 * Spring容器启动时会调用init方法把在spring配置文件中配置的默认拦截器保存下来，之后会自动与数据库中的配置进行合并。
	 */
	//@PostConstruct
	public void init() {
		filterChainManager = getFilterChainManager();
		defaultFilterChains = new LinkedHashMap<String, NamedFilterList>(filterChainManager.getFilterChains());	
	}

	/**
	 * 将配置文件中加载的filterChain和代码中加入的合并
	 * 
	 * @param resources
	 *            资源类
	 */
	public void initFilterChains() {
		// 1、首先删除以前老的filter chain并注册默认的
		filterChainManager.getFilterChains().clear();
		if (defaultFilterChains != null) {
			filterChainManager.getFilterChains().putAll(defaultFilterChains);
		}
		// 2、循环URL Filter 注册filter chain
		/*
		 * for (Resource resource : resources) { String url = resource.getUrl();
		 * 
		 * // 注册perms filter if (!StringUtils.isEmpty(resource.getAuthUrl()) &&
		 * !StringUtils.isEmpty(resource.getUrl())) {
		 * filterChainManager.addToChain("/" + url, "perms",
		 * resource.getAuthUrl()); } }
		 */
		// 按照匹配顺序最后加
		filterChainManager.addToChain("/**", "authc");

	}

	/**
	 * @return 得到过滤器链管理类
	 */
	private DefaultFilterChainManager getFilterChainManager() {
		AbstractShiroFilter shiroFilter = null;
		try {
			/**
			 * shiroFilterFactoryBean 获取shirofilter的父类AbstractShiroFilter
			 */
			shiroFilter = (AbstractShiroFilter) shiroFilterFactoryBean.getObject();
		} catch (Exception e) {
			e.printStackTrace();
		}
		/**
		 * 获取filterchain解析器，
		 * PathMatchingFilterChainResolver内部通过FilterChainManager维护着拦截器链
		 */
		PathMatchingFilterChainResolver filterChainResolver = (PathMatchingFilterChainResolver) shiroFilter.getFilterChainResolver();
		DefaultFilterChainManager manager = (DefaultFilterChainManager) filterChainResolver.getFilterChainManager();
		return manager;
	}
}
