//StartView Object constructor
var StartView = function (model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    this._elements.showStartDinnerViewButton.click(function () {
        _this._model.setCurrentView(2);
    });

    this.show = function(){
        $("#start-page-view").show();
    };

    this.hide = function(){
        $("#start-page-view").hide();
    };

};

