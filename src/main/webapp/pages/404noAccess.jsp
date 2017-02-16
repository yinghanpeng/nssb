<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<style>
body {
	font-family: "Trebuchet MS", "Helvetica", "Arial", "Verdana",
		"sans-serif";
	font-size: 62.5%;
	margin: 0px;
}
</style>
	</head>
	<title>出错了~</title>
	<body>
		<div id="queryBar" class="topBarButtonZone">
		</div>
		<div id="queryItem">
			<h1 style="text-align: center;">
				${msg}
				
			</h1>
		</div>
	</body>
</html>