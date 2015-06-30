var calls_menu = false;

var PHONE_OFF_SRC = '../media/calls/phone_off.png';
var PHONE_OFF = '<img src="' + PHONE_OFF_SRC + '" class="menuItem" style="width:100px" />';
var CALL_CALLING_SRC = '../media/calls/call_calling.png';
var CALL_CALLING = '<img src="' + CALL_CALLING_SRC + '" class="menuItem" style="width:100px" />';
var CALL_WAIT_SRC = '../media/calls/call_wait.png';
var CALL_WAIT = '<img src="' + CALL_WAIT_SRC + '" class="menuItem" style="width:100px" />';
var CALL_PUT_WAIT_SRC = '../media/calls/call_put_wait.png';
var CALL_PUT_WAIT = '<img src="' + CALL_PUT_WAIT_SRC + '" class="menuItem" style="width:100px" />';
var CALL_WAIT_RETURN_SRC = '../media/calls/call_wait_return.png';
var CALL_WAIT_RETURN = '<img src="' + CALL_WAIT_RETURN_SRC + '" class="menuItem" style="width:100px" />';

// State
var pointer_val = 0;
var slidingWindowPos = 4;
var em_chamada = -20;
var em_espera = -20;
var arrowUpIsActive = false;
var arrowDownIsActive = true;
var windowSize = 3;

// Objects
var btn_terminar = {
    exists: false,
    imgSrc: "../media/calls/phone_off.png",
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera == -20) { // Está em chamada
            this.exists = false;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            timedmessage(PHONE_OFF + '<span class="infomsg">' + items[em_chamada].name + ": Chamada terminada" + '</span>');
            em_chamada = -20;
            pointer_val = 4;
        }
		
		// FIXME: refactor
		if(em_chamada == -20 && em_espera != -20) { // Está em espera
            this.exists = false;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            timedmessage(PHONE_OFF + '<span class="infomsg">' + items[em_espera].name + ": Chamada terminada" + '</span>');
            em_espera = -20;
            pointer_val = 4;
        }
        
        if(em_chamada != -20 && em_espera != -20 ) { // Está em 2 chamadas
            this.exists = true;
            btn_retomar.exists = true;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            timedmessage(PHONE_OFF + '<span class="infomsg">' + items[em_chamada].name + ": Chamada terminada" + '</span>');
            em_chamada = -20;
            pointer_val = 0;
        }
    }
};

var btn_retomar = {
    exists: false,
    imgSrc: "../media/calls/call_wait_return.png",
    my_clickhandler: function() {
        if(em_espera != -20 && em_chamada == -20) { // Está em espera
            btn_terminar.exists = true;
            this.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            em_chamada = em_espera;
            timedmessage(CALL_WAIT_RETURN + '<span class="infomsg">' + items[em_chamada].name + ": Chamada retomada" + '</span>');
            em_chamada = em_espera;
            em_espera = -20;
            pointer_val = 0;
        }
    }
};

var btn_trocar = {
    exists: false,
    imgSrc: "../media/calls/call_put_wait.png",
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera != -20 ) { // Está em 2 chamadas
            timedmessage('<span class="infomsg">Chamada trocada</span>');
            var temp = em_chamada;
            em_chamada = em_espera;
            em_espera = temp;
            pointer_val = 0;
        }
    }
};

var btn_colocarespera = {
    exists: false,
    imgSrc: "../media/calls/call_put_wait.png",
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera == -20) { // Está em chamada
            btn_terminar.exists = true;
            btn_retomar.exists = true;
            btn_trocar.exists = false;
            this.exists = false;
            timedmessage(CALL_PUT_WAIT + '<span class="infomsg">' + items[em_chamada].name + ": Chamada em espera" + '</span>');
            em_espera = em_chamada;
            em_chamada = -20;
            pointer_val = 0;
        }
    }
};

