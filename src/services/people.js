import request from '../configs/request';

export function getSamples() {
  const opts = {
    query: 'MATCH (n)  RETURN n LIMIT 6'
  };
  return request.post(opts);
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

    if (newName[0] === '李') {
      newName = newName.substr(1);
    }

    queryString = `(son.名='${newName}' OR son.字='${newName}' OR son.号='${newName}' OR son.又='${newName}' )`;
    if (parentName) {
      queryString = `(${queryString} AND (parent.名='${parentName}' OR parent.字='${parentName}' OR parent.号='${parentName}' OR parent.又='${parentName}'))`;
    }

    queries.push(queryString);
    return newName;
  });
  const opts = {
    query: `MATCH (son:Person)-[:RELATION*0..{role:"son"}]->(parent:Person)<-[:RELATION {role: "wife"}]-(wife:Person) WHERE ${queries.join(' OR ')} RETURN distinct son, parent, wife `
  };
  console.log(opts);

  return request.post(opts);
}
