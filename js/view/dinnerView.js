var DinnerView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    this.show = function(){
        _this._elements.dinnerViewElement.show();
    };

    this.hide = function(){
        _this._elements.dinnerViewElement.hide();
    };

    this._elements.showStartPageViewButton.click(function () {
        _this._model.setCurrentView(1);
    });


};