function contact(name, image) {
    this.name = name;
    this.imgSrc = image;
	this.getImage = '<img src="' + this.imgSrc + '" class="menuItem" style="width:100px" />'; // testing
	this.my_clickhandler = function() {
        if(em_chamada == -20 && em_espera == -20 ) { // Não está em chamada nem em espera
            btn_terminar.exists = true;
			$("#btn_terminar").show();
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            $(".contact").hide();
            timedmessage(CALL_CALLING + '<span class="infomsg">' + items[pointer_val].name + ": A chamar..." + '</span>');
            em_chamada = pointer_val;
            pointer_val = 0;
        }
        
        if(em_chamada == -20 && em_espera != -20 ) { // Em espera
            btn_terminar.exists = true;
			$("#btn_terminar").show();
            btn_retomar.exists = false;
            btn_trocar.exists = true;
            btn_colocarespera.exists = false;
            $(".contact").hide();
            timedmessage(CALL_CALLING + '<span class="infomsg">' + items[pointer_val].name + ": A chamar..." + '</span>');
            em_chamada = pointer_val;
            pointer_val = 0;
        }
    }
}

var items = [btn_terminar, btn_retomar, btn_trocar, btn_colocarespera,
                        new contact("Alexandre Soares", "../media/calls/contact_as.png"),
                        new contact("António Morais", "../media/calls/contact_amorais.png"),
                        new contact("Bruno Oliveira", "../media/calls/contact_bo.png"),
                        new contact("Carlos Maia", "../media/calls/contact_cm.png"),
                        new contact("Diogo Coelho", "../media/calls/contact_dc.png"),
                        new contact("Francisco Calisto", "../media/calls/contact_fc.png"),
                        new contact("João Miranda", "../media/calls/contact_jm.png"),
                        new contact("Luísa Peixoto", "../media/calls/contact_lpeixoto.png"),
                        new contact("Manuel Fernandes", "../media/calls/contact_mf.png"),
                        new contact("Madalena Pimentel", "../media/calls/contact_mp.png"),
                        new contact("Miguel Pires", "../media/calls/contact_mpires.png"),
                        new contact("Rita Andrade", "../media/calls/contact_ra.png"),
                        new contact("Vítor Carvalho", "../media/calls/contact_vc.png")];

function timedmessage(msg) {
        window.onkeydown = function(){};
	$("#menu").hide();
	$("#menu").after('<div id="timedMsg">' + msg + '</div>');
	window.setTimeout(function(){
		$("#menu").show();
		$("#timedMsg").remove();
                window.onkeydown = keyboard_handler;
	},1500);
}

function prev_func() {
	window.location = "../index.html"
}

function keyboard_handler(e) {
	var pK = e? e.which: window.event.keyCode;
	// Right arrow
	if(pK == 39) {
		items[pointer_val].my_clickhandler();
		changeState();
	}
   
	// Left arrow
	if(pK == 37) {
		prev_func();
	}
   
	// Up arrow
	if(pK == 38) {            
            var jump = false;
            var saved = pointer_val;
            while(!jump && (pointer_val > 0)) {
		pointer_val = pointer_val - 1;
                if(items[pointer_val].exists || (pointer_val > 3 && em_chamada == -20 && em_espera != pointer_val)) {
                    jump = true;
                    break;
                }
            }
            if(!jump)
                pointer_val = saved;
	}
   
	// Down arrow
	if(pK == 40) {            
	var jump = false;
            var saved = pointer_val;
            while(!jump && (pointer_val < items.length-1)) {
                pointer_val = pointer_val + 1;
                if(items[pointer_val].exists || (pointer_val > 3 && em_chamada == -20 && em_espera != pointer_val)) {
                    jump = true;
                    break;
                }
            }
            if(!jump)
                pointer_val = saved;
        }
        
		// flashes
                if(jump && arrowDownIsActive) {
                    flashDownArrow();
                }
                if(jump && arrowUpIsActive) {
                    flashUpArrow();
                }
		
		slideWindow(pointer_val-saved);
		changeSelection();
		console.log("pointer_val = " + pointer_val);
}

function flashUpArrow() {
    if (slidingWindowPos - 1 == pointer_val) {
        $("#arrow_up").fadeTo("fast", 0.5).fadeTo("fast", 1.0);
    }
}

