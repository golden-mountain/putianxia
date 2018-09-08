import wepy from 'wepy';

const header = {
  'content-type': 'application/json',
  Authorization: 'Basic YXBpOkNlOS1LY0otY3pULVBNOA=='
};

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
        ...params
      },
      header
    });
  },
  cypherPost(opts) {
    opts.method = 'POST';
    return this.request(opts);
  },
  cypherGet(opts) {
    opts.method = 'GET';
    return this.request(opts);
  },
  cypherDelete(opts) {
    opts.method = 'DELETE';
    return this.request(opts);
  },
  get(url) {
    return wepy.request({
      url: this.apiHost + url,
      method: 'GET',
      header
    });
  }
};
