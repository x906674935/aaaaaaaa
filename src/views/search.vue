<template>
    <div class="search">
        <div class="top">
            <span class="back" @click="back"><</span>
            <span>搜索</span>
        </div>

        <div class="content">
            <input type="text" placeholder="请输入商家或美食名称" ref="input">
            <span @click="search">提交</span>
        </div>

        <div class="showBox">
            <ul v-if="state">
                <li v-for="(item,index) of restaurantList"
                :key="index"
                @click="goRestaurant(item)"
                >
                    
                        <img :src="imgsrc+item.image_path" alt="">
                        <div>
                            <p>{{item.name}}</p>
                            <p>月售 {{item.recent_order_num}} 单</p>
                            <p>{{item.float_minimum_order_amount}}元起送 / 距离{{item.distance}}</p>
                        </div>
                    
                </li>
            </ul>
            <p v-else class="noresult">
                抱歉！暂无搜索结果
            </p>
            <div v-if="state1" class="searchHistory">
                <p>搜索历史</p>
                <p v-for="(item,index) of history"
                    :key = index
                    @click="search2(item)"
                >{{item}} <span @click="clearHistory"> × </span> </p>
            </div>
        </div>
    </div>
</template>
<script>
import BS from 'better-scroll';
import Axios from 'utils/axios';
import Storage from 'utils/localStorage'
export default {
    data() {
        return {
            allList : [],
            restaurantList : [],
            imgsrc : '//elm.cangdu.org/img/',
            state : true,
            state1 : true,
            history:[],
            id : []
        }
    },
    methods: {
        search2(item){
            this.restaurantList = []
            let value = item;
            let reg = new RegExp(value,'g');
            console.log(reg)
            for (let index = 0; index < this.allList.length; index++) {
                const element = this.allList[index];
                if(reg.test(element.name)){
                    this.restaurantList.push(element)
                }
                
            }
            this.state1 = false;
            console.log( this.restaurantList)
            if( this.restaurantList.length == 0){
                this.state = false;
            }else{
                this.state = true;
            }
            Storage.set('name',value)
        },
        back(){
            this.$router.go(-1);
        },
        goRestaurant(item){
            console.log(item)
            this.$router.push({path : '/goodsList',query:{id:item.id}})
        },
        search(){
            this.restaurantList = []
            let value = this.$refs.input.value;
            let reg = new RegExp(value,'g');
            console.log(reg)
            for (let index = 0; index < this.allList.length; index++) {
                const element = this.allList[index];
                if(reg.test(element.name)){
                    this.restaurantList.push(element)
                }
                
            }
            this.state1 = false;
            console.log( this.restaurantList)
            if( this.restaurantList.length == 0){
                this.state = false;
            }else{
                this.state = true;
            }
            Storage.set('name',value)
        },
        initListData(){
            Axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762')
            .then((res)=>{
                console.log(res)
                this.allList = res;
            })
        },
        getHistory(){
            this.history.push(Storage.get('name'))
        }
    },
    computed: {
        history(){
            
        }
    },
    mounted() {
        new BS('.showBox',{click:true})
        this.initListData()
        this.getHistory()
    },
}
</script>
<style lang="less" scoped>
    @import '~style/index.less';
    .search{
        position: fixed;
        .w(375);
        .top(0);
        .bottom(0);
        .top{
            display: flex;
            .w(375);
            .h(46);
            background:#3190E8;
            justify-content: center;
            .f_s(20);
            .l_h(46);
            color: #fff;
            position: relative;
            .back{
                position: absolute;
                .left(5);
            }
        }
        .content{
            background: #fff;
            .h(35);
            .w(375);
            .padding(11,11,11,11);
            display: flex;
            input{
                .w(258);
                .h(35);
                .padding(0,6,0,6);
                background: #f2f2f2;
                border:0;
            }
            span{
                .w(65);
                .h(35);
                .margin(0,0,0,5);
                .padding(0,6,0,6);
                background: #3190E8;
                .f_s(14);
                .l_h(35);
                text-align: center;
                color: #fff;
            }
        }
        .showBox{
            position: fixed;
            .top(103);
            .bottom(46);
            .w(375);
            overflow: hidden;
            li{
                border-bottom: 1px solid gray;
                .padding(12,12,12,12);
                display: flex;
                .h(76);
                .w(351);
                .f_s(12);
                img{
                    .w(40);
                    .h(40);
                    .margin(0,6,0,0)
                }
                div{
                    .w(306);
                    .h(70);
                    p{
                        .h(20)
                    }
                    border-bottom: 1px solid gray;
                }
            }
            .noresult{
                .h(40);
                .w(375);
                .f_s(16);
                text-align: center;
                .l_h(40);
                color: #333;
            }
            .searchHistory{
                .h(46);
                .w(370);
                .l_h(46);
                .f_s(14);
                .padding(0,0,0,5)
            }
        }
    }
</style>
