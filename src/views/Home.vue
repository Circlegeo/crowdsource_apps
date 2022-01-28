<template>
  <div class="w-96 mx-auto text-center rounded p-4">
    <img :src="imageIcon" class="w-24 mx-auto" />
    <div class="text-center font-bold text-center text-xl mt-2">Circlegeo</div>
    <div class="mt-2 relative">
      <div class="flex space-x-3 absolute right-0.5 top-0.5 text-xs py-1 px-3 bg-white rounded" style="z-index: 10000">
        <div v-for="(state, i) in $store.state.geolocation" :key="i">
          {{i}}: {{ state.toFixed(2) }}
        </div>
      </div>
      <div id="map" class="h-44 w-full rounded"></div>
    </div>
    <div class="mt-5">
      This project has been created by Circlegeo and requires skills from .GIS
      Developers to develop this feature for the better. The project is
      "Crowdsource" which can visualize data become maps. However, this feature
      still needs further development to make it more useful for many people.
      <br />
      <br />
      This project is created by Circlegeo and requires the skills of a .GIS
      Developer to develop this feature better. This project is a "Crowdsource"
      that can visualize data into a map. However, this feature still needs
      further development to make it more useful for many people. Develop
      crowdsourcing for users, be able to use the smartphone camera feature in
      data collection, and can be used on mobile phones (android/ios) in the
      form of applications
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  mounted() {

    var L = window.L
    this.map = L.map("map", {
      center: [0, 115],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);
  },
  watch: {
    geolocation: {
      handler(val) {
        if (val) {
          this.map.setView([val.lat, val.lon], 12);
          var icon = L.divIcon({
            className: "w-24 h-24 rounded-full bg-blue-800 text-white text-xs",
            html: '<div class="text-xs">' + "</div>",
          });
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker([val.lat, val.lon], { icon: icon }).addTo(
            this.map
          );
        }
      },
      deep: true,
    },
  },
  computed: {
    geolocation() {
      return this.$store.state.geolocation;
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      imageIcon: require("../../apps/apps_assets/icon.png"),
    };
  },
};
</script>

