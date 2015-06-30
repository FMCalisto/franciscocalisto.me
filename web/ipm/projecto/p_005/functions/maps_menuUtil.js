
/** KITT - JAVASCRIPT FUNCIONS - Selection Function Box - Maps */

function Forward()
{
window.location = nextURL
}

function Forward2()
{
window.location = nextURL2
}

function Back()
{
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

if(cont === 0)
{        
var nextPage = $("#next_page_link_maps_menu_util_mb")
var prevPage = $("#previous_page_link_index")

nextURL = nextPage.attr("href")
prevURL = prevPage.attr("href")
}

if(cont === 1)
{        
var nextPage = $("#next_page_link_maps_menu_util_hospital")
var prevPage = $("#previous_page_link_index")

nextURL = nextPage.attr("href")
prevURL = prevPage.attr("href")
}

if(cont === 2)
{        
var nextPage = $("#next_page_link_maps_menu_util_metro")
var prevPage = $("#previous_page_link_index")

nextURL = nextPage.attr("href")
prevURL = prevPage.attr("href")
}

if(cont === 3)
{        
var nextPage = $("#next_page_link_maps_menu_util_help")
var prevPage = $("#previous_page_link_index")

nextURL = nextPage.attr("href")
prevURL = prevPage.attr("href")
}

if(e.which === 40 && cont != 3)
{
if(liSelected)
{
liSelected.removeClass('selected');
next = liSelected.next();
cont++;

if(next.length > 0)
{
liSelected = next.addClass('selected');
}

else
{
liSelected = li.eq(0).addClass('selected');
}
}

else
{
liSelected = li.eq(0).addClass('selected');
}
}

else if(e.which === 38 && cont != 0)
{
	liSelected.removeClass('selected');
	next = liSelected.next();
	cont--;

if(liSelected)
{
liSelected.removeClass('selected');
next = liSelected.prev();

if(next.length > 0)
{
liSelected = next.addClass('selected');
}

else
{
liSelected = li.last().addClass('selected');
}
}

else
{
liSelected = li.last().addClass('selected');
}
}

else if(e.which === 39 && liSelected)
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
