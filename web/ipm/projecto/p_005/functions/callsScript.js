// State
var pointer_val = 0;
var em_chamada = -20;
var em_espera = -20;

// Objects
var btn_terminar = {
    exists: false,
    selected: true,
    name: "TerminarChamada",
    get_writestring: function() {
        return '<br>' + (this.selected ? '<b><font size="15pt">' : '') + 'Terminar Chamada' + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
		return this.get_writestring();
        // return '<a> <br> <img class = "arrow" src ="./media/' + this.name + '.png" width="50pt" height="50pt"></img></a>';
    },
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera == -20) { // Está em chamada
            this.exists = false;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = true;
            }
            timedmessage(items[em_chamada].get_writestring() + ": Chamada terminada");
            em_chamada = -20;
            pointer_val = 4;
        }
		
		// FIXME: refactor
		if(em_chamada == -20 && em_espera != -20) { // Está em espera
            this.exists = false;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = true;
            }
            timedmessage(items[em_espera].get_writestring() + ": Chamada terminada");
            em_espera = -20;
            pointer_val = 4;
        }
        
        if(em_chamada != -20 && em_espera != -20 ) { // Está em 2 chamadas
            this.exists = true;
            btn_retomar.exists = true;
            btn_trocar.exists = false;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = true;
            }
            items[em_espera].exists = false; // desactiva o contacto em espera
            timedmessage(items[em_chamada].get_writestring() + ": Chamada terminada");
            em_chamada = -20;
            pointer_val = 0;
        }
    }
};

var btn_retomar = {
    exists: false,
    selected: false,
    name: "RetomarChamada",
    get_writestring: function() {
        return '<br>' + (this.selected ? '<b><font size="15pt">' : '') + 'Retomar Chamada' + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
		return this.get_writestring();
        // return '<a> <br> <img class = "arrow" src ="./media/' + this.name + '.png" width="50pt" height="50pt"></img></a>';
    },
    my_clickhandler: function() {
        if(em_espera != -20 && em_chamada == -20) { // Está em espera
            btn_terminar.exists = true;
            this.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            //FIXME: "hide" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            em_chamada = em_espera;
            timedmessage(items[em_espera].get_writestring() + ": Chamada retomada");
            em_chamada = em_espera;
            em_espera = -20;
            pointer_val = 0;
        }
    }
};

var btn_trocar = {
    exists: false,
    selected: false,
    name: "TrocarChamada",
    get_writestring: function() {
        return '<br>' + (this.selected ? '<b><font size="15pt">' : '') + 'Trocar Chamada' + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
		return this.get_writestring();
        // return '<a> <br> <img class = "arrow" src ="./media/' + this.name + '.png" width="50pt" height="50pt"></img></a>';
    },
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera != -20 ) { // Está em 2 chamadas
            timedmessage(items[em_espera].get_writestring() + ": Chamada trocada"); //FIXME: bad msg
            var temp = em_chamada;
            em_chamada = em_espera;
            em_espera = temp;
            pointer_val = 0;
        }
    }
};

var btn_colocarespera = {
    exists: false,
    selected: false,
    name: "ColocarChamadaEmEspera",
    get_writestring: function() {
        return '<br>' + (this.selected ? '<b><font size="15pt">' : '') + 'Colocar em espera' + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
		return this.get_writestring();
        // return '<a> <br> <img class = "arrow" src ="./media/' + this.name + '.png" width="50pt" height="50pt"></img></a>';
    },
    my_clickhandler: function() {
        if(em_chamada != -20 && em_espera == -20) { // Está em chamada
            btn_terminar.exists = true;
            btn_retomar.exists = true;
            btn_trocar.exists = false;
            this.exists = false;
            //FIXME: "show" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = true;
            }
            items[em_chamada].exists = false; // desactiva o contacto em espera
            timedmessage(items[em_chamada].get_writestring() + ": Chamada em espera");
            em_espera = em_chamada;
            em_chamada = -20;
            pointer_val = 0;
        }
    }
};

