(function (window, $) {
    /**
     * Menu Fn
     * @param name
     * @param id
     * @param data
     * @constructor
     */
    function Menu(name, id, data) {
        this.name = name;
        this.id = id;
        this.data = data || null;
        this.load = function ($items) {
            var _self = this;

            $items.each(function () {
                if (findChildren($(this))) {
                    $(this).addClass('hasChild');
                }
            });

            function findChildren(el) {
                return el.find('> ul').length > 0;
            }
        };
        this.activeOn = function ($target) {
            $target.parent().addClass('on');
        };
        this.activeOff = function ($target) {
            $target.parent().removeClass('on');
        }
    }

    /**
     * GNB
     * @type {Menu}
     */
    var gnb = new Menu('gnb', 'mainMenu');
    gnb.init = function () {
        var _self = this,
            $items = $('#' + _self.id).find('li');

        this.load($items);
        this.hover($items, 100);
    };
    gnb.hover = function ($target, speed) {
        var _self = this;
        _self.speed = speed || 100;

        $target
            .mouseenter(handlerIn)
            .mouseleave(handlerOut);
        $target
            .focusin(handlerIn)
            .focusout(handlerOut);

        function handlerIn (e) {
            $(this).addClass('on');
            _self.activeOn($(this));
        }
        function handlerOut (e) {
            $(this).removeClass('on');
            _self.activeOff($(this));
        }
    };

    window.onload = function () {
      // 메인영역 최소높이값 주기
      const bodyH = $('body').outerHeight();
      const headerH = $('header').outerHeight();
      const footerH = $('footer').outerHeight();
      let contentH = bodyH - headerH - footerH;
      //console.log(`bodyH: ${bodyH}, headerH: ${headerH}, footerH: ${footerH}`)

      $('#contents').css('min-height', contentH);

      gnb.init();
    };



    // #  --------------------------------------------------- //
    // # TOP 버튼
    // #  --------------------------------------------------- //
    // Scroll Top
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > 100) {
    //         $('.scroll-to-top').fadeIn();
    //     } else {
    //         $('.scroll-to-top').fadeOut();
    //     }
    // });
    //
    // $('.scroll-to-top').click(function() {
    //     $('html, body').animate({
    //         scrollTop : 0
    //     }, 300);
    //     return false;
    // });


    // #  --------------------------------------------------- //
    // # 파일업로더
    // #  --------------------------------------------------- //
    // function init_inputFile() {
    //     'use strict';
    //
    //     var fileTarget = $('.filebox .upload-hidden');
    //
    //     // custom file upload
    //     fileTarget.on('change', function() {
    //         if(window.FileReader) {
    //             var filename = $(this)[0].files[0].name;
    //         } else {
    //             var filename = $(this).val().split('/').pop().split('\\').pop();
    //         }
    //
    //         $(this).siblings('.upload-name').val(filename);
    //     });
    // }


    // #  =================================================== //
    // # Run!!
    // #  =================================================== //
    // init_inputFile();

})(window, jQuery);
