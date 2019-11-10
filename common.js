(function($){
    $.fn.acdion = function(options){

        // var defaults = {
        // };

		var wrap = 	$(this);

		$(window).load(function() {
			var inner = wrap.children('.pleat');
			var innerWidth = inner.width();
			var innerNum = inner.length;
			var title = $(inner).children('.title');
			var titleWidth = new Array();
			for(var n = 0 ; n < innerNum ; n++ ){
				titleWidth[n] = $(inner).eq(n).children('.title').width();
			};
			var totalWidth = 0;
			for (var i = 0; i < innerNum; i++) {
				totalWidth += titleWidth[i]
			};
			var contentWidth = inner.eq(0).children('.txt').width();

			wrap.css({
				'overflow': 'hidden',
				'width': innerWidth + totalWidth - titleWidth[0]
			});
			inner.css({
				'position' : 'absolute',
				'top' : '0'
			});
			for (var i = 0 ; i < innerNum; i++) {
				if(i == 0){
					inner.eq(i).css({
						'left' : 0
					});
				}else if(i == 1){
					inner.eq(i).css({
						'left' : innerWidth
					});
				}else {
					inner.eq(i).css({
						'left' : innerWidth + ( titleWidth[i] * ( i - 1) )
					});
				}
			};

			inner.eq(0).addClass('active');
			var moveDistance = 0;
			$(title).on('click', title, function() {
				if($(this).parent().hasClass('active')){
					var clickNum = $(this).parent('.pleat').index();
					for (var d = innerNum ; d > clickNum; d--) {
						if(d == 0){
							inner.eq(d - 1).css({
								'left' : 0
						});
						}else if(d == 1){
							inner.eq(d).animate({
								'left' : innerWidth
							});
						}else {
							title.parent(inner).eq(d).animate({
								'left' : innerWidth + ( titleWidth[d - 1] * ( d - 1) )
							}).removeClass('active');
						}
					};
				}else {
					var clickNum = $(this).parent('.pleat').index();
					for (var c = 0; c < clickNum; c++) {
						moveDistance = moveDistance + titleWidth[c]
						inner.eq(c + 1).animate({
						 	'left': moveDistance
						}, 'slow',function(){
							$(this).addClass('active')
						});
					};
					moveDistance = 0;
				}
			});
		});
    }
})(jQuery);


$(function(){
	$('.acdion').acdion();
});
