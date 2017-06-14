# adonis-crud-api
CRUD restful api for [AdonisJs](http://www.adonisjs.com/) and [Adminify](https://github.com/wxs77577/adminify), the key is the `grid` and `form` routes.  Based on [Adonis Rest](https://github.com/wxs77577/adonis-rest)

### Welcome to [https://adonis-china.org](https://adonis-china.org)

## [中文文档](README_CN.md)

## Screenshots

### Grid
![file](https://adonis-china.org/uploads/post-body-1497455501361.png)

### Form
![file](https://adonis-china.org/uploads/post-body-1497455572312.png)

## Install

1. `npm install --save adonis-crud-api`

## Prepare

### Add routes to your `/app/Http/routes.js` 
``` javascript
Route.put('/api/:resource', 'CrudController.update') //optional
Route.get('/api/:resource/grid', 'CrudController.grid') //the grid configurations for the list grid view
Route.get('/api/:resource/form', 'CrudController.form') //the form configurations for create
Route.get('/api/:resource/:id/form', 'CrudController.form') // the form configurations for edit
Route.resource('/api/:resource', 'CrudController') //CRUD for resources
Route.resource('/api/:parent/:parentId/:resource', 'CrudController') //CRUD for netsted resource (In Progress...)
```
### Create `/app/Http/Controllers/CrudController.js`

``` javascript
'use strict'

const BaseRestController = require('adonis-crud-api')

class CrudController  extends BaseRestController{

}

module.exports = CrudController
```

## That's all

## Routes
- Please check [Adonis Rest](https://github.com/wxs77577/adonis-rest) for basic CRUD routes
- `/api/:resource/grid` Get grid configurations for [Adminify](https://github.com/wxs77577/adminify) or your own frontend frameworks.
- `/api/:resource/form` Get form configurations for [Adminify](https://github.com/wxs77577/adminify) or your own frontend frameworks.