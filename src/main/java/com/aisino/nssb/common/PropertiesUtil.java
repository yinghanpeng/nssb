package com.aisino.nssb.common;


import java.io.IOException;
import java.io.InputStream;


import java.util.Properties;
import java.lang.ClassLoader;

public final class PropertiesUtil {
	public static String getProperties(String name) throws IOException{
		Properties prop = new Properties();
		InputStream in = ClassLoader.getSystemResourceAsStream("config.properties");
		prop.load(in);	
		in.close();
 		return(new String(prop.getProperty(name).getBytes("ISO-8859-1"),"UTF-8"));
	}
}
