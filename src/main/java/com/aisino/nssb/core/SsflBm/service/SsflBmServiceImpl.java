package com.aisino.nssb.core.SsflBm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aisino.nssb.core.SsflBm.dao.SsflBmDao;
import com.aisino.nssb.core.SsflBm.model.SsflBm;

@Service
public class SsflBmServiceImpl implements SsflBmService {
	
	@Autowired
	SsflBmDao ssflBmDao;

	public List<SsflBm> selectBmlist() {
		
		return ssflBmDao.selectBmlist();
	}

}
