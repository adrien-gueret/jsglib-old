(function ($) {
	'use strict';

	var $doc_menu = $('#doc-menu');

	function getIndex($tag, className) {
		var index = -1,
			find = false;

		$tag.parent().children().each(function () {
			var $child = $(this);

			if ($child.hasClass(className)) {
				index++;
				if (this === $tag[0]) {
					find = true;
					return false;
				}
			}
		});

		return find ? index : -1;
	}

	function itemClickHandler(e) {
		$doc_menu.find('.item-highlight').removeClass('item-highlight');

		var $this = $(this).addClass('item-highlight');

		$('div.description')
			.hide()
			.filter('#documentation_' + $this.attr('data-href'))
			// .show() does not work, because reason...
			.css('display', 'block');

		e.preventDefault();
		e.stopPropagation();
	}

	function sublistClickHandler() {
		var $this = $(this),
			$ul = $this.children('ul'),
			$sign = $this.find('span.sign').first();

		if ($ul.is(':visible')) {
			$ul.slideUp();
			$sign.text('+');
		} else {
			// Dirty hack: jQuery seems to have troubles whith slideDown() on "display: none;" elements
			$ul.css('display', 'block').hide().slideDown();
			$sign.text('-');
		}
	}

	function getMouseEventHandler(classMethod) {
		return function() {
			var $param = $(this);
			$param
				.parent('.signature')
				.find('span.signature_param')
				.eq(getIndex($param, 'param'))[classMethod + 'Class']('highlight');
		};
	}

	$doc_menu
		.find('li')
			.on('click', itemClickHandler)
			.has('ul')
				.on('click', sublistClickHandler);

	$('div.param').on('mouseenter', getMouseEventHandler('add')).on('mouseleave', getMouseEventHandler('remove'));
})(jQuery);