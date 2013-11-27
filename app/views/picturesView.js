define(['underscore', 'backbone', 'jst!../templates/picturesView.html'], function(_, Backbone, template) {
    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            return this;
        }
    });
});