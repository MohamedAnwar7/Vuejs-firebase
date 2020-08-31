<template>
  <div>
    <br><br><br><br>
    <div class="container">
        

      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green darken-1 center "  dir="rtl">
          <h3 class="white-text">تسجيل دخول</h3>
          <form class="white-text">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input style="margin-right: 3rem;" type="email" id="email" v-model="email">
              <label class="white-text" style="margin-right:3rem;right:.75rem;" for="email">البريد الالكتروني</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input style="margin-right: 3rem;" type="password" id="password" v-model="password">
              <label class="white-text" style="margin-right:3rem;right:.75rem;" for="password">كلمة السر</label>
            </div>
            <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 green-text">دخول</button>
          </form>
        </div>
      </div>

  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'login',
    data: function(){
        return{
            email: '',
            password: '',

        };
    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`You are logged in as ${this.email}`);
                this.$router.go({path: this.$router.path});
            },
            err => {
                alert(err.message);
            });
            e.preventDefault();
        }
    }
}
</script>
<style >
 @import url('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css');
.input-field .prefix ~ label{
   margin-right: 3rem;
   font-weight: bold !important;
 }
 button {
   font-weight: bold !important;
 }
</style>