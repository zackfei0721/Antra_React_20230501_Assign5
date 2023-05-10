

// Model
const model = {
  items:[
    { name: "apple", category: "fruit"},
    { name: "Cucumber", category: "vegetable"},
    { name: "Banana", category: "fruit"},
    { name: "Celery", category: "vegetable"},
    { name: "orange", category: "fruit"},
    { name: "sausage", category: "meat"},
    { name: "bacon", category: "meat"}
  ],
  defaultCategoryItems: {
    "fruit": "apple",
    "vegetable": "Cucumber",
    "meat": "bacon"
  }};
  
  // Controller
  const controller = {
    init: function() {
      view.init();
    },

    getCategories: function() {
      const categories = new Set();
      model.items.forEach(item => categories.add(item.category));
      return [...categories];
    },

    getItemsByCategory: function(category) {
      return model.items.filter(item => item.category === category);
    },

    getDefaultItem: function(category) {
      return model.defaultCategoryItems[category];
    }
  };

  // View
  const view = {
    init: function() {
      this.categorySelector = document.getElementById('category-selector');
      this.itemSelector = document.getElementById('item-selector');
      this.itemHeader = document.getElementById('header');

      const categories = controller.getCategories();
      categories.forEach(category => {
        const option = document.createElement('option');
        option.text = category;
        this.categorySelector.add(option);
      });
      this.populateItems(controller.getDefaultItem(this.categorySelector.value));

      // Event listeners
      this.categorySelector.addEventListener('change', (e) => {
        this.populateItems(controller.getDefaultItem(e.target.value));
      });

      this.itemSelector.addEventListener('change', (e) => {
        this.itemHeader.textContent = "Item selected: " + e.target.value;
      });
    },

    populateItems: function(defaultItem) {
      const items = controller.getItemsByCategory(this.categorySelector.value);
      this.itemSelector.innerHTML = '';

      items.forEach(item => {
        const option = document.createElement('option');
        option.text = item.name;
        this.itemSelector.add(option);
      });

      // if nothing is selected yet, header should display something
      if(defaultItem) {
        this.itemSelector.value = defaultItem;
        this.itemHeader.textContent = "Item selected: " + defaultItem;
      }
      else {
        this.itemHeader.textContent = 'Select an item';
      }
    }
  };

  window.onload = function() {
    controller.init();
  }
