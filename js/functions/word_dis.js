function word_dis(hlstr){
	if (!dis_first){
		line_rects_svg.remove();
		line_interval_svg.remove();
		line_text_svg.remove();
		diag_rect.remove();
		diag_text.remove();
	}
	var wd_cancel = document.createElement("input");
	wd_cancel.setAttribute("style","position:absolute;left:1135px;top:0px;width:25px;height:25px");
	wd_cancel.type="button";
	wd_cancel.value="X";
	wd_cancel.onclick= function(){document.getElementById("wd").style.display="none"};
	Sixth.appendChild(wd_cancel);
	if (!dis_first){
			line_rects_svg.remove();
	}
	chap_dis = new Array(chap.length);
	line_text = new Array(chap.length);
	for (i=0;i<chap_dis.length;i++){
		chap_dis[i] = 0;
		line_text[i] = [0,120,"Chapter "+(i+1)]; //x,y,text
	}
	line_interval = new Array(chap.length*2+1);
	for (i=0;i<line_interval.length;i++){
		line_interval[i] = [0,80]; //x,y
	} 
	line_rects = [];
	dis_first = false;
	var hlwordorigin = hlstr;
	var hlword = "";
	for (i=0;i<hlwordorigin.length;i++){
		if (hlwordorigin.charCodeAt(i) != 10){
			hlword += hlwordorigin[i];
		}
	}
	var cont = 0;
	var disnum = 0;
	var cur_line = 1;
	for (i=0;i<strs.length;i++){
			if (cont == 0){
				if (strs[i][0] == hlword[0]){
					cont++;
					for (j=1;j<hlword.length;j++){
						if (i+j < strs.length){
							if (strs[i+j][0] == hlword[j]) cont++;
							else{
								cont = 0;
								break;
							}
						}
						else{
							cont = 0;
							break;
						}
					}
					if (cont > 0){
						disnum++;
						if (cur_line < strs[i][2]){
							line_rects.push([0,cur_line,strs[i][2]-cur_line]);
						}
						line_rects.push([1,strs[i][2],1]);
						cur_line = strs[i][2]+1;
						for (j=0;j<chap.length;j++){
							if (strs[i][2] <= chap[j][0]){
								chap_dis[j]++;
								break;
							}
						}
					}
				}
			}
			if (cont > 0){
				cont--;
			}
	}
	if (cur_line <= total_line){
		line_rects.push([0,cur_line,total_line-cur_line+1]);
	}
	var rect_width = (wd_width-30) / total_line;
	line_interval[0][0] = 30;
	for (i=0;i<chap.length;i++){
		line_interval[i+1][0] = 30+rect_width*chap[i][0]-5;
		line_text[i][0] = (line_interval[i][0]+line_interval[i+1][0])/2;
		line_interval[i+chap.length+1][0] = line_text[i][0];
		line_interval[i+chap.length+1][1] = 150;
	}
	line_rects_svg = svg6.selectAll("line_rects_svg")
		.data(line_rects)
		.enter()
		.append("rect")
		.attr("x",function(d){
			return 30+rect_width*d[1];
		})
		.attr("y", 45)
		.attr("width",function(d){
			return rect_width*d[2];
		})
		.attr("height", 30)
		.attr("fill",function(d){
			if (d[0] == 0){
				return "darkblue";
			}
			else{
				return "yellow";
			}
		});
	
	line_interval_svg = svg6.selectAll("line_interval_svg")
		.data(line_interval)
		.enter()
		.append("rect")
		.attr("x",function(d){
			return d[0];
		})
		.attr("y",function(d){
			return d[1];
		})
		.attr("width",2)
		.attr("height",25)
		.attr("fill","black");
		
	line_text_svg = svg6.selectAll("line_text_svg")
		.data(line_text)
		.enter()
		.append("text")
		.attr("x",function(d){
			return d[0];
		})
		.attr("y",function(d){
			return d[1];
		})
		.attr("text-anchor","middle")
		.attr("font-size","22px")
		.attr("fill",function(d,i){
			return chap_color[i%chap_color.length];
		})
		.text(function(d){
			return d[2];
		});
	
	var data = new Array(chap_dis.length);
	for (i=0;i<data.length;i++){
		data[i] = chap_dis[i]/chap[i][0]*100;
	}

	yScale = d3.scale.linear()  
				.domain([0,((parseInt(d3.max(data)/10))+1)*10])  
				.range([250,0]); 
	
	yAxis = d3.svg.axis()  
				.scale(yScale)  
				.orient("left");
	
	yy.call(yAxis);
	
	diag_rect = svg6.selectAll("diag_rect")  
	   .data(data)  
	   .enter()  
	   .append("rect")  
	   .attr("x", function(d,i){  
			return line_text[i][0]-15;  
	   } )  
	   .attr("y",function(d,i){  
			return 220 + yScale(d);  
	   })  
	   .attr("width", function(d,i){  
			return 30;  
	   })  
	   .attr("height",function(d,i){
			return 250 - yScale(d);
	   })  
	   .attr("fill",function(d,i){
			return chap_color[i%chap_color.length];
	   });  
		 
	diag_text = svg6.selectAll("diag_text")  
		.data(data)  
		.enter()
		.append("text")  
		.attr("x", function(d,i){  
			return line_text[i][0];  
	    })  
	    .attr("y",function(d,i){  
			return 220 + yScale(d);  
	    })  
		.attr("dx", -15)
		.attr("dy", -10)  
		.attr("text-anchor", "left")  
		.attr("font-size", 16)  
		.attr("fill","black")  
		.text(function(d,i){  
			return parseInt(d*10)/10+"%"; 
		});  	
	dis_first = false;
	if (disnum == 0){
		alert("Wrong highlight range!");
		menucancel();
	}
}