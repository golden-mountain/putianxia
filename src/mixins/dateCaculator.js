import { cn } from 'nzh';

const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const zhi = {
  子: 23,
  丑: 1,
  寅: 3,
  卯: 5,
  辰: 7,
  巳: 9,
  午: 11,
  未: 13,
  申: 15,
  酉: 17,
  戌: 19,
  亥: 21
};

const generations = {
  洪武: 1368,
  建文: 1399,
  永乐: 1402,
  洪熙: 1425,
  宣德: 1426,
  正统: 1436,
  景泰: 1450,
  天顺: 1457,
  成化: 1465,
  弘治: 1488,
  正德: 1506,
  嘉清: 1522,
  隆庆: 1567,
  万历: 1573,
  泰昌: 1620,
  天启: 1621,
  崇祯: 1628,
  顺治: 1644,
  康熙: 1661,
  雍正: 1722,
  乾隆: 1735,
  嘉庆: 1795,
  道光: 1820,
  咸丰: 1850,
  同治: 1861,
  光绪: 1875,
  宣统: 1908,
  民国: 1912,
  共和: 1949
};

const ganzhi = [
  '甲子',
  '乙丑',
  '丙寅',
  '丁卯',
  '戊辰',
  '己巳',
  '庚午',
  '辛未',
  '壬申',
  '癸酉',
  '甲戌',
  '乙亥',
  '丙子',
  '丁丑',
  '戊寅',
  '己卯',
  '庚辰',
  '辛巳',
  '壬午',
  '癸未',
  '甲申',
  '乙酉',
  '丙戌',
  '丁亥',
  '戊子',
  '己丑',
  '庚寅',
  '辛卯',
  '壬辰',
  '癸巳',
  '甲午',
  '乙未',
  '丙申',
  '丁酉',
  '戊戌',
  '己亥',
  '庚子',
  '辛丑',
  '壬寅',
  '癸卯',
  '甲辰',
  '乙巳',
  '丙午',
  '丁未',
  '戊申',
  '己酉',
  '庚戌',
  '辛亥',
  '壬子',
  '癸丑',
  '甲寅',
  '乙卯',
  '丙辰',
  '丁巳',
  '戊午',
  '己未',
  '庚申',
  '辛酉',
  '壬戌',
  '癸亥'
];

const months = [
  '正',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二'
];

const days = [
  '初一',
  '初二',
  '初三',
  '初四',
  '初五',
  '初六',
  '初七',
  '初八',
  '初九',
  '十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '二十一',
  '二十二',
  '二十三',
  '二十四',
  '二十五',
  '二十六',
  '二十七',
  '二十八',
  '二十九',
  '三十'
];

const years = [
  '元',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '二十一',
  '二十二',
  '二十三',
  '二十四',
  '二十五',
  '二十六',
  '二十七',
  '二十八',
  '二十九',
  '三十',
  '三十一',
  '三十二',
  '三十三',
  '三十四',
  '三十五',
  '三十六',
  '三十七',
  '三十八',
  '三十九',
  '四十',
  '四十一',
  '四十二',
  '四十三',
  '四十四',
  '四十五',
  '四十六',
  '四十七',
  '四十八',
  '四十九',
  '五十',
  '五十一',
  '五十二',
  '五十三',
  '五十四',
  '五十五',
  '五十六',
  '五十七',
  '五十八',
  '五十九',
  '六十',
  '六十一',
  '六十二',
  '六十三',
  '六十四',
  '六十五',
  '六十六',
  '六十七',
  '六十八',
  '六十九',
  '七十',
  '七十一',
  '七十二',
  '七十三',
  '七十四',
  '七十五',
  '七十六',
  '七十七',
  '七十八',
  '七十九',
  '八十',
  '八十一',
  '八十二',
  '八十三',
  '八十四',
  '八十五',
  '八十六',
  '八十七',
  '八十八',
  '八十九',
  '九十',
  '九十一',
  '九十二',
  '九十三',
  '九十四',
  '九十五',
  '九十六',
  '九十七',
  '九十八',
  '九十九'
];

function cacGanZhi(year) {
  let g = (year % 10) - 3,
    z = (year % 12) - 3;
  g = g > 0 ? g : g + 10;
  z = z > 0 ? z : z + 12;

  return gan[gan - 1] + zhi[zhi - 1];
}

