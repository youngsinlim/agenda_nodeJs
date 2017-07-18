class EventManager {
  constructor() {
    this.urlBase = "events"
    this.obtenerDataInicial()
    this.inicializarFormulario()
    this.guardarEvento()
    this.cerrarSesion()
  }

  obtenerDataInicial() {
    let url = this.urlBase + "/all"
    $.get(url, (response) => {
      this.inicializarCalendario(response)
    })
  }

  eliminarEvento(evento) {
    let eventId = evento.eventId
    $.post('/events/delete/' + eventId, {
      id: eventId
    }, (response) => {
      alert(response)
      window.location.href = "http://localhost:3000/main.html"
    })
  }

  guardarEvento() {
    $('.addButton').on('click', (ev) => {
      ev.preventDefault()
      let nombre = $('#titulo').val(),
        start = $('#start_date').val(),
        title = $('#titulo').val(),
        end = '',
        start_hour = '',
        end_hour = '';

      if (!$('#allDay').is(':checked')) {
        end = $('#end_date').val()
        start_hour = $('#start_hour').val()
        end_hour = $('#end_hour').val()
        start = start + 'T' + start_hour
        end = end + 'T' + end_hour
      }
      let url = this.urlBase + "/new"
      if (title != "" && start != "") {
        let ev = {
          title: title,
          start: start,
          start_hour: start_hour,
          end: end,
          end_hour: end_hour
        }
        $.post(url, ev, (response) => {
          alert(response)
        })
        $('.calendario').fullCalendar('renderEvent', ev)
      } else {
        alert("Complete los campos obligatorios para el evento")
      }
    })
  }

  cerrarSesion() {
    $('#logout_div').on('click', (ev) => {
      ev.preventDefault()
      let url = this.urlBase + "/logout"
      $.post(url, "", (response) => {
        if (response == "Adios!") {
          console.log("Sesion destruida con exito!")
          window.location.href = "http://localhost:3000/index.html"
        } else {
          alert(response)
        }
      })

    })
  }

  inicializarFormulario() {
    $('#start_date, #titulo, #end_date').val('');
    $('#start_date, #end_date').datepicker({
      dateFormat: "yy-mm-dd"
    });
    $('.timepicker').timepicker({
      timeFormat: 'HH:mm:ss',
      interval: 30,
      minTime: '5',
      maxTime: '23:59:59',
      defaultTime: '',
      startTime: '5:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });
    $('#allDay').on('change', function() {
      if (this.checked) {
        $('.timepicker, #end_date').attr("disabled", "disabled")
      } else {
        $('.timepicker, #end_date').removeAttr("disabled")
      }
    })
  }

  inicializarCalendario(eventos) {
    $('.calendario').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,basicDay'
      },
      defaultDate: '2017-07-20',
      navLinks: true,
      editable: true,
      eventLimit: true,
      droppable: true,
      dragRevertDuration: 0,
      timeFormat: 'H:mm',
      eventDrop: (event) => {
        this.actualizarEvento(event)
      },
      events: eventos,
      eventDragStart: (event, jsEvent) => {
        $('.delete').find('img').attr('src', "img/trash-open.png")
        $('.delete').css('background-color', '#a70f19')
      },
      eventDragStop: (event, jsEvent) => {
        var trashEl = $('.delete');
        var ofs = trashEl.offset();
        var x1 = ofs.left;
        var x2 = ofs.left + trashEl.outerWidth(true);
        var y1 = ofs.top;
        var y2 = ofs.top + trashEl.outerHeight(true);
        if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
          jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
          this.eliminarEvento(event)
          $('.calendario').fullCalendar('removeEvents', eventos.id);
        }
      }
    })
  }

  actualizarEvento(fecha) {

    let start = moment(fecha.start).format('YYYY-MM-DD HH:mm:ss'),
      end = moment(fecha.end).format('YYYY-MM-DD HH:mm:ss'),
      id = fecha.eventId,
      title = fecha.title,
      upEvento = {
        eventId: id,
        titulo: title,
        fechaInicio: start,
        fechaFin: end,
      };

    $.post(this.urlBase + '/upEvento', upEvento, (response) => {
      if (response.exito == true) {
        alert('Evento Editado correctamente!')
      } else {
        alert('Intentelo nuevamente')
      }
    })
  }

}

const Manager = new EventManager()
