
// CLASS样式配置
var Jh = {   
    Config:{			
		close: "close",
		closetext: "关闭",
        title: "模块搭建平台",
        creatText: "生成需求文档"
	},
    Layout:{
        left: "portal_l",
        right: "portal_r"
    }
};



//工具
Jh.Util = { 
    //格式化指定键值的模板
    format: function(str, model) { 
        for (var k in model) {
            var re = new RegExp("{" + k + "}", "g");
            str = str.replace(re, model[k])
        }
        return str
    },
    //往Body添加对象
    toBody: function(o) { 
        $("body").append(o);
    }
};

//功能
Jh.fn = function(me) { 
    return me = {
        //初始化
        init: function(data) { 
            me._ele = {};
            me._create();
            me._createBox(data);
            me.data = data;
        },
 
        _create: function() {
            var _box = $("<div id='header'/>");
            me.box = _box;
            Jh.Util.toBody(_box);
        },
 
        _createBox: function(d) {
            var _title = $("<h1>"+Jh.Config.title+"</h1>");
            me.box.append(_title);
            me._createActionButton();
        },
 
        _createActionButton: function() {
            var _save = $("<a class='button b' href='javascript:;' >"+Jh.Config.creatText+"</a>");
            me.box.append(_save);
            me._bindSave(_save);
        },

        //保存模块配置
        _bindSave: function(obj) { 
            obj.click(function() {
                var result = $("#" + Jh.Layout.right).sortable('toArray');
                if(result.length <1) {
                    alert("请先选择左边的模块~");
                    return;
                }

                var html = '<xdoc version="A.4.0">';
                    html += '<body>';
                    html += '<para heading="1" lineSpacing="5"> ';
                    html += '<text valign="top" fontName="标宋" fontSize="24">'+$("#M_Name").val()+'</text>';
                    html += '</para>';
                    html += '<para> ';
                    
                    for (var k in result) {
                        var dd = $("#" + Jh.Layout.right).find("." +result[k]),
                            width = dd.width(),
                            height = dd.height();
                        $.each(me.data.components, function(key, item) {
                            if(item.componentId == result[k]){
                                html += '<img src="'+item.componentCover+'" width="'+width+'" height="'+height+'" />';
                            }
                        });
                    }

                    html += '</para>';
                    html += '<para lineSpacing="3"> ';
                    html += '<text valign="middle" fontSize="16">\n模块顺序: \n'+result+'</text>';
                    html += '</para>';
                    html += '<para lineSpacing="3">';
                    html += '<text valign="middle" fontSize="16">\n需求详细说明：\n'+$("#M_Desc").val()+'</text>';
                    html += '</para>';
                    html += '</body>';
                    html += '</xdoc>';

                XDoc.run(html, "pdf", {}, "_blank");
            });
        }
    }
 
} ();


//Portal对象
Jh.Portal = function(me) { 
    var _box = "<div id='content'></div>",
        _template = {
            l: "<div id='" + Jh.Layout.left + "' class='groupWrapper'/>",
            r: "<div id='" + Jh.Layout.right + "' class='groupWrapper'/>",
            portalWrap: "<div id='{key}' class='groupItem {key}'/>",
            itemHeader: "<div class='itemHeader'><h3>{name}</h3></div>",
            itemContent: "<div class='itemContent'/>",
            markup:"<div id='markup'><dl> <dd>需求标题：</dd><dt><input id='M_Name' type='text' class='text' name='name' value='' /></dt></dl> <dl> <dd>需求详细说明：</dd> <dt><textarea name='desc' id='M_Desc' rows='10' class='text m2'></textarea></dt></dl></div>"
        };

    return me = {
        //初始化 
        init: function(data) {           
            me._create();
            me._bindData(data);
            me._bindEvent();
        },
 
        _create: function() {
            me.box = $(_box);
            me._elements = {};
            me._createModulesWrap();
            Jh.Util.toBody(me.box);
        },

        //创建模块外层容器
        _createModulesWrap: function() { 
            me._elements.m_l = $(_template.l);
            me._elements.m_r = $(_template.r);
            me._elements.markup = $(_template.markup);
            me._addPanel(me._elements.m_l);
            me._addPanel(me._elements.m_r);
            me._addPanel(me._elements.markup);
        },
 
        _addPanel: function(o) {
            me.box.append(o);
        },

        //绑定数据
        _bindData: function(data) { 
            var mWrap = me._elements.m_l;

            $.each(data.components, function(k, o) {
                mWrap.append(me._createPortalOne(o.componentId, o.componentCover));
            });
        },
 
        //创建单个portal item
        _createPortalOne: function(key, name) { 
            var itemHeader = me._createItemHeader(key),
            //header
            itemContent = me._createItemContent(name),
            //content
            portalWrap = $(Jh.Util.format(_template.portalWrap, {
                "key": key
            })).append(itemContent).append(itemHeader);

            return portalWrap;
        },
 
        //创建Head
        _createItemHeader: function(name) { 
            var _itemHeader = $(Jh.Util.format(_template.itemHeader, {
                "name": name
            })),
            //格式化        
            _actionWrap = me._createDiv("action").hide().appendTo(_itemHeader);
            me._createA(Jh.Config.close, Jh.Config.closetext, true).appendTo(_actionWrap);
 
            return _itemHeader;
        },

        //创建content
        _createItemContent: function(name) { 
            var _content = $(_template.itemContent);
            $("<img src='"+name+"' />").appendTo(_content);
            return _content;
        },
 
        _createDiv: function(classname) {
            var _div = $("<div/>").addClass(classname);
            return _div;
        },
 
        _createA: function(classname, title, isShow) { //创建A 
            var _a = $("<a href='javascript:void(0);' class='" + classname + "' title='" + title + "'/>");
            if (!isShow) {
                _a.hide();
            }
            return _a;
        },
 
        //移除
        _eventRemove: function() {
            $("." + Jh.Config.close).live("click", function() { 
                var _this = $(this),
                _p = _this.parent().parent().parent();               
                _p.fadeOut('500', function() {
                        var _this = $(this);
                        _this.remove();
                });
            });
        },
 
        //绑定排序
        _eventSortable: function() { 
            $('#' + Jh.Layout.right).sortable({
                opacity: "0.6",
                dropOnEmpty: true
            }).disableSelection();
        },

        _addToRight: function(){
            $('#' + Jh.Layout.left).find('.groupItem').live("click",function(e){
                var that = $(this);
                var newnode = that.clone(true);
                $('#' + Jh.Layout.right).append(newnode);

                //删除图标
                newnode.hover(function() { 
                    $(this).find(".action").show();
                },
                function() {
                    $(this).find(".action").hide();
                });
            });
        },
 
        _bindEvent: function() {     
            me._eventSortable();
            me._eventRemove();
            me._addToRight();
        }
 
    };
}();