window.onload = function(){
    var cartTable = document.getElementById('cartTable');
    // 取到tbody，rows是表格特有的属性，存放节点所有tr元素
    var tr = cartTable.children[1].rows;
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList');
    function getTotal(){
        var selected = 0;
        var price = 0;
        var HTMLstr = '';
        for(var i=0;i<tr.length;i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                tr[i].className = 'on';
                // parseInt转换成整数,加value求值
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
                // cells 集合返回表格行中所有 <td> 或 <th> 元素的个数,parseFloat转换成小数
                price += parseFloat(tr[i].cells[4].innerHTML)
                // 选择物品以后浮层显示的东西
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">Cancel</span></div>'
            }else{
                tr[i].className = '';
            }
        }
        selectedTotal.innerHTML = selected;
        // 保留两位小数
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;
        if(selected == 0){
            // 如果选中的商品都被取消掉那么不显示悬浮层
            foot.className = 'foot';
        }
    }
        for(var i=0;i<checkInputs.length;i++){
            checkInputs[i].onclick = function(){
                if(this.className === 'check-all check'){
                    for(var j=0; j<checkInputs.length;j++){
                        checkInputs[j].checked = this.checked;
                    }
                }
                if (this.checked == false) {
                    for (var k = 0; k < checkAllInputs.length; k++) {
                        checkAllInputs[k].checked = false;
                    }
                }
                getTotal();    
        }
    }

    //小计，tr是传进来的行数，传进来哪一行就计算哪一行
    function getSubTotal(tr) {
        //cells 集合返回表格行中所有 <td> 或 <th> 元素的个数
        var tds = tr.cells;
        // 获取价格，单价是第三个tr
        var price = parseFloat(tds[2].innerHTML);
        // 取数量
        var count = parseInt(tr.getElementsByTagName('input')[1].value);
        // 总价
        var SubTotal = parseFloat(price * count);
        //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字，保留两位小数
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    for (var i = 0, len = checkInputs.length; i < len; i++) {
        checkInputs[i].onclick = function () {
            if (this.className === 'check-all check') {
                for (var j = 0; j < checkInputs.length; j++) {
                    checkInputs[j].checked = this.checked;
                }
            }
            if (this.checked == false) {
                for (var k = 0; k < checkAllInputs.length; k++) {
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal();
        }
    }

        selected.onclick = function(){
            if(foot.className == 'foot'){
                // 如果已选商品后面是0，不显示悬浮层
                if(selectedTotal.innerHTML != 0){
                    foot.className = 'foot show';
                }                
            }else{
                foot.className = 'foot';
            }
        }
        //关于点击取消选择，图片从购物车消失，那么一开始我们悬浮层是空的，
        //所以无法直接给绑定函数，我们把这个事件代理到他的父元素上
        // 设置e作为参数，点击时，事件对象会作为一个参数传进来
        // 点击事件，控制台显示mouseEvent，查看属性，里面有非常多的属性
        //其中有个srcElement：img，点击的商品图片就存在这个文件夹下面
        // srcElement：span就是点击取消选择四个字会出现的效果
        selectedViewList.onclick = function (e) {
            var el = e.srcElement;
            // 判断它是不是点击到了取消选择的上面
            if (el.className == 'del') {
                var index = el.getAttribute('index');
                // 把选择框里的勾去掉
                var input = tr[index].getElementsByTagName('input')[0];
                input.checked = false;
                // 计算一下价格，调用一下上面的checkInputs[i].onclick方法
                input.onclick();
            }
        }
        // 加减商品的数量和价格，页面绑定太多事件影响性能，还是用代理的方法
        for (var i = 0; i < tr.length; i++) {
            tr[i].onclick = function (e) {
                // 触发目标事件的元素
                var el = e.srcElement;
                // 取到加减号的class
                var cls = el.className;
                // 加减号边上的物品数量的值
                var input = this.getElementsByTagName('input')[1];
                // 做计算，转整数
                var val = parseInt(input.value);
                // 取到减号
                var reduce = this.getElementsByTagName('span')[1];
                // 做判断
                switch (cls) {
                    case 'add':
                        // 点加号，数量加1
                        input.value = val + 1;
                        // 点了加号以后，才给减号框里加上减号，否则不需要添加
                        reduce.innerHTML = '-';
                        getSubTotal(this);
                        break;
                    case 'reduce':
                        if (val > 1) {
                            // 点减号，数量减1
                            input.value = val - 1;
                        }
                        if (input.value <= 1) {
                            // 如果数量值小于等于1，把减号去掉
                            reduce.innerHTML = '';
                        }
                        getSubTotal(this);
                        break;
                    case 'delete':
                        var conf = confirm('Are you sure？');
                        if (conf) {

                            this.parentNode.removeChild(this);
                        }
                        break
                    default :
                        break;
                }
                getTotal();
            }
            // 键盘弹起事件
            tr[i].getElementsByTagName('input')[1].onkeyup = function () {
                // 获取到的必须得是数字
                var val = parseInt(this.value);
                // input父节点td的父节点tr
                var tr = this.parentNode.parentNode;
                var reduce = tr.getElementsByTagName('span')[1];
                // 数量必须有数字并且不小于1
                if (isNaN(val) || val < 1) {
                    val = 1;
                }
                // 赋值
                this.value = val;
                if (val <= 1) {
                    reduce.innerHTML = '';
                }
                else {
                    reduce.innerHTML = '-';
                }
                getSubTotal(tr);
                getTotal();
            }
        }
        deleteAll.onclick = function () {
            // 如果等于0就什么都不做
            if (selectedTotal.innerHTML != '0') {
                var conf = confirm('Are you sure？');
                if (conf) {
                    for (var i = 0; i < tr.length; i++) {
                        var input = tr[i].getElementsByTagName('input')[0];
                        if (input.checked) {
                            tr[i].parentNode.removeChild(tr[i]);
                            // 删除数组时候当第一个元素被删除接下来的元素会前移然后被漏掉，用i--控制序号；
                            i--;
                        }
                    }
                }
            }
        }
        // 进入页面默认全选
        checkAllInputs[0].checked = true;
        checkAllInputs[0].onclick();

}