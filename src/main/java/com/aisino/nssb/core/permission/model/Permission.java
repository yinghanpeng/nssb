package com.aisino.nssb.core.permission.model;

import java.util.List;

import com.aisino.nssb.core.role.model.Role;


  
public class Permission {  
  
    private Integer id;  
    private String permissionname;  
    private List<Role> roleList;  
      
    public Integer getId() {  
        return id;  
    }  
    public void setId(Integer id) {  
        this.id = id;  
    }  
    public String getPermissionname() {  
        return permissionname;  
    }  
    public void setPermissionname(String permissionname) {  
        this.permissionname = permissionname;  
    }
	public List<Role> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}  
      
} 
