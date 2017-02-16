package com.aisino.nssb.core.afwthdm.dao;

import java.util.List;

import com.aisino.nssb.core.afwthdm.model.NssbAfwtHandsonModel;

public interface NssbAfwtHandsonModelDao {
  
	
	void delBymodel(String model);
	
	void insertListTemp(List<NssbAfwtHandsonModel>  TempList);
}