module.exports = {
  apps : [{
    name: 'seat_api',   // 应用名
    script: './bin/www',   // 应用文件位置

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    
    args: '',       // 传递给脚本的参数
    instances: 1,   // 应用启动实例个数
    autorestart: true,
    watch: true, 
    max_memory_restart: '1G',
    merge_logs: true,                 //集群情况下，可以合并日志
    env: {
      PM2_SERVE_PATH: "./apidoc",    //静态服务路径
      PM2_SERVE_PORT: 8080,          //静态服务器访问端口
      NODE_ENV: 'development'        //启动默认模式 pm2 start ecosystem.config.js
    },
    env_production: {
      NODE_ENV: 'production'  //使用production模式 pm2 start ecosystem.config.js --env production
    },
    "ignore_watch": [         // 不用监听的文件
      "node_modules",
      // "logs"
    ],
    // "error_file":"./logs/err.log",            //错误输出日志
    // "out_file":"./logs/out.log",              //日志
    // "log_date_format":"YYYY-MM-DD HH:mm Z"    //日期格式
  }],

  deploy: {
    // production: {
    //   user: 'node',                      //ssh 用户
    //   host: '212.83.163.1',              //ssh 地址
    //   ref: 'origin/master',              //GIT远程/分支
    //   repo: 'git@github.com:repo.git',   //git地址
    //   path: '/var/www/production',       //服务器文件路径
    //   "post-deploy": 'npm install && pm2 reload ecosystem.config.js --env production'  //部署后的动作
    // }
  }
};
