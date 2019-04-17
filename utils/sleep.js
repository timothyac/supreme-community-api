module.exports = {
  sleep: function(ms) {
    return new Promise(sleepResolve => {
      setTimeout(sleepResolve, ms)
    })
  }
}