var contact1 = {
    exists: true,
    selected: false,
    name: "Carina",
    get_writestring: function() {
        return (this.selected ? '<b><font size="15pt">' : '') + this.name + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
        return '<div id = "test" class = "menuItem selected">' +
			'<img src = "../media/calls/contact_mp.png" />' +
			'</div>';
    },
    my_clickhandler: function() {
        if(em_chamada == -20 && em_espera == -20 ) { // Não está em chamada nem em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            //FIXME: "hide" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
        
        if(em_chamada == -20 && em_espera != -20 ) { // Em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = true;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
    }
};

var contact2 = {
    exists: true,
    selected: false,
    name: "Cristiano",
    get_writestring: function() {
        return (this.selected ? '<b><font size="15pt">' : '') + this.name + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
        return '<div id = "test" class = "menuItem selected">' +
			'<img src = "../media/calls/contact_mp.png" />' +
			'</div>';
    },
    my_clickhandler: function() {
        if(em_chamada == -20 && em_espera == -20 ) { // Não está em chamada nem em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            //FIXME: "hide" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
        
        if(em_chamada == -20 && em_espera != -20 ) { // Em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = true;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
    }
};

var contact3 = {
    exists: true,
    selected: false,
    name: "Fábio",
    get_writestring: function() {
        return (this.selected ? '<b><font size="15pt">' : '') + this.name + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
        return '<div id = "test" class = "menuItem selected">' +
			'<img src = "../media/calls/contact_mp.png" />' +
			'</div>';
    },
    my_clickhandler: function() {
        if(em_chamada == -20 && em_espera == -20 ) { // Não está em chamada nem em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            //FIXME: "hide" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
        
        if(em_chamada == -20 && em_espera != -20 ) { // Em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = true;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
    }
};

var contact4 = {
    exists: true,
    selected: false,
    name: "Tatiana",
    get_writestring: function() {
        return (this.selected ? '<b><font size="15pt">' : '') + this.name + (this.selected ? '</font></b>' : '');
    },
    get_drawstring: function() {
        return '<div id = "test" class = "menuItem selected">' +
			'<img src = "../media/calls/contact_mp.png" />' +
			'</div>';
    },
    my_clickhandler: function() {
        if(em_chamada == -20 && em_espera == -20 ) { // Não está em chamada nem em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = false;
            btn_colocarespera.exists = true;
            //FIXME: "hide" all -> refactor
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
        
        if(em_chamada == -20 && em_espera != -20 ) { // Em espera
            btn_terminar.exists = true;
            btn_retomar.exists = false;
            btn_trocar.exists = true;
            btn_colocarespera.exists = false;
            //FIXME:
            for (var i=4;i<items.length;i++) {
                items[i].exists = false;
            }
            timedmessage(items[pointer_val].get_writestring() + ": A chamar...");
            em_chamada = pointer_val; // magic number
            pointer_val = 0;
        }
    }
};



var items = [btn_terminar, btn_retomar, btn_trocar, btn_colocarespera, contact1, contact2, contact3, contact4];


function timedmessage(msg) {
	document.getElementById("menu").innerHTML = msg;
	window.setTimeout(function(){
		print_menu();
	},1500);
}

function print_menu() {
	var var_innerHTML = "";
	var skipcontacts = false;
        
	if(em_chamada != -20) {
            skipcontacts = true;
            var_innerHTML = var_innerHTML + items[em_chamada].get_writestring();
    }
		
    if(em_espera != -20) {
            var_innerHTML = var_innerHTML + items[em_espera].get_writestring();
    }
   
  if(!skipcontacts) {
       items[pointer_val].selected = true;
        for (var i=0;i<items.length;i++) {
            // FIXME: bad code
            if(i == 4 && (em_espera != -20 || em_chamada != -20)) {
                var_innerHTML = var_innerHTML + '<br><br>'; // FIXME: trocar line breaks por algo melhor
            }
            
            if(em_chamada != i && em_espera != i && items[i].exists)
                var_innerHTML = var_innerHTML + items[i].get_drawstring();
        }
       items[pointer_val].selected = false;
       
} else {
    // Fazer apenas os botoes
    items[pointer_val].selected = true;
        for (var i=0;i<4;i++) {
            if(em_chamada != i && em_espera != i && items[i].exists)
                var_innerHTML = var_innerHTML + items[i].get_writestring();
        }
       items[pointer_val].selected = false;
}

document.getElementById("menu").innerHTML = var_innerHTML;
}

function prev_func() {
	window.location = "../index.html"
}

function keyboard_handler(e) {
	var pK = e? e.which: window.event.keyCode;
	// Right arrow
	if(pK == 39) {
		items[pointer_val].my_clickhandler();
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
                if(items[pointer_val].exists) {
                    jump = true;
                    break;
                }
            }
            if(!jump)
                pointer_val = saved;
            print_menu();
	}
   
	// Down arrow
	if(pK == 40) {
	var jump = false;
            var saved = pointer_val;
            while(!jump && (pointer_val < items.length-1)) {
                pointer_val = pointer_val + 1;
                if(items[pointer_val].exists) {
                    jump = true;
                    break;
                }
            }
            if(!jump)
                pointer_val = saved;
            print_menu();
        }
}

function print_menu_alt(){
	document.getElementById("menu").innerHTML = "hi!";
}

print_menu();

window.onkeydown=keyboard_handler;
