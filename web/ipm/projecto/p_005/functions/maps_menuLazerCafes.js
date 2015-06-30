
/** KITT - JAVASCRIPT FUNCIONS - Selection Function Box - Maps */

function Forward()
{
alert("Cafés assinalados com sucesso!");
window.location = nextURL
}

function Back()
{
//alert("Back")
window.location = prevURL
}


$(window).load(
function()
{

var li = $('li'); 
var liSelected;
var cont = 0;

$(window).keydown(
function(e)
{
e = e || window.event;

var nextPage = $("#next_page_link_index")
var prevPage = $("#previous_page_link_index")

nextURL = nextPage.attr("href")
prevURL = prevPage.attr("href")

if(e.which === 39)
{
	Forward(nextURL);
}

else if(e.which === 37)
{
Back(prevURL);
}

}
);

}
);