function flashDownArrow() {
    if (slidingWindowPos + 3 == pointer_val) {
        $("#arrow_down").fadeTo("fast", 0.5).fadeTo("fast", 1.0);
    }
}

/** @jumpsize number of jumps that pointer val did
  * on last iteration. Negative jumps mean that the
  * it was an up movement. Positive jumps mean the
  * opposite.
  */
function slideWindow(jumpsize) {
    if(jumpsize == 0 || pointer_val < 4) {
        // nao saltou ou nao está nos contactos
        return;
    } else if (pointer_val >= slidingWindowPos && pointer_val <= slidingWindowPos+2) {
        // está dentro da janela deslizante, depois do salto
        return;
    }
    
	var ghostInWindow = false;
	
    if(jumpsize < 0) {
        // there are more contacts to show upside
		for(var i = pointer_val ; i < pointer_val + 3 ; i++) {
			if(i == em_espera) {
				windowSize = 4;
				ghostInWindow = true;
				break;
			}
		}
		
		if(!ghostInWindow) {
		// needed to hide contact when window size changes
			$("#contact_"+(slidingWindowPos+windowSize)).hide();
			windowSize = 3;
		}
		
        console.log("jump backwards");
        slidingWindowPos = pointer_val;
        $("#contact_"+pointer_val).show();
        $("#contact_"+(slidingWindowPos + windowSize)).hide();
        if(!arrowDownIsActive) {
			// since we slided the window up, we can say that there are hidden contacts below
            arrowDownIsActive = true;
            $("#arrow_down").html('<img src = "../media/index/arrow_down_active.png" />');
        } else {}
    } else if (jumpsize > 0){
        console.log("jump ahead" + jumpsize);
        // there are more contacts to show downside
		for(var i = pointer_val ; i > pointer_val - 3 ; i--) {
			if(i == em_espera) {
				windowSize = 4;
				ghostInWindow = true;
				break;
			}
		}
		
		if(!ghostInWindow) {
		// needed to hide contact when window size changes
			$("#contact_"+slidingWindowPos).hide();
			windowSize = 3;
		}
		
        slidingWindowPos = pointer_val-windowSize+1;
        $("#contact_"+pointer_val).show();
        $("#contact_"+(slidingWindowPos-1)).hide();
		if(!arrowUpIsActive) {
			// since we slided the window down, we can say that there are hidden contacts above
            arrowUpIsActive = true;
            $("#arrow_up").html('<img src = "../media/index/arrow_up_active.png" />');
        } else {}
    } else {
        // do nothing
    }
    
    
        console.log("SLIDING WINDOW: " + slidingWindowPos);
        if(arrowDownIsActive && slidingWindowPos == items.length-3) {
            arrowDownIsActive = false;
            $("#arrow_down").html('<img src = "../media/index/arrow_down.png" />');
        }
        
        if (arrowUpIsActive && slidingWindowPos == 4) {
            arrowUpIsActive = false;
            $("#arrow_up").html('<img src = "../media/index/arrow_up.png" />');
        }
}

function changeSelection() {
	$(".selected").removeClass("selected");
	if(pointer_val > 3) {
		$("#contact_"+pointer_val).addClass("selected");
	} else if (pointer_val == 0) {
		$("#btn_terminar").addClass("selected");
	} else if (pointer_val == 1) {
		$("#btn_retomar").addClass("selected");
	} else if (pointer_val == 2) {
		$("#btn_trocar").addClass("selected");
	} else if (pointer_val == 3){
		$("#btn_colocarespera").addClass("selected");
	}
}

