var upload = require('../util/upload')
module.exports = (app) => {
    upload(app, '/api/upload', './static/upload/')
}
