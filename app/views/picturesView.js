define(['underscore', 'backbone', 'jst!../templates/picturesView.html', './renderOneThumb'],
    function(_, Backbone, template, RenderOneThumb) {

    return Backbone.View.extend({
        template: template,
        templateModel: {},
        itemClass: 'thumb_item',

        initialize: function(options) {
            this.myEvents = options.myEvents;

            this.myEvents.on('showPictures', this.initPicRequest.bind(this));
            this.myEvents.on('clickMarkerStart', this.picSearchProgress.bind(this, true));
            this.myEvents.on('clickMarkerEnd', this.picSearchProgress.bind(this, false));
            this.$el.on('click', '.' + this.itemClass, this.clickItem.bind(this));
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            return this;
        },

        initPicRequest: function(list) {
            this.$pics = this.$pics || $('.pictures_list');
            this.$pics.empty();
            this.collection = list;
            this.collection.forEach(this.renderList.bind(this));
        },

        renderList: function(place, index, list) {
            var photos = place.get('photos');
            if (!photos || index > 10) return;

            new RenderOneThumb({el: this.$pics, myEvents: this.myEvents, photo: _.first(photos), place: place, itemClass: this.itemClass});
        },

        picSearchProgress: function(start) {
            this.$progress = this.$progress || $('.pics_progress');
            this.$progress.toggle(start);
        },

        clickItem: function(e) {
            var $pic = $(e.currentTarget);
            var pos = [$pic.data('lat'), $pic.data('lng')].join(', ');
            this.myEvents.trigger('pictureClick', pos);
        }
    });
});