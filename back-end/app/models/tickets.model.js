const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TicketsSchema = mongoose.Schema(
  {
    ID: Number,

    Nombre: {
      type: String,
    },

    Descripcion: {
      type: String,
    },

    Importancia: String,

    Usuario: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

TicketsSchema.plugin(mongoosePaginate)
TicketsSchema.index({
  ID: 'text',

  Nombre: 'text',

  Descripcion: 'text',

  Importancia: 'text',

  Usuario: 'text',
})

const myModel = (module.exports = mongoose.model('Tickets', TicketsSchema, 'tickets'))
myModel.schema = TicketsSchema
