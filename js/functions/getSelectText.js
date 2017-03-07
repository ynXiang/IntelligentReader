//Choose the text
	function getSelectText(){
	  try{
		return window.getSelection().toString();
	  }catch(e){
		return document.selection.createRange().text;
	  }
	}