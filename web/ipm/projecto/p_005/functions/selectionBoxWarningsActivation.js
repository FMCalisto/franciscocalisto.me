
/** KITT - JAVASCRIPT FUNCIONS - Selection Function Box - Index */

function Forward()
{
	window.location = nextURL
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
					var nextPage = $("#next_page_link_on")
					var prevPage = $("#previous_page_link_menu1")

					nextURL = nextPage.attr("href")
					prevURL = prevPage.attr("href")
				}

				if(cont === 1)
				{
					var nextPage = $("#next_page_link_off")
					var prevPage = $("#previous_page_link_menu1")

					nextURL = nextPage.attr("href")
					prevURL = prevPage.attr("href")
				}


				/*
				 *	Up Arrow Key
				 */

				if(e.which === 38)
				{
					cont = 0;

					if(liSelected)
					{
						liSelected.removeClass('selected');
						next = liSelected.next();

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


				/*
				 *	Down Arrow Key
				 */

				else if(e.which === 40)
				{
					cont = 1;

					if(liSelected)
					{
						liSelected.removeClass('selected');
						next = liSelected.prev();

						if(next.length > 0)
						{
							liSelected = prev.addClass('selected');
						}

						else
						{
							liSelected = li.eq(1).addClass('selected');
						}
					}

					else
					{
						liSelected = li.eq(1).addClass('selected');
					}					
				}


				/*
				 *	Right Arrow Key
				 */

				else if(e.which === 39)
				{
					Forward(nextURL);
				}


				/*
				 *	Left Arrow Key
				 */

				else if(e.which === 37)
				{
					Back(prevURL);
				}

			}

		);

	}

);
