'use strict'

const inflect = require('i')()
const Validator = use('Adonis/Addons/Validator')
const BaseRestController = require('adonis-rest')
const Database = use('Database')

// class RestfulController {
class RestController extends BaseRestController {

  get config () {
    return {
      index: {
        hidden: 'updated_at',
        extra: 'body',
        expand: 'user'
      },
      detail: {
        expand: 'user'
      }
    }
  }

  * columns (table) {
    const data = {}
    const columns = yield Database.table(table).columnInfo()
    const types = {
      int: 'number',
      varchar: 'text',
      char: 'text',
      text: 'textarea'
    }
    for (let name in columns) {
      let field = columns[name]
      let type = field.type
      type = types[type] ? types[type] : type
      data[name] = {
        value: name,
        text: inflect.titleize(name),
        required: !field.nullable,
        maxLenth: field.maxLenth,
        dataType: field.type,
        type: type,
      }
    }
    return data
  }

  * grid(request, response) {
    const singular = inflect.singularize(request.param('resource'))
    // let columns = [
    //   {
    //     text: 'ID',
    //     value: 'id'
    //   }
    // ]
    let columns = Object.values(yield this.columns(request.param('resource')))
    columns = columns.filter(v => {
      return v.dataType !== 'text'
    })
    let data = {
      columns: columns
    }
    response.json(data)
  }

  * form(request, response) {
    const Model = this.resource(request.param('resource'))
    const singular = inflect.singularize(request.param('resource'))

    let model = new Model
    let id
    if (request) {
      id = request.param('id')
      if (id) {
        model = yield this.model.query().where('id', id).first()
      }
    }
    let fields = yield this.columns()
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
