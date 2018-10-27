export function formatSearchedResult(data) {
  // build wifes
  const buildWifes = n => {
    if (!n[1].data.妻) {
      n[1].data.妻 = [];
    }
    for (var i in data) {
      const v = data[i];
      if (v[4] && v[4].end === n[1].self && v[3].data) {
        const finded = n[1].data.妻.find(q => {
          return q[0] === v[3].data[0];
        });
        if (!finded) {
          v[3].data.id = v[3].metadata.id;
          n[1].data.妻.push(v[3].data);
        }
      }
    }
  };
  // console.log(data);
  // find child nodes
  const childNodes = [];
  const groups = {};
  data.forEach(n => {
    const finded = childNodes.find(v => {
      return v.self === n[1].self;
    });
    if (n[2].length === 0 && !finded) {
      childNodes.push(n[1]);
      buildWifes(n);
      n[1].data.id = n[1].metadata.id;
      groups[n[1].self] = [n[1].data];
    }
  });
  // console.log(childNodes);
  // find parents
  const buildParents = (n, root) => {
    // find relations to find it's parent
    let parentNode = null;
    for (var i in data) {
      const v = data[i];
      if (v[2].length) {
        const node = v[2].find(p => p.start === n.self);
        if (node) {
          parentNode = v;
          break;
        }
      }
    }
    // console.log(parentNode);
    if (parentNode) {
      parentNode[1].data.id = parentNode[1].metadata.id;
      groups[root.self].push(parentNode[1].data);
      buildWifes(parentNode);
      buildParents(parentNode[1], root);
    }
  };
  childNodes.forEach(n => {
    buildParents(n, n);
  });

  // reverse and set level
  let newGroups = {};
  for (var k in groups) {
    let group = groups[k];
    const [son, father] = group;
    let groupName;
    if (father) {
      groupName = `${father[0]} > ${son.名}`;
    } else {
      groupName = `${son.名}`;
    }
    newGroups[groupName] = group.reverse().map((v, i) => {
      v.level = i + 1;
      return v;
    });
  }
  // console.log(groups);
  return newGroups;
}

/**
 *
 * Return
 * {
 *     names: '作平，作苏',
 *     contents: '两代前你们共祖父', '你们是亲兄妹', '李作平', '良係次子, 1982年生,xxxx年殁, 大学生, 现在北京'
 * }
 * n.名, id(n) as id, n.字, n.又, n.号, n.学, n.日, n.死
 */
export function formatSelectedPeople(selectedPeople) {
  const [people1, people2] = selectedPeople;
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

export function formatChildren(data) {
  const results = [];
  data.forEach(v => {
    const [{ data: relation }, { data: people }] = v;
    people.role = relation.role;
    results.push(people);
  });
  return results;
}
