function init_word_cl(){
	word_cl_count=0;
	for (c=0;c<chap.length;c++){
		var layout = d3.layout.cloud()
			.size([width, chap_height])
			.words(word_str[word_cl_count].map(function(d,i) {
				return {text: d, size: 20-i, test: ""};
			}))
			.padding(5)
			.rotate(0)
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw);
		layout.start();
		word_cl_count++;
	}

	var word_cl_rect = svg2.selectAll("word_cl_rect")
		.data(rect_interval)
		.enter()
		.append("rect")
		.attr("transform","translate("+padding+",0)")
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

	var word_cl_text = svg2.selectAll("word_cl_text")
		.data(text_chap)
		.enter()
		.append("text")
		.attr("text-anchor","left")
		.attr("x",function(d){
			return d[1];
		})
		.attr("y",function(d){
			return d[2];
		})
		.attr("fontsize",1)
		.text(function(d){
			return d[0];
		});
}
