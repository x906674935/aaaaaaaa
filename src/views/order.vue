<template>
    <div class="order">
        <div class="head">
            <span> back </span>
            <span>确认订单</span>
            <span> 我 </span>
        </div>
        <div class="address">

        </div>
        <div class="pay">

        </div>
        <div class="orderDetail">

        </div>
        <div class="confirm">

        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.order{
    position: fixed;
    .top(0);
    .bottom(0);
    .w(375);
    .head{
        .h(46);
        .w(375);
        display: flex;
        justify-content: space-around;
        background: #3190E8;
        .l_h(46);
    }

}
</style>