function changeState() {
	$("div.selected").removeClass("selected");
	$("#contact_"+pointer_val).addClass("selected");
        
        $("#state").html("");
        // FIXME: bad code
        if (em_chamada != -20) {
            $("#state").append('<div id="emchamada" style="position:relative; left: 20pt;"><img src = "../media/calls/call_calling.png" style="width:25pt; position:relative; left:25pt"/><div><span class="infomsg">'
                                + items[em_chamada].name + '</span></div></div>');
        } else {
            
        }
        
        // FIXME: bad code
        if (em_espera != -20) {
            $("#state").append('<div id="emchamada" style="position:relative; left: 20pt;"><img src = "../media/calls/call_wait.png" style="width:25pt; position:relative; left:25pt"/><div><span class="infomsg">'
                                + items[em_espera].name + '</span></div></div>');
        } else {
            
        }
	
	if(btn_terminar.exists) {
		$("#btn_terminar").show();
	} else {
		$("#btn_terminar").hide();
	}
	
	if(btn_retomar.exists) {
		$("#btn_retomar").show();
	} else {
		$("#btn_retomar").hide();
	}
	
	if(btn_trocar.exists) {
		$("#btn_trocar").show();
	} else {
		$("#btn_trocar").hide();
	}
	
	if(btn_colocarespera.exists) {
		$("#btn_colocarespera").show();
	} else {
		$("#btn_colocarespera").hide();
	}
	
	if(em_chamada == -20) {
            arrowDownIsActive = true;
            $("#arrow_down").html('<img src = "../media/index/arrow_down_active.png" />');
            
            var offset = 4;
            var skipOne = false;
            
            if(em_espera != -20 && em_espera < offset+3)
                    skipOne = true;
            
            for(var i = offset; i<offset+3+(skipOne ? 1 : 0) ; i++) {
                    if(i == em_espera) {
                            $("#contact_"+i).hide();
                            continue;
                    }
                    $("#contact_"+i).show();
            }
	} else {
            for(var i = 4 ; i < items.length ; i++) {
                $("#contact_" + i).hide();
            }
            
            arrowUpIsActive = false;
            $("#arrow_up").html('<img src = "../media/index/arrow_up.png" />');
            
            
            arrowDownIsActive = false;
            $("#arrow_down").html('<img src = "../media/index/arrow_down.png" />');
        }
}
			
/**
This function loads the html file
*/
$( document ).ready(function() {
	calls_menu = true;
	
        $("#menu").before('<div id = "state"></div>');
        
	// Up Arrow
	$("#menu").append(
		'<div id = "arrow_up" class = "arrow">'
			+ '<img src = "../media/index/arrow_up.png" />'
		+ '</div>');
		
	// buttons (invisible at startup)
	$("#menu").append(
		'<div id = "btn_terminar" class = "menuBtn">'
			+ '<img src = "' + btn_terminar.imgSrc + '" /><span>Terminar chamada</span>'
		+ '</div>');
	$("#btn_terminar").hide();
	
	$("#menu").append(
		'<div id = "btn_retomar" class = "menuBtn">'
			+ '<img src = "' + btn_retomar.imgSrc + '" /><span>Retomar chamada</span>'
		+ '</div>');
	$("#btn_retomar").hide();
	
	$("#menu").append(
		'<div id = "btn_trocar" class = "menuBtn">'
			+ '<img src = "' + btn_trocar.imgSrc + '" /><span>Trocar chamadas</span>'
		+ '</div>');
	$("#btn_trocar").hide();
	
	$("#menu").append(
		'<div id = "btn_colocarespera" class = "menuBtn">'
			+ '<img src = "' + btn_colocarespera.imgSrc + '" /><span>Colocar em espera</span>'
		+ '</div>');
	$("#btn_colocarespera").hide();
	
	// contacts
	for(var i = 4 ; i < items.length ; i++) {
	$("#menu").append(
		'<div id = "contact_' + i + '" class = "menuItem contact">'
			+ '<img src = "' + items[i].imgSrc + '" />'
			+ '<div><span>' + "Chamar" + '</span></div>'
		+ '</div>');
	}
	
	// Down Arrow
	$("#menu").append('<div id = "arrow_down" class = "arrow">'
			+ '<img src = "../media/index/arrow_down_active.png" />'
		+ '</div>');
	
	for(var i = 7; i<items.length; i++) {
		$("#contact_"+i).hide();
	}
});

window.onkeydown=keyboard_handler;