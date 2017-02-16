package com.aisino.nssb.utils;

import java.util.ArrayList;
import java.util.List;

public class ListUtil {
	public static List<List<String>> splitList(List<String> in, int subSize) {
		List<List<String>> out = new ArrayList<List<String>>();
		int n = in.size() / subSize;
		int m = in.size() % subSize;
		int i = 0;
		for (; i < n; i++) {
			List<String> temp = new ArrayList<String>();
			for (int j = 0; j < subSize; j++) {
				temp.add(in.get(i * subSize + j));
			}
			out.add(temp);
		}
		List<String> temp = new ArrayList<String>();
		for (int k = 0; k < m; k++) {
			temp.add(in.get(i * subSize + k));
		}
		out.add(temp);
		return out;
	}
	public static void main(String[] args) {
		List<String> in = new ArrayList<String>();
		for(int i=0;i<19;i++){
			in.add(Integer.toString(i));
		}
		List<List<String>> out = ListUtil.splitList(in, 5);
		for(int i = 0; i < out.size(); i++){
			List<String> tmp = out.get(i);
			for(int j = 0; j < tmp.size(); j++){
				System.out.println(tmp.get(j));
			}
		}
	}
}
