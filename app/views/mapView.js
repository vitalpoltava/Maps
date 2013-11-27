define(['underscore', 'backbone', 'jst!../templates/mapView.html'], function(_, Backbone, template) {
    var map, marker, myLatlng, mapOptions;

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;

            this.myEvents.on('searchEvent', this.showNewMap.bind(this));
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.templateModel));
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showGMap.bind(this));
            }
            return this;
        },

        showNewMap: function(str) {
            var pos = str.split(',');
            var position = {coords: {
                latitude: pos[0],
                longitude: pos[1]
            }};

            this.showGMap(position);
        },

        showGMap: function(position) {
            myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            mapOptions = {
                center: myLatlng,
                zoom: 8
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Place of search..."
            });

            google.maps.event.addListener(marker, 'click', this.showPictures.bind(this));
        },

        showPictures: function() {
            this.myEvents.trigger('clickMarkerStart');
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({location: myLatlng, radius: 10000}, function(data) {
                this.myEvents.trigger('clickMarkerEnd');
                this.myEvents.trigger('showPictures', data);
            }.bind(this));
        }
    });
});