define(['underscore', 'backbone', 'jst!../templates/picturesView.html', './renderOneThumb'],
    function(_, Backbone, template, RenderOneThumb) {
    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;

            this.myEvents.on('showPictures', this.initPicRequest.bind(this));
            this.myEvents.on('clickMarkerStart', this.picSearchProgress.bind(this, true));
            this.myEvents.on('clickMarkerEnd', this.picSearchProgress.bind(this, false));
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            return this;
        },

        initPicRequest: function(list) {
            this.$pics = this.$pics || $('.pictures_list');
            this.list = list;
            this.$pics.empty();
            this.list.forEach(this.renderList.bind(this));
        },

        renderList: function(place, index, list) {
            var photos = place.photos;
            if (!photos || index > 10) return;

            new RenderOneThumb({el: this.$pics, myEvents: this.myEvents, photo: _.first(photos), place: place});
        },

        picSearchProgress: function(start) {
            this.$progress = this.$progress || $('.pics_progress');
            this.$progress.toggle(start);
        }
    });
});