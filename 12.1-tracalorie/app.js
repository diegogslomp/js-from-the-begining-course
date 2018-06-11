// Item Controller
const ItemCtrl = ((id, name, calories) => {
  // Item Constructor
  const Item = () => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  console.log("ItemCTRLemmm");

})();

// UI Controller
const UICtrl = (() => {
})();

// Storage Controller
const StorageCtrl = (() => {
})();

// App Controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
})(ItemCtrl, UICtrl, StorageCtrl);

