jQuery.fn.reverse = [].reverse;

jQuery.fn.slantedwrap = function() {

    var jqueryContext = this;

    $.fn.slantedwrap.init = function() {
        jqueryContext.each(function() {
            var height = $(this).find('.slantedwrap-overlay').height();
            var width = $(this).find('.slantedwrap-overlay').width();

            var canvas = $('<canvas height="'+height+'" width="'+width+'" />');
            $(this).find('.slantedwrap-overlay').append(canvas);
            $(this).find('.slantedwrap-overlay .slantedwrap-content').hide();

        });

        $(window).resize(function() {
            $.fn.slantedwrap.draw();
        });

        $.fn.slantedwrap.draw();
    };

    $.fn.slantedwrap.draw = function() {
        jqueryContext.each(function() {

            var halign = $(this).data('halign') || 'left';
            var valign = $(this).data('valign') || 'top';
            var start = $(this).data('wrapstart') || 1;
            var padding = $(this).data('wrappadding') || 16;

            var height = $(this).find('.slantedwrap-overlay').height();
            var width = $(this).find('.slantedwrap-overlay').width();
            var m = height/(start*width-2*padding);

            var canvas = $(this).find('canvas');
            canvas.attr('height', height);
            canvas.attr('width', width);
            var context = canvas[0].getContext('2d');

            context.clearRect(0,0,width,height);

            context.globalAlpha = 0.2;
            context.fillStyle='#000000';
            context.beginPath();

            if (halign === 'left') {
                context.moveTo(0, (valign === 'top')?0:height);
                context.lineTo(start*width, (valign === 'top')?0:height);
                context.lineTo(0, (valign === 'top')?height:0);   
            }
            else {
                context.moveTo(width, (valign === 'top')?0:height);
                context.lineTo((1-start)*width, (valign === 'top')?0:height);
                context.lineTo(width, (valign === 'top')?height:0);  
            }
            context.closePath();
            context.fill();
            context.globalAlpha = 1;

            var x = 8;
            var halignPos = (halign === 'left')?x:(width-x);
            var maxwidth = height/m;

            if (valign === 'top') {

                // For align top, process text forwards

                var y = 0;

                $(this).find('.slantedwrap-overlay .slantedwrap-content h3, .slantedwrap-overlay .slantedwrap-content p').each(function() {
                    context.fillStyle = $(this).css('color');
                    context.font = $(this).css('font-size')+' '+$(this).css('font-family');
                    context.textAlign = halign;

                    var lineHeight = parseFloat($(this).css('font-size'))*1.2;
                    y += lineHeight;
                    maxwidth = (height-y)/m;
                    var text = $(this).text();

                    var words = text.split(' ');
                    var line = '';
                    for (var n = 0; n < words.length; n++) {
                        var testline = line + words[n] + ' ';
                        var metrics = context.measureText(testline);
                        var testWidth = metrics.width;
                        if ((testWidth > maxwidth) && (n > 0)) {
                            context.fillText(line, halignPos, y);
                            line = words[n] +' ';
                            y += lineHeight;
                            maxwidth = (height-y)/m;
                        }
                        else {
                            line = testline;
                        }
                    }
                    context.fillText(line, halignPos, y);
                    y += 8;
                });
            }
            else {
                // For align bottom, process text in reverse

                var y = height;

                $(this).find('.slantedwrap-overlay .slantedwrap-content h3, .slantedwrap-overlay .slantedwrap-content p').reverse().each(function() {
                    context.fillStyle = $(this).css('color');
                    context.font = $(this).css('font-size')+' '+$(this).css('font-family');
                    context.textAlign = halign;

                    var lineHeight = parseFloat($(this).css('font-size'))*1.2;
                    y -= lineHeight;
                    maxwidth = y/m;

                    var text = $(this).text();

                    var words = text.split(' ');
                    var line = '';
                    for (var n = words.length-1; n >= 0; n--) {
                        var testline = words[n]+(line.length ? ' '+line: '');
                        var metrics = context.measureText(testline);
                        var testWidth = metrics.width;

                        if ((testWidth > maxwidth) && (n !== words.length-1)) {
                            context.fillText(line, halignPos, y);
                            line = words[n];
                            y -= lineHeight;
                            maxwidth = y/m;
                        }
                        else {
                            line = testline;
                        }
                    }
                    context.fillText(line, halignPos, y);
                });
            }
        });
    };

    $.fn.slantedwrap.init();
};