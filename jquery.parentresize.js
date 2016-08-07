/*
*
* 好吧，这是我写的，欢迎大家下载使用
* zhpha@hotmail.com
*                                --Ashiyue.com
* 
*/
(function ($)
{
	var prex;
	var prey;
	var onresize = false;
	var canwidth = true;
	var canheight = true;
	var parentresizeid = null;
	var both = false;
	var canwidthlist = {};
	var canheightlist = {};
	var bothlist = {};
	var zoom = 1;
	var getMousePosition = function (e)
	{
		var posx = 0;
		var posy = 0;

		if (!e) var e = window.event;

		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY)
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		return { 'x': posx, 'y': posy };
	};

	var random = function ()
	{
		var d = new Date();
		var s = "" + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds() + Math.random(d.getTime());
		return s;
	}
	var down = function (e)
	{
		onresize = true;
		canwidth = canwidthlist[this.id];
		canheight = canheightlist[this.id];
		both = bothlist[this.id];
		var pos = getMousePosition(e);
		prex = pos.x;
		prey = pos.y;
		parentresizeid = jQuery(this).parent();
		zoom = 1;

		//////////////////////////////////////////zoom 修正
		var currentElement = jQuery(this)
		try
		{
			var zooms = $(currentElement).data("zoom");
			if (zooms)
			{
				zoom = zooms;
			}
			else
			{

				var m = $(currentElement).parents();
				var s = Number($(currentElement).css("zoom"));

				(s == 0 || isNaN(s)) ? s = 1 : "";
				for (var i = 0; i < m.length; i++)
				{
					var x = Number(m.eq(i).css("zoom"));
					(x == 0 || isNaN(x)) ? x = 1 : "";
					s *= x;

				}
				(s == 0 || isNaN(s)) ? s = 1 : "";

				$(currentElement).data("zoom", s);

				zoom = s;



			}

		} catch (e)
		{

		}


		////////////////////////////////////////zoom修正

		return false;
	};

	jQuery(document).mousemove(function (e)
	{
		e.stopPropagation();
		var pos = getMousePosition(e);
		var x = pos.x;
		var y = pos.y;
		var width = (x - prex) / zoom;
		var height = (y - prey) / zoom;
		prex = x;
		prey = y;
		if (both)
		{
			if (height != width)
			{
				//                if (width != 0) height = width;
				//                else width = height;
				width = height;
			}
		}
		if (!onresize) return;
		if (canheight)
		{
			var h = jQuery(parentresizeid).height();
			height = h + height;
			//            if (jQuery.browser.msie && jQuery.browser.version < "9") {
			//                if (jQuery.browser.version < "8") {
			//                    height -= 4;
			//                } else {
			//                    height -= 2;
			//                }
			//            }
			if (!(jQuery(parentresizeid).css("min-height") > height && jQuery(parentresizeid).css("max-height") < height))
			{
				jQuery(parentresizeid).height(height);
			}
			h = jQuery(parentresizeid).height();
			if (h != height)
			{
				jQuery(parentresizeid).width(height - (h - height));
			}
		}
		if (canwidth)
		{
			var w = jQuery(parentresizeid).width();
			width = w + width;
			//            if (jQuery.browser.msie && jQuery.browser.version < "9") {
			//                if (jQuery.browser.version < "8") {
			//                    width -= 4;
			//                } else {
			//                    width -= 2;
			//                }
			//            }
			if (!(jQuery(parentresizeid).css("min-width") > width && jQuery(parentresizeid).css("max-width") < width))
			{
				jQuery(parentresizeid).width(width);
			}
			w = jQuery(parentresizeid).width();
			if (w != width)
			{
				jQuery(parentresizeid).width(width - (w - width));
			}

		}
	});

	jQuery(document).mouseup(function (e)
	{
		onresize = false;
		// return false;
	});
	jQuery.fn.parentresize = function (w, h, both)
	{
		return this.each(function ()
		{
			if (undefined == this.id || !this.id.length)
			{
				this.id = "parentresize" + random();
			}
			canheightlist[this.id] = h;
			canwidthlist[this.id] = w;
			bothlist[this.id] = both ? both : false;
			jQuery(this).mousedown(down);
			return jQuery(this);
		});
	}
})(jQuery);
