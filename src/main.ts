import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './index.scss'
import './assets/css/normalize.scss'
import { router } from './router'
import { create, NButton } from 'naive-ui'
import store from './store'

import { installMlUI } from './components'

import { ElButton, ElSelect, ElInput } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/base.scss'

const app = createApp(App)

const naive = create({
    components: [NButton]
})

installMlUI(app)

app.use(naive)

app.component(ElButton.name, ElButton);
app.component(ElSelect.name, ElSelect);
app.component(ElInput.name, ElInput);

app.use(router)

app.use(store)

app.mount('#app')



