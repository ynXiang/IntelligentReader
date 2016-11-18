function splitByWord(str,max,fontsize){
		var curLen = 0;
		total_line = 1;
		var color = "black";
		var result = [];
		for(var i=0;i<str.length;i++){
			var code = str.charCodeAt(i);
			var cha = str.charAt(i);
			var pixelLen = code > 255 ? fontsize : fontsize/2;
			curLen += pixelLen;
			if(code == 124) chap.push([total_line, [0,0,0,0]]);  //total_line, hightlight_count // Noun, Verb, Adj./Adv., Others
			else if(curLen <= max && code != 13){
				result.push([cha, curLen-pixelLen, total_line, color]);
			}
			else{
				total_line++;
				curLen = 0;
			}
			if (i == str.length-1) chap.push([total_line, [0,0,0,0]]);
		}
		return result;
}
