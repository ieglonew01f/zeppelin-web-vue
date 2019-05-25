let websocketCalls = {}
let ticket = {}

export default {
  methods: {
    getWebSocketObject: function () {
      return websocketCalls
    },
    getPort: function () {
      let port = Number(location.port - 1)
      if (!port) {
        port = 80
        if (location.protocol === 'https:') {
          port = 443
        }
      }
      if (port === 3333 || port === 9000) {
        port = 8080
      }
      return port
    },
    getWebsocketUrl: function () {
      let wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
      return wsProtocol + '//' + location.hostname + ':' + this.getWSPort() + '/ws'
    },
    getRestApiBase: function () {
      return location.protocol + '//' + location.hostname + ':' + this.getPort() + '/api'
    },
    getRestBase: function () {
      return location.protocol + '//' + location.hostname + ':' + this.getPort()
    },
    skipTrailingSlash: function (path) {
      return path.replace(/\/$/, '')
    },
    getWSPort: function () {
      if (location.hostname.includes('qubole')) {
        if (location.protocol === 'https:') {
          return 443
        }
      }
      return this.getPort()
    },
    auth: function () {
      let _this = this
      fetch(this.getRestApiBase() + '/security/ticket')
        .then(function (response) {
          return response.json()
        })
        .then(function (response) {
          console.log(JSON.stringify(response.body))
          _this.initWebSockets(response.body)
        })
    },
    initWebSockets: function (data) {
      let ws = new WebSocket(this.getWebsocketUrl())
      let _this = this
      ticket = data

      websocketCalls.ws = ws
      websocketCalls.ws.reconnectIfNotNormalClose = true

      websocketCalls.sendNewEvent = function (data) {
        if (ticket !== undefined) {
          data.principal = ticket.principal
          data.ticket = ticket.ticket
          data.roles = ticket.roles
        } else {
          data.principal = ''
          data.ticket = ''
          data.roles = ''
        }
        console.log('Send >> %o, %o, %o, %o, %o', data.op, data.principal, data.ticket, data.roles, data)
        websocketCalls.ws.send(JSON.stringify(data))
      }

      ws.onopen = function () {
        console.log('Websocket created')

        setInterval(function () {
          websocketCalls.sendNewEvent({op: 'PING'})
        }, 10000)

        if (!_this.$route.params.id) {
          return
        }

        websocketCalls.sendNewEvent({
          op: 'GET_NOTE',
          data: {
            id: _this.$route.params.id
          }
        })
      }

      ws.onmessage = function (evt) {
        let payload

        if (event.data) {
          payload = JSON.parse(event.data)
        }

        console.log('Receive << %o, %o', payload.op, payload)

        let op = payload.op
        let data = payload.data

        switch (op) {
          case 'NOTE':
            _this.$store.dispatch('setNotebookContent', data)
            break
          case 'PARAGRAPH':
            _this.$store.dispatch('setParagraph', data)
            break
          case 'PARAGRAPH_ADDED':
            _this.$store.dispatch('setParagraph', data)
            break
          case 'INTERPRETER_STATUS':
            console.log(data)
            break
        }
      }
    }
  }
}
