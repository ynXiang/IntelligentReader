function add2cloud(hlstr){
	var hlwordorigin = hlstr;
	var hlword = "";
	for (i=0;i<hlwordorigin.length;i++){
		if (hlwordorigin.charCodeAt(i) != 10){
			hlword += hlwordorigin[i];
		}
	}
	var chap_index=0;
	var i=1;
	for (;i<chap.length;i++){
		if ((chap_pos[0][1]+padding)<chap_hl[i][1]){
			chap_index = i-1;
			break;
		}
	}
	if (i==chap.length && chap_index == 0) chap_index = chap.length-1;
	var exist = false;
	var tmp = 0;
	if (chap_index==0){
		for (i=0;i<parseInt(word_cl[0]);i++){
			if (word_cl[word_num[0][0]+1-i]==hlword){
				exist = true;
				tmp = word_num[0][0]+1-i;
				break;
			}
		}
	}
	else{
		for (i=0;i<parseInt(word_cl[word_num[chap_index-1][0]+2*chap_index]);i++){
			if (word_cl[word_num[chap_index][0]+2*(chap_index+1)-1-i]==hlword){
				exist = true;
				tmp = word_num[chap_index][0]+2*(chap_index+1)-1-i;
				break;
			}
		}
	}
	for (i=chap_index;i<chap.length;i++){
		if (exist){
			word_num[i][0]--;
			if (i==0) word_cl[0]--;
			else{
				if (i==chap_index) word_cl[word_num[i-1][0]+2*i]--;
				else word_cl[word_num[i-1][0]+2*i+1]--;
			}			
		}
		else{
			word_num[i][0]++;
			if (i==0) word_cl[0]++;
			else{
				if (i==chap_index) word_cl[word_num[i-1][0]+2*i]++;
				else word_cl[word_num[i-1][0]+2*i-1]++;
			}
		}
	}
	if (exist){
		word_cl.splice(tmp,1);
	}
	else{
		if (chap_index==0) word_cl.splice(2,0,hlword);
		else word_cl.splice(word_num[chap_index-1][0]+2*chap_index+2,0,hlword);
	}
	set_word_cl();
	init_word_cl();
}
