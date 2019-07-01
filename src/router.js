import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Search from 'views/search';
import goodsList from 'views/goodsList';
import Detail from 'views/detail';
import Order from 'views/order';
import ChooseLike from 'views/chooseLike';
export default new Router({
  routes: [
    {
      path : '/goodsList',
      component : goodsList,
      children:[
        {
          path : 'detail',
          component : Detail
        },
        {
          path : 'order',
          component : Order,
          children:[
            {
              
          path : 'chooselike',
          component : ChooseLike
        
            }
          ]
        },
        
      ]
    },
    {
      path : '/search',
      component : Search
    },
    
  ]
})
