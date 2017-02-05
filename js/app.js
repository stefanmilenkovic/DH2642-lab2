function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#dinner-start-view"));

    //And create the needed controllers and views
    var startView = new StartView($("#dinner-start-view"));

    var dinnerView = new DinnerView(model, {
        'dinnerStartViewElement' : $("#dinner-start-view"),
        'numberOfGuestsInput' : $('#number-of-guests'),
        'addButton' : $('#increment-button'),
        'delButton' : $('#decrement-button')
    });

    var dinnerViewController = new DinnerViewController(model, dinnerView);

    dinnerView.show();

});


function switchCurrentView (newViewId){
    $(".view-element").hide();
    $("#" + newViewId).show();
}

switchCurrentView('start-page-view');