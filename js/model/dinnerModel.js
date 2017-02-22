//DinnerModel Object constructor
var DinnerModel = function() {
 
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	this.numberOfGuests = 1;
	this.numberOfGuestsUpdated = new Observer(this);
    this.viewChanged = new Observer(this);
    this.dishMenuUpdated = new Observer(this);
    this.currentView = 1;
    this.currentDishId = -1;
    this.dishFilterKeywords = "";
    this.dishFilterType = "";
    this.dishesInMenu = [];

    this.loadedDishes = [];
    this.dishListPageSize = 100;
    this.currentDishListIndex = 0;

    this.resetDishList = function () {
        this.loadedDishes = [];
        this.dishListPageSize = 100;
        this.currentDishListIndex = 0;
    };

    this.setDishFilterKeywords = function(newDishFilterKeywords){
    	this.dishFilterKeywords = newDishFilterKeywords;
	};

    this.getDishFilterKeywords = function(){
    	return this.dishFilterKeywords;
	};

    this.setDishFilterType = function(newDishFilterType){
        this.dishFilterType = newDishFilterType;
    };

    this.getDishFilterType = function(){
        return this.dishFilterType;
    };

    this.setCurrentDishId = function (newCurrentDishId) {
        this.currentDishId = newCurrentDishId;
    };

    this.getCurrentDishId = function(){
    	return this.currentDishId;
	};

    this.setCurrentView = function (newCurrentView) {
    	this.currentView = newCurrentView;
		this.viewChanged.notify(this.currentView);
    };

	this.incrementNumberOfGuests = function(){
        this.numberOfGuests += 1;
        this.numberOfGuestsUpdated.notify(this.numberOfGuests);
	};

    this.decrementNumberOfGuests = function(){
        this.numberOfGuests -= 1;
        if(this.numberOfGuests == 0){
        	this.numberOfGuests = 1;
		}
        this.numberOfGuestsUpdated.notify(this.numberOfGuests);
    };

    this.setNumberOfGuests = function(num) {
        this.numberOfGuests = num;
    };

    // should return
    this.getNumberOfGuests = function() {
        return this.numberOfGuests;
    };

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return this.dishesInMenu;
	};

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredientsMap = {};
        for (dishIndex in this.dishesInMenu) {
            for (ingredientIndex in this.dishesInMenu[dishIndex].ingredients) {
            	var ingredient = this.cloneObject(this.dishesInMenu[dishIndex].ingredients[ingredientIndex]);

            	var ingredientInMap = ingredientsMap[ingredient.name];
            	if(ingredientInMap !== undefined){
                    ingredientsMap[ingredient.name].quantity = ingredientInMap.quantity + ingredient.quantity;
                    ingredientsMap[ingredient.name].price = ingredientInMap.price + ingredient.price;
				}
				else{
                    ingredientsMap[ingredient.name] = ingredient;
				}
            }
        }
        return ingredientsMap;
	};

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
        var totalPrice = 0;
        for (dishIndex in this.dishesInMenu) {
            totalPrice += this.getDishesPrice(this.dishesInMenu[dishIndex]);
        }
        return totalPrice;
	};

	this.getDishesPrice = function(dish){
		var totalPrice = 0;
        for (ingredientIndex in dish.ingredients) {
      		totalPrice += dish.ingredients[ingredientIndex].price;
        }
        return totalPrice * this.getNumberOfGuests();
	};

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dish = this.getDish(id);
		//Add only if dish not already in the menu
        if(this.getDishFromMenu(id) === undefined){
        	this.dishesInMenu.push(dish);
		}
		console.log("Menu now: "+JSON.stringify(this.dishesInMenu));
        this.dishMenuUpdated.notify(this.dishesInMenu);
	};

	this.getDishFromMenu = function(id){
        for(key in this.dishesInMenu){
            if(this.dishesInMenu[key].id == id) {
                return this.dishesInMenu[key];
            }
        }
        return undefined;
	};

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var foundDishIndex = undefined;
        for(key in this.dishesInMenu) {
            if (foundDishIndex == undefined && this.dishesInMenu[key].id == id) {
                foundDishIndex = key;
            }
        }
        this.dishesInMenu.splice(foundDishIndex, 1);
        this.dishMenuUpdated.notify(this.dishesInMenu);
	};

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishesWithFiltering = function (type,filter) {
	  return dishes.filter(function(dish) {
		var found = true;
		if(filter && filter !== ""){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.toLowerCase().indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.toLowerCase().indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return found && (type == "all" || dish.type == type);
	  });	
	};

    this.getAllDishesOld = function(){
        return dishes;
	};

	//function that returns a dish of specific ID
	this.getDish = function (id) {
		var dishesLocal = this.getAllDishes();
		for(key in dishesLocal){
			if(dishesLocal[key].id == id) {
				return dishesLocal[key];
			}
		}
	};

	this.cloneObject = function(object){
		return JSON.parse(JSON.stringify(object));
	};

    this.getAllDishes = function(type, filter, callback){

        setTimeout(function(){

            callback(dishes);
        }, 1000);
    };


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'tpe':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
