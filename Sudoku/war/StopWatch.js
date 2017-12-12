function StopWatch(){

var myVar = setInterval(function(){ alertfunc(param,obj) }, 1000);

this.alertfunc=function(parm,obj){
	param++;
	var no=Math.floor((time/60)/60)+":"+Math.floor(time/60)+":"+Math.floor(time%60);
	document.getElementById("time").textContent = no.toString();
}

this.clear=function(obj){
	document.getElementById("time").textContent = "00:00:00";
}

this.stop=function(obj){
 	clearInterval(myVar);
}


}

