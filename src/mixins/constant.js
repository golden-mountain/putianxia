export const genders = ['男', '女'];
export const relations = {
  son: '儿子',
  daughter: '女儿',
  // father: '父亲',
  wife: '妻子',
  hasband: '丈夫'
};

export const degrees = [
  '无学历',
  '小学',
  '初中',
  '高中',
  '大专',
  '本科',
  '研究生',
  '博士生',
  '博士后',
  '监生(太学)',
  '童生',
  '秀才',
  '举人',
  '贡士',
  '进士'
];

export function getAavatar(role, img = '') {
  if (img) {
    return img;
  }

  if (role === 'son' || role === 'father') {
    return 'man';
  } else {
    return 'lady';
  }
}
