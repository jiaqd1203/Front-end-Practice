window.onload = function(){
    var imgList = document.getElementById("imgList");
    var imgArr = document.getElementsByTagName("img");
    imgList.style.width = 520*imgArr.length + "px";
    // 设置小点点居中
    var navDiv = document.getElementById("navDiv");
    var outer = document.getElementById("outer");
    // offsetWidth布局的宽度一直到border不包括margin
    navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth)/2 + "px";
    // 默认显示图片的索引，默认选中黑色
    var index = 0;
    var timer;
    var allA = document.getElementsByTagName("a");
    allA[index].style.backgroundColor = "black";
    // 当我执行单机响应函数的时候for循环已经执行完了
    for(var i = 0; i<allA.length;i++){        
        // 为每一个超链接添加一个number属性
        allA[i].num = i;
        allA[i].onclick = function(){      
            clearInterval(timer);
            // 获取点击超链接的索引，并将其设置为index
            index = this.num;
            setA();  
            move(imgList , "left" , -520*index , 20 , function(){
                autoChange();							
            });            
        }    
    }
    autoChange();
    var prev = document.getElementById("btn-prev");
    var next = document.getElementById("btn-next");
        prev.onclick = function(){
            clearInterval(timer);
            index--;            
            // 开头第一张处理方法，先变成最后一张，
            // 然后目标设定为倒数第二张并且index值也需要改变否则直接变回第一张
            if(index<0){
                index = imgArr.length-1;
                imgList.style.left = -520*index + "px";
                index--;
            }
                move(imgList , "left" , -520*index , 20 , function(){
                    setA();
                });                                    
            autoChange();                                    
        }
        
        next.onclick = function(){
            clearInterval(timer);
            index++;
            if(index>imgArr.length-1){
                index = 0;
            }
            move(imgList , "left" , -520*index , 20 , function(){
                setA();
            }); 
            autoChange();         
        }
            
    function setA(){        
        if(index >= imgArr.length - 1){
            index = 0;
            imgList.style.left = 0;
        }        
        for(var i=0;i<allA.length;i++){
        //这是内联样式，设置空串，内联没了，样式表生效
            allA[i].style.backgroundColor = "";
        }        
           allA[index].style.backgroundColor = "black";
    }
        
        
        function autoChange(){					
            //开启一个定时器，用来定时去切换图片
            timer = setInterval(function(){                
                index++;                
                //判断index的值,0%5=0,1%5=1,5%5=0
                index %= imgArr.length;                
                //执行动画，切换图片
                move(imgList , "left" , -520*index , 20 , function(){
                    setA();
                });                
            },3000);
            
        }
        
}