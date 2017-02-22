var DinnerFullRecipeView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    //Build graphics for overview
    this.buildFullRecipe = function(){

        var dishesInMenu = _this._model.getFullMenu();

        var fullRecipeList = this._elements.fullRecipeList;
        fullRecipeList.html('');
        var fullRecipeIngredientsList = this._elements.fullRecipeIngredientsList;
        fullRecipeIngredientsList.html('');

        for (dishIndex in dishesInMenu) {
            var dish = _this._model.getDish(dishesInMenu[dishIndex].id);
            console.log("Dish: " + JSON.stringify(dish));

            var dishHtml =
                "<li class='row dish-recipe-row m-b-30'>\n" +
                    "<div class='col-md-2 text-left p-l-30'>" +
                        "<div class='img-wrapper center-block dish-box-click' id='dish-box-"+dish.id+"'>\n" +
                            "<img class='f-w' src='images/"+dish.image+"'>\n" +
                        "</div>\n" +
                    "</div>\n" +
                    "<div class='col-md-4 text-left p-l-30'>" +
                        "<h3 class='m-t-0 text-left overview-header-text'>"+dish.title+"</h3>" +
                        //"<p class='m-t-0 text-left overview-header-text'>"+dish.description+"</p>" +
                    "</div>\n" +
                    "<div class='col-md-6 text-left p-l-30'>" +
                        "<h4 class='m-t-0 text-left overview-header-text'>Preparation</h4>" +
                        "<p class='m-t-0 text-left overview-header-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>" +
                    "</div>\n" +
                "</li>";


            fullRecipeList.append(dishHtml);
        }

        //Build full ingredients list
        var wholeDinnerIngredients =_this._model.getAllIngredients();
        console.log("All ingredients: "+JSON.stringify(wholeDinnerIngredients));

        for (ingredientIndex in wholeDinnerIngredients) {
            var ingredient = wholeDinnerIngredients[ingredientIndex];
            console.log("Ingredient -> : "+JSON.stringify(ingredient));
            var ingredientQuantityTotal = (ingredient.quantity * _this._model.getNumberOfGuests()).toFixed(1);
            var ingredientPriceTotal = ingredient.price * _this._model.getNumberOfGuests();

            var ingredientHtml =
                "<li class='row'>" +
                "<div class='col-md-2'>" + ingredientQuantityTotal +" " +ingredient.unit +"</div>" +
                "<div class='col-md-6'>" + ingredient.name + "</div>" +
                "<div class='col-md-2'>" + ingredientPriceTotal + "</div>" +
                "<div class='col-md-2'>SEK</div>" +
                "</li>";

            fullRecipeIngredientsList.append(ingredientHtml);
        }

        //Set title text
        _this._elements.overviewHeaderText.text("My dinner: "+_this._model.getNumberOfGuests()+" people");
        _this._elements.fullRecipefullIngredientsTitle.text("Ingredients for "+_this._model.getNumberOfGuests()+" people");
        _this._elements.fullRecipeIngredientsTotalPrice.text("Total price for: "+_this._model.getNumberOfGuests()+" people: "+_this._model.getTotalMenuPrice()+" SEK");


    };

    this._model.numberOfGuestsUpdated.attach(function () {
        _this.buildFullRecipe();
    });

    this._elements.goBackAndEditDinnerButton.click(function () {
        _this._model.setCurrentView(2);
    });

    this.show = function(){
        _this._elements.dinnerFullRecipeViewElement.show();
        _this.buildFullRecipe();
    };

    this.hide = function(){
        _this._elements.dinnerFullRecipeViewElement.hide();
    };

};