//Save the word cloud
	function wc_save(){
		var word_cl_output = [];
		for (i=0;i<word_cl.length;i++) word_cl_output[i]=word_cl[i]+"\n";
		var oMyBlob = new Blob(word_cl_output,{"type":"text/plain"});
		var filename = "word_new.txt";
		var url = window.URL.createObjectURL(oMyBlob);
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = url;
		save_link.download = filename;
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
		URL.revokeObjectURL(url);
	}