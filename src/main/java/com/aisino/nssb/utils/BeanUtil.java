package com.aisino.nssb.utils;

import java.lang.reflect.Field;
import java.util.HashMap;

public class BeanUtil {
	public static void reflect(Object e,HashMap<String, Object> param) throws Exception {
		Class<? extends Object> cls = e.getClass();
		Field[] fields = cls.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field f = fields[i];
			f.setAccessible(true);
			param.put(f.getName(), f.get(e));
			//System.out.println("属性名:" + f.getName() + " 属性值:" + f.get(e));
		}
	}
}
