# mmf-blog vuejs 2.0 jsx语法 leancloud api版

demo: [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

react: [https://github.com/lincenying/mmf-blog-react](https://github.com/lincenying/mmf-blog-react)

vue1: [https://github.com/lincenying/mmf-blog-vue](https://github.com/lincenying/mmf-blog-vue)

vue2-template: [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2-jsx: [https://github.com/lincenying/mmf-blog-vue2-jsx](https://github.com/lincenying/mmf-blog-vue2-jsx)

vue2-jsx leancloud-api: [https://github.com/lincenying/mmf-blog-vue2-jsx-lc](https://github.com/lincenying/mmf-blog-vue2-jsx-lc)

vue2-template 服务端渲染: [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr) // 未完成

---
1. 到 https://leancloud.cn 申请一个帐号
2. 创建一个 应用
3. 获取 App Key 和 Master Key
4. 修改 ./src/api/index.js 下的下面两行
```
var APP_ID = 'M1SivUjmGWHTFDv6FpwYxTpl-gzGzoHsz'
var APP_KEY = 'OwVDXgMCR09ztWdUIYGqG5Hl'
```
```
// 安装依赖
npm install

// 利用DllPlugin打包依赖库 (当src/vendors.js里的依赖库没有更新, 则不需要重复执行该命令)
npm run dll

// 生产环境
npm run build

// 开发环境
npm run dev
```

首页
http://localhost:8080

登录
http://localhost:8080/login.html
