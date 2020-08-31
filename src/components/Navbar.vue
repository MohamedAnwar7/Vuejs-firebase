<template>
<header id="header" style="height:69px" class=" green fixed-top  align-items-center header-transparent">
    <div class="container ">
        <!-- Uncomment below if you prefer to use an image logo -->
      
  <nav style="box-shadow: none !important; -webkit-box-shadow: none !important;height: auto" >
    <div class="nav-wrapper green" >
                <!-- <a  class="brand-logo"><router-link to="/" >
                    Feen
                </router-link></a> -->
                  <a style="width:20%" class="brand-logo" href=""><router-link to="/" ><img src="../../static/assets/img/fen1.png" style="width:30%;" alt=""></router-link></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down" >
                    <li v-if="isLoggedIn"><a style="font-size:1.1rem !important" class="email light-blue-text text-darken-4 font-weight-bold">{{currentUser}}</a></li>
                    <li v-if="isLoggedIn"><a style="font-size:1.1rem !important" class="font-weight-bold"><router-link class="inner-link" to="/dashboard"> البيانات</router-link></a></li>
                    <li v-if="!isLoggedIn"><a style="font-size:1.1rem !important " class="font-weight-bold"><router-link class="inner-link" to="/login">تسجيل الدخول</router-link></a></li>
                    <li v-if="!isLoggedIn"><a style="font-size:1.1rem !important" class="font-weight-bold"><router-link class="inner-link" to="/register">انشاء حساب</router-link></a></li>
                    <li v-if="isLoggedIn"><a style="font-size:1.1rem !important" ><button v-on:click="logout" class="btn red  font-weight-bold">خروج</button></a></li>
                </ul>
                
    </div>
  </nav>
    </div>
        
  </header>
     
<!-- .nav-menu -->

</template>

<script>
import firebase from 'firebase';
export default {
    name:'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path});
            })
        }
    }
    
}
</script>

<style scoped>
.email {
    padding-right: 10px;
}
 .inner-link:hover {
  color: #ffce38 !important;
}
.light-blue-text.text-darken-4 {
    color: #ffce38 !important;
}
</style>