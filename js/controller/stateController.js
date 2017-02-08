var StateController = function (model, startView, dinnerView, dinnerStatusView, dishListView, dishDescriptionView) {
    this._model = model;
    this._startView = startView;
    this._dinnerView = dinnerView;
    this._dinnerStatusView = dinnerStatusView;
    this._dishListView = dishListView;
    this._dishDescriptionView = dishDescriptionView;
    var _this = this;

    model.viewChanged.attach(function () {
        _this.setCorrectView();
    });

    this.setCorrectView = function(){
        if(_this._model.currentView == 1){
            _this._dinnerView.hide();
            _this._dinnerStatusView.hide();
            _this._dishListView.hide();
            _this._dishDescriptionView.hide();
            _this._startView.show();
        }
        else if(_this._model.currentView == 2){
            _this._startView.hide();
            _this._dishDescriptionView.hide();
            _this._dinnerView.show();
            _this._dinnerStatusView.show();
            _this._dishListView.show();
        }
        else if(_this._model.currentView == 3){
            _this._startView.hide();
            _this._dishListView.hide();
            _this._dinnerView.show();
            _this._dinnerStatusView.show();
            _this._dishDescriptionView.show();
        }
    }
}