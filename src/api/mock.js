const Mock = require('mockjs')
const Random = Mock.Random
Mock.setup({
  timeout: '200-600'
})


export const mediaList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  success: true,
  'data': {
    totalCount: Random.integer(10, 100),
    totalPage: Random.integer(1, 5),
    'list|1-20': [{
      id: Random.word(10),
      name: Random.word(10),
      createTime: Random.date('yyyy-MM-dd'),
      appKey: Random.word(20),
      platform: 1,
      platformText: 'H5',
      appSecret: Random.word(20),
      distributorId: Random.boolean(),
      'id|+1': 1,
      status: Random.boolean(),
    }]
  }
})

