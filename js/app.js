$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#dinner-start-view"));

    //And create the needed controllers and views
    var startView = new StartView($("#dinner-start-view"));

});

function switchCurrentView (newViewId){
    $(".view-element").hide();
    $("#" + newViewId).show();
}

switchCurrentView('start-page-view');