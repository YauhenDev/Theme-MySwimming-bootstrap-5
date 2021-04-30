@@include('../../../node_modules/inputmask/dist/jquery.inputmask.min.js')
@@include('../../../node_modules/inputmask/dist/bindings/inputmask.binding.js')

$(document).ready(function() {
	$("#tel_zayavka").inputmask({"mask": "+375 (99) 999-99-99"});
});