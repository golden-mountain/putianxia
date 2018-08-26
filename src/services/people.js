import request from '../configs/request';
console.log(request);
export function searchByName(name) {
  return request.post('/db/data/cypher', 'MATCH (n)  RETURN n LIMIT 6');
}
