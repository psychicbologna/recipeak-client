const categoryList = {
  mealtime: [
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'snack'
  ],
  diet: [
    'vegetarian',
    'vegan'
  ]
}

function optionMap(optgroup) {
  optgroup.map(option => {
    return `<option value="${option}">${option}</option>`
  }
  );
}

function categorySelect() {
  
  return (
    <select>
      categoryList.map(Object.keys(optgroup[i]) => {
        <optgroup label="${optgroup}">
          ${optionMap(optgroup)}
    </select>
    );
    });
  }
  
module.exports = {
        categorySelect
      }