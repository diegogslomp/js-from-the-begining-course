// Item Controller
const ItemCtrl = ((id, name, calories) => {
  // Item Constructor
  const Item = function(id, name ,calories) {
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

  return {
    // Public methods
    getItems: () => {
      return data.items;
    },

    addItem: (name, calories) => {
      let ID;
      // Create id
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add new item to array
      data.items.push(newItem);

      return newItem;
    },

    logData: () => {
      return data;
    }
  }

})();

// UI Controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn'
  }
  // Public methods
  return {
    populateItemLists: (items) => {
      html = '';
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
                  <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                  <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
                 </li>`
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: () => {
      return UISelectors;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    }
  }
})();

// Storage Controller
const StorageCtrl = (() => {
})();

// App Controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }
  // Add event submit
  const itemAddSubmit = (e) => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    } 
    e.preventDefault();
  }
  // Public methods
  return {
    init: () => {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemLists(items);

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();

