// Item Controller
const ItemCtrl = ((id, name, calories) => {
  // Item Constructor
  const Item = () => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200},
      { id: 1, name: 'Cookie', calories: 400},
      { id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    logData: () => {
      return data;
    }
  }

})();

// UI Controller
const UICtrl = (() => {
})();

// Storage Controller
const StorageCtrl = (() => {
})();

// App Controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
  // Public methods
  return {
    init: () => {
      console.log('Initializing App...');
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();

