function detail_init(){
	var detail_cancel = document.createElement("input");
	detail_cancel.setAttribute("style","position:absolute;left:1135px;top:0px;width:25px;height:25px");
	detail_cancel.type="button";
	detail_cancel.value="X";
	detail_cancel.onclick= function(){document.getElementById("hldetail").style.display="none"};
	Fifth.appendChild(detail_cancel);
	for (c=0;c<hl_arcs.length;c++){
		hl_piedata[c] = new Array(chap.length);
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
		hl_arcs[c] = svg5.selectAll(".hl_arcs_"+c)
				  .data(pie(hl_piedata[c]))
				  .enter()
				  .append("g")
				  .attr("transform","translate("+ ((hl_outerRadius*2+hl_padding)*(c+0.5)+60) +",150)");
		hl_path[c] = hl_arcs[c].append("path")
			.attr("fill",function(d,i){
				return chap_color[i%chap_color.length];
			})
			.attr("d",function(d){
				return hl_arc(d);
			});
		hl_text[c] = hl_arcs[c].append("text")
			.attr("transform",function(d){
				return "translate(" + hl_arc.centroid(d) + ")";
			})
			.attr("text-anchor","middle")
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
	for (i=0;i<hl_circles.length;i++){
		hl_circles[i] = svg5.append("circle")
			.attr("cx",(hl_outerRadius*2+hl_padding)*(i+0.5)+60)
			.attr("cy",150)
			.attr("r",hl_innerRadius)
			.attr("fill","white");
		hl_midtext[i] = svg5.append("text")
			.attr("x",(hl_outerRadius*2+hl_padding)*(i+0.5)+60)
			.attr("y",150)
			.attr("text-anchor","middle")
			.text(piedata[i].data);
	}
	hl_word_str = "Highlighted Words: ";
	for (i=0;i<HL.length;i++){
		hl_word_str += HL[i][0];
		console.log(i,HL[i][0]);
		if (i != HL.length-1) hl_word_str += ", ";
		else hl_word_str += ".";
	}
	hl_word_list = svg5.append("text")
		.attr("x",50+(hl_outerRadius*2+hl_padding)*0.5)
		.attr("y",160+hl_outerRadius+2*hl_padding)
		.attr("font-size","20px")
		.attr("text-anchor","middle")
		.text(hl_word_str);
}