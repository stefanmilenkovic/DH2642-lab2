var DinnerStatusView = function(model, elements) {

    this._model = model;
    this._elements = elements;

    this.addGuestClicked = new Observer(this);
    this.delGuestClicked = new Observer(this);

    var _this = this;

    // attach model listeners
    this._model.numberOfGuestsUpdated.attach(function () {
        _this.updateNumberOfGuestsValue();
    });

    this._model.dishMenuUpdated.attach(function () {
        _this.buildDishMenuList();
    });


    //Build graphics for dish menu list based on current menu
    this.buildDishMenuList = function(){
        var dishesInMenu = _this._model.getFullMenu();
        console.log("Should build dishes from: "+JSON.stringify(dishesInMenu));

        var chosenDishesList = this._elements.chosenDishesList;
        chosenDishesList.html('');

        //Build html
        if(dishesInMenu.length > 0) {
            for (dishIndex in dishesInMenu) {
                var dish = _this._model.getDish(dishesInMenu[dishIndex].id);
                console.log("Dish: " + JSON.stringify(dish));
                var dishHtml = _this.generateOneDishItemHtml(dish);

                chosenDishesList.append(dishHtml);
            }
        }
        else{
            var dishHtml = _this.generateOneDishItemHtml(undefined);
            chosenDishesList.append(dishHtml);
        }

        _this._elements.totalPriceText.text(_this._model.getTotalMenuPrice() + " SEK");

        //Add click to every dish box to open details
        $(".remove-dish-from-menu-button").click(function () {
            var clickedDishIdText = this.id;
            var clickedDishId = parseInt(clickedDishIdText.substring(29));
            alert("clickedDishId: "+clickedDishId);
            _this._model.removeDishFromMenu(clickedDishId);
        });

        //Confirm button should only be enabled if there are dishes
        if(dishesInMenu.length > 0){
            _this._elements.confirmDinnerButton.removeAttr('disabled');
        }
        else{
            _this._elements.confirmDinnerButton.attr('disabled', 'disabled');
        }
    };


    this.generateOneDishItemHtml = function(dish){
        var numberOfGuests = _this._model.getNumberOfGuests();

        var dishName = "Pending", dishPrice = 0;
        if(dish !== undefined){
            //dishRepetition = dish.
            dishName = dish.name;
            dishPrice = _this._model.getDishesPrice(dish);
        }

        var dishHtml =
            "<li class='row chosen-dishes-row'>\n" +
                "<div class='col-md-1 text-left p-l-30'>"+numberOfGuests+"</div>\n" +
                "<div class='col-md-6 text-left'>"+dishName+"</div>\n" +
                "<div class='col-md-3 text-left'>"+dishPrice+" SEK</div>\n" +
                "<div class='col-md-1 text-left p-0'>\n";
        if(dish !== undefined) {
            dishHtml += "<button type='button' id='remove-dish-from-menu-button-" + dish.id + "' " +
                "class='btn btn-xs btn-default remove-dish-from-menu-button'>x</button>\n";
        }

        dishHtml += "</div>\n</li>";
        return dishHtml;
    };

    this._model.numberOfGuestsUpdated.attach(function () {
        _this.buildDishMenuList();
    });

    this._elements.confirmDinnerButton.click(function () {
        _this._model.setCurrentView(4);
    });

    this._elements.incrementGuestButton.click(function () {
        _this.addGuestClicked.notify();
    });
    this._elements.decrementGuestButton.click(function () {
        _this.delGuestClicked.notify();
    });

    this.updateNumberOfGuestsValue = function () {
        this._elements.numberOfGuestsInput.val(this._model.getNumberOfGuests());
    };

    this.show = function(){
        this.updateNumberOfGuestsValue();
        this.buildDishMenuList();
        this._elements.dinnerStatusViewElement.show();
    };

    this.hide = function(){
        this._elements.dinnerStatusViewElement.hide();
    }

};