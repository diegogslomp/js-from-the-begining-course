// Item Controller
const ItemCtrl = ((id, name, calories) => {
  // Item Constructor
  const Item = function (id, name ,calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 500},
      { id: 1, name: 'Cookie', calories: 500},
      { id: 2, name: 'Eggs', calories: 500}
    ],
    currentItem: null,
    totalCalories: 1500
  }

  // Public methods
  return {

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
    
    getItemById: (id) => {
      let found = null;
      // Loop through items
      data.items.forEach((item) => {
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: (name, calories) => {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach((item) => {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    getTotalCalories: () => {
      let total = 0;
      data.items.forEach(item => {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;
      // Return total
      return data.totalCalories;
    },

    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
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
    listItems: '#item-list li',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    totalCalories: '.total-calories'
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
    addListItem: (item) => {
      // show ul list to ui
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                  <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      // Add total calories to UI
      UICtrl.showTotalCalories();
      UICtrl.clearInput();
    },
    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn nodelist into array
      listItems = Array.from(listItems);
      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute('id');
        if(itemId === `item-${item.id}`){
          document.getElementById(itemId).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>`;
          UICtrl.clearEditState();
          // Add total calories to UI
          UICtrl.showTotalCalories();
        }
      });
    },
    showTotalCalories:() => {
      document.querySelector(UISelectors.totalCalories).textContent = ItemCtrl.getTotalCalories();
    },

    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
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
    // Remove submit on enter
    document.addEventListener('keypress', disableEnter);
    // Add edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
  }
  // Add event submit
  const itemAddSubmit = (e) => {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to ui list
      UICtrl.addListItem(newItem);
    } 
    e.preventDefault();
  }

  // Item edit click event
  const itemEditClick = (e) => {
    if(e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArray = listId.split('-');
      // Get actual id
      const id = parseInt(listIdArray[1])
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Set item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = (e) => {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // Prevent default behavior
    e.preventDefault();
  }

  // Disable enter event
  const disableEnter = (e) => { 
      // If 'enter' was hitted
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
      }
    }

  // Public methods
  return {
    init: () => {
      // Set initial state for buttons / state
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Check if any items
      if(items.length === 0) {
        // Hide ul from ui
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemLists(items);
      }
      // Update total calories
      UICtrl.showTotalCalories();
      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();

