var choo = require('choo')

// NOTE: Initialize choo
var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')('/service-worker.js'))
}

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload()
  })
}

app.use(require('./stores/chat'))
app.use(require('./stores/ui'))

app.route('/', require('./views/main'))
app.route('/cables', require('./views/cables'))
app.route('/*', require('./views/404'))

// NOTE: start app
module.exports = app.mount('body')
