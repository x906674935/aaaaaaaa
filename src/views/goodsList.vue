<template>
  <div id="app">
    <div class="xie_head">
        <span class = "active">商品</span>
        <span>评价</span>
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
                    <div v-for="(items,index) in items.foods" :key = "index" class="listInfo" > 
                        <div class="imgbox">
                            <img :src="'http://elm.cangdu.org/img/'+ items.image_path">
                        </div>
                        <div class="imgAsideBox">
                            <span class = "iab_span_name">{{items.name}}</span>
                            <span class = "iab_span_description">{{items.description}}</span>
                            <span class = "iab_span_tips">{{items.tips}}</span>
                            <span class = "iab_span_price">￥{{items.specfoods[0].price}}
                            
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import BS from "better-scroll"
export default {
    data(){
        return {
            goodsListInfo : {},
            choose:0
        }
    },
    computed: {
        category(){
            return this.goodsListInfo.data
        }
    },
    mounted() {
        this.getInfo();
        this.scroll=new BS(".goodsList",{click:true,probeType:3});
        this.scroll.on('scroll',({y})=>{
            for(let i = 0,j = this.getHeight().length;i<j;i++){
                if(this.getHeight()[i]<-y && -y<= this.getHeight()[i+1]){
                    this.choose = i;
                    break;
                }
            }
        })
        
    },
    methods: {
        Anchorpoint(index){
            this.choose = index;
            this.scroll.scrollToElement(this.$refs[index][0]);
        },
        getHeight(){
            let calculationHeight = [];
            for (const key in this.$refs) {
                calculationHeight.push(this.$refs[key][0].offsetTop)
            }
            return calculationHeight;
        },
        getInfo(){
          this.$axios.get('https://elm.cangdu.org/shopping/v2/menu?restaurant_id=3269').then((res)=>{
              console.log(res);
              this.goodsListInfo = res;
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
        .listInfo{
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
</style>
