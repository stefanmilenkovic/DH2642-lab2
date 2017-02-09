var DishDesriptionView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    this.confirmDishButtonClicked = new Observer(this);

    this._elements.backToSelectDishButton.click(function () {
        _this._model.setCurrentView(2);
    });

    this.show = function(){
        this._elements.dishDescriptionViewElement.show();
        this.buildDescription();
    };

    this.hide = function(){
        this._elements.dishDescriptionViewElement.hide();
    };

    //On click of the confirm dish button, notify controller that dish is added
    this._elements.descriptionConfirmDishButton.click(function () {
        _this.confirmDishButtonClicked.notify();
    });

    this.buildDescription = function(){
        var dish = _this._model.getDish(_this._model.getCurrentDishId());
        console.log("Selected dish: "+JSON.stringify(dish));
        _this._elements.descriptionTitle.text(dish.name);
        _this._elements.descriptionImage.attr("src", "images/" + dish.image);
        _this._elements.descriptionText.text(dish.description);

        var descriptionIngredientsList = this._elements.descriptionIngredientsList;
        descriptionIngredientsList.html('');
        for (ingredientIndex in dish.ingredients) {
            console.log("Ing: "+JSON.stringify(dish.ingredients[ingredientIndex]));
            var ingredient = dish.ingredients[ingredientIndex];
            var ingredientQuantityTotal = (ingredient.quantity * _this._model.getNumberOfGuests()).toFixed(1);
            var ingredientPriceTotal = ingredient.price * _this._model.getNumberOfGuests();
            var ingredientHtml =
                "<li class='row'>" +
                    "<div class='col-md-2'>"+ingredientQuantityTotal+" " +ingredient.unit +"</div>" +
                    "<div class='col-md-6'>"+ingredient.name+"</div>" +
                    "<div class='col-md-2'>"+ingredientPriceTotal+"</div>" +
                    "<div class='col-md-2'>SEK</div>" +
                "</li>";
            descriptionIngredientsList.append(ingredientHtml);
        }
        _this._elements.descriptionDishPrice.text(_this._model.getDishesPrice(dish));
        _this._elements.descriptionIngredientsTitle.text("Ingredients for "+_this._model.getNumberOfGuests()+" people");
    };

    this._model.numberOfGuestsUpdated.attach(function () {
        _this.buildDescription();
    });
};