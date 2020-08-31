<template>
<div class="container">
    <br><br><br><br>
    <div id="new-user" style="text-align:right">
        <!-- <div class="row">
            <form @submit.prevent="saveUser" class="col s12" dir="rtl">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="firstName" required>
                        <label>firstName</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="lastName" required>
                        <label>lastName</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="email" v-model="email" required>
                        <label>Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="tel" v-model="phone" required>
                        <label>Phone</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="job" required>
                        <label>Job</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="survey">
                        <label>Survey</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="type">
                        <label>Type</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="admin">
                        <label>isAdmin</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/dashboard" class="btn grey">Cancel</router-link>
            </form> -->
            <div class="col s12 m8 offset-m2" dir="rtl">
        <div class="login card-panel grey lighten-4 black-text center">
          <h3 class="green-text">اضافة مستخدم</h3>
          <form  @submit.prevent="saveUser" class="green-text">
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
            <button type="submit" class="btn card-panel green darken-2">اضافة</button>
            <router-link to="/dashboard" class="btn grey card-panel">الغاء</router-link>
          </form>
        </div>
        </div>
    </div>
    <br><br><br><br>
</div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
import { firestore } from 'firebase';
export default {

    name: 'new-user',
    data () {
        return {
            isAdmin:false,
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber:null,
            job: null,
            survey:null,
            type: null,
            password:null,
            admin:false
        }
    },
    beforeCreate(to, from ,next){
        var currentuserEmail = firebase.auth().currentUser.email;
        db.collection('User').where('email','==',currentuserEmail).get().then(querySnapshot => {
             querySnapshot.forEach(doc => {
                     if(!(doc.data().admin)){
                         this.$router.replace({name: 'view-user', params: {user_id:doc.data().id}})
                     }
             })
        })
    },
    methods: {
        saveUser (){
            firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
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
                admin: this.admin
            })
            .then(docRef => this.$router.push('/dashboard'))
            .catch(error => console.log(err))
            
        }
    }
}
/*

*/
</script>
