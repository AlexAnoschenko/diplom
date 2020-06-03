<template>
    <div class="google-map" :id="name"></div>
</template>

<script>
export default {
    name: 'google-map',
    props: ['name', 'longitude', 'latitude'],
    data: function() {
        return {
            map: '',
            markers: [
                {
                    position: {
                        latitude: this.latitude,
                        longitude: this.longitude
                    }
                }
            ]
        };
    },
    computed: {
        mapMarkers: function() {
            return this.markers;
        }
    },
    mounted: function() {
        const element = document.getElementById(this.name);
        const options = {
            zoom: 15,
            center: new google.maps.LatLng(this.latitude, this.longitude)
        };
        this.map = new google.maps.Map(element, options);
        this.markers.forEach(marker => {
            const position = new google.maps.LatLng(
                marker.position.latitude,
                marker.position.longitude
            );
            marker.map = this.map;
            marker.position = position;
            new google.maps.Marker(marker);
        });
    },
    methods: {}
};
</script>

<style lang="scss">
@import './GoogleMap.scss';
</style>
