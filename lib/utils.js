exports.getOwnProps = function getOwnProps (thing) {
  var result = []
  var key

  try {
    for (key in thing) {
      if (thing.hasOwnProperty(key)) {
        result.push(key)
      }
    }
  } catch (e) { /* silently fail */ }

  return result
}

exports.promisify = function promisify (parent, key) {
  return function () {
    var args = Array.prototype.slice.call(arguments)

    return new Promise(function (resolve, reject) {
      parent[key].apply(
        parent,
        // callback
        args.concat(function (error, result) {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      )
    })
  }
}