     
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
        //startMove(obj,{attr1:target1,attr2:target2},fn)
        function startMove(obj,json,fn){         
            //利用json，让以下运动多做几次循环，实现同时运动
            //我假设所有运动都到达了目标值
            //这个flag=true在3.4放在这里没问题，4.1淘宝就要放在定时器里面
            //否则的话鼠标移入到图标，图标上去就消失了？？？
            //var flag = true;
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                //为什么放在这里就解决了？
                var flag = true;
                for(var attr in json){
                //取当前的值
                var icur = 0;
                if(attr == 'opacity'){
                    
                    icur = Math.round(parseFloat(getStyle(obj,attr))*100);
                }else{
                    icur = parseInt(getStyle(obj,attr));
                }
                //算速度,用json来表示              
                var speed = (json[attr] - icur)/8;
                speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
                //检测停止,改成json
                //改成如果不是所有的运动都到达了目标值
                if(icur !== json[attr]){
                //如果不是所有运动都到达，标杆flag是false
                    flag = false;                    
                }
                if(attr == 'opacity'){
                        obj.style.filter = 'alpha(opacity:'+(icur + speed)+')';
                        obj.style.opacity = (icur + speed)/100;    
                }else{
                        obj.style[attr] = icur + speed + 'px';
                }
                if(flag){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }
            },30);
        }

