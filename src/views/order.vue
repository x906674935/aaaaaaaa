<template>
    <div class="order">
        <div class="head">
            <span @click="back"> back </span>
            <span>确认订单</span>
            <span> 我 </span>
        </div>
        <div class="address">
           <p>{{address.city}}</p>
           <p>{{address.door}}</p>  
                
           
        </div>
        <div class="arrive">
            <div>
                送达时间
            </div>
            <div class="arriveTime">
                <p>尽快送达 | 预计{{arriveTime}}</p>
                <p class="fengniao">蜂鸟专送</p>
            </div>
        </div>
        <div class="pay">
            <p>
                <span>支付方式</span>
                <span>在线支付 ></span>
            </p>
            <p>
                <span>红包</span>
                <span>暂时只在饿了么APP中支持</span>
            </p>
        </div>
        <div class="orderDetailBox">
            <ul>
                <li class="restuarantName">{{shopid}}</li>
                <li class="goodsName" v-for="(item,index) of goodname"
                    :key="index"
                >
                    <span class="goodname">{{goodname[index]}}</span>
                    <span class="goodnum">× {{goodnum[index]}}</span>
                    <span class="goodprice">￥{{goodprice[index]}}</span>
                </li>
            </ul>
            <p>
                <span>订单￥{{totalprice}}</span>
                <span class="p_price">待支付￥{{totalprice}}</span>
            </p>
            <div class="orderNote">
                <span>订单备注</span>
                <span @click="chooseLike">口味、偏好等 ></span>
            </div>
        </div>
        <div class="confirm">
            <span class="waitpay">待支付 ￥{{totalprice}}</span>
            <span @click="confirmpay" class="confirmpay">确认下单</span>
        </div>
    </div>
</template>
<script>
import BS from 'better-scroll';
import Storage from 'config/localStorage';
import Axios from 'axios';
export default {
    data() {
        return {
            shopid : 3269,
            allData : [],
            arriveTime :'',
            goods : {},
            restuarant : '',
            goodname : [],
            goodnum : [],
            goodprice : [],
            totalprice : 0,
            address : {}
        }
    },
    methods: {
        confirmpay(){
            alert('下单成功')
            Storage.remove(this.shopid)
        },
        back(){
            this.$router.go(-1)
        },
        chooseLike(){
            console.log(1)
            this.$router.push('/chooselike')
        },
        getaddr(){
            this.address = Storage.get('site');
            
        },
        getGoods(){
            this.goods = Storage.get(this.shopid)
            console.log(this.goods)
        },
        goodsDetails(){
            for (const key in this.goods) {
                this.goodname.push(key)
                for (const i in this.goods[key]) {
                    this.goodnum.push(this.goods[key][i])
                    this.totalprice += i*this.goods[key][i]
                    this.goodprice.push(i*this.goods[key][i])
                }
            }
            
        },
        initAllData(){
            // this.goods = Storage.get(goods)
            //https://elm.cangdu.org/shopping/restaurants?latitude=39.894048&longitude=116.462918&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=
            Axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopid}`)
            .then((res)=>{
                console.log(res)
                this.allData = res;
            })
        },
        getTime(){
            let time = new Date().getTime() + 40*60*1000;
            let time1 = new Date(time)
            let a = time1.getHours()
            let b = time1.getMinutes()
            this.arriveTime = `${a}:${b}`
        }
    },
    mounted() {
        new BS('.orderDetailBox',{click:true})
        this.getTime()
        this.initAllData()
        Storage.set(3269,{1231:{20:1},12221:{20:2},'were':{20:1}})
        Storage.set('site',{"city":"北京科技职业技术学院","door":"13012345678"} )
        this.getGoods()
        this.goodsDetails()
        this.getaddr()
    },

}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.order{
    background: #f5f5f5;
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
    .address{
        background: #fff;
        .h(80);
        .w(375);
        p{
            .padding(0,10,0,10);
            .f_s(14);
            .h(40);
            .l_h(40);
        }
        

    }
    .arrive{
        border-left: 3px solid #3190E8;
        background: #fff;
        .h(80);
        .w(375);
        .margin(8,0,8,0);
        display: flex;
        .f_s(18);
        justify-content: space-between;
        div{
            .margin(0,10,0,10);
            .h(80);
            .l_h(80);
        }
        .arriveTime{
            align-items: flex-end;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .f_s(12);
            color: #3190E8;
            p{
                .h(40);
                .l_h(40);
            }
            // .fengniao{
            //     background: #3190E8;
            //     color: #fff;
            // }
        }
    }
    .pay{
        background: #fff;
        .h(80);
        .w(375);
        .margin(8,0,8,0);
        p{
            .h(40);
            .l_h(40);
            .f_s(14);
            color: #222;
            display: flex;
            justify-content: space-between;
            span{
                .margin(0,10,0,10)
            }
        }
    }
    .orderDetailBox{
        background: #fff;
        .h(300);
        .w(375);
        
        overflow: hidden;
        .restuarantName{
            .h(40);
            .l_h(40);
            .w(375);
            border-bottom: 1px solid gray;
            .f_s(18);
            padding-left: 10px;
            margin-bottom: 10px;
        }
        .goodsName{
            .h(30);
            .l_h(30);
            .w(355);
            .f_s(14);
            .padding(0,10,0,10);
            display: flex;
            justify-content: space-between;
            .goodname{
                .w(200)
            }
            .goodprice{
                color:orange;
            }
        }
        p{
            .h(40);
            .w(355);
            .padding(0,10,0,10);
            display: flex;
            justify-content: space-between;
            .f_s(16);
            .l_h(40);
            .p_price{
                color:orange;
            }
        }
        .orderNote{
            .h(30);
            .w(355);
            .padding(0,10,0,10);
            .f_s(14);
            .l_h(30);
            display: flex;
            justify-content: space-between;
            color:#333;
        }
    }
    .confirm{
        position: fixed;
        .bottom(0);
        .h(60);
        .w(365);
        background: #333;
        .l_h(60);
        .padding(0,0,0,10);
        .f_s(18);
        display: flex;
        justify-content: space-between;
        color: #fff;
        
        .confirmpay{
            .w(120);
            background: green;
            text-align: center;
         
        }
    }
}
</style>
