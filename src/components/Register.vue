<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <br><br><br><br>
    <div class="container">
        <br><br>

      <div class="col s12 m8 offset-m2" dir="rtl">
        <div class="login card-panel grey lighten-4 black-text center">
          <h3 class="green-text">انشاء حساب</h3>
          <form  class="green-text">
            <div dir="rtl" class="row">
            <div  class="input-field col s6">

              <i class="material-icons prefix">account_circle</i>
              <input style="margin-right: 3rem;" type="text" id="firstName" v-model="firstName">
              <label style="margin-right:3rem;right:.75rem;" for="firstName">الاسم الاول</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input style="margin-right: 3rem;" type="text" id="lastName" v-model="lastName">
              <label style="margin-right:3rem;right:.75rem;" for="lastName">الاسم الاخير</label>
            </div>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input style="margin-right: 3rem;" type="email" id="email" v-model="email">
              <label style="margin-right:3rem;right:.75rem;" for="email">البريد الالكتروني</label>
            </div>
            
            <div class="input-field">
              <i class="material-icons prefix">phone</i>
              <input style="margin-right: 3rem;" type="tel" id="phoneNumber" v-model="phoneNumber">
              <label style="margin-right:3rem;right:.75rem;" for="phoneNumber">رقم الهاتف</label>
            </div>
            <div style="text-align: initial;">
                <i style="margin-right:13px;" class="material-icons prefix">business_center</i>
                <label style="right:.75rem;" for="working" class="input-field">
                <input  style="margin-right: 3rem; " class="with-gap" id="working" name="group1" value="يعمل" type="radio" v-model="job" checked />
                <span style="font-size:16px">يعمل</span>
                </label>
                <label style="right:.75rem;" for="notworking">
                <input  style="margin-right: 3rem;" class="with-gap" id="notworking" name="group1" value=" لا يعمل " v-model="job" type="radio"  />
                <span style="font-size:16px">متقاعد </span>
                </label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input style="margin-right: 3rem;" type="password" id="password" v-model="password">
              <label style="margin-right:3rem;right:.75rem;" for="password">كلمة السر</label>
            </div>
            <button v-on:click="register" class="btn btn-large btn-extended card-panel green darken-2">انشاء </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from './firebaseInit'

export default {
    name: 'register',
    data: function(){
        return{
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber:null,
            job: null,
            survey:null,
            type: null,
            levels:null,
            triesNumber:null

        };
    },
    methods: {
        register: function(e) {
           //create user profile
                var newref = db.collection('User').doc();
                
                newref.set({
                id: newref.id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                job: this.job,
                survey: this.survey,
                type: this.type,
                levels: this.levels,
                triesNumber: this.triesNumber
              });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            alert(`Account Created for ${this.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
        }
    }
}
/**
 * 
 *               //create user profile
                var newref = db.collection('User').doc();
                
                newref.set({
                id: newref.id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phone,
                job: this.job,
                survey: this.survey,
                type: this.type,
                admin: this.admin
 * 
 * 
 */
</script>
