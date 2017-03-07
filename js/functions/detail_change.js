function detail_change(){
	for (c=0;c<hl_arcs.length;c++){
		var zero_detect = true; //detect whether all numbers of highlighted words are zeros.
		for (t=0;t<chap.length;t++){
			hl_piedata[c][t] = chap[t][1][c];
			if (chap[t][1][c]!=0){
				zero_detect = false;
			}
		}
		if (zero_detect){
			for (t=0;t<chap.length;t++){
				hl_piedata[c][t] = 1;
			}
		}
		hl_path[c].data(pie(hl_piedata[c]))
			.attr("d",function(d){
				return hl_arc(d);
			});
		hl_text[c].data(pie(hl_piedata[c]))
			.attr("transform",function(d){
				return "translate(" + hl_arc.centroid(d) + ")";
			})
			.text(function(d,i){
				if (zero_detect){
					return "C"+(i+1)+":"+(d.value-1);
				}
				else{
					if (d.value == 0){
						return "";
					}
					else{
						return "C"+(i+1)+":"+d.value;
					}
				}
			});		
	}
	hl_word_str = "Highlighted Words: ";
	for (i=0;i<HL.length;i++){
		hl_word_str += HL[i][0];
		console.log(i,HL[i][0]);
		if (i != HL.length-1) hl_word_str += ", ";
		else hl_word_str += ".";
	}
	hl_word_list.text(hl_word_str);
}
