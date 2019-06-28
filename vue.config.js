const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
  // devServer:{
  //   port:3000,
  //   proxy:{
  //     '/key':{
  //        target:'http://47.95.207.1:3000',//目标地址
  //        changeOrigin:true,
  //        pathRewrite:{
  //          '^/key':'' 
  //        }
  //     }
  //   }
  // },
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('style',resolve('./src/common/style'))
    .set('utils',resolve('./src/common/utils'))
    .set('components',resolve('./src/components'))
    .set('pages',resolve('./src/pages'))
    .set('swiper',resolve('./node_modules/swiper'))
    .set('views',resolve('./src/views'))
  }
}