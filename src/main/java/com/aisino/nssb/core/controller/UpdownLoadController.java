package com.aisino.nssb.core.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import com.aisino.nssb.common.AjaxResponse;
import com.aisino.nssb.common.AjaxResponse.MessageType;
import com.aisino.nssb.core.apfile.model.NssbApplyFile;
import com.aisino.nssb.core.apfile.service.NssbApplyFileService;
import com.aisino.nssb.core.bean.PageInputBean;
import com.alibaba.fastjson.JSONObject;


@Controller
@RequestMapping("/interface")
public class UpdownLoadController {
	
	//@Value("${upFilePath}")
	//private String upFilePath;
	@Autowired
	NssbApplyFileService  nssbApplyFileService;
	
		

		/*
	     *采用spring提供的上传文件的方法
	     */
	    @RequestMapping("/FileUpload.do")
	    public @ResponseBody AjaxResponse  springUpload(String rowId,HttpServletRequest request,String applyId) throws Exception {
	         //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
	        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
	                request.getSession().getServletContext());
	        //检查form中是否有enctype="multipart/form-data"
	        try {
				if(multipartResolver.isMultipart(request))
				{
				    //将request变成多部分request
				    MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
				   //获取multiRequest 中所有的文件名
				   Iterator<?> iter = multiRequest.getFileNames();
				    List<NssbApplyFile>  fileList=new ArrayList<NssbApplyFile>();
				    Properties prop = new Properties();

					InputStream in = this.getClass().getClassLoader()
							.getResourceAsStream("config.properties");
					prop.load(in);
					String Fpath = prop.getProperty("upFilePath");
					in.close();
				  // String Fpath = PropertiesUtil.getProperties("filePath").trim();
				 //   String Fpath=upFilePath;
				    while(iter.hasNext())
				    {   
				    	
				    	//一次遍历所有文件
				    	 MultipartFile file=multiRequest.getFile(iter.next().toString());
					       if(file!=null)
					        {
					    	   	Fpath=Fpath+applyId;
					            String path=Fpath+"/"+file.getOriginalFilename();
					            NssbApplyFile nssbApplyFile=new NssbApplyFile();
						    	nssbApplyFile.setApplyId(applyId);
						    	nssbApplyFile.setUploadDate(new Date());
						    	nssbApplyFile.setRowId(rowId);
						    	nssbApplyFile.setFileName(file.getOriginalFilename());

						    	nssbApplyFile.setFilePtah(Fpath);
						    	fileList.add(nssbApplyFile);
					            //上传
						    	File tFile = new File(Fpath);
						    	if(!tFile.exists()){						    		
						    		tFile.mkdirs();
						    	}
					            file.transferTo(new File(path));
					            
					            
					           
					       }
				    }
				   
				    nssbApplyFileService.insertList(fileList);
				    return new AjaxResponse(MessageType.SUCCESS, "上传成功");
				}
				 return new AjaxResponse(MessageType.ERROR, "表单异常");
			} catch (Exception e) {
				
				e.printStackTrace();
				 return new AjaxResponse(MessageType.ERROR, "上传失败");
			}
	        
	       
	    }
	    
	    //文件下载 主要方法
	 
		@RequestMapping("/FileDownload.do")
	    public void download(HttpServletRequest request,  
	        HttpServletResponse response,String id,String filePath, String contentType
	         ) throws Exception {  
			
			response.setContentType("text/html;charset=UTF-8");
	        request.setCharacterEncoding("UTF-8");
	        
	      //获取项目根目录
	      //List<String> fileName = nssbApplyFileService.queryFileById(id);
	      String fileName=nssbApplyFileService.queryFileLoadById(id);
	      //获取下载文件露肩
	      String downLoadPath = filePath+"/"+ fileName;  
	    
	      //获取文件的长度
	      long fileLength = new File(downLoadPath).length();  

	        response.setContentType(contentType);

	        String header = request.getHeader("User-Agent").toUpperCase();
	        if (header.contains("MSIE") || header.contains("TRIDENT") || header.contains("EDGE")) {
	            fileName = URLEncoder.encode(fileName, "utf-8");
	            fileName = fileName.replace("+", "%20");    //IE下载文件名空格变+号问题
	        }else{
	        	
	        }
	        fileName = fileName.replace(" ", "");
	        response.setHeader("Content-disposition", "attachment; filename=\"" + fileName + "\"");
	        response.setHeader("Content-Length", String.valueOf(fileLength));
	      
	      request.setCharacterEncoding("UTF-8");  
	      BufferedInputStream bis = null;  
	      BufferedOutputStream bos = null;  	    

	      //设置文件输出类型
	      response.setContentType("application/octet-stream");  
	      response.setHeader("Content-disposition", "attachment; filename="  
	          + new String(( (String) fileName).getBytes("utf-8"), "ISO8859-1")); 
	      //设置输出长度
	      response.setHeader("Content-Length", String.valueOf(fileLength));  
	      //获取输入流
	      bis = new BufferedInputStream(new FileInputStream(downLoadPath));  
	      //输出流
	      bos = new BufferedOutputStream(response.getOutputStream());  
	      byte[] buff = new byte[2048];  
	      int bytesRead;  
	      while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {  
	        bos.write(buff, 0, bytesRead);  
	      }  
	      //关闭流
	      bis.close();  
	      bos.close();  
	    }  
	  
	    /**
		 * 分页查询
		 * @param pageInputBean
		 * @param NssbApplyFile
		 * @return
		 */
		@RequestMapping("/queryApFileByPage.do")
		@ResponseBody
		public JSONObject queryAfwtByPage(PageInputBean pageInputBean,NssbApplyFile nssbApplyFile) {
			List<Map<Object,Object>> rowList = new ArrayList<Map<Object,Object>>();
			rowList =nssbApplyFileService.queryApFileByPage(pageInputBean, nssbApplyFile);
			int total =nssbApplyFileService.queryApFileCount(pageInputBean, nssbApplyFile); 
			JSONObject rt = new JSONObject();
			rt.put("rows", rowList);
			rt.put("total", total);

			return rt;
			
		}
		/**
		 * 文件上传的删除
		 * @param fileName
		 * @param id
		 * @param filePath
		 * @return
		 */
		 @RequestMapping("/delApFile.do")
		    public @ResponseBody AjaxResponse  delFile(String fileName,String id,String applyId){
			 
			
			 try {
				 	Properties prop = new Properties();
					InputStream in = this.getClass().getClassLoader()
							.getResourceAsStream("config.properties");
					prop.load(in);
					String Fpath = prop.getProperty("upFilePath");
					in.close();
				 String filePath=Fpath+applyId;
				 //String[] nameArray=fileName.split(",");
				  List<String> fileNameList = nssbApplyFileService.queryFileById(id);
				for(int i = 0;i<fileNameList.size();i++){
					 String path=filePath+"/"+fileNameList.get(i);
					 File file= new File(path);
					 if(file.exists()){
					  file.delete();
					 }
				}
				 nssbApplyFileService.deleteApFileById(id);
				 return new AjaxResponse(MessageType.SUCCESS, "删除成功");
			} catch (Exception e) {
				
				e.printStackTrace();
				 return new AjaxResponse(MessageType.ERROR, "删除失败");
			}
			
		 }
		 
		 /**
		  * 删除一整行的数据以及这行上传的文件
		  * @param nssbApplyFile
		  * @return
		  */
		 @RequestMapping("/delRowApFile.do")
		    public @ResponseBody AjaxResponse  delFileAll(NssbApplyFile nssbApplyFile ){
			 try {
				
				 List<NssbApplyFile> delListFile = nssbApplyFileService.SelectDelByRowId(nssbApplyFile);
				 nssbApplyFileService.deleteByFile(nssbApplyFile);
				 for(int i = 0;i<delListFile.size();i++){
					String path=delListFile.get(0).getFilePtah()+"/"+delListFile.get(i).getFileName();
					 File file= new File(path);
					 if(file.exists()){
					  file.delete();
					 }
				}
				 return new AjaxResponse(MessageType.SUCCESS, "删除成功");
			} catch (Exception e) {				
				e.printStackTrace();
				return new AjaxResponse(MessageType.ERROR, "删除失败");
			}
			
			 
			 
		 }

}
