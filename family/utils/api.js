const url = name => `https://family.kindlenote.org/api/${name}`;

function getData(resource) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url(resource),
      method: 'get',
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

function postData(resource, params) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url(resource),
      method: 'post',
      data: params,
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
  getData,
  postData,
}