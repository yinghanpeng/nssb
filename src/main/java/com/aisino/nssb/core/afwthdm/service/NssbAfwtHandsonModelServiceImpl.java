package com.aisino.nssb.core.afwthdm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.afwthdm.dao.NssbAfwtHandsonModelDao;
import com.aisino.nssb.core.afwthdm.model.NssbAfwtHandsonModel;




@Service
public class NssbAfwtHandsonModelServiceImpl implements
NssbAwftHandsonModelService {
	
	@Autowired
	NssbAfwtHandsonModelDao dawwo;
	
	public void delBymodel(String model) {
		dawwo.delBymodel(model);
		
	}

	public void insertListTemp(List<NssbAfwtHandsonModel> TempList) {
		dawwo.insertListTemp(TempList);
	}



}
