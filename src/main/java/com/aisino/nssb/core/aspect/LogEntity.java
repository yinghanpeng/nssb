package com.aisino.nssb.core.aspect;

import java.io.Serializable;

public class LogEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 方法开始时间
	 */
	private String date;
	/**
	 * 当前登录的用户名
	 */
	private String userId;
	/**
	 * 模块名称
	 */
	private String className;
	/**
	 * 执行的方法
	 */
	private String methodName;
	/**
	 * 执行时间
	 */
	private String processTime;
	/**
	 * IP地址
	 */
	private String ip;
	/**
	 * 
	 * 输入参数
	 */
	private String input;
	/**
	 * 输出参数
	 */
	private String output;
	/**
	 * 打印日志
	 */
	public String toString() {
		String ret = "";
		ret += "\n  **********方法开始**********";
		ret += "\n  模块名称:" + className;
		ret += "\n  执行的方法:" + methodName;
		ret += "\n  方法开始时间:" + date;
		ret += "\n  执行时间:" + processTime+"毫秒";
		ret += "\n  用户id:" + userId;
		ret += "\n  IP地址:" + ip;
		ret += "\n  输入参数:" + input;
		ret += "\n  输出参数:" + output;
		ret += "\n  **********方法结束**********";
		return ret;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getProcessTime() {
		return processTime;
	}

	public void setProcessTime(String processTime) {
		this.processTime = processTime;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}
}
