package com.aisino.nssb.core.hxkmye.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class hxkmyeTest {

	@Test
	public void testGetHxkmyeOneDay() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sdf.parse("2016-05-31");
		
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		Date qsrq = sdf.parse("2016-05-30");
//		List<hxkmye> h = hs.getHxkmyeOneDay("100531", "1065", qsrq);
//		if (h != null && h.size() > 0) {
//			for (hxkmye kmye : h) {
//				System.out.println(kmye.getBal());
//			}
//		} else {
//			System.out.println("查询结果为空");
//		}

//		redisTemplate.execute(new RedisCallback<Boolean>() {
//
//			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
//				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
//                byte[] key  = serializer.serialize("chenyaoaaaa");  
//                byte[] name = serializer.serialize("哈哈哈");
//				connection.setNX(key, name);
//				return true;
//			}
//		});
		
//		RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
//		byte[] key  = serializer.serialize("chenyao111");  
//      byte[] name = serializer.serialize("哈哈哈");
//		System.out.println(jedisConnectionFactory.getHostName());
//		System.out.println(jedisConnectionFactory.getPort());
//		System.out.println(jedisConnectionFactory.getPassword());
//		
//		System.out.println(serializer.deserialize(jedisConnectionFactory.getConnection().get(key)));
		//System.out.println(jedisConnectionFactory.getConnection().setNX(key, name));
		
	//	return "测试1";
//		System.out.println(redisCacheManager.toString());
		
//		PageInputBean pageInputBean = new PageInputBean();
//		hxkmyeBean hb = new hxkmyeBean();
//		pageInputBean.setPageNumber(1);
//		pageInputBean.setPageSize(10);
//		pageInputBean.setSortOrder("desc");
//		pageInputBean.getSortOrder();
//		List<Map> temp = hs.queryKmyeByPage(pageInputBean,hb);
//		JSONObject json = new JSONObject(temp.get(0));
//		jf.getConnection().
//		System.out.println("测试结束"+json.toString());
		
	}

}
