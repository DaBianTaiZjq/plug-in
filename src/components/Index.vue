<template>
  <div class="index">
    <el-container>
      <el-header><img alt="Vue logo" src="../assets/mylogo.png">
        <span>欢迎进入~</span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu
                :default-active="activePath"
                class="el-menu-vertical-demo" 
                :router="true" 
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/helloVue" @click="saveNavState('/helloVue')">
                  <i class="el-icon-menu"></i>
                  <span slot="title">Hello Vue</span>
                </el-menu-item>
                <el-menu-item index="/userList" @click="saveNavState('/userList')">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="/goodlist" @click="saveNavState('/goodlist')">
                  <i class="el-icon-setting"></i>
                  <span slot="title">商品列表</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String
  },
  data(){
    return{      
      activePath:'/helloVue'
    }
  },
  created(){    
    this.activePath=window.sessionStorage.getItem('activePath')||'/helloVue';
  },
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath=activePath
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
  .el-container{
    .el-header{
      height: 10vh;
      line-height: 60px;
      background-color: #373d41;
      color: #fff;
      img{
        width: 50px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span{
        margin-left: 15px;
      }
    }
    .el-aside{
      background-color: #545c64;
      height: 90vh;
    }
  }
}
</style>
