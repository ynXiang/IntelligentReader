function menushow(){
	menu_hlstr = getSelectText();
	var evt = window.event || arguments[0];
	var menu = document.getElementById('menuattr');
	menu.style.left = (evt.clientX-menu_width-2*padding-20)+"px";
	if ((evt.clientY-padding)<0) menu.style.top = padding+"px";
	else menu.style.top = (evt.clientY)+"px";
	menu.style.display = "";
}

function menucancel(){
	menu_hlstr = "";
	var menu = document.getElementById('menuattr');
	menu.style.display = "none";
}

var w1 = 0;
var h1 = 0;

function menushow_detail(){
	menu = document.getElementById("hldetail");
	menu.style.display="";
	menu.style.width = 0+"px";
	menu.style.height = 0+"px";
	w1 = 0;
	h1 = 0;
	setTimeout("menushow_change(menu)",2);
}

function menushow_change(menu){
	w1 += 11.5;
	h1 += 4.8;
	menu.style.width = w1 + "px";
	menu.style.height = h1 + "px";
	if (h1 <= hld_height+2*padding){
		setTimeout("menushow_change(menu)",2);
	}
}

function menushow_wd(){
	menu = document.getElementById("wd");
	menu.style.display="";
	menu.style.width = 0+"px";
	menu.style.height = 0+"px";
	w1 = 0;
	h1 = 0;
	setTimeout("menushow_change(menu)",2);
	word_dis(getSelectText());
}

function close_contact(){
	document.getElementById("contact").style.display = "none";
}

function close_help(){
	document.getElementById("help").style.display = "none";
}