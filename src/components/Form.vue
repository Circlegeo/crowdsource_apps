<template>
  <div>
    <div style="box-shadow: none">
      <div class="text-left">
        <div class="p-4">
          <div>
            <div v-for="(re, i) in dataR" :key="i">
              <div v-if="re[0] === 'Text'" class="mt-3">
                <span class="font-bold text-lg">{{ re[1] || "Text" }}</span>
              </div>
              <div
                v-else-if="re[0] === 'Get Location'"
                class="mt-3"
                style="position: relative"
              >
                <input
                  readonly
                  type="text"
                  :placeholder="latlon"
                  class="mb-1"
                  style="
                    background: white;
                    width: 100%;
                    border-radius: 8px;
                    padding: 5px;
                    text-align: left;
                    border: 1px solid #555555;
                  "
                />
                <svg
                  style="position: absolute; right: 20px; top: 7px"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  />
                </svg>
                <br />
                <span style="position: relative; top: -2px" class="ml-2"
                  >Accuration: {{ accuracy.toFixed() + " m" }}</span
                >
              </div>
              <div v-else-if="re[0] === 'Take Picture'" class="mt-3">
                <div class="text-xs-center">
                  <div v-if="re[0] === 'Take Picture'">
                    <div v-if="imageUrl == ''">
                      <button
                        class="
                          flex
                          items-center
                          font-semibold
                          rounded
                          bg-blue-500
                          text-white
                          px-4
                          py-2
                          mb-3
                        "
                        @click.prevent="takePicture"
                        v-if="!localstream"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          class="mr-2"
                        >
                          <path
                            fill="#fff"
                            d="M5 4h-3v-1h3v1zm8 6c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-5v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm13 4c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
                          /></svg
                        >Camera
                      </button>
                    </div>
                    <div v-if="imageUrl.length > 0" class="mt-6 mb-12">
                      <div class="relative" style="width: 100%;">
                        <img :src="imageUrl" alt="img"/>
                        <van-button
                          class="
                            absolute
                            left-2
                            bottom-4
                            px-8
                            font-semibold
                            flex
                            rounded
                            right-0
                            mx-auto
                          "
                          @click="removeImage"
                          type="danger"
                        >
                          <van-icon name="delete-o" class="text-white" /> Delete
                          Image</van-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-xs-center mt-4 mb-4">
              <van-button
                type="primary"
                class="px-8 rounded font-semibold"
                v-if="disable !== true"
                @click="upload"
              >
                Submit
              </van-button>
              <van-loading type="spinner" v-else color="#1989fa" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: ["idProject"],

  data() {
    return {
      id: null,
      imageUrl: "",
      param: "",
      latlon: "",
      dialog: false,
      sh: false,
      selectDefault: "empty",
      boxOthers: {},
      checkOthers: {},
      resultType: {},
      dataArr: [],
      disable: false,
      accuracy: 0,
      localstream: null,
    };
  },
  watch: {
    notif(newVal) {
      if (newVal) {
        this.disable = false;
      }
    },
    geolocation: {
      handler(newVal) {
        if (newVal) {
          this.latlon = newVal.lat + ", " + newVal.lon;
          this.accuracy = newVal.acc;

          this.resultType.lat = newVal.lat;
          this.resultType.lon = newVal.lon;
        }
      },
      deep: true,
    },
  },
  methods: {
    async upload() {
      // this.disable = true;
      var data = Object.keys(this.boxOthers);
      for (var key in data) {
        if (this.resultType[data[key]] === " ") {
          this.resultType[data[key]] = this.boxOthers[data[key]];
        }
      }

      var data2 = Object.keys(this.checkOthers);
      for (var key2 in data2) {
        this.resultType[data2[key2]].forEach((element, index) => {
          if (element === " ") {
            this.resultType[data2[key2]][index] = this.checkOthers[data2[key2]];
            // console.log( this.checkOthers[data[key]])
          }
        });
      }
      alert(JSON.stringify(this.resultType));
    },
    showist() {
      this.dialog = true;
    },
    takePicture() {
      //
      // create video
      this.imageUrl = "";
      var self = this;
      navigator.camera.getPicture(
        function (imageData) {
          self.imageUrl = "data:image/jpeg;base64," + imageData;
        },
        function () {},
        { quality: 50, destinationType: Camera.DestinationType.DATA_URL, correctOrientation: true }
      );
    },
    toDataURL(url, callback) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        var fileReader = new FileReader();
        fileReader.onloadend = function () {
          callback(fileReader.result);
        };
        fileReader.readAsDataURL(httpRequest.response);
      };
      httpRequest.open("GET", url);
      httpRequest.responseType = "blob";
      httpRequest.send();
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imagePath) {
      this.imgUrl = "data:image/png;base64," + imagePath;
      this.resultType.imgURL = "data:image/png;base64," + imagePath;
    },

    removeImage() {
      this.imageUrl = "";
      this.localstream = null;
    },
  },
  computed: {
    geolocation() {
      return this.$store.state.geolocation;
    },
    dataR() {
      this.dataArr = ["Text:;Demo Application", "Take Picture", "Get Location"];

      var result = [];
      this.dataArr.forEach((ele) => {
        result.push(ele.split(":;"));
      });
      return result;
    },
  },
};
</script>