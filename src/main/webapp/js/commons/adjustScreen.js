// 二级模态框自适应
var secondModalAdjustScreen = function() {
	$(".second-modal-dialog-body").css("height",
			($(window).height() * 0.9 - 120) * 1 + "px");
};
// 三级模态框自适应
var thirdModalAdjustScreen = function() {
	$(".third-modal-dialog-body-content").css("height",
			($(window).height() * 0.9 - 120) * 1 + "px");
	$(".third-modal-dialog-body").css("height",
			($(window).height() * 0.87 - 120) * 1 + "px");
	$(".wtHolder").css("height",
			($(window).height() * 0.87 - 120) * 1 + "px");
};
