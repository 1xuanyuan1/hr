/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @param  {[type]} sort    排序
 * @return {[type]}         [description]
 */
exports.list = (req, res, mongoDB, where = {}, sort) => {
  sort = sort || '-_id'
  var limit = req.query.limit
  var page = req.query.page
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 20
  var skip = (page - 1) * limit
  Promise.all([
    mongoDB.find(where).sort(sort).skip(skip).limit(limit).exec(),
    mongoDB.find(where).countAsync()
  ]).then(result => {
    var total = result[1]
    var totalPage = Math.ceil(total / limit)
    var json = {
      code: 200,
      data: {
        list: result[0],
        total,
        hasNext: totalPage > page ? 1 : 0,
        hasPrev: page > 1 ? 1 : 0
      }
    }
    res.json(json)
  }).catch(err => {
    res.json({
      code: -200,
      message: err.toString()
    })
  })
}

/**
 * 通用单个
 * @method item
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
exports.item = (req, res, mongoDB) => {
  var id = req.query.id
  if (!id) {
    res.json({
      code: -200,
      message: '参数错误'
    })
  }
  mongoDB.findOneAsync({ _id: id }).then(result => {
    res.json({
      code: 200,
      data: result
    })
  }).catch(err => {
    res.json({
      code: -200,
      message: err.toString()
    })
  })
}

/**
 * 通用添加
 * @method insert
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
exports.insert = (req, res, mongoDB) => {
  mongoDB.createAsync(req.body).then((result) => {
    res.json({
      code: 200,
      message: '添加成功',
      data: result._id
    })
  })
}
