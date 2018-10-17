import request from '../configs/request';

export function getSamples() {
  const opts = {
    query: 'MATCH (n)  RETURN n LIMIT 6'
  };
  return request.cypherPost(opts);
}

export function searchByNames(originNames) {
  // if (originNames.length > 2) {
  //   originNames = originNames.slice(0, 2);
  // }

  let queries = [];
  originNames.forEach(name => {
    let newName = name.replace(' ', '');
    let queryString = '',
      parentName = '';
    if (newName.indexOf('>') > -1) {
      let newNames = newName.split('>');
      if (newNames.length >= 2) {
        parentName = newNames[newNames.length - 2];
        newName = newNames[newNames.length - 1];
      }
    }

    // only support 李 current
    if (newName[0] === '李') {
      newName = newName.substr(1);
    }

    queryString = `(son.名 CONTAINS '${newName}' OR son.字 CONTAINS '${newName}' OR son.号 CONTAINS '${newName}' OR son.又 CONTAINS '${newName}' )`;
    if (parentName) {
      queryString = `(${queryString} AND (parent.名 CONTAINS '${parentName}' OR parent.字 CONTAINS '${parentName}' OR parent.号 CONTAINS '${parentName}' OR parent.又 CONTAINS '${parentName}'))`;
    }

    queries.push(queryString);
    return newName;
  });
  const opts = {
    query: `MATCH (son:Person)-[sr:RELATION*0..]->(parent:Person)
              WHERE ${queries.join(' OR ')}
            OPTIONAL MATCH (wife:Person)-[wr:RELATION]->(parent)
              WHERE wr.role IN ['wife']
            RETURN distinct son, parent, sr, wife, wr`
  };
  // console.log(opts);

  return request.cypherPost(opts);
}

export function getChildren(id) {
  const opts = {
    query: `MATCH (n:Person)<-[r:RELATION]-(p:Person)  WHERE id(n)=${id} AND r.role IN ['daughter', 'son'] RETURN r, p`
  };
  return request.cypherPost(opts);
}

export function getInfoById(id) {
  const opts = {
    query: `MATCH (n:Person) WHERE id(n)=${id} RETURN n, id(n) as id `
  };
  return request.cypherPost(opts);
}

export function getInfoByWxId(wxID) {
  const opts = {
    query: `MATCH (n:Person) WHERE n.wx='${wxID}' RETURN n, id(n) as id`
  };
  return request.cypherPost(opts);
}

export function updateMyWeixin(id, wx) {
  // console.log('id:', id, 'wx:', wx);
  const opts = {
    query: ` MATCH (o) WHERE o is not null and o.wx='${wx}' MATCH (n:Person:李)-->(p:Person:李) WHERE id(n)=${id} SET o.wx='', n.wx='${wx}' RETURN n,p;`
  };
  // console.log(opts);
  return request.cypherPost(opts);
}

export function updatePeopleInfo(info, id = 0) {
  // console.log('id:', id, 'info:', info);
  const { relationType, selectedSearchPeople } = info;
  if (relationType) {
    delete info.relationType;
  }
  if (selectedSearchPeople) {
    delete info.selectedSearchPeople;
  }

  let segs = Object.entries(info).map(entry => {
    let [key, value] = entry;
    return `n.${key}='${value}'`;
  });
  // console.log(segs);
  const updates = segs.join(',');
  let opts = null;
  if (id) {
    opts = {
      query: `MATCH (n) WHERE id(n)=${id} SET ${updates} RETURN n;`
    };
  } else {
    // ['父亲', '儿子', '女儿', '妻子', '丈夫']
    // only support relations are: son, wife, daughter
    let firstNode = '';
    let laterNode = '';
    let relation = '';
    switch (relationType) {
      case '父亲':
        firstNode = 'p';
        relation = 'son';
        laterNode = 'n';
        break;
      case '儿子':
        firstNode = 'n';
        relation = 'son';
        laterNode = 'p';
        break;
      case '女儿':
        firstNode = 'n';
        relation = 'daughter';
        laterNode = 'p';
        break;
      case '妻子':
        firstNode = 'n';
        relation = 'wife';
        laterNode = 'p';
        break;
      case '丈夫':
        firstNode = 'p';
        relation = 'wife';
        laterNode = 'n';
        break;
    }
    // console.log(relationType, firstNode, relation, laterNode);
    opts = {
      query: `MATCH (p:Person) WHERE id(p)=${selectedSearchPeople} CREATE (n:Person:李) SET ${updates} CREATE (${firstNode})-[:RELATION{role:'${relation}'}]->(${laterNode}) return n,p`
    };
  }
  console.log(opts);
  return request.cypherPost(opts);
}
