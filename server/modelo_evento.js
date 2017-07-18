//mongoose
const ose = require('mongoose')

//schema
const Chema = ose.Schema

let EventSchema = new Chema({
  eventId: {
    type: Number,
    required: true,
    unique: true
  },
  usuarioId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  start_hour: {
    type: String,
    required: false
  },
  end: {
    type: String,
    required: false
  },
  end_hour: {
    type: String,
    required: false
  },
})

let EventModel = ose.model('Evento', EventSchema)

module.exports = EventModel;
