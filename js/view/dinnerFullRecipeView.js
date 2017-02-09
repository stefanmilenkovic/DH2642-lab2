var DinnerFullRecipeView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    //Build graphics for overview
    this.buildFullRecipe = function(){

        var dishesInMenu = _this._model.getFullMenu();

        var fullRecipeList = this._elements.fullRecipeList;
        fullRecipeList.html('');

        for (dishIndex in dishesInMenu) {
            var dish = _this._model.getDish(dishesInMenu[dishIndex].id);
            console.log("Dish: " + JSON.stringify(dish));

            var dishHtml =
                "<li class='row dish-recipe-row'>\n" +
                    "<div class='col-md-2 text-left p-l-30'>Image should be here</div>\n" +
                "</li>";

            fullRecipeList.append(dishHtml);
        }

        //Set title text
        _this._elements.overviewHeaderText.text("My dinner: "+_this._model.getNumberOfGuests()+" people");
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