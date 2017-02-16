package com.aisino.nssb.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.util.JSONPObject;





import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Map;
import java.util.TimeZone;

/**
 * 简单封装Jackson，实现JSON String<->Java Object的Mapper.
 * 封装不同的输出风格, 使用不同的builder函数创建实例.
 */
@SuppressWarnings(value={"unused","unchecked","rawtypes"})
public abstract  class JsonMapper {
   

    private static  ObjectMapper objectMapper;

	private static JsonFactory jf = new JsonFactory();

    private static final String DEFAULT_STRING_FORMAT="yyyy-MM-dd HH:mm:ss";

    static{
        objectMapper=new ObjectMapper();
        //去掉默认的时间戳格式
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        //设置为中国上海时区
        objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
        objectMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
        //空值不序列化
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        //反序列化时，属性不存在的兼容处理
        objectMapper.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        //当找不到对应的序列化器时 忽略此字段
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        //单引号处理
        objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
    }




    /**
     * Object可以是POJO，也可以是Collection或数组。
     * 如果对象为Null, 返回"null".
     * 如果集合为空集合, 返回"[]".
     */
    public static final String toJSONString(Object object) {
        return toJSONString(object,false);
    }

    public static final String toJSONString(Object object,boolean prettyPrint){
            try {
                if (!prettyPrint) {
                    return objectMapper.writeValueAsString(object);
                }else{
                    return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
                }
            } catch (JsonProcessingException e) {
              
            }
        return null;
    }

    public static final String toJSONString(Object object,Map<SerializationFeature,Boolean> sfMap){
        for (SerializationFeature serializationFeature : sfMap.keySet()) {
            objectMapper.configure(serializationFeature,sfMap.get(serializationFeature));
        }
        return toJSONString(object,false);
    }

    public static final byte[] toJSONBytes(Object object){
        try {
            return objectMapper.writeValueAsBytes(object);
        } catch (JsonProcessingException e) {
          
        }
        return null;
    }



    public static final String toJSONWithUnicode(Object object) {
        //使Jackson JSON支持Unicode编码非ASCII字符
        SimpleModule module=new SimpleModule();
        module.addSerializer(String.class, new StringUnicodeSerializer ());
        objectMapper.registerModule(module);
        //设置null值不参与序列化(字段不被显示)
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return toJSONString(object);
    }

    public static final String toJSONStringWithDateFormat(Object object,String dateFormat,boolean prettyPrint) {
        if (dateFormat==null){
            dateFormat=DEFAULT_STRING_FORMAT;
        }
        //序列化时，日期的统一格式
        objectMapper.setDateFormat(new SimpleDateFormat(dateFormat));
        return toJSONString(object,true);
    }
    
    
    public static final String toJSONStringWithDateFormat(Object object,String dateFormat) {
        if (dateFormat==null){
            dateFormat=DEFAULT_STRING_FORMAT;
        }
        //序列化时，日期的统一格式
        objectMapper.setDateFormat(new SimpleDateFormat(dateFormat));
        return toJSONString(object,false);
    }
    
    public static final String toJSONStringWithDateFormat(Object object) {
        //序列化时，日期的统一格式
        objectMapper.setDateFormat(new SimpleDateFormat(DEFAULT_STRING_FORMAT));
        return toJSONString(object,false);
    }
    
    /**
     * 輸出JSONP格式数据.
     */
    public static final String toJSONP(String functionName, Object object){
           return toJSONString(new JSONPObject(functionName,object));
    }

    /**
     * 反序列化POJO或简单Collection如List<String>.
     * 如果JSON字符串为Null或"null"字符串, 返回Null.
     * 如果JSON字符串为"[]", 返回空集合.
     * 如需反序列化复杂Collection如List<MyBean>, 请使用fromJson(String, JavaType)
     *  #fromJson(String, javatype)
     */
    public static <T> T fromJson(String jsonString, Class<T> clazz) {
        if (jsonString==null||jsonString.length()==0) {
            return null;
        }
        try {
            return objectMapper.readValue(jsonString, clazz);
        }catch (JsonParseException e){
            
        }catch (JsonMappingException e){
          
        }catch (IOException e){
            
        }
        return null;
    }

    /**
     * 反序列化复杂Collection如List<Bean>, 先使用createCollectionType()或contructMapType()构造类型, 然后调用本函数.
     * createCollectionType(Class, Class...)
     */
	public static <T> T fromJson(String jsonString, JavaType javaType) {
        if (jsonString==null||jsonString.length()==0) {
            return null;
        }
        try {
            return (T) objectMapper.readValue(jsonString, javaType);
        } catch (IOException e) {
            
            return null;
        }
    }

    /**
     * 构造Collection类型.
     */
    public static JavaType contructCollectionType( Class<? extends Collection> collectionClass, Class<?> elementClass) {
        return objectMapper.getTypeFactory().constructCollectionType(collectionClass, elementClass);
    }

    /**
     * 构造Map类型.
     */
    public static JavaType contructMapType(Class<? extends Map> mapClass, Class<?> keyClass, Class<?> valueClass) {
        return objectMapper.getTypeFactory().constructMapType(mapClass, keyClass, valueClass);
    }

    /**
     * 当JSON里只含有Bean的部分属性时，更新一个已存在Bean，只覆盖部分的属性.
     */
    public static void  update(String jsonString, Object object) {
        try {
            objectMapper.readerForUpdating(object).readValue(jsonString);
        } catch (JsonProcessingException e) {
            
        } catch (IOException e) {
         
        }
    }

    /**
     * 设定是否使用Enum的toString函数读写Enum，
     * 为False时使用Enum的name（）函数来对读写Enum，默认为false
     * 注意本函數一定要在Mapper创建后, 所有的读写动作之前调用.
     */
    public static void enableEnumUseToString() {
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
        objectMapper.enable(DeserializationFeature.READ_ENUMS_USING_TO_STRING);
    }

 

    public static ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public static ObjectMapper getObjectMapper(String dateFormat){
        //序列化时，日期的统一格式
        objectMapper.setDateFormat(new SimpleDateFormat(dateFormat));
        return objectMapper;
    }
    
    public static String camelToLowerCaseWithUnderScores(Object object){
    	objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
    	return toJSONString(object, false);
    }
    
    public static String camelToLowerCaseWithUnderScores(Object object,String dateFormat){
    	objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
    	return toJSONStringWithDateFormat(object, dateFormat);
    }
}
