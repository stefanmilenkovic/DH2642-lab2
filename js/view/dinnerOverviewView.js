var DinnerOverviewView = function(model, elements) {

    this._model = model;
    this._elements = elements;
    var _this = this;

    //Build graphics for overview
    this.buildOverview = function(){

        var dishesInMenu = _this._model.getFullMenu();
        var overviewDishes = this._elements.overviewDishes;
        overviewDishes.html('');

        var dishListHtml = "<ul>";
        for (dishIndex in dishesInMenu) {
            var dish = _this._model.getDish(dishesInMenu[dishIndex].id);
            var dishPrice = _this._model.getDishesPrice(dish);
            console.log("Dish: " + JSON.stringify(dish));

            var dishHtml =
                "<li class='col-md-3 col-xs-4 pull-right p-5 m-b-15 dish-box'>\n" +
                    "<div class='img-wrapper center-block dish-box-click' id='dish-box-"+dish.id+"'>\n" +
                        "<img class='f-w' src='images/"+dish.image+"'>\n" +
                        "<div class='img-title text-center'>"+dish.name+"</div>\n" +
                    "</div>\n" +
                    "<div class='col-md-12 m-t-15 text-center dish-price-text'>"+dishPrice+" SEK</div>\n"+
                "</li>\n";
            dishListHtml += dishHtml;
        }
        dishListHtml += "</ul>";
        overviewDishes.append(dishListHtml);

        //Set title text
        _this._elements.overviewHeaderText.text("My dinner: "+_this._model.getNumberOfGuests()+" people");

        //Update total sum
        _this._elements.dishPriceSum.html("<div class='p-t-300'><p><b>Total: "+_this._model.getTotalMenuPrice()+" SEK</b></p></div>");
    };

    this._model.numberOfGuestsUpdated.attach(function () {
        _this.buildOverview();
    });

    this._elements.goBackAndEditDinnerButton.click(function () {
        _this._model.setCurrentView(2);
    });

    this._elements.printFullRecipeButton.click(function () {
        _this._model.setCurrentView(5);
    });

    this.show = function(){
        _this._elements.dinnerOverviewViewElement.show();
        _this.buildOverview();
    };

    this.hide = function(){
        _this._elements.dinnerOverviewViewElement.hide();
    };

};