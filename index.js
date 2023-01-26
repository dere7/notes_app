const app = require('./app')
const { PORT } = require('./utils/config')
const http = require('http')
const logger = require('./utils/logger')

http.createServer(app).listen(PORT, () => logger.info(`Server is running on port ${PORT}`))