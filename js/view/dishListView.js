var DishListView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    this.filterButtonClicked = new Observer(this);

    this.showLoadingDishes = function(){
        var dishListElement = _this._elements.dishListBox;
        dishListElement.html('');
        dishListElement.append('<li id="dish-list-box-loading" class="col-md-12">Loading...</li>');
    };

    this.showErrorInLoadingDishes = function(errorMessage){
        var dishListElement = _this._elements.dishListBox;
        dishListElement.html('');
        dishListElement.append('<li id="dish-list-box-loading" class="col-md-12">'+errorMessage+'</li>');
    };

    this.hideLoadingDishes = function(){
        var dishListElement = _this._elements.dishListBox;
        dishListElement.html('');
    };

    this.dishListSuccess = function(dishImageBaseUrl, dishes){
        _this.hideLoadingDishes();

        console.log("Dishes: "+JSON.stringify(dishes));

        var dishListElement = _this._elements.dishListBox;
        dishListElement.html('');
        //Build html
        for (dishIndex in dishes) {
            var dishHtml = "<li class='col-md-2 col-xs-4 pull-left p-5 m-b-15 dish-box'>\n" +
                "<div class='img-wrapper center-block dish-box-click' id='dish-box-"+dishes[dishIndex].id+"'>\n" +
                "<img class='f-w' src='" + dishImageBaseUrl +"/"+dishes[dishIndex].image+"'>\n" +
                "<div class='img-title text-center'>"+dishes[dishIndex].title+"</div>\n" +
                "</div>\n" +

                //"<div class='col-md-12 m-t-15 dish-description'>"+dishes[dishIndex].description+"</div>\n"+
                "</li>\n";
            dishListElement.append(dishHtml);
        }

        //Add click to every dish box to open details
        $(".dish-box-click").click(function () {
            var clickedDishIdText = this.id;
            var clickedDishId = parseInt(clickedDishIdText.substring(9));
            _this._model.setCurrentDishId(clickedDishId);
            _this._model.setCurrentView(3);
        });
    };

    this.dishListError = function(error){
        _this.hideLoadingDishes();
        var msg = "Error on retrieval of dish list. Message: " + error.responseJSON.message;
        alert(msg);
        _this.showErrorInLoadingDishes(msg);
    };

    //Build graphics for dish list based on sent list of dishes
    this.buildDishList = function(){

        _this.showLoadingDishes();

        _this._model.getAllDishes(undefined, undefined, _this.dishListSuccess, _this.dishListError);

    };

    //On click of the filter search button, set the search parameters and notify controller
    this._elements.dishSearchButton.click(function () {
        _this.filterDishes();
    });

    this._elements.dishSearchKeyWords.keydown(function (e) {
        if (e.which == 13) {
            _this.filterDishes();
        }
    });

    this.filterDishes = function(){
        model.setDishFilterKeywords(_this._elements.dishSearchKeyWords.val());
        model.setDishFilterType(_this._elements.dishSearchType.children("option:selected").val());

        _this.showLoadingDishes();

        _this._model.getAllDishes(
            _this._model.getDishFilterType(), _this._model.getDishFilterKeywords(),
            _this.dishListSuccess, _this.dishListError);
    };


    this.show = function(){
        this._elements.dishListViewElement.show();
        //Initialize views start data
        this.buildDishList();
    };

    this.hide = function(){
        this._elements.dishListViewElement.hide();
    }

};