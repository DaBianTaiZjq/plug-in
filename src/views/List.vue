<template>
    <div class="plug-container">
        <mt-header fixed title="领料确认"></mt-header>
        <div class="plug-info">
            <ul>
                <li><mt-field label="派工单号：" placeholder="请输入派工单号" v-model="info.idNo" @blur.native.capture="getInfo" ></mt-field></li>
                <li><mt-field label="工单部门：" v-model="info.department" disabled></mt-field></li>
                <li><mt-field label="派工日期：" v-model="info.date" disabled></mt-field></li>
                <li><mt-field label="派工员：" v-model="info.username" disabled></mt-field></li>
            </ul>
        </div>
        <div class="plug-table">            
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
                    <tr v-for="item in info.rows" :key="item.idNo">
                        <td>{{item.idNo}}</td>
                        <td>{{item.describe}}</td>
                        <td>
                            <i v-if="item.status===1" class="mintui mintui-field-success"></i>
                            <i v-else class="mintui mintui-field-error"></i>
                        </td>
                        <td>
                            <router-link :to="'/detail/'+item.idNo">                            
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
export default {
    name:"list",
    data(){
        return{
            msg:'列表',
            info:{
                idNo:'',
                department:'装配车间',
                date:'2020年12月8日',
                username:'江汉武',
                rows:[
                    {idNo:'000500009770',describe:'LSPQ3-160D三履带牵引机机械部分滚滚滚',status:1},
                    {idNo:'000500010778',describe:'LSPQ3-160D三履带牵引机机械部分',status:0},
                    {idNo:'000500012441',describe:'LSPQ3-160D三履带牵引机机械部分',status:0},
                    {idNo:'000500324589',describe:'LSPQ3-160D三履带牵引机机械部分',status:1}
                ]
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
            max-width: 25vw;
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