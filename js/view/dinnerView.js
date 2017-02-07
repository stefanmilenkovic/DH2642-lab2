var DinnerView = function(model, elements) {

    this._model = model;
    this._elements = elements;

    this.addGuestClicked = new Event(this);
    this.delGuestClicked = new Event(this);

    var _this = this;

    // attach model listeners
    this._model.guestAdded.attach(function () {
        _this.updateNumberOfGuestsValue();
    });
    this._model.guestRemoved.attach(function () {
        _this.updateNumberOfGuestsValue();
    });

    this._elements.incrementGuestButton.click(function () {
        _this.addGuestClicked.notify();
    });
    this._elements.decrementGuestButton.click(function () {
        _this.delGuestClicked.notify();
    });
    this._elements.showStartDinnerViewButton.click(function () {
        _this.showStartDinnerView();
    });
    this._elements.showStartPageViewButton.click(function () {
        _this.showStartPageView();
    });



    /**
     * Initialization functions
     */
    this.show = function () {
        this.updateNumberOfGuestsValue();
    };

    this.updateNumberOfGuestsValue = function () {
        this._elements.numberOfGuestsInput.val(this._model.getNumberOfGuests());
    };

    this.buildDishList = function(){
        var dishListElement = this._elements.dishListBox;
        dishListElement.html('');
        var dishes = this._model.getAllDishes();
        //Build html
        for (dishIndex in dishes) {
            var dishHtml = "<li class='col-md-2 col-xs-4 pull-left p-5 m-b-15 dish-box'>\n" +
                "<div class='img-wrapper center-block'>\n" +
                    "<img class='f-w' src='images/"+dishes[dishIndex].image+"'>\n" +
                    "<div class='img-title text-center'>"+dishes[dishIndex].name+"</div>\n" +
                "</div>\n" +

                "<div class='col-md-12 m-t-15 dish-description'>"+dishes[dishIndex].description+"</div>\n"+
            "</li>\n";

            dishListElement.append(dishHtml);
        }
    };

    this.showStartPageView = function(){
        $(".view-element").hide();
        $("#start-page-view").show();
    }

    this.showStartDinnerView = function(){
        $(".view-element").hide();
        $("#dinner-start-view").show();
    }
};