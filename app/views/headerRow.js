define(['underscore', 'backbone', 'jst!../templates/headerRow.html'], function(_, Backbone, template) {
    return Backbone.View.extend({
        template: template,
        templateModel: {},

        events: {
            'click input.search': 'triggerSearch',
            'keydown': 'triggerKeySearch'
        },

        initialize: function(options) {
            this.myEvents = options.myEvents;
            this.myEvents.on('pictureClick', this.populateCoords.bind(this));
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            return this;
        },

        validateSearch: function(query) {
            return !!query && /^([-+]?\d+(\.\d+)?),\s*([-+]?\d+(\.\d+)?)$/.test(query);
        },

        showValidationError: function(err) {
            this.$error = this.$error || $('.search_validation_error');
            this.$error.fadeIn(function(){
                var $err = $(this);
                _.delay(function() {
                    $err.fadeOut();
                }, 2000);
            }).html(err);
        },

        triggerKeySearch: function(e) {
            this.$input = this.$input || $('input.input_field');
            var code = e.which || e.keyCode;

            if (this.$input.is(':focus') && code === 13) {
                this.triggerSearch(e);
            }
        },

        triggerSearch: function() {
            this.$input = this.$input || $('input.input_field');
            var query = this.$input.val();

            if (this.validateSearch(query)) {
                this.myEvents.trigger('searchEvent', query);
            } else {
                this.showValidationError('Search is invalid!');
            }
        },

        populateCoords: function(pos, invoke) {
            this.$input = this.$input || $('input.input_field');
            this.$input.focus().val(pos);
            if (invoke) this.triggerSearch();
        }
    });
});