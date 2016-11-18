//Highlight the text
	var HL = []; //Array of highlight words
	var hlnum = 0; // Num. of each highlight word
	var total_hlnum = 0;
	
	function highlight(color,hlstr){
		var hlwordorigin = hlstr;
		var hlword = "";
		for (i=0;i<hlwordorigin.length;i++){
			if (hlwordorigin.charCodeAt(i) != 10){
				hlword += hlwordorigin[i];
			}
		}
		var colororigin = -1;
		var exist = 0;
		for (i=0;i<HL.length;i++){
			if (HL[i][0] == hlword){
				exist = 1;
				colororigin = HL[i][2];
				if (color == HL[i][2]) return;
				else if (color == -1) HL.splice(i,1);
				else HL[i][2] = color;
				break;
			}
		}
		if (color == -1 && exist == 0) return;
		var cont = 0;
		hlnum = 0;
		mulText.transition()
			.duration(500)
			.style("fill",function(d,i){
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
							hlnum++;
							for (j=0;j<chap.length;j++){
								if (d[2] <= chap[j][0]){
									if (color >= 0){
										chap[j][1][color]++;
										if (exist) chap[j][1][colororigin]--;
									}
									else{
										chap[j][1][colororigin]--;
									}
									break;
								}
							}
						}
					}
				}
				if (cont > 0){
					cont--;
					if (color == -1) d[3] = "black";
					else d[3] = fill(color);
				}
				return d[3];
		});
		total_hlnum = 0;
		for (i=0;i<chap.length;i++){
			for (j=0;j<4;j++){
				if (chap[i][1][j]>total_hlnum) total_hlnum=chap[i][1][j];
			}
		}
		set_chap_data(0);
		rects.data(chap_hl)
			.transition()
			.duration(2000)
			.attr("width",function(d){
				return d[2];
			});
		texts.data(chap_hlt)
			.transition()
			.duration(2000)
			.attr("x",function(d){
				return d[0];
			})
			.text(function(d){
				return d[2];
			})
			.attr("fill",function(d){
				if (d[2]==0) return "white";
				else return d[3];
			});
		if (!exist) HL.push([hlword, hlnum, color]);
		if (hlnum == 0) alert("Wrong highlight range!");
	}