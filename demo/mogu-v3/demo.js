/**
 * UI Demo
 * create: tianming
 */

define(function(require, exports, module) {
    var Backbone = require('backbone');
    var masonry = require('mansonry');
    require('prettify');

    var app = {};

    //初始化
    app.initialize = function(){
        app.showHeader();

        app.showFilter();

        app.showWall();

        app.prettyCode();
    };

    //显示快速导航和搜索
    app.showHeader = function(){
        $('.uinfo_show').on('click',function(){
            var target = $(this);

            target.siblings('.search').removeClass('search_cancel_btn');
            target.siblings('.search_tab_show').hide();

            target.toggleClass('cancel_btn');
            target.siblings('.user_nav_show').toggle();
        });

        $('.search').on('click',function(){
            var target = $(this);

            target.siblings('.uinfo_show').removeClass('cancel_btn');
            target.siblings('.user_nav_show').hide();

            target.toggleClass('search_cancel_btn');
            target.siblings('.search_tab_show').toggle();
            target.siblings('.search_tab_show').find('.search_val').focus();
        });
    };

    //筛选浮层
    app.showFilter = function(){
        $('.all_slide_wrap').on('click',function(){
            var select = $(this);

            select.siblings().removeClass('active');
            select.toggleClass('active');
        });

        $('.slide_mod a').on('click', function(e){
            e.stopPropagation();

            var target = $(this),
                item = target.parent('li'),
                slide = item.parents('.all_slide_wrap');
                
            slide.removeClass('active');
            slide.find('.title').text(item.text());
            item.addClass('active').siblings().removeClass('active');

        });
    };

    //筛选浮层
    app.showWall = function(){
        var wall = document.getElementById('wall');
        new Masonry(wall);
    };

    // make code pretty
    app.prettyCode = function(){

        window.prettyPrint && prettyPrint()

    }


    module.exports = app;
    
});
