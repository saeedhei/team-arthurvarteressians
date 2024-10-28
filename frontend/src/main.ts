import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification'; // Import Vue Toastification
import 'vue-toastification/dist/index.css'; // Import Vue Toastification CSS
import App from './App.vue';
import router from './router';
// import TT from './TT.vue';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast); // Register Vue Toastification as a plugin

app.mount('#app');
