import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "amfe-flexible"

const app = createApp(App)

console.log(process.env.NODE_ENV,"environment")

app.use(router)

app.mount("#app")
