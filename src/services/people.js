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
    query: `MATCH (son:Person)-[:RELATION*0..]->(parent:Person)<-[:RELATION {role: "wife"}]-(wife:Person) WHERE ${queries.join(
      ' OR '
    )} RETURN distinct son, parent, wife, count(parent) as total LIMIT 10`
  };
  // console.log(opts);

  return request.post(opts);
}
