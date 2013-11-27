define(['underscore', 'backbone', 'jst!../templates/mapView.html'], function(_, Backbone, template) {
    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showGMap.bind(this));
            }
            return this;
        },

        showGMap: function(position) {
            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: myLatlng,
                zoom: 8
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Place of search..."
            });

            google.maps.event.addListener(marker, 'click', this.showPictures.bind(this));
        },

        showPictures: function(latLong) {
            alert('hello')
        }
    });
});