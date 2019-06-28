const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports={
    // devServer:{
    //     port:3000,
    //     proxy : {
    //         '/serve' : {
    //             target:'http://47.95.207.1:3000',
    //             changeOrigin:true,
    //             pathRewrite : {
    //                 '^/serve':''
    //             }
    //         }
    //     }
    // },
    //起别名    第一个参数  别名  第二个参数  绝对路径
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('style',resolve('./src/common/style'))
        .set('components',resolve('./src/components'))
        .set('views',resolve('./src/views'))
        .set('config',resolve('./src/config'))
        .set('utils',resolve('./src/common/utils'))
    }
}