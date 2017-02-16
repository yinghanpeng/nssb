package com.aisino.nssb.core.afwt.test;



import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.aisino.nssb.core.afwt.model.NssbAfwt;
import com.aisino.nssb.core.afwt.service.NssbAfwtService;
import com.aisino.nssb.core.afwthd.service.NssbAfwtHandsonService;
import com.aisino.nssb.core.afwthdm.service.NssbAwftHandsonModelService;
import com.aisino.nssb.core.apfile.service.NssbApplyFileService;

import com.aisino.nssb.core.handsonTableModel.service.HandsonTableModelSerivce;
import com.aisino.nssb.core.user.service.UserService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-root.xml")
public class afwtTest {
       
	
	@Autowired
	NssbAfwtService  bs;
	@Autowired
	NssbAfwtHandsonService  nahs;
	
	@Autowired
	HandsonTableModelSerivce  model;
	@Autowired
	UserService  userService;
	@Autowired
	NssbApplyFileService nssbApplyFileService;
	@Autowired
	NssbAwftHandsonModelService  nssbAwftHandsonModelService;
	
	@Test
	public void test() throws Exception {
		
		//ring applyId="20161111213721";
		    //List<String> apply = nahs.selectStateByApplyId(applyId);
		  //  if(apply.indexOf("1")!=-1){
		    	
		    //	System.out.println("aaaaaaaaa");
		    	
		   // }else{
		    //	System.out.println("bbbbbbbbbb");
		    	
		    	
		    //}
		//User  user=new User();
		//user.setYhid("wangjun");
		//Map<String, Object> bmid = userService.selectAwftByName(user);
		//String ss=bmid.get("QX_BMID").toString();
		//	System.out.println(ss);
		//}
		

	 	//Properties prop = new Properties();
		//InputStream in = this.getClass().getClassLoader()
		//		.getResourceAsStream("config.properties");
		//prop.load(in);
		//String Fpath = prop.getProperty("upFilePath");
		//in.close();
//	String path = PropertiesUtil.getProperties("filePath").trim();
//		System.out.println(path);
		//String id="89";
		// List<String> nssbname = nssbApplyFileService.queryFileById(id);
	//	System.out.println(nssbname.toString());
		/*String temp="22,34,45,45";
		List<NssbAfwtHandsonModel>  TempList=new ArrayList<NssbAfwtHandsonModel>();
		String model="1";
	//	nssbAwftHandsonModelService.delBymodel(model);
		String[] applytemp=temp.split(",");
		for(int i=0;i<applytemp.length;i++){
			NssbAfwtHandsonModel templist=new NssbAfwtHandsonModel();
			templist.setModel(model);
			templist.setTempBank(applytemp[i]);
			
		}
		TempList.add(templist);
		
		nssbAwftHandsonModelService.insertListTemp(TempList);*/
		//NssbApplyFile  nssbApplyFile=new NssbApplyFile();
		//nssbApplyFile.setApplyId("34");
		//nssbApplyFile.setRowId("2");
		//List<NssbApplyFile> too = nssbApplyFileService.SelectDelByRowId(nssbApplyFile);
		//for(int i=0;i<too.size();i++){
			
			
		//}
		//System.out.println(too.toString())
		NssbAfwt nssbAwfwt=new  NssbAfwt ();
		nssbAwfwt.setSkSdate("2016");
		nssbAwfwt.setQxBmId("02571AK210");		
	    List<String> list = bs.queryTaxdBy(nssbAwfwt);
	    System.out.println(list.toString());
	}
}
