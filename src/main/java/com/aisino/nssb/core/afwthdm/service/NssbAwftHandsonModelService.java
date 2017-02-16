package com.aisino.nssb.core.afwthdm.service;

import java.util.List;

import com.aisino.nssb.core.afwthdm.model.NssbAfwtHandsonModel;

public interface NssbAwftHandsonModelService {

void delBymodel(String model);

void insertListTemp(List<NssbAfwtHandsonModel>  TempList);
	

}
