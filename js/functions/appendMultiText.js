function appendMultiText(container, str, posX, posY, width, fontsize, fontfamily){			
	if( arguments.length < 6){
		fontsize = 14;
	}		
	
	if( arguments.length < 7){
		fontfamily = "simsun, arial";
	}
	
	//Get splitted strings
	strs = splitByWord(str,width,fontsize);
	
	mulText = container.selectAll("text")
		.data(strs)
		.enter()
		.append("text")
		.attr("transform","translate("+posX+","+posY+")")
		.style("font-size",fontsize)
		.style("font-family",fontfamily)
		.attr("x",function(d){
			return d[1]+"px";
		})
		.attr("y",function(d){
			return d[2]+"em";
		})
		.text(function(d){
			return d[0];
		});
	set_chap_data(1);
	init_chap();
	return 1;
}