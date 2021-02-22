<template>
    <div :class="['plug-container',{'whiteBg':!orderDetail}]">
        <mt-header fixed title="领料确认"></mt-header>
        <div class="plug-info">
            <ul>
                <li>
                    <mt-field class="orderKey" label="派工单号：" placeholder="请输入派工单号" v-model="order.key1" @blur.native.capture="getInfo"></mt-field>                    
                    <mt-button class="scanBtn" type="primary" plain size="small"  @click.native="handleClick">扫一扫</mt-button>
                </li>
                
                <!-- <li><mt-field label="派工单号：" placeholder="请输入派工单号" v-model="order.key1" @blur.native.capture="getInfo"></mt-field></li> -->
                <template v-if="showOrder">
                    <li><mt-field label="工单部门：" v-model="order.Shortchar01Memo" disabled></mt-field></li>
                    <li><mt-field label="派工日期：" v-model="order.date01" disabled></mt-field></li>
                    <li><mt-field label="派工员：" v-model="order.Shortchar07Memo" disabled></mt-field></li>
                </template>
            </ul>
        </div>
        <div class="plug-table" v-if="orderDetail">
            <table cellspacing="0">
                <thead>
                    <tr>
                        <th>生产单号</th>
                        <th>产品描述</th>
                        <th>已领</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="tb">
                    <tr v-for="item in orderDetail" :key="item.ShortChar03+item.ChildKey1">
                        <td><span>{{item.key1}}</span></td>
                        <td><span>{{item.ShortChar04}}</span></td>
                        <td>
                            <i v-if="item.IsReceived" class="mintui mintui-field-success"></i>
                            <i v-else class="mintui mintui-field-error"></i>
                        </td>
                        <td>
                            <router-link :to="{path:'/detail',query:item}">
                                <mt-button type="primary" plain size="small">查看</mt-button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>          
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name:"list",
    data(){
        return{
            showOrder:false,
            order:{},
            orderDetail:null,
        }
    },
    created(){
        sessionStorage.removeItem("QRCodeResult")
    },
    activated(){
        if(sessionStorage.getItem("QRCodeResult")){
            this.order.key1=sessionStorage.getItem("QRCodeResult");
        }
        this.getInfo();
    },
    // //侦听器
    // watch: {
    //   "order.key1": function (newValue, oldValue) {
    //     if (newValue!=oldValue) {
    //       this.getInfo();
    //     }
    //   }
    // },
    methods:{
        handleClick(){
            this.$router.push({ path:'/qrcode'});
        },
        getInfo(){
            if(this.order.key1){
                let params={
                    orderNumber:this.order.key1
                }
                this.$http.post('/Material/GetMaterials',params)
                  .then(res=>{
                      if(res.data.success){
                          this.showOrder=true;
                          console.log(res);
                          const {orderDetail,order}=res.data.data;
                          this.order=order;
                          this.orderDetail=orderDetail;
                      }else{
                          MessageBox('提示', res.data.message).then(()=>{
                              if(res.data.code===100){
                                  this.$router.push({ path:'/login'});
                              }
                              this.showOrder=false;
                              this.order={};
                              this.orderDetail=null;
                          });
                      }
                })
                .catch((err)=>{
                    console.log(err);
                    MessageBox('', '抱歉，请求失败，请稍后再试~');
                });
            }else{
                this.order={};
                this.orderDetail=null
            }    
        }
    }
}
</script>
<style lang="less" scoped>
.whiteBg{
    background-color:#fff;
}
.plug-container{
    height: 100vh;
    .mint-header{
        font-size:1rem;        
    }
    .plug-info{
        height: 10rem;
        margin-top: 3.125rem;
        font-size: 1rem;
        background-color:#fff;
        ul{
            li:first-child{
                display: flex;
                justify-content: space-between;
                .orderKey{
                    flex: 60%;
                }
                .scanBtn{
                    width: 6.25rem;
                    margin:.375rem;
                }
            }
        }
        .mint-cell{
            min-height: 2.5rem;
        }
        .mint-button--small{
            height: 1.75rem;
        }
    }
    .plug-table{
        margin-top: .625rem;
        padding: .625rem;
        background-color:#fff;
        table {
            width: 100%;
            border: .0625rem solid #eee;
            .mint-button--small{
                height: 1.75rem;
            }
        }        
        tr {
            width: 100%;
            height: 2.5rem;
            text-align: center;
        }        
        thead {
            font-size: .875rem;
            background: #f8f8f8;
            color: #999;
        }       
        th {
            border-right: .0625rem solid #eee;
        }    
        td{
            border-bottom: .0625rem solid #eee;
            border-right: .0625rem solid #eee;
            font-size: .875rem;
            font-weight: normal;
            color: #999;
            max-width: 24vw;
            padding: .3125rem;
            span{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .mintui-field-success{
                color: #26a2ff;
            }
        } 
        td:last-child,
        th:last-child {
            border-right: 0;
        }
        tr:last-child td{
            border-bottom:0 ;
        }
    }
}
</style>