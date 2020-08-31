<template>
<div class="container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   
</div>

</template>

<script >
import firebase from 'firebase'
import db from './firebaseInit'

export default {
    name: 'dashboard',
    data () {
        return {
            isAdmin:false,
            users:[]
        }
    },
    created(){
        var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}

        var currentuserEmail = firebase.auth().currentUser.email;
        
        db.collection('User').where('email','==',currentuserEmail).get().then(querySnapshot => {
             querySnapshot.forEach(doc => {

                    if(doc.data().admin){
                        this.$router.push('/admin')
                        
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