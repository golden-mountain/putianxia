import wepy from 'wepy';

const header = {
  'content-type': 'application/json'
};

export default {
  // apiHost: 'https://api.lizuoping.xyz',
  apiHost: 'https://www.putianxia.ren/api',
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
