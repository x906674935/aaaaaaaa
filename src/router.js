import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Search from 'views/search';
import Detail from 'views/detail';
export default new Router({
  routes: [
    {
      path : '/search',
      component : Search
    },
    {
      path : '/detail',
      component : Detail
    }
  ]
})
