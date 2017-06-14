# adonis-rest
基于AdonisJs的Restful API基础构件， AdonisJs中文网： [https://adonis-china.org](https://adonis-china.org)

## 安装

1. `cnpm install --save adonis-crud-api`


## 准备
Tips: 请确保你的`/app/Model/`目录里有一些模型文件.  如果没有的话可以用 `./ace make:model News` 来创建一个新闻模型

> /app/Http/routes.js
``` javascript
Route.put('/api/:resource', 'RestController.update') //可选
Route.resource('/api/:resource', 'RestController')
```

> Create `/app/Http/Controllers/RestController.js`

``` javascript
'use strict'

const BaseRestController = require('adonis-crud-api')

class RestController  extends BaseRestController{

}

module.exports = RestController
```
