function img_change(i,over){
	if (over){
		document.getElementById("img"+i).style.opacity = 0.35;
		document.getElementById("bt"+i).style.display = "";
	}
	else{
		document.getElementById("img"+i).style.opacity = 1;
		document.getElementById("bt"+i).style.display = "none";
	}
}