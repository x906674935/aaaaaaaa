<template>
  <div id="app">
    <div class="xie_head">
        
        <span class = "active">商品</span>
        <span @click = "discuss">评价</span>
    </div>

    <div class="xie_body">
        <div class="goodsAside">
            <div v-for="(items,index) in category" :key="index" class = "asideName"
                :class="{'active':choose==index}" @click = "Anchorpoint(index)"
            >
                {{items.name}}
            </div>
        </div>
        <div class="goodsList" >
            <div>
                <div v-for="(items,index) in category" :key="index" :ref="index">
                    <p class = "listTitle"><span>{{items.name}}</span>
                        <span class = "listTitleDes">{{items.description}}</span>
                    </p>
                    <div v-for="(items,index) in items.foods" :key = "index" class="listInfo"
                        @click="goDetail(items.item_id)" > 
                        <div class="imgbox">
                            <img :src="'http://elm.cangdu.org/img/'+ items.image_path">
                        </div>
                        <div class="imgAsideBox">
                            <span class = "iab_span_name">{{items.name}}</span>
                            <span class = "iab_span_description">{{items.description}}</span>
                            <span class = "iab_span_tips">{{items.tips}}</span>
                            <span class = "iab_span_price">
                                <span>￥{{items.specfoods[0].price}}</span>
                                <p class = "sga">
                                    <span class = "subtraction" @click.stop="sub($event,items.item_id,items.name,items.specfoods[0].price)">－</span>
                                    <span class = "goodsCount" >0</span>
                                    <span class= "addition"   @click.stop="add($event,items.item_id,items.name,items.specfoods[0].price)" :ref = "items.item_id"
                                    >＋</span>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="xie_cart">
        <div class="cart" @click = "cartToggle">
            车
        </div>
        <div class="allPric">
            <span class = "content">￥<span class = "priceNum" >{{priceAll}}</span></span>
            <span class = "other">另需配送费￥3</span>
        </div>
        <div class="Settlement" @click = "goClear">
            去结算
        </div>
        <div class="cartList" v-show="cartShow">
            <p class = "cartTitle">
                <span class = "title">购物车</span>
                <span class = "clear" @click = "clearCart">清空</span>
            </p>
            <div v-for="(items1,key1,index) in shoppingCart" :key="index" class = "cartFood" 
            v-if = "isShow(items1)">
                <div>{{key1}} </div>
                <div v-for = "(items,key,index) in items1" :key = "index" v-if="key!=='id'" 
                class = "foods" >
                    <span>￥{{key}}</span>
                    <p class = "foodsNum">
                        <span  @click.stop="sub($event,items1.id,key1,key,true)" class = "cartSub">－</span>
                        <span ref = "goodsNum">{{items}}</span>
                        <span @click.stop="add($event,items1.id,key1,key)" class ="cartAdd" 
                        >＋</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import BS from "better-scroll"
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex';
export default {
    data(){
        return {
            goodsListInfo : {},
            choose:0,
            id:null,
            cartShow : false,
            priceAll:0,
            getId : null
            
        }
    },
    computed: {
        category(){
            return this.goodsListInfo
        },
        cartInfo(){
            let obj =  JSON.parse(localStorage.getItem(this.id));
            return obj
        },
        ...mapState({
            shoppingCart:state=>state.ShoppingCart.shoppingCart,
        })
    },
    mounted() {
        this.scroll=new BS(".goodsList",{click:true,probeType:3,bounce:false});
        this.scroll.on('scroll',({y})=>{
            for(let i = 0,j = this.getHeight().length;i<j;i++){
                if(this.getHeight()[i]<-y && -y<= this.getHeight()[i+1]){
                    this.choose = i;
                    break;
                }
            }
        })
        this.getInfo();
        // console.log(this.$refs);
        
    },
    created() {
        this.getId = this.$route.query.id
    },
    methods: {
        ...mapMutations({changeCart : 'ShoppingCart/changeCart'}),
        discuss(){
            alert("此功能模块暂代开发")
        },
        clearCart(){
            alert("该商家不支持清空购物车")
        },
        isShow(obj){
            let key = Object.keys(obj)[0];
            if(obj[key] == 0){
                // console.log(obj[key],'false');
                return false;
            }else{
                // console.log(obj[key],"true")
                return true;
            }
           
        },
        cartToggle(){
            this.cartShow = !this.cartShow;
        },
        goDetail(address){
            this.$router.push({path:"/goodsList/detail",query:{address,shopId:this.id}})
            // console.log(address)
        },
        goClear(){
            if(this.priceAll > 0){
                this.$router.push({path:"/goodsList/order",query:{shopId:this.id}})
            }else{
                alert("请先选择商品后结算")
            }
            
        },
        caculateALLPrice(obj){
            let num = 0;
            for (let key in obj) {
                let id = obj[key].id;
                for(let key1 in obj[key]){
                    if(key1 !== 'id'){
                        if (Number(obj[key][key1]) !== 0){
                            num+=Number(obj[key][key1]) * key1;
                        }
                    }     
                }
            } 
            this.priceAll = num;
        },
        renderList(obj){
            for (let key in obj) {
                let id = obj[key].id;
                for(let key1 in obj[key]){
                    if(key1 !== 'id'){
                        if (Number(obj[key][key1]) !== 0){
                            this.$refs[id][0].previousSibling.innerHTML = obj[key][key1];
                            this.$refs[id][0].previousSibling.style.display = "block";
                            this.$refs[id][0].previousSibling.previousSibling.style.display = "block";
                        }else{
                            this.$refs[id][0].previousSibling.innerHTML = obj[key][key1];
                            this.$refs[id][0].previousSibling.style.display = "none";
                            this.$refs[id][0].previousSibling.previousSibling.style.display = "none";
                        }
                    }     
                }
            } ;   
            this.caculateALLPrice(obj) ;       
        },
        sub(e,id,Fname,price,params){
            
            if(e.target.nextSibling.innerHTML==1){
                if(params){
                    // e.target.parentNode.parentNode.parentNode.style.display = "none";
                }else{
                    e.target.nextSibling.style.display = "none";
                    e.target.style.display = "none"; 
                };  
            }
            e.target.nextSibling.innerHTML--;

            let num = new Object;
            let obj = localStorage.getItem(this.id);
            if(obj){
                let a= JSON.parse(obj);
                for (const key in a) {
                    num[key] = a[key]
                }
            }
            num[Fname]=new Object;
            num[Fname]['id'] = id;
            num[Fname][price] = e.target.nextSibling.innerHTML;
            this.changeCart(num);
            localStorage.setItem(this.id,JSON.stringify(num))
            this.renderList(num);
            this.caculateALLPrice(num) ; 
        },
        add(e,id,Fname,price){
            e.target.previousSibling.style.display = "block";
            e.target.previousSibling.previousSibling.style.display = "block";
            e.target.previousSibling.innerHTML++;
            
            let num = new Object;
            let obj = localStorage.getItem(this.id);
            if(obj){
                let a= JSON.parse(obj);
                for (const key in a) {
                    num[key] = a[key]
                }
            }
            num[Fname]=new Object;
            num[Fname]['id'] = id;
            num[Fname][price] = e.target.previousSibling.innerHTML;
            localStorage.setItem(this.id,JSON.stringify(num));
            this.changeCart(num);
            this.renderList(num);
            this.caculateALLPrice(num) ; 
        },
        Anchorpoint(index){
            this.choose = index;
            this.scroll.scrollToElement(this.$refs[index][0]);
        },
        getHeight(){
            let calculationHeight = [];
            for (const key in this.$refs) {
                let reg = new RegExp(/^\d{1,2}$/);
                if(reg.test(key)){
                    calculationHeight.push(this.$refs[key][0].offsetTop)
                } 
            }
            return calculationHeight;
        },
        getInfo(){
          this.$axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.getId}`).then((res)=>{
            this.goodsListInfo = res;
            // console.log(res);
            if(localStorage.getItem(this.getId)){
                this.changeCart(JSON.parse(localStorage.getItem(this.getId)));
                this.$nextTick(()=>{
                    this.renderList(JSON.parse(localStorage.getItem(this.getId)));
                })
            }else{
                localStorage.setItem(this.getId,'');
            }

            this.id = this.getId;     
      })}
  }
}
</script>

<style lang="less" scoped>
@import url(~style/index.less);
.xie_head{
    position: fixed;
    .top(0);
    .h(50);
    .w(375);
    background:@bg-color-blue;
    display: flex;
    .padding(0,70,0,70);
    justify-content: space-between;
    .f_s(20);
    span{
        .w(40);
        .h(40);
        .padding(10,0,4,0);
        border-bottom:3px solid @bg-color-blue;
    }
    .active{
        color:@font-color-yellow;
        border-color:@font-color-yellow;
    }
}
.xie_body{
    position: fixed;
    .top(50);
    .bottom(0);
    .w(375);
    display: flex;
    justify-content: space-between;
    .goodsList{
        .w(295);
        overflow-y: scroll;
        overflow-x:hidden;
        .listTitle{
            width:100%;
            .h(60);
            background: @bg-color-gray;
            .f_s(16);
            .l_h(60);
            .padding(0,0,0,10);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
                .listTitleDes{
                    .f_s(12);
                    color:gray;
                    .padding(0,0,0,6);
                    
                }
        }
        .listInfo::after{
            content:"";
            position: absolute;
            .top(0);
            .left(0);
            height:100%;
            .w(200);
            background: rgba(255,0,0,0);
        }
        .listInfo{
            position: relative;
            width:100%;
            .padding(11,11,11,11);
            display:flex;
            border-bottom:1px solid @border-color-248;
            .imgbox{
                .w(50);
                .h(50);
                .margin(0,10,0,0);
                img{
                    width:100%;
                    height:100%;
                }
            }
            .imgAsideBox{
                .w(210);
                display:flex;
                flex-direction: column;
                span{
                    .padding(0,0,8,0);
                }
                .iab_span_name{
                    .f_s(16);
                    font-weight: 900;
                }
                .iab_span_description{
                    .f_s(12);
                    color:@font-color-gray;
                }
                .iab_span_tips{
                    .f_s(12);
                }
                .iab_span_price{
                    color:@font-color-orange;
                    .f_s(16);
                    font-weight: 900;
                    display:flex;
                    justify-content: space-between;
                    .sga{
                        display:flex;
                        justify-content: space-between;
                        .l_h(25);
                        text-align: center;
                        color:@bg-color-blue;
                        span{
                            .padding(0,4,0,4);
                        }
                        .goodsCount{
                            .w(24);
                            display: none;
                        }
                        .subtraction{
                            display: none;
                            background: @font-color-gray;
                            border:1px solid ;
                            color:@bg-color-gray;
                        }
                        .addition{
                            background: @bg-color-yellow;
                        }
                        .subtraction,.addition{
                            .w(26);
                            .h(26);
                            border-radius: 50%;
                            .f_s(20);
                        }
                    }
                }
            }
        }
    }
    .goodsAside{
        .w(80);
        .f_s(14);
        overflow-y: scroll;
        overflow-x:hidden;
        .asideName{
            .h(60);
            .l_h(60);
            text-align: center;
            background: @bg-color-gray;
            border-left:3px solid @bg-color-gray;
            border-top:1px solid @border-color-248;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .active{
            border-left-color:@font-color-yellow!important;
            background: white;
            font-weight: 700;
        }
    }
}
.xie_cart{
    position: fixed;
    .bottom(0);
    .w(375);
    .h(60);
    .padding(0,0,0,90);
    background: @bg-color-black;
    display:flex;
    justify-content: space-between;
        .cart{
            position: absolute;
            .w(60);
            .h(60);
            .l_h(60);
            border-radius:50%;
            background: @bg-color-blue;
            z-index:2;
            .left(20);
            .bottom(16);
            text-align: center;
        }
        .allPric{
            display:flex;
            flex-direction:column;
            span{
                .padding(4,0,0,0)
            }
            .content{
                color:@font-color-white;
                .f_s(24);
            }
            .other{
                .f_s(12);
                color:@font-color-whiteO;
            }
        }
        .Settlement{
             .w(100);
             height:100%;
             .l_h(60);
             text-align: center;
             background: @bg-color-PurBlack;  
             color: @font-color-orange;
             .f_s(16);
        }
        .cartList{
            position: absolute;
            .left(0);
            .bottom(60);
            .w(375);
            overflow: scroll;
            height:150px;
            background: white;
            .cartTitle{
                .w(375);
                .h(30);
                .f_s(18);
                .l_h(30);
                background: @bg-color-black;
                .padding(0,10,0,10);
                display: flex;
                justify-content: space-between;
                    .title{
                        .padding(0,0,0,4);
                        .margin(4,0,0,0);
                        .h(20);
                        .l_h(20);
                        font-weight: 900;
                        border-left:3px solid @bg-color-blue;
                    }
                    .clear{
                        color:@font-color-whiteO;
                        .f_s(14);
                    }
            }
            .cartFood{
                display:flex;
                justify-content:space-between;
                .padding(1,4,1,4);
                border-top:1px solid @border-color-248;
                .f_s(18);
                .foods{
                    display:flex;
                    justify-content:space-between;
                    .foodsNum{
                        display:flex;
                        text-align:center;
                        .margin(0,0,0,20);
                        span{
                            .w(20);
                            
                        }
                    }
                }
            }
        }
}
</style>
