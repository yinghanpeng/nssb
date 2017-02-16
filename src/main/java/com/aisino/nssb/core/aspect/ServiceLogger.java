package com.aisino.nssb.core.aspect;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONArray;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Aspect
// 将当前组件设置为切面组件
@Service
public class ServiceLogger {
	private static Logger logger = LoggerFactory.getLogger(ServiceLogger.class);
	private LogEntity log = new LogEntity();

	public void doAfter(JoinPoint jp) {

	}

	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		// 开始执行的时间
		log.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		// 类名
		log.setClassName(pjp.getTarget().getClass().getName());
		// 方法名称
		log.setMethodName(pjp.getSignature().getName());
		// ip地址
		log.setIp(session.getHost());
		// 输入参数
		try {
			JSONArray input = JSONArray.fromObject(pjp.getArgs());
			log.setInput(input.toString());
		} catch (Exception e) {
			log.setInput("");
		}
		long time = System.currentTimeMillis();
		Object retVal = pjp.proceed();
		time = System.currentTimeMillis() - time;
		// 执行时间
		log.setProcessTime(Long.toString(time));
		// 用户名
		log.setUserId((String) subject.getPrincipal());
		// 返回值
		log.setOutput(retVal.toString());
		// 打印log
		logger.info(log.toString());
		return retVal;
	}

	public void doBefore(JoinPoint jp) throws Exception {
	}

	public void afterReturn(Object returnVal) {
	}

	public void doThrowing(JoinPoint jp, Throwable ex) {
		try {
			JSONArray.fromObject(jp.getArgs());
		} catch (Exception e) {

		} finally {
			logger.info("method " + jp.getTarget().getClass().getName() + "." + jp.getSignature().getName() + " throw exception:" + ex.getStackTrace());
		}

	}

}
