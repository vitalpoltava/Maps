define(['underscore', 'backbone', 'jst!../templates/thumbItem.html'],
    function(_, Backbone, template) {

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.photo = options.photo;
            this.place = options.place;
            this.render();
        },

        render: function() {
            this.templateModel = {
                "url": this.photo.getUrl({'maxWidth': 100, 'maxHeight': 100}),
                "addr" : this.place.get('name'),
                "lat": this.place.get('geometry').location.ob,
                "lng": this.place.get('geometry').location.pb
            };
            this.$el.append(this.template(this.templateModel));
            return this;
        }
    });
});