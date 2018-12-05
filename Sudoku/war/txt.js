function txt() {
	
	this.populate = function() {
		for (var x=0;x<9;x++) {
			for (var y=0;y<9;y++) {
				var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
				newText.setAttributeNS(null,"id","t"+(9*x+y));
				newText.setAttributeNS(null,"x",10+35*x);      
				newText.setAttributeNS(null,"y",25+35*y);  
				newText.setAttributeNS(null,"font-size","25px");
				newText.setAttributeNS(null,"style","fill:black");
				newText.setAttributeNS(null,"onclick","")
				var textNode = document.createTextNode(" ");
				newText.appendChild(textNode);
				document.getElementById("grid").appendChild(newText);
			}
		}
	}
}