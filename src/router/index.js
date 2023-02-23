import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Print from '@/components/Print'
import PrintQrCode from '@/components/PrintQrCode'
import ItemDetail from '@/components/ItemDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/print',
      name: 'Print',
      component: Print
    },
    {
      path: '/printCode',
      name: 'PrintCode',
      component: PrintQrCode
    },
    {
      path: '/detail',
      name: 'detail',
      component: ItemDetail
    }
  ]
})
