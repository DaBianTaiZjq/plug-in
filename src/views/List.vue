<template>
    <div class="plug-container">
        <mt-header fixed title="领料确认"></mt-header>
        <div class="plug-info">
            <ul>
                <li>
                    <mt-field label="派工单号：" placeholder="请输入派工单号" v-model="order.key1" @blur.native.capture="getInfo">
                        <mt-button type="primary" plain size="small"  @click.native="handleClick">扫一扫</mt-button>
                    </mt-field>
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
                    <tr v-for="item in orderDetail" :key="item.ShortChar03">
                        <td><span>{{item.key1}}</span></td>
                        <td><span>{{item.ShortChar04}}</span></td>
                        <td>
                            <i v-if="item.IsReceived" class="mintui mintui-field-success"></i>
                            <i v-else class="mintui mintui-field-error"></i>
                        </td>
                        <td>
                            <router-link :to="{path:'/detail',query:item}">
                                <mt-button type="primary" size="small">查看</mt-button>
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
    activated(){
        this.getInfo();
    },
    methods:{
        handleClick(){
            // this.$router.push({ path:'/ScanCode'});
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
.plug-container{
    background-color:#fff;
    min-height: 100vh;
    .mint-header{
        font-size:1rem;        
    }
    .plug-info{
        height: 10rem;
        margin-top: 2.5rem;
        font-size: 1rem;
        .mint-cell{
            min-height: 2.5rem;
        }
        .mint-button--small{
            height: 1.75rem;
        }
    }
    .plug-table{
        padding: .625rem;
        table {
            width: 100%;
            border: .0625rem solid #ccc;
        }        
        tr {
            width: 100%;
            height: 2.5rem;
            text-align: center;
        }        
        thead {
            font-size: .875rem;
            background: #eee;
            color: #666;
        }       
        th {
            border-right: .0625rem solid #ddd;
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