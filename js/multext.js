function appendMultiText(container, str, posX, posY, width, fontsize, fontfamily){
			
			if( arguments.length < 6){
				fontsize = 14;
			}		
			
			if( arguments.length < 7){
				fontfamily = "simsun, arial";
			}
			
			//Get splitted strings
			var strs = splitByWord(str,width,fontsize);
			
			var mulText = container.selectAll("text")
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
			
				
			return [mulText,strs];
			
			function splitByWord(str,max,fontsize){
				var curLen = 0;
				var line = 1;
				var result = [];
				for(var i=0;i<str.length;i++){
					var code = str.charCodeAt(i);
					var cha = str.charAt(i);
					var pixelLen = code > 255 ? fontsize : fontsize/2;
					curLen += pixelLen;
					if(curLen <= max && code != 13){
						result.push([cha, curLen-pixelLen, line]);
					}
					else{
						line++;
						curLen = 0;
					}
					//console.log(code);
				}
				return result;
			}
}
