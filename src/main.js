import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
// import store from "./store";
const app = createApp(App)

new WaveUI(app, {

});
app.use(WaveUI, {
    components: {}
  })


app.use(router).mount('#app')
