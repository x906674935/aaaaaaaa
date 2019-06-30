<template>
    <div class="chooseLike">
        <div class="head">
            <span>back</span>
            <span>订单备注</span>
            <span>完成</span>
        </div>
        <div class="quickinput">
            <span>不要辣</span>
            <span>多点辣</span>
            <span>不要香菜</span>
            <span>多点醋</span>
            <span>多点葱</span>
            <span>不放葱</span>
            <span>不放葱</span>
        </div>
        <div class="space">
            <textarea>

            </textarea>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.chooseLike{
    position: fixed;
    .top(0);
    .bottom(0);
    .w(375);
    .head{
         .h(46);
        .w(375);
        display: flex;
        justify-content: space-between;
        background: #3190E8;
        .l_h(46);
        .f_s(16);
        color:#fff;
        span{
            .margin(0,10,0,10);
        }
    }
    .quickinput{
        .padding(10,10,10,10);
        display: flex;
        flex-wrap: wrap;
        span{
            .padding(2,2,2,2);
            .margin(5,5,5,5);
            .f_s(14);
            border: 1px solid gray;
        }
    }
    .space{
        .padding(10,10,10,10);
        textarea{
            .w(350);
            .h(100);
        }
    }
}
</style>
