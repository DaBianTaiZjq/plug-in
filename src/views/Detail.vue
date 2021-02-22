<template>
    <div class="detail-container">
        <mt-header title="生产单明细"> -->
          <router-link to="/list" slot="left">
            <mt-button @click="back">返回</mt-button>
          </router-link>
        </mt-header>
        <div class="detail-info">
            <mt-cell title="产品编码" :value="info.ShortChar03"></mt-cell>
            <mt-cell title="产品描述" class="info-describe" :value="info.ShortChar04"></mt-cell>
            <mt-cell title="工序号" :value="info.ShortChar06"></mt-cell>
            <mt-cell title="工序名称" :value="info.ShortChar06Memo"></mt-cell>
            <mt-cell title="生产订单数量" :value="info.number04"></mt-cell>
            <mt-cell title="派工数量" :value="info.number01"></mt-cell>
            <mt-cell title="合格数量" :value="info.number06"></mt-cell>
            <mt-cell v-if="info.IsReceived" title="已领取" :label="'领取时间：'+info.ReceiveTime" icon="field-success">
                <span style="color: #4caf50">{{info.Recipients}}</span>
            </mt-cell>
            <mt-cell v-else title="未领取" icon="field-error">
            </mt-cell>
            <mt-button v-if="!info.IsReceived" type="primary" @click="ConfirmReceipt">领料确认</mt-button>
        </div>
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
export default {
    name:"list",
    data(){
        return{
            info:this.$route.query
        }
    },
    methods:{
        // 领取
        ConfirmReceipt(){
            let params={
                orderNumber:this.info.key1,
                detailNumber:this.info.ChildKey1,
                materialNumber:this.info.ShortChar03
            }
            MessageBox.confirm("是否确认领取该物料？", "").then(() => {
                this.$http.post('/Material/ConfirmReceipt',params)
                  .then(res=>{
                      if(res.data.success){
                          const {data}=res;
                          this.info.IsReceived=true;
                          console.log(data);
                      }else{
                          MessageBox('提示', res.data.message)
                          .then(()=>{
                            if(res.data.code===100){
                                this.$router.push({ path:'/login'});
                            }
                          });
                      }
                  }).catch((err)=>{
                      console.log(err);
                      MessageBox('', '抱歉，请求失败，请稍后再试~');
                  });
            }).catch(()=>{
                Toast({message: "已取消"});
            })
        },
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
.detail-container{
    background-color:#fff;
    min-height: 100vh;
    .mint-header{
        font-size:.875rem;
    }
    .detail-info{
        height: 10rem;
        font-size: 1rem;
        button{
            width: 100%;
            margin-top: 1.25rem;
        }
    }
}
</style>