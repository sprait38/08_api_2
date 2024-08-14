/* eslint-disable import/extensions */
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/page/MainPage';
import ProductPage from '@/page/ProductPage';
import NotFoundPage from '@/page/NotFoundPage';
import CartPage from '@/page/CartPage';
import OrderPage from '@/page/OrderPage';
import OrderInfoPage from '@/page/OrderInfoPage';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/cart/', name: 'cart', component: CartPage },
  { path: '/order/', name: 'order', component: OrderPage },
  { path: '/order/:id', name: 'orderInfo', component: OrderInfoPage },
  { path: '*', name: 'notFound', component: NotFoundPage },
];

const router = new VueRouter({
  routes,
});

export default router;
