define(['underscore', 'backbone', 'jst!../templates/main.html', './headerRow', './mapView', './picturesView'],
    function(_, Backbone, template, HeaderRow, MapView, PicturesView) {

    var headerRow, mapView, picturesView, myEvents;

    return Backbone.View.extend({
        template: template,
        el: '#root',
        templateModel: {},

        initialize: function() {
            myEvents = _.extend({}, Backbone.Events);
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));

            // loading sub-views
            headerRow = new HeaderRow({el: '.header_content', myEvents: myEvents});
            mapView = new MapView({el: '.main_line .right', myEvents: myEvents});
            picturesView = new PicturesView({el: '.main_line .left', myEvents: myEvents})

            return this;
        }
    });
});
