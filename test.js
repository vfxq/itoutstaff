function isEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function transform(list, offset) {
  // console.log('transform', list, offset);
  if (offset === 0) {
    return list;
  }
  // console.log('list', list.length);
  // console.log('offset', offset);

  if (list.length < offset) {
    const count = offset % list.length;
    return transform(list, count);
  }

  const head = list.slice(0, offset);
  const tail = list.slice(offset, list.length);

  // console.log('head', head);
  // console.log('tail', tail);
  const result = [...tail, ...head];

  console.log('result', result);
  return result; // TODO: implement
}

console.log(isEqual(transform([1, 2, 3, 4, 5], 0), [1, 2, 3, 4, 5]));
console.log(isEqual(transform([1, 2, 3, 4, 5], 2), [3, 4, 5, 1, 2]));
console.log(isEqual(transform([1, 2, 3, 4, 5], 3), [4, 5, 1, 2, 3]));
console.log(isEqual(transform([1, 2, 3, 4, 5], 6), [2, 3, 4, 5, 1]));
// console.log(isEqual(transform([1, 2, 3, 4, 5], -1), [5, 1, 2, 3, 4]));
console.log(isEqual(transform([1, 2, 3, 4, 5], 4), [5, 1, 2, 3, 4]));
// console.log('-----------------------------------------------------');
