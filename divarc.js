	/*
	++++++++++++++++++ OBJECT EXTENSIONS
	*/
		/*http://stackoverflow.com/questions/4627899/how-to-find-length-of-literal-array*/
		Object.size = function(obj) {
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};
		/*
		http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
		*/
		Object.keys = Object.keys || (function () {
		    var hasOwnProperty = Object.prototype.hasOwnProperty,
		        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
		        DontEnums = [ 
		            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
		            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
		        ],
		        DontEnumsLength = DontEnums.length;
		
		    return function (o) {
		        if (typeof o != "object" && typeof o != "function" || o === null)
		            throw new TypeError("Object.keys called on a non-object");
		
		        var result = [];
		        for (var name in o) {
		            if (hasOwnProperty.call(o, name))
		                result.push(name);
		        }
		
		        if (hasDontEnumBug) {
		            for (var i = 0; i < DontEnumsLength; i++) {
		                if (hasOwnProperty.call(o, DontEnums[i]))
		                    result.push(DontEnums[i]);
		            }   
		        }
		
		        return result;
		    };
		})();
		
		
	  /*Kris Merckx - 2013 - creative commons license non-commercial + commercial license*/
	  
	  /*
	  Nieuwe parameters: ellX, ellY, tilt, orReform
	  */
	  function cc(el,data){
		  data.links = typeof data.links !== 'undefined' ? data.links : [];
		  data.ellX = typeof data.ellX !== 'undefined' ? data.ellX : 1;
		  data.ellY = typeof data.ellY !== 'undefined' ? data.ellY : 1;
		  data.tilt = typeof data.tilt !== 'undefined' ? data.tilt : 90;
		  data.direction = typeof data.direction !== 'undefined' ? data.direction : "9clockwise";
		  data.startPosition = typeof data.startPosition !== 'undefined' ? data.startPosition : 0;
		  data.orReform = typeof data.orReform !== 'undefined' ? data.orReform : 180;
		  data.size = typeof data.size !== 'undefined' ? data.size : 10;
		  data.image = typeof data.image !== 'undefined' ? data.image : "";
	      data.characters = typeof data.characters !== 'undefined' ? data.characters : "";
	      data.xpos = typeof data.xpos !== 'undefined' ? data.xpos : 200;
	      data.ypos = typeof data.ypos !== 'undefined' ? data.ypos : 200;
	      data.width = typeof data.width !== 'undefined' ? data.width : 20;
	      data.height = typeof data.height !== 'undefined' ? data.height : 20;
	      data.radius = typeof data.radius !== 'undefined' ? data.radius : 150;
	      data.color = typeof data.color !== 'undefined' ? data.color : "";
	      data.numbers = typeof data.numbers !== 'undefined' ? data.numbers : false;
	      data.image = typeof data.image !== 'undefined' ? data.image : "";
		  data.backgroundColor = typeof data.backgroundColor !== 'undefined' ? data.backgroundColor : "";
		  data.fontSize = typeof data.fontSize !== 'undefined' ? data.fontSize : "";
		  data.border = typeof data.border !== 'undefined' ? data.border : "";
		  
		  /*Versnelling op welbepaald punt in cirkel*/
		  data.accelStart = typeof data.accelStart !== 'undefined' ? data.accelStart : "";
		  var accelStartX= data.accelStart.x;
		  var accelStartY= data.accelStart.y;
		  var accelStartSpeed= data.accelStart.sp;
		  accelStartX =typeof accelStartX !== 'undefined' ? accelStartX : 9999999999;
		  accelStartY =typeof accelStartY !== 'undefined' ? accelStartY : 9999999999;
		  accelStartSpeed =typeof accelStartSpeed !== 'undefined' ? accelStartSpeed : 0;
		 
		 /*
		 versnellen vanaf startX
		 tot het verschil(helft) van het begin en het einde
		 vertragen vanaf de helft tot eind
		 */
		 
		 
		  var mo= document.getElementById(el);
		  document.getElementById(el).style.position= "relative";	
		  
		  
		
		  /*
		  data.characters heeft voorrang op data.numbers
		  data.words heeft voorrang op data.characters
		  data.links heeft voorrang op data.words
		  */	  
		  var text= data.characters;
		  var aantal=data.size;
	
		  if(text.length>0){
			aantal= text.length;
		  }
		  
		  var words= data.words;
		  if(Object.size(words)>0){
		  	aantal= Object.size(words);
		  }
		  var links= data.links;
		  if(Object.size(links)>0){
		  	aantal= Object.size(links);
		  }
		  
		  
		  var versnelling= Math.PI * 2 / aantal;
		
		  var x=data.xpos;
		  var y=data.ypos;
		  var r=data.radius;
		  
		  var w= data.width;
		  var h= data.height;
		  
		  var kantel=data.tilt;
		  var orientationReform= data.orReform;
		  
		  var omtrek= 2*Math.PI*r;
		  var hoek= 360/aantal;

		  
		  var roh;
		  var j=0;
		   for( var i = 0; i < aantal; i++ ) {
		   	    
		  		var mdiv = document.createElement("div");
		  		mdiv.style.width=w + "px";
		  		mdiv.style.height=h + "px";
				
				j=i+data.startPosition;
				
				/*
				x min y plus: start vanaf 9 uur tegenwijzerzin
				*/
				
				switch(data.direction){
				case "9clockwise":
				  /*x min y min: start vanaf 9 uur wijzerzin*/
				  xS = (x - Math.cos((hoek*j) *Math.PI / 180)*r)*data.ellX;
				  yS = (y - Math.sin((hoek*j) * Math.PI / 180)*r)*data.ellY;
				  break;
				case "3counterclockwise":
				  /*x plus y min: start vanaf 3 uur tegenwijzerzin*/
				  xS = (x + Math.cos((hoek*j) *Math.PI / 180)*r)*data.ellX;
				  yS = (y - Math.sin((hoek*j) * Math.PI / 180)*r)*data.ellY;
				  break;
				case "9counterclockwise":
				   /*x- en y + => 9 uur in tegenwijzerzin*/
				   xS = (x - Math.cos((hoek*j) *Math.PI / 180)*r)*data.ellX;
				   yS = (y + Math.sin((hoek*j) * Math.PI / 180)*r)*data.ellY;
				   break;
				case "3clockwise":
				   xS = (x + Math.cos((hoek*j) *Math.PI / 180)*r)*data.ellX;
				   yS = (y + Math.sin((hoek*j) * Math.PI / 180)*r)*data.ellY;
				   break;
				default:
				   xS = (x - Math.cos((hoek*j) *Math.PI / 180)*r)*data.ellX;
				   yS = (y - Math.sin((hoek*j) * Math.PI / 180)*r)*data.ellY;
				}
				
				
		  		
				
		  	    mdiv.style.backgroundColor=data.backgroundColor;
		  	    
		  	    roh=Math.atan2( yS - y, xS - x ) * orientationReform / Math.PI + kantel + 'deg';
		  	    var tnd="";
		  	    var printme="";
		  	    if(Object.size(links)>0){
		  	    	var temp= links[i].text;
		  	    	var url= links[i].url;
		  	    	var target="_blank";
					if(typeof(links[i].target) != "undefined"){
						target=links[i].target; 	
					}
		  	    	var temp= "<a style=\"text-decoration:none;color:" + data.color + "\" href=\"" + url + "\" target=\"" + target + "\">" + temp + "</a>";
		  	    	mdiv.innerHTML= temp;
		  	    	
		  	    }else{
			  	    if(Object.size(words)>0){
			  	    	printme=words[i];
			  	    }else{
				  	    if(text.length>0){
				  	       printme=text.charAt(i);
				  	    }else{
				  	    	if(data.numbers){	
				  				printme=i+1;
					  	    }else{
					  	    	printme="";	
					  	    }	
				  	    }
			  	    }
		  	    }
		  	    tnd=document.createTextNode(printme);
		  	    if(data.image.length >0){
		  	    	mdiv.style.backgroundImage= "url(" + data.image + ")";
		  	    }
		  		
		  		
		  		var ml= xS-(w/2);
		  		var mt= yS-(h/2);
		  		mdiv.style.marginLeft= ml + "px";
		  		mdiv.style.marginTop= mt + "px";
		  		mdiv.style.textAlign= "center";
		  		mdiv.style.lineHeight= h + "px";
		  		
		  		
		  	   // mdiv.style.fontSize= "large";
		  	    mdiv.style.textAlign="center";
				mdiv.style.color= data.color;
				mdiv.style.fontSize= data.fontSize;
				mdiv.style.border= data.border;
				mdiv.style.backgroundPosition= "center center";
				mdiv.style.backgroundRepeat="no-repeat";
		  
		  		var ro= "rotate(" + roh + ")";
		  		//calSin = Math.sin(radians);
				//calCos = Math.cos(radians);
				//element.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + calCos + ', M12=-' + calSin + ',M21=' + calSin + ', M22=' + calCos + ', sizingMethod="auto expand")';
		  		
		  		
		  		mdiv.style.webkitTransform = ro;
				mdiv.style.MozTransform = ro;
				mdiv.style.msTransform = ro;
				mdiv.style.OTransform = ro;
				mdiv.style.transform = ro;
				mdiv.style.sandTransform= ro;
		  		
		  		if(typeof(data.borderRadius) != "undefined"){
		  			mdiv.style.borderRadius = data.borderRadius;
					mdiv.style.MozBorderRadius = data.borderRadius;
					mdiv.style.WebkitBorderRadius = data.borderRadius;	
		  		}
		  		
		  		mdiv.style.position="absolute";
		  		mdiv.appendChild(tnd);
		  		mo.appendChild(mdiv);
		   }
	  }
	  
