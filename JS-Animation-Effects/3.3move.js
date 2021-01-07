     
        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }
        var alpha = 30;
         //功能相同的情况下，用同一套代码达到相同效果可以传参,fn
        startMove(obj,{attr1:target1,attr2:itarget2},fn)
        function startMove(obj,attr,target,fn){         
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                //取当前的值
                var icur = 0;
                if(attr == 'opacity'){
                    
                    icur = Math.round(parseFloat(getStyle(obj,attr))*100);
                }else{
                    icur = parseInt(getStyle(obj,attr));
                }
                //算速度              
                var speed = (target - icur)/8;
                speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
                //检测停止
                if(icur == target){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }else{
                    
                    if(attr == 'opacity'){
                        obj.style.filter = 'alpha(opacity:'+(icur + speed)+')';
                        obj.style.opacity = (icur + speed)/100;    
                }else{
                        obj.style[attr] = icur + speed + 'px';
                }
                }
            },30);
        }

