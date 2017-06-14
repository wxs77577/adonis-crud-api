'use strict'

const inflect = require('i')()
const BaseRestController = require('adonis-rest')
const Database = use('Database')

// class RestfulController {
class RestController extends BaseRestController {

  get config() {
    return Object.assign({}, super.config, {
      grid: {
        sort: '-id', //or '-id' for desc
        create: true, //show create button
        update: true, //show update button
        delete: true //show delete button
      },
      index: {
        pagination: true,
        // hidden: 'updated_at',
        // extra: 'body',
        // expand: 'user',
      },
      detail: {
        // expand: 'user'
      }
    })
  }

  * columns(table) {
    const data = {}
    const columns = yield Database.table(table).columnInfo()
    const types = {
      int: 'number',
      varchar: 'text',
      char: 'text',
      text: 'textarea',
      timestamp: 'datetime',
    }
    for (let name in columns) {
      let field = columns[name]
      let type = field.type
      type = types[type] ? types[type] : type
      data[name] = {
        value: name,
        text: inflect.titleize(name),
        label: inflect.titleize(name),
        required: !field.nullable,
        maxLenth: field.maxLenth,
        dataType: field.type,
        type: type,
      }
    }
    return data
  }

  * filter(request, response) {
    yield this.prepare(request)
    let columns = yield this.columns(this.Model.table)
    let model = {}
    let rules = {}
    let fields = {}
    let i = 0
    for (let name in columns) {
      if (++i > 3) {
        break;
      }
      fields[name] = columns[name]
      fields[name].required = false
      model[name] = ''
    }
    
    return {
      model,
      fields,
      rules
    }
  }

  * grid(request, response) {
    yield this.prepare(request)
    let columns = Object.values(yield this.columns(this.Model.table))
    columns = columns.filter(v => {
      return v.dataType !== 'text'
    })

    let data = {
      columns: columns,
      options: this.config.grid,
      filters: yield this.filter(request, response),
      extra: this.config.index.expand,
    }
    response.json(data)
  }

  * form(request, response) {
    yield this.prepare(request)
    let model = new this.Model
    if (this.id) {
      model = yield this.getInstance(request)
    }
    let fields = yield this.columns(this.Model.table)
    let data = {
      model: model.toJSON(),
      fields: fields,
      rules: model.rules,
      messages: model.messages
    }
    response.json(data)
  }
}

module.exports = RestController
