// 相当于原生的window.onload
$( window ).on( "load", function(){
    waterfall();    
    var dataInt={'data':[{'src':'../images/0.jpg'},{'src':'../images/1.jpg'},{'src':'../images/2.jpg'},{'src':'../images/3.jpg'}]};
    $(window).on('scroll',function(){
        if(checkScrollSlide()){
            $.each( dataInt.data, function( key, value ){
                // 创建div<div>,jq优点，支持连缀，隐式迭代
                var $oBox = $('<div>').addClass('box').appendTo( $( "#main" ) );
                var $oPic = $('<div>').addClass('pic').appendTo( $oBox );
                // attr写一个值获取两个值设置
                var oImg = $('<img>').attr('src', $( value).attr( 'src')).appendTo($oPic);
            });
            waterfall();
        };
    })
});
// jquery提供了强大的选择器所以直接选择class不需要那么多其他步骤
function waterfall(){
    // 这里用大于号，如果用空格会把下面所有的子元素div都找出来
    var $boxs = $( "#main>div" );
    // 把每一列的宽度放进w,$boxs.eq( 0 )第一个div,outerWidth获取的宽包括padding和border
    var w = $boxs.eq( 0 ).outerWidth();
    // 算一下列数,窗口宽除以每一列一个块框的宽(width()是获取，如果括号里有值那就是设置一个值)
    var cols = Math.floor( $( window ).width() / w );
    // 设置总宽度并且让它居中
    $( "#main" ).width(w*cols).css('margin','0 auto');
    //用于存储 每列中的所有块框相加的高度
    var hArr=[];
    //用each方法遍历index索引和value每个元素
    $boxs.each( function( index, value ){
        // 获取到每个index的元素并把高度放进去
        var h = $boxs.eq( index ).outerHeight();
        if( index < cols ){
        // 把获取到的高度放进数组里面储存
            hArr[ index ] = h; 
        }else{
            // 求到第一行所有图片的最小值
            var minH = Math.min.apply( null, hArr );
            // 求出最小的值在这个数组里的索引，直接用inArray这方法判断，第一个参数判断谁，第二个参数在哪个数组里判断
            var minHIndex = $.inArray( minH, hArr );
            // value保存着每个遍历的元素，value是个dom元素，dom对象不可以用jquery任何方法，也就不能用css方法设置了
            // 我们把它转换成jq对象
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': minHIndex*w+'px'
            });
            //最短元素的高+加上的块框的高
            hArr[ minHIndex ] += $boxs.eq( index ).outerHeight();
        }
    });
}

function checkScrollSlide(){
    // 取它最后一个块的值
    var $lastBox = $( "#main>div" ).last();    
    // 计算并储存网页顶部到最底下一张图片的一半的距离
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
    // 滚动条滚动的距离
    var scrollTop = $( window ).scrollTop();
    // 浏览器窗口可视区域高度
    var documentH = $( window ).height();
    //到达指定高度后 返回true，触发waterfall()函数
    return (lastBoxDis < scrollTop + documentH ) ? true : false;
}