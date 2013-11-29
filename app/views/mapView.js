define(['underscore', 'backbone', 'jst!../templates/mapView.html', '../collections/places'],
    function(_, Backbone, template, Places) {

    return Backbone.View.extend({
        template: template,
        templateModel: {},

        initialize: function(options) {
            this.myEvents = options.myEvents;

            this.myEvents.on('searchEvent', this.showNewMap.bind(this));
            this.myEvents.on('pictureClick', this.drawNewMap.bind(this))
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

        drawNewMap: function(pos) {
            var coords = pos.split(',');
            var latLng = {
                coords: {
                    latitude: coords[0],
                    longitude: coords[1]
                }
            };
            this.showGMap(latLng, 16);
        },

        showGMap: function(position, zoom) {
            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: myLatlng,
                zoom: zoom || 8
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Place of search..."
            });

            google.maps.event.addListener(marker, 'click', this.showPictures.bind(this, map, myLatlng));
        },

        showPictures: function(map, myLatlng) {
            this.myEvents.trigger('clickMarkerStart');
            var service = new google.maps.places.PlacesService(map);

            // Using Google search to get data
            service.nearbySearch({location: myLatlng, radius: 10000}, function(data) {
                this.collection = new Places(data);
                this.myEvents.trigger('clickMarkerEnd');
                this.myEvents.trigger('showPictures', this.collection);
            }.bind(this));
        }
    });
});