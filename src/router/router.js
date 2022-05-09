import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

// Site
import Events from '@/components/Events';
import MyEvents from '@/components/MyEvents';
import EventDetail from '@/components/fragments/EventDetails';
import SignUp from '@/components/SignUp';
import Home from '@/components/Home';
import Front from '@/layout/Front';
import Login from '@/components/Login';

// Dashboard
import Admin from '@/layout/Admin';
import ListEvents from '@/components/dashboard/ListEvents';
import EditEvent from '@/components/dashboard/EditEvent';
import CreateEvent from '@/components/dashboard/CreateEvent';
import Pricing from '@/components/dashboard/Pricing';
import Team from '@/components/dashboard/Team';

// Payment
import Success from '@/components/payment/Success';
import Payment from '@/components/payment/Payment';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Front,
    redirect: '/',
    meta: {
      title: 'Accueil | Besticks',
    },
    children: [
      {
        path: '/',
        component: Home,
        meta: {
          title: 'Évènements | Besticks',
        },
      },
      {
        path: '/evenements',
        name: 'events',
        component: Events,
        meta: {
          title: 'Évènements | Besticks',
        },
      },
      {
        path: '/myEvents',
        name: 'myEvents',
        component: MyEvents,
        meta: {
          title: 'Mes résérvations | Besticks',
        },
      },
      {
        path: '/evenements/:id',
        component: EventDetail,
        name: 'event',
      },
      {
        path: '/evenements/payment',
        component: Payment,
        name: 'payment',
      },
      {
        path: '/checkout/success',
        component: Success,
        name: 'success',
      },
      {
        path: '/connexion',
        component: Login,
        name: 'login',
        meta: {
          guest: true,
          title: 'Connexion | Besticks',
        },
      },
      {
        path: '/inscription/:type',
        component: SignUp,
        meta: {
          guest: true,
          title: 'Inscription | Besticks',
        },
      },
      {
        path: '/espace-pro/offres',
        component: Pricing,
        meta: {
          guest: true,
          title: 'Espace pro - Choix de l\'offre | Besticks',
        },
      },
    ],
  },
  {
    path: '/admin',
    redirect: '/admin/evenements',
    component: Admin,
    meta: {
      isAdmin: true,
      title: 'Tableau de bord | Besticks',
    },
    children: [
      {
        path: '/admin/evenements',
        component: ListEvents,
        meta: {
          isAdmin: true,
        },
      },
      {
        path: '/admin/event/edition/:eventId',
        component: EditEvent,
        name: 'edit-event',
        meta: {
          isAdmin: true,
        },
      },
      {
        path: '/admin/event/new',
        component: CreateEvent,
        name: 'new-event',
        meta: {
          isAdmin: true,
        },
      },
      /*
      {
        path: '/admin/team/new',
        component: FormEvent,
        name: 'new-team',
        meta: {
          isAdmin: true,
        },
      },
      */
      {
        path: '/admin/team',
        component: Team,
        name: 'teal',
        meta: {
          isAdmin: true,
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next('/admin/connexion');
  } else {
    next();
  }
});

export default router;
