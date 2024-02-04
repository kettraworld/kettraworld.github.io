
export function query(url, parameter) {
  const query = new URLSearchParams(new URL(url).search);
  return query.get(parameter) 
};