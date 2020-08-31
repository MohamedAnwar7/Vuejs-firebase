<template>
<div class="container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <br><br><br><br>
    <div  id="Admin">
    
        <ul class="collection with-header">
            <li class="collection-header" style="text-align:right;">
                <h4 > قائمة المستخدمين</h4>
            </li>
            <table class="responsive-table centered striped" dir="rtl">
        <thead>
          <tr class="collection-item active">
              <th>الاسم الاول</th>
              <th>الاسم الاخير</th>
              <th>البريد الالكتروني</th>
              <th>الحالة الوظيفية</th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
            <td>{{user.job}}</td>
            <td><router-link class="secondary-content" v-bind:to="{name: 'view-user' , params:{user_id: user.user_id}}">
                    <i class="fa fa-eye"></i>
            </router-link></td>
          </tr>
        </tbody>
      </table>
        </ul>

        <div class="fixed-action-btn"  style="left:23px !important; right:unset">
            <router-link to="/new" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
    <br><br><br><br>
</div>

</template>

<script >
import firebase from 'firebase'
import db from './firebaseInit'

export default {
    name: 'admin',
    data () {
        return {
            users:[]
        }
    },
    created(){
        var currentuserEmail = firebase.auth().currentUser.email;
        
        db.collection('User').where('email','==',currentuserEmail).get().then(querySnapshot => {
             querySnapshot.forEach(doc => {

                    if(doc.data().admin){
                        db.collection('User').orderBy('firstName').get().then(querySnapshot => {
                        querySnapshot.forEach(doc =>{
                            const data = {
                            'id': doc.id,
                            'user_id': doc.data().id,
                            'firstName': doc.data().firstName,
                            'lastName':doc.data().lastName,
                            'email':doc.data().email,
                            'job':doc.data().job
                            }
                            this.users.push(data)
                        })
                    })
                        
                    }else {
                        // if user is not admin
                        
                        this.$router.replace({name: 'view-user', params: {user_id:doc.data().id}})
                        //this.$router.go({path: this.$router.path});
                        
                    }
            })
        }).catch(function(error) {
                    // An error happened.
                    console.log(error)
                    });

        
    }
    
}
</script>
<style scoped>
.collection .collection-item.active{
    background-color: #236c66;
}
</style>