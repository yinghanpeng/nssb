package com.aisino.nssb.utils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtil {

	/**
	 * 获取月份
	 * 
	 * @param d1
	 * @param d2
	 * @return
	 * @throws ParseException
	 */
	public static List<Date> getMonth(Date d1, Date d2) throws ParseException {
		Calendar dd = Calendar.getInstance();// 定义日期实例
		dd.setTime(d1);// 设置日期起始时间
		List<Date> rt = new ArrayList<Date>();
		while (dd.getTime().before(d2)) {// 判断是否到结束日期
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
//			String str = sdf.format(dd.getTime());
			rt.add(dd.getTime());
			dd.add(Calendar.MONTH, 1);// 进行当前日期月份加1
		}
		return rt;
	}

	/**
	 * 获取月份起始日期
	 * 
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date getMinMonthDate(Date date) throws ParseException {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, calendar
				.getActualMinimum(Calendar.DAY_OF_MONTH));
		// return dateFormat.format(calendar.getTime());
		return calendar.getTime();
	}

	/**
	 * 获取月份最后日期
	 * 
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date getMaxMonthDate(Date date) throws ParseException {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, calendar
				.getActualMaximum(Calendar.DAY_OF_MONTH));
		// return dateFormat.format(calendar.getTime());
		return calendar.getTime();
	}
}