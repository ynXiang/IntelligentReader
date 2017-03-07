function init_chap(){
 	rects = svg1.selectAll("rects")
		.data(chap_hl)
		.enter()
		.append("rect")
		.attr("x",function(d){
			return d[0];
		})
		.attr("y",function(d){
			return d[1];
		})
		.attr("rx",function(d,i){
			if (i < chap.length) return 15;
			else return 0;
		})
		.attr("ry",function(d,i){
			if (i < chap.length) return 15;
			else return 0;
		})
		.attr("width",function(d){
			return d[2];
		})
		.attr("height",function(d){
			return d[3];
		})
		.attr("fill",function(d){
			return d[4];
		})
		.on("click",function(d,i){
			var num = chap_hl.length;
			if (i < num/5){
				var evt = window.event || arguments[0];
				var delta_y = evt.clientY - parseInt(First.style.top,10);
				chap_pos[0][1] = delta_y - chap_pos[0][3]/2;
				if (chap_pos[0][1] < 0) chap_pos[0][1] = 0;
				rect_pos.transition()
					.attr("y",function(d){
						return d[1];
					});
				Third.scrollTop = chap_pos[0][1]*(chap[chap.length-1][0]*20)/height;
			}   
		});
	
	rect_pos = svg1.selectAll("rect_pos")
		.data(chap_pos)
		.enter()
		.append("rect")
		.attr("x",function(d){
			return d[0];
		})
		.attr("y",function(d){
			return d[1];
		})
		.attr("width",function(d){
			return d[2];
		})
		.attr("height",function(d){
			return d[3];
		})
		.attr("fill",function(d){
			return d[4];
		});
	
	texts = svg1.selectAll("texts")
		.data(chap_hlt)
		.enter()
		.append("text")
		.attr("text-anchor","left")
		.attr("x",function(d){
			return d[0];
		})
		.attr("y",function(d){
			return d[1];
		})
		.text(function(d){
			return d[2];
		})
		.attr("font-size",function(d,i){
			if (i < chap.length) return 20+"px";
			else return 15+"px";
		})
		.attr("fill",function(d){
			if (d[2]==0) return "white";
			else return d[3];
		})
	if (init_over == 0) init_over = 1;
}  