function Sudoku(){

	function shuffle(o,obj){
  	  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    	return o;
	}

	this.next=function(puzzle,i,j,obj){
		var x=i;
		var y=j;
		while(x<9){
			if (puzzle[x][y]==0){
				return [x,y]
			}
			else{
				y++;
			}
			if (y==9){
				x++;
				y=0;
			}
		}
		return [9,9];
	}

	this.lst_subs=function(l1,puzzle,i,j,obj){
		for (var x=0;x<9;x++){
			var s1=puzzle[i][x];
			var index=l1.indexOf(s1);
			if (index!=-1)
				l1.splice(index,1);
		}
		for (var y=0;y<9;y++){
			var s2=puzzle[y][j];
			var index=l1.indexOf(s2);
			if (index!=-1)
				l1.splice(index,1);
		}
		for (var z1=(Math.floor(i/3)*3);z1<(Math.floor(i/3)*3)+3;z1++){
			for (var z2=(Math.floor(j/3)*3);z2<(Math.floor(j/3)*3)+3;z2++){
				var s3=puzzle[z1][z2];
				var index=l1.indexOf(s3);
				if (index!=-1)
					l1.splice(index,1);
			}
		}
		return l1;
	}

	this.solve=function(puzzle,i,j,obj){
		if ((obj.next(puzzle,0,0,obj)[0])==9){
			return true;
		}
		if (i==9){
			return true;
		}
		else{
			var ij=obj.next(puzzle,i,j,obj);
			i=ij[0];
			j=ij[1];
			var l=new Array();
			l=shuffle(obj.lst_subs([1,2,3,4,5,6,7,8,9],puzzle,i,j,obj),obj);
			for (var k=0;k<l.length;k++){
				puzzle[i][j]=l[k];
				var mn=obj.next(puzzle,i,j,obj);
				if (obj.solve(puzzle,mn[0],mn[1],obj)){
					return true;
				}
				else{
					puzzle[i][j]=0;
				}
			}
		return false;
		}
	}

	this.solve2=function(puzzle,i,j,cnt,obj){
		if ((obj.next(puzzle,0,0,obj))[0]==9){
			cnt++;
			return cnt;
		}
		if (i==9){
			cnt++;
			return cnt;
		}
		else{
			var ij=obj.next(puzzle,i,j,obj);
			i=ij[0];
			j=ij[1];
			var l=new Array();
			l=obj.lst_subs([1,2,3,4,5,6,7,8,9],puzzle,i,j,obj);
			for (var k=0;k<l.length;k++){
				puzzle[i][j]=l[k];
				var mn=obj.next(puzzle,i,j,obj);
				cnt=obj.solve2(puzzle,mn[0],mn[1],cnt,obj);
				puzzle[i][j]=0;
				if (cnt==2){
					return cnt;
				}
			}
		return cnt;
		}
	}

	this.get_sol=function(puzzle,obj){
		var chk=obj.solve(puzzle,0,0,obj);
		return puzzle;
	}

	this.gouge=function(diff,obj){
		var puzz = new Array();
		var l = new Array();
		for(var i=0; i<9;i++)
		{
			puzz[i] = new Array();
			l[i] = new Array();
			for(var j=0; j<9; j++)
			{
				puzz[i][j] = 0;
				l[i][j] = true;
			}
		}
		p1=puzz.slice();
		// var puzz=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
		//var l=[[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true]];
		// for(var i=0; i<9;i++)
		// {
		// 	puzz[i] = new Array();
		// 	for(var j=0; j<9; j++)
		// 	{
		// 		puzz[i][j] = 0;
		// 	}
		// }
		var n=0;
		if (diff=="Easy"){
			n=30;
		}
		else if (diff=="Medium"){
			n=37;
		}
		else if (diff=="Hard"){
			n=44;
		}
		else {
			return puzz;
		}

		for (var ite=0;ite<9;ite++){
			var q=Math.floor(9*(Math.random()));
			puzz[ite][q]=ite+1;
		}
		var chk1=obj.solve(puzz,0,0,obj);
		var m=9;
		while (m>0){
			var a=Math.floor(9*(Math.random()));
			var b=Math.floor(9*(Math.random()));
			puzz[a][b]=0;
			m--;
		}
		while (n>0){
			var a=Math.floor(9*(Math.random()));
			var b=Math.floor(9*(Math.random()));
			var val=puzz[a][b];
			if (l[a][b]){
				if (val==0){
					l[a][b]=false;
					//pass
				}
				else{
					puzz[a][b]=0;
					if (obj.solve2(puzz,0,0,0,obj)==1){
						n--;
						l[a][b]=false;
					}
					else{
						puzz[a][b]=val;
						l[a][b]=false;
					}
				}
			}
		}
		return puzz;
	}
	var ob=this;
	var q;
	var myVar ;
	var param=0;
	function alertfunc(){
	param++;
	var no=Math.floor((param/60)/60)+":"+Math.floor((param/60)%3600)+":"+Math.floor(param%60);
	document.getElementById("time").textContent = no.toString();
	}

	function clear(){
	document.getElementById("time").textContent = "0:0:0";
	}

	function stop(){
	clearInterval(myVar);
	}
/*
	function increment(tid){
		var st=document.getElementById(tid.toString()).textContent;
		document.getElementById(tid.toString()).textContent=(parseInt(st)+1)%10;
	}*/

	document.getElementById("gen").addEventListener("click",function(){
		stop();
		param=0; 
		myVar=0;
		document.getElementById("time").textContent = "0:0:0"
		myVar= setInterval(function(){ alertfunc() }, 1000);
		var diff=document.getElementById("diff").value.toString();
		var p=ob.gouge(diff,ob);
		q=p.slice();
		for (var x=0;x<9;x++){
			for (var y=0;y<9;y++){
				var tid="t"+(9*x+y);
				var no=q[x][y];
				var xx=document.getElementById(tid.toString())
				xx.textContent = no;
				if (no==0){
					xx.style.fill="white";
					/*xx.onclick=
						function increment(){
							var st=document.getElementById(tid).textContent;
							document.getElementById(tid).textContent=(parseInt(st)+1)%10;
						};*/
					xx.onclick = (function incr() {
				   		var currentI = tid;
				   		return function incr() { 
				    	var st=document.getElementById(currentI).textContent;
						document.getElementById(currentI).textContent=(parseInt(st)+1)%10;
						if (document.getElementById(currentI).textContent==0){
							document.getElementById(currentI).style.fill="white";
						}
						else{
							document.getElementById(currentI).style.fill="black"
						}
				      }
				   })();

				}
				else{
					xx.style.fill="blue";
				}
			}
		}
		/*{
			for (var x=0;x<9;x++){
			for (var y=0;y<9;y++){
			 var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
			  newText.setAttributeNS(null,"id","t"+(9*x+y));
			  newText.setAttributeNS(null,"x",10+35*x);      
			  newText.setAttributeNS(null,"y",25+35*y);  
			  newText.setAttributeNS(null,"font-size","25px");
			  newText.setAttributeNS(null,"style","fill:black");
			  var no=q[x][y];
			  var textNode = document.createTextNode(no.toString());
			  newText.appendChild(textNode);
			  document.getElementById("grid").appendChild(newText);
			}
		}
	}*/

	})

	document.getElementById("sol").addEventListener("click",function(){
		clearInterval(myVar);
		param=0; 
		myVar=0;
		var di=document.getElementById("diff").value.toString();
		if (di=="None"){
			console.log(q.toString());
		}
		else{
			q=ob.get_sol(q,ob);
			for (var x=0;x<9;x++){
			for (var y=0;y<9;y++){
				var tid="t"+(9*x+y);
				var no=q[x][y];
				var xx=document.getElementById(tid.toString())
				if (xx.textContent == no){
					xx.style.fill="green";
					xx.textContent = no;
				}
				else{
					xx.style.fill="red";
					xx.textContent = no;

				}
			}
		}
		}
		stop();
		document.getElementById("sub")

	})

	document.getElementById("sub").addEventListener("click",function(){
		{
			q=ob.get_sol(q,ob);
			var  chk=true;
			for (var x=0;x<9;x++){
			for (var y=0;y<9;y++){
				var tid="t"+(9*x+y);
				var no=q[x][y];
				var xx=document.getElementById(tid.toString())
				if (xx.textContent == no){
					xx.style.fill="green";
				}
				else{
					xx.style.fill="red";
					chk=false;

				}

				
			}

		}
		if (chk){
			window.alert("Great Job!");
			stop();
		}
		else{
			window.alert("Too Bad, Wrong Solution");
		}
		}

	})


}