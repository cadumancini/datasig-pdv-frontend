import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRefresh, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { setupCalendar } from 'v-calendar'

library.add(faRefresh)
library.add(faTrash)
library.add(faCircleXmark)

createApp(App).use(router).use(setupCalendar, {}).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
