module.exports = {
  asyncForEach: async function(array, callback) {
    // eslint-disable-next-line
    for (let index = 0; index < array.length; index++) {
      // eslint-disable-next-line
      await callback(array[index], index, array)
    }
  }
}