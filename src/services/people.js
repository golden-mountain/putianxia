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
    let queryString = '', parentName = '';
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

    queryString = `(son.名 contains '${newName}' or son.字 contains '${newName}' or son.号 contains '${newName}' or son.又 contains '${newName}' )`;
    if (parentName) {
      queryString = `(${queryString} AND (parent.名 contains '${parentName}' or parent.字 contains '${parentName}' or parent.号 contains '${parentName}' OR parent.又 CONTAINS '${parentName}'))`;
    }

    queries.push(queryString);
    return newName;
  });
  const opts = {
    query: `match (son:Person:李)-[:RELATION]->(parent) where ${queries.join(' or ')} return id(parent) as parentId, parent.名, id(son) as sonId, son.名`
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

export function getCoupleInfoById(id) {
  const opts = {
    query: `match (wife)-[:RELATION{role: 'wife'}]->(current)  where id(current)=${id} or id(wife)=${id} return current, wife`
  };
  return request.cypherPost(opts);
}

export function getParentsById(id) {
  const opts = {
    query: `match (current)-[:RELATION{role: 'son'}]->(father)<-[:RELATION{role: 'wife'}]->(mather) where id(current)=${id} return father, mather`
  };
  return request.cypherPost(opts);
}
[
  '排',
  '排行',
  v => {
    return v || '长';
  }
], //     return `第${v}代`; //   v => { //   '世代', //   'level', // [
//   }
// ],
['祧', '兼祧'], ['名', '名字'], ['讳', '讳名'], ['字', '字号'], ['号', '名号'], [
  '生',
  '生日',
  v => {
    if (info.日) {
      return `${v}(${dateFormat(info.日)})`;
    } else {
      return v;
    }
  }
], [
  '殁',
  '过世',
  v => {
    if (info.死) {
      return `${v}(${dateFormat(info.死)})`;
    } else {
      return v;
    }
  }
], ['坟', '坟地'], ['学', '学历'], ['事', '事迹'];
// for show my parents, myself info
export function getCurrentInfo(id) {
  const opts = {
    query: `match (current)-[r:RELATION]-(related)<-[:RELATION*0..1{role:'wife'}]-(mother)
    where id(current)=${id}
    return
    properties(current), id(current) as currentId,
    {名:related.名,  id: id(related), 排: related.排},
    {名:mother.名,  id: id(mother)},
    r`
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
  const clearMybind = {
    query: `MATCH (o) WHERE o.wx='${wx}'  SET o.wx='';`
  };
  return request.cypherPost(clearMybind).then(() => {
    const opts = {
      query: ` MATCH (n:Person:李)-->(p:Person:李) WHERE id(n)=${id} SET n.wx='${wx}' RETURN n,p;`
      // query: `MATCH (n:Person:李)-->(p:Person:李) WHERE id(n)=${id} SET n.wx='${wx}' RETURN n;`
    };
    return request.cypherPost(opts);
  });
}

export function updatePeopleInfo(info, id = 0) {
  const { relationType, selectedSearchPeople } = info;
  if (relationType) {
    delete info.relationType;
  }
  if (selectedSearchPeople) {
    delete info.selectedSearchPeople;
  }

  let segs = Object.entries(info).map(entry => {
    let [key, value] = entry;
    if (typeof value === 'string') {
      return `n.${key}='${value}'`;
    } else {
      return `n.${key}=${value}`;
    }
  });
  // console.log(segs);
  const updates = segs.join(',');
  let opts = null;
  if (id) {
    opts = {
      query: `MATCH (n) WHERE id(n)=${id} SET ${updates} RETURN n;`
    };
  } else {
    // opts = {
    //   query: `MATCH (p:Person) WHERE id(p)=${selectedSearchPeople}
    //           CREATE (n:Person:李{${updates}})-[:RELATION{role:'${relationType}'}]->(p) return n,p`
    // };
    opts = {
      query: `MATCH (p:Person) WHERE id(p)=${selectedSearchPeople}
              CREATE (n:Person:李) SET ${updates}
              CREATE (n)-[:RELATION{role:'${relationType}'}]->(p) return n,p`
    };
  }
  // console.log(opts);
  return request.cypherPost(opts);
}

export function getMyRoots(id) {
  // console.log(relationType, firstNode, relation, laterNode);
  const opts = {
    query: `MATCH  (p)-[:RELATION*0..]->(n)  WHERE id(p)=${id} return n.名, id(n) as id, n.字, n.又, n.号, n.学, n.日, n.死`
  };
  return request.cypherPost(opts);
}

export function getMyChildren(id) {
  // console.log(relationType, firstNode, relation, laterNode);
  const opts = {
    query: `MATCH (son:Person)-[sr:RELATION*0..]->(parent:Person) WHERE ID(parent)=${id} RETURN ID(son) as sonId, son.名`
  };
  return request.cypherPost(opts);
}

export function getMyCreatedNodes(id) {
  // console.log(relationType, firstNode, relation, laterNode);
  const opts = {
    query: `MATCH (p) WHERE p.owner=${id}  return id(p) as id, p.verified, p.名, p.日, p.死`
  };
  return request.cypherPost(opts);
}

export function deletePeople(id) {
  // console.log(relationType, firstNode, relation, laterNode);
  const opts = {
    query: `MATCH (p) WHERE id(p)=${id} OPTIONAL MATCH (p)-[r:RELATION]-()  delete p,r`
  };
  return request.cypherPost(opts);
}
