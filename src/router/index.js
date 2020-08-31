import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewUser from '@/components/NewUser'
import ViewUser from '@/components/ViewUser'
import EditUser from '@/components/EditUser'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import firebase from 'firebase';
//import { component } from 'vue/types/umd'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-user',
      component: NewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:user_id',
      name: 'edit-user',
      component: EditUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:user_id',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true
      }
    },

  ]
});

// nav Guards

router.beforeEach((to, from, next)=> {
  // check for required Auth Guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    //check if not logged in
    if(!firebase.auth().currentUser){
       // Go to login page
       next({
         path: '/login',
         query: {
           redirect: to.fullPath
         }
       });
    } else {
      // Proceed to route 
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    //check if  logged in
    if(firebase.auth().currentUser){
      // Go to login page
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      });
   } else {
     // Proceed to route 
     next();
   } 
  } else {
    // Proceed to route 
    next();
  }
});

export default router;


