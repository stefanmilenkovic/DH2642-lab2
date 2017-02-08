var DishDesriptionView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    this._elements.backToSelectDishButton.click(function () {
        _this._model.setCurrentView(2);
    });

    this.show = function(){
        this._elements.dishDescriptionViewElement.show();
    };

    this.hide = function(){
        this._elements.dishDescriptionViewElement.hide();
    }

};