function transChineseNumber(num) {
  return cn.decodeS(num.replace('初', '').replace('正', '一'));
}

function caculateYear(year) {
  let yearStart = 0,
    yearName = '',
    originIndex = 0,
    pos = 0,
    nianHao = '';
  Object.entries(generations).forEach(entry => {
    pos = year.indexOf(entry[0]);
    if (pos > -1) {
      nianHao = entry[0];
      yearStart = entry[1];
      yearName = cacGanZhi(yearStart);
      originIndex = ganzhi.indexOf(yearName);
      return yearStart;
    }
  });

  let currentIndex = -1;
  Object.entries(ganzhi).forEach(entry => {
    if (year.indexOf(entry[1]) > -1) {
      currentIndex = entry[0];
      return currentIndex;
    }
  });

  if (currentIndex === -1) {
    let cnYear = year.slice(
      year.indexOf(nianHao) + nianHao.length,
      year.indexOf('年')
    );
    return yearStart + transChineseNumber(cnYear);
  } else {
    let yearGap = currentIndex - originIndex;
    return yearStart + (yearGap >= 0 ? yearGap : yearGap + 60);
  }
}

function cacMonth(date) {
  const month = date.slice(date.indexOf('年') + 1, date.indexOf('月'));

  return transChineseNumber(month);
}

function cacDay(date) {
  const day = date.slice(date.indexOf('月') + 1, date.indexOf('日'));

  return transChineseNumber(day);
}

function cacHour(date) {
  const hour = date.slice(date.indexOf('日') + 1, date.indexOf('时'));
  return zhi[hour] || '0:00';
}

function translateDateTime(date) {
  return (
    caculateYear(date) +
    '/' +
    cacMonth(date) +
    '/' +
    cacDay(date) +
    ' ' +
    cacHour(date)
  );
}

function translateDate(date) {
  return caculateYear(date) + '/' + cacMonth(date) + '/' + cacDay(date);
}

function turnNewDateToOld(newDate) {
  const date = new Date(newDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const valuePairs = Object.entries(generations);
  // console.log(year, month, day, valuePairs);

  // oldYear = 同治
  let oldYear = '',
    oldYearValue = 0;
  valuePairs.forEach((pa, index) => {
    const [key, value] = pa;
    if (year >= value) {
      const nextYear = valuePairs[index + 1];
      if (nextYear) {
        const [nextKey, nextValue] = nextYear;
        if (year < nextValue) {
          oldYear = key;
          oldYearValue = value;
          return true;
        }
        // to the end
        if (index === valuePairs.length - 2) {
          oldYear = nextKey;
          oldYearValue = nextValue;
          return true;
        }
      }
    }
  });

  // oldYearSpace = ‘元’
  let yearIndex = (year % 60) - 4;
  if (yearIndex < 0) {
    yearIndex = 60 + yearIndex;
  }
  let oldYearSpace = ganzhi[yearIndex];
  // if (oldYearValue) {
  //   let gap = (year - oldYearValue) % 60;
  //   if (ganzhi[gap]) {
  //     oldYearSpace = ganzhi[gap];
  //   } else {
  //     oldYearSpace = gap;
  //   }
  // }

  // month
  let oldMonth = months[month] || '';

  // day
  let oldDay = days[day - 1] || '';

  return [oldYear, oldYearSpace, oldMonth, oldDay];
}

function turnTimeToOld(time) {
  let t = parseFloat(time.replace(':', '.'));
  if (t === 0) {
    return '子';
  }

  const valuePairs = Object.entries(zhi);
  let oldTime = '';
  valuePairs.forEach((pa, index) => {
    const [key, value] = pa;
    if (t >= value) {
      const nextTime = valuePairs[index + 1];
      if (nextTime) {
        const [nextKey, nextValue] = nextTime;
        if (t < nextValue) {
          oldTime = key;
          return true;
        }
        // to the end
        if (index === valuePairs.length - 2) {
          oldTime = nextKey;
          return true;
        }
      }
    }
  });
  return oldTime;
}

export default {
  gan,
  zhi,
  ganzhi,
  years,
  months,
  days,
  generations,
  cacGanZhi,
  transChineseNumber,
  caculateYear,
  cacMonth,
  cacDay,
  cacHour,
  translateDate,
  translateDateTime,
  turnNewDateToOld,
  turnTimeToOld
};
