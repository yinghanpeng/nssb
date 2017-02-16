package com.aisino.nssb.core.table1.service;

import java.math.BigDecimal;
import java.text.ParseException;

import com.aisino.nssb.core.bean.InputBean;

public interface table1Service {
	void init(InputBean inputBean) throws ParseException;


	BigDecimal getSheet3C3R8() throws ParseException, Exception;

	BigDecimal getSheet3C3R11() throws ParseException, Exception;

	BigDecimal getSheet3C3R12() throws ParseException, Exception;

	BigDecimal getSheet3C3R13() throws ParseException, Exception;;

	BigDecimal getSheet3C3R14() throws ParseException, Exception;;

	BigDecimal getSheet3C3R15() throws ParseException, Exception;;

	BigDecimal getSheet3C3R17() throws ParseException, Exception;;

	BigDecimal getSheet3C3R18() throws ParseException, Exception;;

	BigDecimal getSheet3C4R8();

	BigDecimal getSheet3C4R9();

	BigDecimal getSheet3C4R10();

	BigDecimal getSheet3C4R11();

	BigDecimal getSheet3C4R12();

	BigDecimal getSheet3C4R13();

	BigDecimal getSheet3C4R14();

	BigDecimal getSheet3C4R15();

	BigDecimal getSheet3C4R16();

	BigDecimal getSheet3C4R17();

	BigDecimal getSheet3C4R18();

	BigDecimal getSheet3C4R19();

	BigDecimal getSheet3C4R21();

	BigDecimal getSheet3C4R22();
}
