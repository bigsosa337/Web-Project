import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
// import store from "./store";
const app = createApp(App)

new WaveUI(app, {

});
app.use(WaveUI, {
    components: {}
  })

  
createApp(App).use(router).mount('#app')
