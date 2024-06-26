import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRefresh, faTrash, faCircleXmark, faCircleInfo, faDollarSign, faWarehouse, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { setupCalendar } from 'v-calendar'

library.add(faRefresh)
library.add(faTrash)
library.add(faCircleXmark)
library.add(faCircleInfo)
library.add(faDollarSign)
library.add(faWarehouse)
library.add(faSearch)

createApp(App).use(router).use(setupCalendar, {}).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
