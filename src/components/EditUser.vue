<template>
<div class="container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <br><br><br><br>
    <div id="edit-user"  dir="rtl">
        <h3 style="text-align:right;">تعديل البيانات</h3>
        <div class="row">
            <form @submit.prevent="updateUser" class="col s6 card-panel">
                <div class="row"  >
                    <div class="input-field col s6 ">
                        <input  class="blue-text text-darken-2" type="text" v-model="firstName"  required>
                         <label style="right:.75rem;">الاسم الاول</label>
                    </div>
               

                    <div class="input-field col s6">
                        <input class="blue-text text-darken-2" type="text" v-model="lastName"  required>
                         <label style="right:.75rem;" >الاسم الاخير</label>
                    </div>
                </div>

                    <div class="input-field col s6" style="text-align:right !important">
                       
                        <input class="blue-text text-darken-2" type="email" v-model="email"  required>
                          <label style="right:.75rem;" >البريد الالكتروني</label>
                    </div>

                <div class="row">
                    <div class="input-field col s6">
                        <input class="blue-text text-darken-2" type="tel" v-model="phoneNumber"  required>
                         <label style="right:.75rem;" >رقم الهاتف</label>
                    </div>
                </div>
                <div style="text-align: initial;">
                <label style="right:.75rem;" for="working" class="input-field">
                <input  style="margin-right: 3rem; " class="with-gap" id="working" name="group1" value="يعمل" type="radio" v-model="job" checked />
                <span style="font-size:16px">يعمل</span>
                </label>
                <label style="right:.75rem;" for="notworking">
                <input  style="margin-right: 3rem;" class="with-gap" id="notworking" name="group1" value=" لا يعمل " v-model="job" type="radio"  />
                <span style="font-size:16px">متقاعد </span>
                </label>
                </div>
                <div v-if="admin" class="row">
                    <div class="input-field col s6">
                        <input class="blue-text text-darken-2" type="text" v-model="survey" >
                         <label style="right:.75rem;" >Survey</label>
                    </div>
                </div>
                <div v-if="admin" class="row">
                    <div class="input-field col s6">
                        <input class="blue-text text-darken-2" type="text" v-model="type" >
                         <label style="right:.75rem;" >Type</label>
                    </div>
                </div>
                <div v-if="admin" class="row">
                    <div  class="input-field col s6">
                        <input  class="blue-text text-darken-2" type="text" v-model="admin" >
                         <label style="right:.75rem;" >isAdmin</label>
                    </div>
                </div>
                <button type="submit" class="btn">حفظ</button>
                <router-link to="/dashboard" class="btn grey">الغاء</router-link>
                <br><br>
            </form>
        </div>
    </div>
    <br><br><br><br>
</div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
export default {
    name: 'edit-user',
    data () {
        return {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber:null,
            job: null,
            survey:null,
            type: null,
            admin:false
        }
    },
    beforeRouteEnter(to, from, next){
  
        db.collection('User').where('id','==',to.params.user_id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.id = doc.data().id
                    vm.firstName = doc.data().firstName
                    vm.lastName = doc.data().lastName
                    vm.email = doc.data().email
                    vm.phoneNumber = doc.data().phoneNumber
                    vm.job = doc.data().job
                    vm.survey = doc.data().survey
                    vm.type = doc.data().type
                    vm.admin = doc.data().admin
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData (){
            db.collection('User').where('id','==',this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.id = doc.data().id
                    this.firstName = doc.data().firstName
                    this.lastName = doc.data().lastName
                    this.email = doc.data().email
                    this.phoneNumber = doc.data().phoneNumber
                    this.job = doc.data().job
                    this.survey = doc.data().survey
                    this.type = doc.data().type
                    this.admin = doc.data().admin
                })
            })
        },
        updateUser (){
            db.collection('User').where('id','==',this.$route.params.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        firstName: this.firstName,
                        lastName:this.lastName,
                        email:this.email,
                        phoneNumber:this.phoneNumber,
                        job:this.job,
                        survey:this.survey,
                        type: this.type

                    })
                    .then(() => {
                        this.$router.push({name: 'view-user', params: {user_id:this.id}})
                    })
                })
            })

        }
    }
}
/* 
var currentuserID = firebase.auth().currentUser.ID;
                        db.collection('User').where('id','==',currentuserID).get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                const data = {
                                'id': doc.id,
                                'user_id': doc.data().id,
                                'firstName': doc.data().firstName,
                                'lastName':doc.data().lastName,
                                'email':doc.data().email,
                                'job':doc.data().job,
                                'survey' : doc.data().survey,
                                'type' : doc.data().type
                                }
                                this.users.push(data)
                            })
                        })

*/
</script>
<style scoped>
label ,input{
    font-size:1.5rem !important;}
</style>