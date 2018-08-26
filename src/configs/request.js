import wepy from 'wepy';

export default {
  apiHost: 'https://api.lizuoping.xyz',
  request(url, query = {}, method = 'GET') {
    return wepy.request({
      url: this.apiHost + url,
      method,
      data: {
        query,
        resultDataContents: ['row', 'graph']
      },
      header: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpOkNlOS1LY0otY3pULVBNOA=='
      }
    });
  },
  post(url, query = {}) {
    return this.request(url, query, 'POST');
  },
  get(url, query = {}) {
    return this.request(url, query, 'GET');
  },
  delete(url, query = {}) {
    return this.request(url, query, 'DELETE');
  }
};
