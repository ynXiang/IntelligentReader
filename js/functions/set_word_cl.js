function set_word_cl(){
	word_num=[];
	rect_interval=[];
	text_chap=[];
	for (i=0;i<chap.length;i++){
		if (i==0) word_num.push([parseInt(word_cl[0]),parseInt(word_cl[1])]);
		else word_num.push([parseInt(word_cl[word_num[i-1][0]+2*i]),parseInt(word_cl[word_num[i-1][0]+2*i+1])]);
		rect_interval.push([-width/2,(chap_height+35)*(i+0.5)-5,width,5,"green"]); // x,y,width,height,fill
	    text_chap.push(["Chap. "+(i+1).toString(),width/2-70,(chap_height+35)*(i+0.5)-10]); // text,x,y
	}
	if (word_cl_already){
		word_str=[];
		all_word_cl = new Array(chap.length);
		for (i=0;i<chap.length;i++){
			var str = new Array(word_num[i][1]);
			for (j=0;j<word_num[i][1];j++){
				if (i==0) str[j] = word_cl[2+j];
				else str[j] = word_cl[word_num[i-1][0]+2*(i+1)+j];
			}
			word_str.push(str);
			all_word_cl[i] = svg2.selectAll(".all_word_cl"+(i).toString())
		}
	}
}