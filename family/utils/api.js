
const url = name => `https://family.kindlenote.org/api/${name}`;

const token = {
  userInfo: {},
  clientInfo: {},
};

const _header = {
  'accept': 'application/json',
};

function getClientToken() {
  const _this = this;
  wx.request({
    url: url('oauth/token'),
    method: 'post',
    data: {
      grant_type: 'client_credentials',
      client_id: 1,
      client_secret: 'zw9mRPRvTbyQk2kOkkrV63PxB7CciIvfXEk7LwxK'
    },
    success: function(res) {
      token.clientInfo = res.data;
    }
  })
}

function getUserToken(code) {
  wx.request({
    url: url('wechat/oauth'),
    method: 'post',
    data: {
      code: code,
    },
    header: {
      'authorization': token.clientInfo.access_token,
      'accept': 'application/json',
    },
    success: function(res) {
      token.userInfo = res.data;
    }
  })
}

function getData(resource) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url(resource),
      method: 'get',
      header: {
        'authorization': token.clientInfo.access_token,
        'accept': 'application/json',
      },
      success: function(res) {
        console.log(res);
        resolve(res);
      },
      fail: function(res) {
        console.log(res);
        reject(res);
      },
    })
  })
}

function postData(resource, params, header) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url(resource),
      method: 'post',
      data: params,
      header: {
        'authorization': token.clientInfo.access_token,
        'accept': 'application/json',
      },
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        reject(res);
      },
    })
  })
}

module.exports = {
  getClientToken,
  getUserToken,
  getData,
  postData,
}