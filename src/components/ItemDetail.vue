<template>
  <div class="container">
    <div class="title">逝者信息</div>
    <div class="content" v-if="formItem">
      <div class="flex">
        <p class="item-name">逝者姓名：</p>
        <p>{{formItem.name}}</p>
      </div>
      <div class="flex">
        <p class="item-name">逝者性别：</p>
        <p>{{formItem.info.sex == 1?'男':'女'}}</p>
      </div>
      <div class="flex">
        <p class="item-name">逝者年龄：</p>
        <p>{{formItem.info.age}}岁</p>
      </div>
      <div class="flex">
        <p>收费项目明细：</p>
      </div>
      <div class="list">
        <div class="flex" v-for="item in chargeList" :key="item.name">
          <p class="item-name">{{item.name}}：</p>
          <p>{{item.price}}元</p>
        </div>
        <div class="flex" style="margin-top:15px">
          <p class="item-name" >合计：</p>
          <p>{{count}}元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '../common/config'
let keyValue = {
  carryCity: '遗体接运(城区)',
  carryCountry: '遗体接运(跨市)',
  huohua: '遗体火化',
  jicun: '骨灰寄存',
  xiaodu: '遗体消毒',
  cunfang: '遗体存放',
  zuyong: '遗体告别厅租用',
  guhuihe: '骨灰盒',
  huaquan: '租用纸(绢)花圈',
  qitayongpin: '其他殡葬用品',
  baoguo: '包裹',
  yishizhuchi: '仪式主持服务',
  huazhuang: '化妆、整容',
  tuoyi: '穿、脱衣',
  qingxi: '清洗',
  taishi: '抬尸',
  shoushi: '预约收尸服务',
  shitichuli: '特殊尸体处理',
  shitizhengrong: '事故尸体整容',
  shijian: '协助尸检',
  bingguanchuzu: '移动冰棺出租',
  bingguanxiaodu: '外来冰棺消毒',
  zhanyang: '瞻仰(认尸)',
  baiji: '拜祭先人(骨灰)',
  liulu: '留炉',
  pingbanlu: '火化垫尸板（平板炉）',
  jianhuilu: '火化垫尸板（捡灰炉）',
  zangpin1: '随葬品处理1类',
  zangpin2: '随葬品处理2类',
  guhuichuli: '骨灰处理',
  huaguhai: '化骨骸',
  xianhuabanling: '鲜花伴灵',
  dadaolian: '租用悼念厅（大型）',
  zhongdaodiao: '租用悼念厅（中型）',
  zuyongxiuxishi: '租用休息室',
  zuyonglingtangda: '租用灵堂（21平方米以上）',
  zuyonglingtangxiao: '租用灵堂（20平方米以下）',
  ziliaochaxun: '资料查询',
  xuanyongjianhuilu: '选用拣灰炉',
  dianzipingmu: '电子屏幕',
  hulingjiu: '护灵柩',
  denghoufei: '等候费',
  chezaibingguan: '车载冰棺费用',
  taibingguan: '冰棺上车、下车费用',
  canzhihuohua: '残肢火化费',
  guanmuchuli1: '棺木处理费1类',
  guanmuchuli2: '棺木处理费2类',
  guanmuchuli3: '棺木处理费3类',
  diaoke: '（雕）刻费',
  guhuigeweixiao: '骨灰格位（小）',
  guhuigeweida: '骨灰格位（大）',
  guhuijicun: '骨灰寄存工本费',
  other: '其他',
  baseOther: '基础其他'
}
export default {
  name: 'ItemDetail',
  data () {
    const params = this.$route.query
    return {
      id: params.id || null,
      formItem: null,
      chargeList: [],
      count: 0
    }
  },
  methods: {
    getDetailInfo () {
      request.get(`/detail?bos_id=${this.id}`).then(res => {
        if (res.success) {
          let data = res.data
          data.info = JSON.parse(data.info)
          this.formItem = data
          for (let key in keyValue) {
            if (key === 'baseOther' && this.formItem.info.baseOther) {
              let price = Number(this.formItem.info[key].price) || 0
              if (price > 0) {
                let obj = {
                  name: this.formItem.info.baseOther.name,
                  price: price
                }
                this.chargeList.push(obj)
              }
            } else if (key === 'other' && this.formItem.info.other.length) {
              this.formItem.info.other.forEach(ele => {
                let price = Number(ele.price2) || 0
                if (price > 0) {
                  let obj = {
                    name: ele.name,
                    price: price
                  }
                  this.chargeList.push(obj)
                }
              })
            } else {
              let price = this.formItem.info[key] ? Number(this.formItem.info[key].price) : 0
              if (price > 0) {
                let obj = {
                  name: keyValue[key],
                  price: price
                }
                this.chargeList.push(obj)
              }
            }
          }
          this.count = this.chargeList.reduce((prep, curr) => {
            return prep + curr.price
          }, 0)
        }
      })
    }
  },
  created () {
    this.getDetailInfo()
  }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background: #fff;
    margin: 0 auto;
    box-sizing: border-box;
    font-size: 14;
    font-weight: 900;
    position: relative;
    padding: 10px;
    overflow: hidden;
}
.title{
  text-align: center;
  font-size: 18px;
  line-height: 30px;
}
.content{
  height: calc(100% - 50px);
  padding-bottom: 40px;
}
.list{
    height: calc(100% - 120px);
  margin-top: 10px;
  overflow-y:auto;
  overflow-x:hidden;
}
.item-name{
  width: 150px;
}
.flex{
  display: flex;
  line-height: 28px;
}
</style>
