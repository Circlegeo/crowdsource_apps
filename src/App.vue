<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/form">Form</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  async mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        this.onWeatherWatchSuccess,
        this.onWeatherError,
        { enableHighAccuracy: true }
      );
    }
  },
  methods: {
    onWeatherWatchSuccess(position) {
      var updatedLatitude = position.coords.latitude;
      var updatedLongitude = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      this.$store.commit("updategeolocation", {
        lat: updatedLatitude,
        lon: updatedLongitude,
        acc: accuracy,
      })
    },
    onWeatherError() {
      // alert("error, no location available");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #4a42b9;
}
</style>
