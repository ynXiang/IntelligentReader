	// chapter part
	var First = document.createElement("div");
		First.setAttribute("style","display:none;background:#FFFFFF;position:absolute;overflow:auto;width:"+(width+padding*4)+"px;height:"+(height+padding*2)+"px;z-index:1;");
		First.style.top = top_dis+"px";
		First.style.left = padding+"px";
		First.id = "chap";
		document.body.appendChild(First);
		
	var	svg1 = d3.select("#chap")
			.append("svg")
			.attr("width", width-2*padding)
			.attr("height", height+padding);
	var	container1 = svg1.append("g")
			.attr("transform", "translate("+padding+",0)");

	// Add hltables and text
	var chap_color = ["red","blue","green","darkmagenta","coral","tan","saddlebrown"];
	var chap_pos = []; // Text_position
	var chap_hl = []; // Rectangles
	var chap_hlt = []; // Texts
	var hl_height = 10; // The height of red rectangles
	var lines_in_screen = 25; // Number of lines can be shown in a screen in line part.
	var chap_already = false;

	// Initialize the chapter part
	var rects;
	var rect_pos;
	var texts;
	var init_over = 0;

	// Initialize the word cloud part
	var word_cl = []; // Input word clouds
	var word_str = []; // word clouds for each Chap.
	var all_word_cl = []; // all word clouds
	//var layout;
    var word_num = []; // Requested No. of word clouds
	var word_cl_already = false;
	//var word_input_num = 20; // Input number from the text files for each Chap.
	//var word_init_num = 10;  // Set number for each Chap.
	var chap_height = 120;
	var word_cl_count = 0;
	var rect_interval = []; // Intervals between two adjacent word clouds
	var text_chap = []; // Symbol of chapters

	// Set colors;
	var fill = d3.scale.category20();

	// word clouds part
	var Second = document.createElement("div");
		Second.setAttribute("style","display:none;background:#FFFFFF;position:absolute;overflow:auto;width:"+(width+padding*4)+"px;height:"+(height+padding*2)+"px;z-index:1;");
		Second.style.top = top_dis+"px";
		Second.style.left = (8*padding+width)+"px";
		Second.id = "wordclouds";
		document.body.appendChild(Second);
	
	var svg2_o = d3.select("#wordclouds")
			.append("svg")
			.attr("width", width-padding*2)
			.attr("height", height+padding*2);
	var	svg2 = svg2_o.append("g")
			.attr("transform", "translate(" + (width/2) + "," + (padding+chap_height/2) + ")");

	// line part
	var Third = document.createElement("div");
		Third.setAttribute("style","display:none;background:#FFFFFF;position:absolute;overflow:auto;width:"+(width+padding*4)+"px;height:"+(height+padding*2)+"px;z-index:1;");
		Third.style.top = top_dis+"px";
		Third.style.left = (15*padding+width*2)+"px";
		Third.id = "line";
		document.body.appendChild(Third);
		
	var	svg3 = d3.select("#line")
			.append("svg")
			.attr("width", width-2*padding)
			.attr("height", height);
	var	container3 = svg3.append("g")
			.attr("transform", "translate("+padding+",0)");
	
	// menu data
	var menu_width = 80;
	var menu_height = 135;
	var menu_hlstr = "";

	// menu
	var Fourth = document.getElementById("menuattr");
		Fourth.setAttribute("style","background:#FFFFFF;display:none;position:absolute;width:"+(2*padding+menu_width)+"px;height:"+(menu_height)+"px;border:solid 1px #000000;z-index:100;");
		Fourth.style.top = 50+"px";
		Fourth.style.left = 50+"px";
		Fourth.id = "menuattr";

	var	svg4 = d3.select("#menuattr")
			.append("svg")
			.attr("width", 2*padding+menu_width)
			.attr("height", menu_height)
			.attr("transform", "translate("+padding+","+padding+")");
				
	// Add select pie.
	var dataset = [1,1,1,1];
	var pie = d3.layout.pie();
	var piedata = pie(dataset);
	piedata[0].data = "Noun";
	piedata[1].data = "Verb";
	piedata[2].data = "Adj./Adv.";
	piedata[3].data = "Others";
	var hlsel_t = ["Noun","Verb","Adj./Adv.","Others","Cancel"];
	var hlsel_c = [fill(0),fill(1),fill(2),fill(3),"gray"];
	var hlsel_color = svg4.selectAll("hlsek_color")
		.data(hlsel_c)
		.enter()
		.append("rect")
		.attr("x",function(d){
			return 10;
		})
		.attr("y",function(d,i){
			return 5+i*25;
		})
		.attr("rx",5)
		.attr("ry",5)
		.attr("width",function(d){
			return 70;
		})
		.attr("height",function(d){
			return 23;
		})
		.attr("fill",function(d){
			return d;
		})
		.on("click",function(d,i){
			if (i<4){
				highlight(i,menu_hlstr);
				detail_change();
			}
			menucancel(); 
		});
	var hlsel_text = svg4.selectAll("hlsel_text")
		.data(hlsel_t)
		.enter()
		.append("text")
		.attr("x",function(d){
			return 40;
		})
		.attr("y",function(d,i){
			return 17.5+i*25;
		})
		.attr("text-anchor","middle")
		.text(function(d){
			return d;
		});

	// Highlight detailed part data
	var hld_width = 1150;
	var hld_height = 480;
	var hld_left = 80;
	var hld_top = 50;
	
	// Highlight detailed part
	var Fifth = document.createElement("div");
		Fifth.setAttribute("style","background:#FFFFFF;position:absolute;display:none;overflow:auto;width:"+(hld_width+2*padding)+"px;height:"+(hld_height+2*padding)+"px;border:solid 3px #000000;z-index:20;");
		Fifth.style.top = hld_top+"px";
		Fifth.style.left = hld_left+"px";
		Fifth.id = "hldetail";
		document.body.appendChild(Fifth);
		
	var	svg5 = d3.select("#hldetail")
			.append("svg")
			.attr("width", hld_width)
			.attr("height", hld_height);
	var	container5 = svg5.append("g")
			.attr("transform", "translate("+padding+","+padding+")");
	
	// Add highheight pie.
	var hl_arcs = new Array(dataset.length);
	var hl_path = new Array(dataset.length);
	var hl_text = new Array(dataset.length);
	var hl_padding = 30;
	var hl_dataset = new Array(dataset.length);
	var hl_piedata = new Array(dataset.length);
	var hl_pie = d3.layout.pie();
	var hl_outerRadius = hld_width/(dataset.length+0.8)/2;
	var hl_innerRadius = 0.3*hl_outerRadius;
	var hl_arc = d3.svg.arc()
				.innerRadius(hl_innerRadius)
				.outerRadius(hl_outerRadius);
	var hl_circles = new Array(dataset.length);
	var hl_midtext = new Array(dataset.length);
	var hl_word_str = "";
	var hl_word_list;
	
	// Words distribution data
	var wd_width = 1150;
	var wd_height = 480;
	var wd_left = 80;
	var wd_top = 50;
	
	// Words distribution part
	var Sixth = document.createElement("div");
		Sixth.setAttribute("style","background:#FFFFFF;position:absolute;display:none;overflow:auto;width:"+(wd_width+padding*2)+"px;height:"+(wd_height+padding*2)+"px;border:solid 3px #000000;z-index:20;");
		Sixth.style.top = wd_top+"px";
		Sixth.style.left = wd_left+"px";
		Sixth.id = "wd";
		document.body.appendChild(Sixth);
		
	var	svg6 = d3.select("#wd")
			.append("svg")
			.attr("width", wd_width)
			.attr("height", wd_height);
	var	container6 = svg6.append("g")
			.attr("transform", "translate("+padding+","+padding+")");
	
	// Distribution rectangles
	var dis_first = true;
	var chap_dis = [];
	var line_interval = [];
	var line_text = [];
	var line_rects_svg;
	var line_interval_svg;
	var line_text_svg;
	var diag_rect;
	var diag_text;
	var line_rects = []; //Lists of rectangles for each line.
	var dis_first = true;
	
	// Diagram in distribution part
	var xScale = d3.scale.ordinal()  
					.rangeRoundBands([0,wd_width-30]);  
						  
	var yScale = d3.scale.linear()  
					.domain([0,100])  
					.range([250,0]);  
						  
	var xAxis = d3.svg.axis()  
					.scale(xScale)  
					.orient("bottom");  
	  
	var yAxis = d3.svg.axis()  
					.scale(yScale)  
					.orient("left");   
	
	var xx = svg6.append("g")  
		.attr("class","axis")  
		.attr("transform","translate(30,470)")  
		.call(xAxis);  
		  
	var yy = svg6.append("g")  
		.attr("class","axis")  
		.attr("transform","translate(30,220)")  
		.call(yAxis); 
			
	// Color Selection
	var r_color = ["white","lime","lightskyblue","burlywood","bisque"];
	
	var Seventh = document.createElement("div");
		Seventh.setAttribute("style","background:rgba(0,0,0,0);display:none;position:absolute;width:250px;height:80px;z-index:10;");
		Seventh.style.top = 20+"px";
		Seventh.style.left = 1080+"px";
		Seventh.id = "color_sel";
		document.body.appendChild(Seventh);
		
	var	svg7 = d3.select("#color_sel")
			.append("svg")
			.attr("width", 250)
			.attr("height", 80);
	
	// Add color rects
	var color_text = svg7.append("text")
		.attr("transform","translate(15,20)")
		.attr("text-anchor","left")
		.attr("font-size","20px")
		.attr("fill","white")
		.text("Choose perferred color!");
	var color_rects = svg7.selectAll("color_rects")
		.data(r_color)
		.enter()
		.append("rect")
		.attr("x",function(d,i){
			return 50*i+13;
		})
		.attr("y",function(d){
			return 43;
		})
		.attr("width",function(d){
			return 24;
		})
		.attr("height",function(d){
			return 24;
		})
		.attr("fill",function(d){
			return d;
		})
		.on("click",function(d,i){
			if (chap_already){
				Third.style.background = d;
			}
		});