<template>
<div class="container">
    <br><br><br><br><br>
    <div id="view-user" style="text-align:right;">
        <ul class="collection with-header">
            <li class="alert alert-danger" role="alert" id="verify" style="display:none;" >Please verify your email</li>
            <li class="collection-header"><h4>{{firstName}} - {{lastName}}</h4></li>
            <li class="collection-item active"> {{email}}  : البريد الالكتروني</li>
            <li class="collection-item">{{phone}}: رقم الهاتف </li>
            <li  class="collection-item active"> الحالة الوظيفية :  {{job}}</li>
            <li v-if="admin" class="collection-item">Survey :  {{survey}}</li>
            <li v-if="admin" class="collection-item active">Type :  {{type}}</li>

        </ul>
        <router-link to="/dashboard" class="btn grey" v-if="admin">الرجوع</router-link>
        <button  @click="deleteUser" class="btn red">حذف البيانات</button>
        <div class="fixed-action-btn" style="left:23px !important; right:unset">
            <router-link v-bind:to="{name: 'edit-user', params: {user_id: user_id} }" class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
    <br><br><br><br>
</div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'


/* 
var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://feen-204d5.firebaseio.com'
}); */

export default {
    name: 'view-user',
    data () {
        return {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phone:null,
            job: null,
            survey: null,
            type: null,
            admin: false,

        }
    },
    beforeRouteEnter(to, from, next){
         /* firebase.auth().onAuthStateChanged(firebaseUser  => {
           console.log("email verify"+firebaseUser.emailVerified)
        if (!(firebaseUser.emailVerified)) {
            firebaseUser.sendEmailVerification().then(function() {
                this.verified = firebaseUser.emailVerified
                document.getElementById('verify').style = "display:block;";
                console.log('send Verification');
            }, function(error) {
                console.log('not send Verification');
            });
            
 
        }
         }) */
  
        db.collection('User').where('id','==',to.params.user_id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.user_id = doc.data().id
                    vm.firstName = doc.data().firstName
                    vm.lastName = doc.data().lastName
                    vm.email = doc.data().email
                    vm.phone = doc.data().phoneNumber
                    vm.job = doc.data().job
                    vm.survey = doc.data().survey
                    vm.type = doc.data().type
                    vm.admin = doc.data().admin
                })
            })
        }).catch(function(error) {
                    // An error happened.
                    alert(error)
                    });

    },
    watch: {
        '$route': 'fetchData'
    },
    methods: { //
        fetchData (){
            db.collection('User').where('id','==',this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.id = doc.data().id
                    this.firstName = doc.data().firstName
                    this.lastName = doc.data().lastName
                    this.email = doc.data().email
                    this.job = doc.data().job
                    this.survey = doc.data().survey
                    this.type = doc.data().type
                    this.admin = doc.data().admin

                })
            })
        },
        deleteUser () {
            if(confirm('Are you sure?')){
                db.collection('User').where('id','==',this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    //delete user auth account if he is not admin
                    if(!(doc.data().admin)){
                    var authid = firebase.auth().currentUser.providerId;

                    authid.delete().then(function() {
                    // delete account.
                    alert('acount deleted')
                     var ruser = firebase.auth().currentUser;
                    var credential;

                    // Prompt the user to re-provide their sign-in credentials
                    
                    console.log('data deleted')
                    ruser.reauthenticateWithCredential(credential).then(function() {
                        aler('login again')
                    }).catch(function(error) {
                    // An error happened.
                        alert(error)
                    });
                    }).catch(function(error) {
                    // An error happened.
                    alert(error)
                    });
                   


                    }
                    
                    doc.ref.delete()
                    
                    this.$router.push({name: 'view-user', params: {user_id:this.id}})
                })
            })
            }
        }
    }
}
</script>