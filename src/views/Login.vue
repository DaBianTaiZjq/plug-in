<template>
    <div class="login_container">
        <div class="logo">
            <img src="..\assets\logo.png" alt="logo" />
            <span>派单领料</span>
        </div>
        <div class="form_table">
          <!-- <mt-field label="客户端" placeholder="请选择客户端" v-model="form.type"></mt-field> -->
          <mt-field label="用户名" placeholder="请输入用户名" v-model="form.account" autocomplete="off"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password" autocomplete="off"></mt-field>
          <mt-button type="primary" @click="logining">登录</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast,MessageBox } from 'mint-ui';
export default {
    name:"login",
    data(){
        return{
            msg:'登录',
            form:{
                account:'',
                password:''
            }
        }
    },
    methods:{
        logining(){
            if(this.form.account&&this.form.password){
                this.$http.get('/Login/Verify',
                {params:this.form})
                  .then(res=>{
                      console.log(res);
                      if(res.data.success){
                            window.sessionStorage.setItem('token',res.data.data);
                            Toast({
                              message: res.data.message
                            });
                            this.$router.push({ path:'/list'});
                      }else{
                            MessageBox('提示', res.data.message);
                      }
                });
            }else{
                MessageBox('提示', "账号密码不能为空！");
            }
        }
    }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
  color: #eee;
  .logo{
      height: 30vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
          width: 3.75rem;
          vertical-align: middle;
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          margin-bottom: .625rem;
      }
  }
  .form_table{
      color: #eee;
      margin: .625rem;
      padding: 0 .625rem;
      background-color: rgba(255,255,255,.1);
      border-radius: .625rem;
      .mint-cell{
          background: none;
      }
      button{
          width: 100%;
          margin:1.25rem 0;
      }
  }
}
</style>