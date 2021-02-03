<template>
    <div class="detail-container">
        <mt-header title="生产单明细">
          <router-link to="/list" slot="left">
            <mt-button>返回</mt-button>
          </router-link>
        </mt-header>
        <div class="detail-info">
            <mt-cell title="产品编码" :value="info.code"></mt-cell>
            <mt-cell title="产品描述" class="info-describe" :value="info.describe"></mt-cell>
            <mt-cell title="工序号" :value="info.idNo"></mt-cell>
            <mt-cell title="工序名称" :value="info.name"></mt-cell>
            <mt-cell title="生产订单数量" :value="info.orders"></mt-cell>
            <mt-cell title="派工数量" :value="info.number"></mt-cell>
            <mt-cell title="合格数量" :value="info.qualified"></mt-cell>
            <mt-cell title="已领取" icon="field-success">
                <span style="color: #4caf50">{{info.username}}</span>
            </mt-cell>
            <mt-cell title="未领取" icon="field-error">
            </mt-cell>
            <mt-button type="primary">领料确认</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"list",
    data(){
        return{
            msg:'详情',
            id:this.$route.params.id, // 将路由参数对象中的id挂载到data
            info:{
                code:this.$route.params.id,
                describe:'LSPQ3-160D三履带牵引机机械部分滚滚滚，160D三履带牵引机机械部分滚滚滚',
                idNo:'0012',
                name:'喷涂.喷漆',
                orders:2,
                number:1,
                qualified:1,
                status:0,
                username:'无名氏'               
            }
        }
    },
    methods:{
        getInfo(){
            // alert(this.info.idNo);
            console.log(this.info.idNo);
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