const Sentry = require('@sentry/node')

function sentryInit(app) {
    Sentry.init({
        dsn: process.env.DSN,
    });

    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.errorHandler())
}
module.exports = sentryInit