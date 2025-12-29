import { createApp } from 'vue'
import { createPinia} from "pinia";
import './style.css'
import App from './App.vue'

// Global fonts
import '@fontsource/inter/500.css'

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.mount('#app')
