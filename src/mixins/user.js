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
      'level',
      '世代',
      v => {
        return `第${v}代`;
      }
    ],
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
