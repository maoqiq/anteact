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

export const adList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  success: true,
  'data': {
    totalCount: Random.integer(10, 100),
    totalPage: Random.integer(1, 5),
    'list|1-20': [{
      id: Random.word(10),
      name: Random.word(10),
      appName: Random.word(8),
      adSpecId: Random.integer(1, 8),
      adSpecName: Random.word(4),
      mediaId: Random.integer(1, 8),
      shieldId: Random.integer(1, 8),
      shieldName: Random.word(8),
      status: Random.range(1)[0],
      updateTime: Random.date('yyyy-MM-dd'),
    }]
  }
})

export const shieldList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  success: true,
  'data': {
    totalCount: Random.integer(10, 100),
    totalPage: Random.integer(1, 5),
    'list|1-20': [{
      id: Random.word(10),
      title: Random.word(10),
      shieldIndustryIds: Random.integer(1, 8),
      shieldUrls: Random.url('http'),
      createTime: Random.date('yyyy-MM-dd'),

    }]
  }
})


