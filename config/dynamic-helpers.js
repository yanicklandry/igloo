
// # dynamic helpers

module.exports = function(req, res, next) {
  res.locals.req = req
  res.locals.messages = {
    success: req.flash('success'),
    error: req.flash('error'),
    info: req.flash('info'),
    warning: req.flash('warning')
  }
  next()
}
