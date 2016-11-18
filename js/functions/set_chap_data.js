function set_chap_data(time){
	if (time==1){
		for (i=0;i<chap.length;i++){
			if (i==0) chap_hl.push([250,padding,150,chap[0][0]/chap[chap.length-1][0]*height-1,"gold"]);
			else chap_hl.push([250,padding+chap[i-1][0]/chap[chap.length-1][0]*height,150,(chap[i][0]-chap[i-1][0])/chap[chap.length-1][0]*height-1,"gold"]);
		}
		for (i=0;i<chap.length;i++){
			if (i==0){
				chap_hl.push([0,padding,chap[0][1][0]/(total_hlnum+1)*120,hl_height,fill(0)]);
				chap_hl.push([0,padding*2+hl_height,chap[0][1][1]/(total_hlnum+1)*120,hl_height,fill(1)]);
				chap_hl.push([0,padding*3+hl_height*2,chap[0][1][2]/(total_hlnum+1)*120,hl_height,fill(2)]);
				chap_hl.push([0,padding*4+hl_height*3,chap[0][1][3]/(total_hlnum+1)*120,hl_height,fill(3)]);
			}
			else{
				chap_hl.push([0,padding+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][0]/(total_hlnum+1)*120,hl_height,fill(0)]);
				chap_hl.push([0,padding*2+hl_height+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][1]/(total_hlnum+1)*120,hl_height,fill(1)]);
				chap_hl.push([0,padding*3+hl_height*2+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][2]/(total_hlnum+1)*120,hl_height,fill(2)]);
				chap_hl.push([0,padding*4+hl_height*3+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][3]/(total_hlnum+1)*120,hl_height,fill(3)]);
			}
		}
		for (i=0;i<chap.length;i++){
			chap_hlt.push([280,chap_hl[i][1]+chap_hl[i][3]/2,"Chapter "+(i+1),chap_color[i%chap_color.length]]);
		}
		for (i=0;i<chap.length;i++){
			chap_hlt.push([chap[i][1][0]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding+hl_height-3,String(chap[i][1][0]),"black"]);
			chap_hlt.push([chap[i][1][1]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*2+hl_height*2-3,String(chap[i][1][1]),"black"]);
			chap_hlt.push([chap[i][1][2]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*3+hl_height*3-3,String(chap[i][1][2]),"black"]);
			chap_hlt.push([chap[i][1][3]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*4+hl_height*4-3,String(chap[i][1][3]),"black"]);
		}
		chap_pos.push([250-2*padding,0,150+4*padding,lines_in_screen/chap[chap.length-1][0]*height+2*padding,"rgba(255,0,0,0.4)"]);
	}
	else{
		for (i=0;i<chap.length;i++){
			if (i==0) chap_hl[0]=[250,padding,150,chap[0][0]/chap[chap.length-1][0]*height-1,"gold"];
			else chap_hl[i]=[250,padding+chap[i-1][0]/chap[chap.length-1][0]*height,150,(chap[i][0]-chap[i-1][0])/chap[chap.length-1][0]*height-1,"gold"];
		}
		for (i=0;i<chap.length;i++){
			if (i==0){
				chap_hl[chap.length]=[0,padding,chap[0][1][0]/(total_hlnum+1)*120,hl_height,fill(0)];
				chap_hl[chap.length+1]=[0,padding*2+hl_height,chap[0][1][1]/(total_hlnum+1)*120,hl_height,fill(1)];
				chap_hl[chap.length+2]=[0,padding*3+hl_height*2,chap[0][1][2]/(total_hlnum+1)*120,hl_height,fill(2)];
				chap_hl[chap.length+3]=[0,padding*4+hl_height*3,chap[0][1][3]/(total_hlnum+1)*120,hl_height,fill(3)];
			}
			else{
				chap_hl[4*i+chap.length]=[0,padding+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][0]/(total_hlnum+1)*120,hl_height,fill(0)];
				chap_hl[4*i+chap.length+1]=[0,padding*2+hl_height+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][1]/(total_hlnum+1)*120,hl_height,fill(1)];
				chap_hl[4*i+chap.length+2]=[0,padding*3+hl_height*2+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][2]/(total_hlnum+1)*120,hl_height,fill(2)];
				chap_hl[4*i+chap.length+3]=[0,padding*4+hl_height*3+chap[i-1][0]/chap[chap.length-1][0]*height,chap[i][1][3]/(total_hlnum+1)*120,hl_height,fill(3)];
			}
		}
		for (i=0;i<chap.length;i++){
			chap_hlt[i]=[280,chap_hl[i][1]+chap_hl[i][3]/2,"Chapter "+(i+1),chap_color[i%chap_color.length]];
		}
		for (i=0;i<chap.length;i++){
			chap_hlt[4*i+chap.length]=[chap[i][1][0]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding+hl_height-3,String(chap[i][1][0]),"black"];
			chap_hlt[4*i+chap.length+1]=[chap[i][1][1]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*2+hl_height*2-3,String(chap[i][1][1]),"black"];
			chap_hlt[4*i+chap.length+2]=[chap[i][1][2]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*3+hl_height*3-3,String(chap[i][1][2]),"black"];
			chap_hlt[4*i+chap.length+3]=[chap[i][1][3]/(total_hlnum+1)*120+padding,chap_hl[4*i+chap.length][1]+padding*4+hl_height*4-3,String(chap[i][1][3]),"black"];
		
		}
	}
}