## 一、CSS浏览器支持标准 

<table width="400">
  <tbody>
    <tr>
      <td></td>
      <td> IOS</td>
      <td> Android </td>
      <td> Windows </td>
    </tr>
    <tr>
        <td> Webkit Safari </td>
        <td> A </td>
        <td> A </td>
        <td> C </td>
    </tr>
    <tr>
        <td> UC </td>
        <td> A  </td>
        <td> A </td>
        <td> C </td>
    </tr>
    <tr>
      <td> QQ </td>
      <td> A  </td>
      <td> A </td>
      <td> C </td>
    </tr>
    <tr>
      <td> 百度 </td>
      <td> B  </td>
      <td> B </td>
      <td> C </td>
    </tr>
    <tr>
      <td> 360 </td>
      <td> B  </td>
      <td> B </td>
      <td> C </td>
    </tr>
    <tr>
      <td> 火狐 </td>
      <td> B  </td>
      <td> B </td>
      <td> C </td>
    </tr>
  </tbody>
</table>


（注：根据2012年4月数据整理）

*  A级－交互和视觉完全符全设计的要求
*  B级－视觉上允许有所差异，但不破坏页面的整体效果
*  C级－可忽略设计上的细节，但不防碍使用

***



## 二、CSS的模块化组织 

当前静态文件管理系统已支持LESS和导入语法。开发中，应尽量按功能分解大文件，实现模块化的文件组织。

 * 使用和完善现有CSS库。
 * 单个CSS文件避免过大（建议少于300行）。


***

## 三、单条CSS规则的书写格式要求


#### 1、单行形式适用于直接写在页面中和长文件的情况。声明写在一行。需要在“{"和"}”前后加空格。
（注：在很长的文件中，单行形式有利于检索选择器）

    .selector { property:value;property:value; }

简短规则声明（1或2个）也适用单行形式。

    .selector { property:value; }


#### 2、格式化书写形式。适用于不是很长的模块文件或CSS3语法。冒号后加空格。

    .selector { 
      property: value;
      property: value; 
    }


#### 3、CSS3兼容书写形式和对齐方式：

    .selector { 
      -webkit-box-shadow: 0 0 5px rgba(200, 200,200, 0.8);
         -moz-box-shadow: 0 0 5px rgba(200, 200,200, 0.8);
              box-shadow: 0 0 5px rgba(200, 200,200, 0.8);
    }

#### 4、CSS3中逗号分隔的长属性值：

    .selector {
        box-shadow:
            1px 1px 1px #000,
            2px 2px 1px 1px #ccc inset;
        background-image:
            linear-gradient(#fff, #ccc),
            linear-gradient(#f3c, #4ec);
    }

#### 5、多个(>2)selector每个占一行：

    .selector1,
    .selector2,
    .selector3 { ... }

#### 6、 规则声明的顺序：

    1 定位、
    2 盒模型（width/height/padding/border/margin）、
    3 行高、
    4 字体/字号/颜色、
    5 背景、
    6 CSS3效果等
    
    举个例子：
    #header{
    	position: fixed;
    	display:block;
    	width:100%;
    	height:40px;
    	line-height:40px;
    	color；#333；
    	background:#fff;
    	-webkit-border-radius: 4px;
    }

#### 7、兼容多个浏览器时，将标准规则声明写在后面，如：

    -webkit-border-radius: 4px;
       -moz-border-radius: 4px;
            border-radius: 4px;

***

## 四、CSS注释书写形式


#### 1、注释内容单行控制在40个中文或80个英文字符宽。注释的格式：

     /* 
      * mod: wall-list 
      * 描述内容
      */

#### 2、规则分类放在一起。通用规则在具体业务规则的前面。如：

    /* layout */
    ...
    /* mod */
    ...
    /* nav */
    ...
    /* mod: album */
    ...

***

## 五、ID和Class命名

 	命名不要用缩写(除一些公认的缩写，见4)，单词间用"-"做为连接符


#### 1、 ID是用来标识具体模块，命名必须具体且唯一，由前缀和名字组成。不要滥用ID。
	如： #mod-userlist、#page-index等。
	
#### 2、Class是用来标识某一类型的对象，命名简洁表意清楚。
	如：.list, .page
	
#### 3、命名示例：
坏：

    #rec
    .gray-link
    .broadsmr
    .pl

好：

    #page-home
    .infobox
    .item


#### 4、推荐使用的class名：

<table width="400">
  <tbody>
    <tr>
      <td> 表示状态 </td>
      <td style="text-align:left;"> .on, .active, .selected, .hover </td>
    </tr>
    <tr>
      <td> 表示位置 </td>
      <td style="text-align:left;"> .first, .last, .main, .side </td>
    </tr>
    <tr>
      <td> 表示结构 </td>
      <td style="text-align:left;"> .hd, .bd, .ft, .col, .section </td>
    </tr>
    <tr>
      <td> 通用元素</td>
      <td style="text-align:left;"> .tb, .frm, .nav, .list, .item, .tag, .pic, .info </td>
    </tr>
  </tbody>
</table>

***

## 其他

#### 1.使用after或overflow的方式清浮动，不要在html里增加多余的标签

#### 2、CSS必须放在head里

#### 3、尽量避免使用低效的选择器
 如：

    body > * {...}
    ul > li > a {...}
    #footer > h3 {...}
    ul#top_blue_nav {...}
    #searbar span.submit a { ... }
    .target #target-node { ... }

#### 4、避免使用filter

#### 5、避免直接定义标签的样式。如： div { ... } 

#### 6、避免在标签上直接写样式。

    如：
    style="margin-bottom:30px;"


#### 7、尽量 避免在CSS中使用expression

#### 8、避免在CSS中使用@import

#### 9、尽量不要在CSS中使用!important