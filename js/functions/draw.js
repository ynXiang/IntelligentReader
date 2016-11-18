function draw(words) {
	all_word_cl[word_cl_count] = svg2.selectAll(".all_word_cl"+(word_cl_count).toString())
		.data(words);
	all_word_cl[word_cl_count].enter()
		.append("text")
		.attr("class","all_word_cl"+(word_cl_count).toString())
    	.style("font-size", function(d) { return d.size + "px"; })
    	.style("font-family", "Impact")
		.style("fill", function(d, i) { return fill(i); })
    	.attr("text-anchor", "middle")
    	.attr("transform", function(d,i) {
    		return "translate(" + [d.x, d.y+word_cl_count*(chap_height+35)] + ")";
    	})
    	.text(function(d) { return d.text; });
	all_word_cl[word_cl_count].transition()
		.duration(2000)
		.style("font-size", function(d) { return d.size + "px"; })
    	.style("font-family", "Impact")
		.style("fill", function(d, i) { return fill(i); })
    	.attr("text-anchor", "middle")
    	.attr("transform", function(d,i) {
    		return "translate(" + [d.x, d.y+word_cl_count*(chap_height+35)] + ")";
    	})
    	.text(function(d) { return d.text; });
	all_word_cl[word_cl_count].exit()
		.remove();

}