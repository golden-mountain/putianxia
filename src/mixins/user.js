export const formatInfo = info => {
  const dateFormat = v => {
    const newDate = new Date(v);
    let date =
      newDate.getFullYear() +
      '年' +
      (newDate.getMonth() + 1) +
      '月' +
      newDate.getDate() +
      '日';
    return date;
  };
  const orderedMap = [
    [
      '排',
      '排行',
      v => {
        return v || '长';
      }
    ],
    // [
    //   'level',
    //   '世代',
    //   v => {
    //     return `第${v}代`;
    //   }
    // ],
    ['祧', '兼祧'],
    ['名', '名字'],
    ['讳', '讳名'],
    ['字', '字号'],
    ['号', '名号'],
    [
      '生',
      '生日',
      v => {
        if (info.日) {
          return `${v}(${dateFormat(info.日)})`;
        } else {
          return v;
        }
      }
    ],
    [
      '殁',
      '过世',
      v => {
        if (info.死) {
          return `${v}(${dateFormat(info.死)})`;
        } else {
          return v;
        }
      }
    ],
    ['坟', '坟地'],
    ['学', '学历'],
    ['事', '事迹']
  ];
  let values = [];
  orderedMap.forEach(([key, mappedKey, callback]) => {
    if (info[key]) {
      let value = info[key];
      if (typeof callback === 'function') {
        value = callback(value);
      }
      values.push([mappedKey, value]);
    }
  });
  return values;
};

/**
 *
 * Return
 * {
 *     names: '作平，作苏',
 *     contents: '两代前你们共祖父', '你们是亲兄妹', '李作平', '良係次子, 1982年生,xxxx年殁, 大学生, 现在北京'
 * }
 * n.名, id(n) as id, n.字, n.又, n.号, n.学, n.日, n.死
 */
export function compareRelation(people1, people2) {
  let names = '', info = '';
  if (people2) {
    names = `${people1[0]},${people2[0]}`;
    let upLevel = people1.level;
    if (upLevel === 1) {
      info = '兄弟妹关系';
    } else if (upLevel === 2) {
      info = '共一个爷爷';
    } else if (upLevel === 3) {
      info = '共一个太爷爷';
    } else {
      info = `往上数${upLevel}代,你们共一个祖父`;
    }
  } else {
    names = `${people1[0]}`;
    if (people1[2]) {
      names += ` (字${people1[2]})`;
    }
    if (people1[6]) {
      info = `生于${people1[6]}`;
    }
    if (people1[7]) {
      info += ` 殁于${people1[7]}`;
    }
    // if (people1.祧) {
    //   info += ` 兼祧${people1.祧}`;
    // }
    return { info, names };
  }
}
