<template>
    <div class="login_container">
        <div class="logo">
            <img src="..\assets\logo.png" alt="logo" />
            <span>派单领料</span>
        </div>
        <div class="form_table">
          <!-- <mt-field label="客户端" placeholder="请选择客户端" v-model="form.type"></mt-field> -->
          <mt-field label="用户名" placeholder="请输入用户名" v-model="form.account" autocomplete="off"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password" autocomplete="off" class="pwdBtn"></mt-field>
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
                            window.sessionStorage.setItem('userName',this.form.account);
                            Toast({
                              message: '欢迎进入~'
                            });
                            this.$router.push({ path:'/list'});
                      }else{
                            MessageBox('提示', res.data.message);
                      }
                })
                .catch(()=>{
                        MessageBox('', '抱歉，请求失败，请稍后再试~');
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
  background: url(../assets/bg.jpg) no-repeat;
  background-color: #2b4b6b;
  height: 100vh;
  color: #eee;
  background-size:100% 100%; 
  .logo{
      height: 32vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
          width: 5rem;
          vertical-align: middle;
          border-radius: 50%;
          background: rgba(0,0,0,.2);
          margin-bottom: .625rem;
      }
  }
  .form_table{
      color: #eee;
      margin: .625rem;
      padding: 0 .625rem;
      background-color: rgba(0,0,0,.2);
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