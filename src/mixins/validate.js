import wepy from 'wepy';

export default class validateMixin extends wepy.mixin {
  validateKeywords(keywords) {
    if (keywords.length < 1) {
      console.log(keywords, 'is validating');
      return {
        title: '提示',
        confirmText: '了解',
        content: '必须要输入至少一个名字！',
        showCancel: false
      };
    }

    // '搜索关键字的格式可以是 父亲名>儿子名 或 名字A,名字B 或 单个名字'
    return false;
  }
}
