const jsonschema = require('jsonschema')
const schema = require('../schemas/bookSchema.json')
const ExpressError = require('../expressError')

function validate(req, res, next){

  const result = jsonschema.validate(req.body, schema)

  if(!result.valid){
    const errors = result.errors.map(e => e.stack)
    next(errors)
  } 

  next()
}


module.exports = validate