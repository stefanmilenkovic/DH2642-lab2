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

    this.showLoadingDish = function(){

    };

    this.dishSuccess = function(dish){
        console.log("Selected dish: "+JSON.stringify(dish));

        _this._elements.descriptionTitle.text(dish.title);
        _this._elements.descriptionPreparationText.text(dish.instructions);
        _this._elements.descriptionImage.attr("src", dish.image);
        //_this._elements.descriptionText.text(dish.description);

        var descriptionIngredientsList = _this._elements.descriptionIngredientsList;
        descriptionIngredientsList.html('');
        for (ingredientIndex in dish.extendedIngredients) {
            console.log("Ing: "+JSON.stringify(dish.extendedIngredients[ingredientIndex]));
            var ingredient = dish.extendedIngredients[ingredientIndex];
            var ingredientQuantityTotal = (ingredient.amount * _this._model.getNumberOfGuests()).toFixed(1);
            var ingredientPriceTotal = "N/A";
            var ingredientHtml =
                "<li class='row'>" +
                "<div class='col-md-2'>"+ingredientQuantityTotal+" " +ingredient.unit +"</div>" +
                "<div class='col-md-6'>"+ingredient.name+"</div>" +
                "<div class='col-md-2'>"+ingredientPriceTotal+"</div>" +
                "<div class='col-md-2'>SEK</div>" +
                "</li>";
            descriptionIngredientsList.append(ingredientHtml);
        }
        _this._elements.descriptionDishPrice.text((dish.pricePerServing * _this._model.getNumberOfGuests()).toFixed(1));
        _this._elements.descriptionIngredientsTitle.text("Ingredients for "+_this._model.getNumberOfGuests()+" people");
    };

    this.dishError = function(error){
        _this.hideLoadingDish();
        var msg = "Error on retrieval of dish list. Message: " + error.responseJSON.message;
        alert(msg);
        _this.showErrorInLoadingDishes(msg);
    };

    this.resetDishDescriptionFields = function () {
        _this._elements.descriptionTitle.text("Loading...");
        _this._elements.descriptionImage.attr("src", "");
        _this._elements.descriptionPreparationText.text("");
        _this._elements.descriptionIngredientsList.html('');
    };

    this.buildDescription = function(){

        _this.resetDishDescriptionFields();

        var dish = _this._model.getDish(
            _this._model.getCurrentDishId(),
            _this.dishSuccess, _this.dishError);
    };

    this._model.numberOfGuestsUpdated.attach(function () {
        _this.buildDescription();
    });
};