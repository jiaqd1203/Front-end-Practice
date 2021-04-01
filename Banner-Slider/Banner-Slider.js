window.onload = function(){
    var imgList = document.getElementById("imgList");
    var imgArr = document.getElementsByTagName("img");
    imgList.style.width = 520*imgArr.length + "px";
    // 设置小点点居中
    var navDiv = document.getElementById("navDiv");
    var outer = document.getElementById("outer");
    navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth)/2 + "px";
    // 默认显示图片的索引，默认选中黑色
    var index = 0;
    var allA = document.getElementsByTagName("a");
    allA[index].style.backgroundColor = "black";
    // 当我执行单机响应函数的时候for循环已经执行完了
    for(var i = 0; i<allA.length;i++){
        
        // 为每一个超链接添加一个number属性
        allA[i].num = i;
        allA[i].onclick = function(){      
            // 获取点击超链接的索引，并将其设置为index
            index = this.num;
            setA();  
            move(imgList , "left" , -520*index , 20 , function(){							
            });            
        }    
    }

    function setA(){   
        for(var i=0;i<allA.length;i++){
        //这是内联样式，设置空串，内联没了，样式表生效
            allA[i].style.backgroundColor = "";
        }        
           allA[index].style.backgroundColor = "black";
        }

    setInterval(function(){
        imgList.style.width = 520*imgArr.length + "px";
    },1000)
}