import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/tailwind.css'

import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'

import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            geolocation: {
                lat: 0,
                lon: 0,
                acc: 0,
            }
        }
    },
    mutations: {
        updategeolocation(state, data) {
            state.geolocation = data
        }
    }
})

createApp(App).use(router).use(Vant).use(store).mount('#app')