//Load the text
	var mulText = container3.selectAll("text"); // Text in line part
	var strs = []; // The splitted string
	var chap = []; // The chapters
  
	function fileChange(target,button){
		var fileSize = 0;
		fileSize = target.files[0].size;
		var size = fileSize / 1024;
		if(size>1024){
		    alert("附件不能大于1M");
		    target.value="";
		    return;
		}
		var name=target.value;
		var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
		if(fileName !="txt"){
		    alert("请选择txt格式文件x上传！");
		    target.value="";
		    return;
		}
		if (first && button == 2){
			alert("Please first choose the document");
			return;
		}
		if (!first && button == 1){
			refresh();
		}
		first = false;
		var reader = new FileReader();//Create a new FileReader
		reader.readAsText(target.files[0], "gb2312");//Load file 
		reader.onload = function(evt){ //After loaded
			var fileString = evt.target.result;
			if (button == 1){
				appendMultiText(container3,fileString,padding,padding,width-2*padding,20,"simsun");
				detail_init();
				chap_already = true;
				svg3.attr("height",(chap[chap.length-1][0]-lines_in_screen+30)*20);
				document.getElementById('left_canvas').style.display = "none";
				document.getElementById('right_canvas').style.display = "none";
				document.getElementById('chap').style.display = "";
				document.getElementById('line').style.display = "";
				document.getElementById('color_sel').style.display = "";
			}
			else if (button == 2){
				word_cl = fileString.split("\n");
				word_cl_already = true;
				set_word_cl();
				init_word_cl();
				svg2_o.attr("height",(chap_height+35)*(chap.length+1));
				console.log((chap_height+35)*(chap.length-1));
				document.getElementById('middle_canvas').style.display = "none";
				document.getElementById('wordclouds').style.display = "";
			}
		}
		return;
	} 