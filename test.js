const data = [
  {
    id: 1, name: 'John', surname: 'Doe', age: 34,
  },
  {
    id: 2, name: 'John', surname: 'Doe', age: 33,
  },
  {
    id: 3, name: 'John', surname: 'Doe', age: 35,
  },
  {
    id: 4, name: 'Mike', surname: 'Doe', age: 35,
  },
];

function filter(param) {
//   const filterField = Object.keys(param)[0];

//   return (data) => data.filter((item) => {
//     return item[filterField] === param[filterField]
//   })
}

function sort(param) {
  //   const filterField = Object.keys(param)[0];

  //   return (data) => data.filter((item) => {
  //     return item[filterField] === param[filterField]
  //   })
}

function query(...functions) {
  return (data) => {
    console.log('functions', functions);
    return data;
  };
}

// console.log('query', query()(data));
const ids = query(
  filter({ name: 'John' }),
  filter({ surname: 'Doe' }),
  sort('age'),
)(data).map((u) => u.id);

console.log(ids);
