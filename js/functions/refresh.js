function refresh(){
	//Reinitialize all variables.
	chap_pos = [];
	chap_hl = [];
	chap_hlt = [];
	chap_already = false;
	rects.remove();
	rects.remove();
	rect_pos.remove();
	texts.remove();
	init_over = 0;
	if (word_cl_already){
		word_cl = [];
		word_str = [];
		all_word_cl = [];
		word_num = [];
		word_cl_already = false;
		word_cl_count = 0;
		rect_interval = [];
		text_chap = [];
		document.getElementById('middle_canvas').style.display = "";
		document.getElementById('wordclouds').style.display = "none";
		console.log(word_cl_already);
	}
	strs = [];
	chap = [];
	HL = [];
	mulText.remove();
	mulText = container3.selectAll("text");
	for (i=0;i<hl_arcs.length;i++){
		hl_arcs[i].remove();
	}
	hl_arcs = new Array(dataset.length);
	hl_path = new Array(dataset.length);
	hl_text = new Array(dataset.length);
	for (i=0;i<hl_circles.length;i++){
		hl_circles[i].remove();
		hl_midtext[i].remove();
	}
	hl_circles = new Array(dataset.length);
	hl_midtext = new Array(dataset.length);
	hl_word_str = "";
	hl_word_list.remove();
	if (!dis_first){
		line_rects_svg.remove();
		line_interval_svg.remove();
		line_text_svg.remove();
		diag_rect.remove();
		diag_text.remove();
		dis_first = true;
	}
	line_rects = [];
	document.getElementById("hldetail").style.display="none";
	document.getElementById("wd").style.display="none";
}