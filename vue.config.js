
const path = require('path')
function resolve(dir){
	return path.join(__dirname,dir);
}
//vue项目脚手架工具执行的配置项
module.exports = {
	//配置本地服务的正向代理
	devServer : {
		proxy: {
			'/api' : {
				// 本地服务器
				target : "http://192.168.220.1:9090",
				// 云服务器
				// target : "http://39.108.9.155",
				changeOrigin : true
			}
		}
	},
	//对脚手架工具使用webpack进行配置
	chainWebpack : (config)=>{
		config.resolve.alias
			.set('@views',resolve('src/views'))
			.set('@components',resolve('src/components'))
	}
}