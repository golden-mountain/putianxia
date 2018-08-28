import request from '../configs/request';

export function getSamples() {
  const opts = {
    query: 'MATCH (n)  RETURN n LIMIT 6'
  };
  return request.post(opts);
}

export function searchByNames(names) {
  const opts = {
    query: 'MATCH (son:Person)-[:RELATION*0..{role:"son"}]->(parent:Person)<-[:RELATION {role: "wife"}]-(wife:Person) WHERE son.名 In {names} RETURN distinct son, parent, wife',
    params: {
      names
    }
  };
  return request.post(opts);
}
