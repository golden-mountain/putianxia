import wepy from 'wepy';

export default {
  apiHost: 'https://api.lizuoping.xyz',
  request({ method, url, query, params }) {
    url = url || '/db/data/cypher';
    return wepy.request({
      url: this.apiHost + url,
      method,
      data: {
        query,
        resultDataContents: ['row', 'graph'],
        params
      },
      header: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpOkNlOS1LY0otY3pULVBNOA=='
      }
    });
  },
  post(opts) {
    opts.method = 'POST';
    return this.request(opts);
  },
  get(opts) {
    opts.method = 'GET';
    return this.request(opts);
  },
  delete(opts) {
    opts.method = 'DELETE';
    return this.request(opts);
  }
};
