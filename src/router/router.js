import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import Register from '../views/Register';
import NotFound from '../views/404';
import Rooms from '../views/Rooms';
import Room from '../views/Room';
import Details from '../views/Details';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },

  {
    path: '/rooms',
    name: 'rooms',
    component: Rooms,
    meta: {
      needsAuth: true
    },
  },

  {
    path: '/rooms/:roomId',
    name: 'room',
    component: Room,
    meta: {
      needsAuth: true
    },
  },

  {
    path: '/rooms/:roomId/details',
    name: 'Details',
    component: Details,
    meta: {
      needsAuth: true
    },
  },



  { path: '/:notFound(.*)', component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.needsAuth) {
    const isAuthenticated = await store.getters.isAuthenticated;
    if (
      isAuthenticated
    ) {
      next();
    } else next('/login');
  } else {
    let isAuthenticated = await store.getters.isAuthenticated;
    if (isAuthenticated && (to.path == '/login' || to.path == '/register' || to.path == '/')) {
      next('/rooms');
    } else {
      next();
    }
  };
});

export default router
