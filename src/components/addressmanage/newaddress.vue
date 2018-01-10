<template>
  <div class="newaddress">
    <div class="mask" v-show="pickerState" @click="choosepicker"></div>
    <div class="Receiving">
      <div class="Receiving_c">
        <p class="name_title">收件人：</p>
        <input type="text" placeholder="请输入联系人" v-model="names">
      </div>
    </div>
    <div class="concet_way">
      <div class="concet_con">
        <p class="way_title">联系方式：</p>
        <input type="text" placeholder="请输入联系方式" v-model="phone">
      </div>
    </div>
    <div class="region">
      <div class="region_C" @click="choosepicker">
        <p class="region_title">
            所在地区：<span :class="{'active': area !== '请选择'}">{{area}}</span>
        </p>
        <p class="icon">
          <span class="left_icon"></span>
        </p>
      </div>
    </div>
    <div class="region_detail">
      <div class="region_detail_con">
        <p class="region_detail_title">详细地址：</p>
        <input type="text" placeholder="街道、楼牌号等" v-model="detailAddress">
      </div>
    </div>
    <div class="submit" @click="_changeUserAddress">
      <p class="submit_btn">保存并使用</p>
    </div>
    <picker 
      v-show="pickerState" 
      @getAddress="getAddress"
      @hidePicker="closePicker" 
      :pickerState="pickerState"></picker>
  </div>
</template>

<script>
  import picker from '@/base/picker/picker'
  import { getUserAddressList, changeUserAddress } from 'api/address'
  import { verificationPhone } from '*/verification'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        pickerState: false,
        addList: [],
        phone: '',
        names: '',
        detailAddress: '',
        area: '请选择',
        editState: false,
        index: ''
      }
    },
    computed: {
      ...mapGetters([
        'addressMsg'
      ])
    },
    created () {
      this._getUserAddressList()
      if (this.$route.query.name) {
        [this.names, this.phone, this.area, this.detailAddress, this.index] = [
          this.$route.query.name,
          this.$route.query.phone,
          this.$route.query.area,
          this.$route.query.detailedAddress,
          this.$route.query.index
        ]
        this.editState = true
      }
    },
    methods: {
      choosepicker () {
        // 显示选择省市县组件
        this.pickerState = !this.pickerState
      },
      closePicker () {
        this.pickerState = false
      },
      getAddress (msg) {
        this.area = msg
      },
      _getUserAddressList () {
        getUserAddressList({
          isAll: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.addList = res.data.data
          }
        })
      },
      verificationMsg () {
        if (!this.names) {
          this.$toast({
            message: '请输入联系人',
            duration: 1000
          })
          return false
        } else if (!verificationPhone(this.phone)) {
          this.$toast({
            message: '请输入正确的手机号码',
            duration: 1000
          })
          return false
        } else if (this.area === '请选择') {
          this.$toast({
            message: '请选择地区',
            duration: 1000
          })
          return false
        } else if (!this.detailAddress) {
          this.$toast({
            message: '请输入详细地址',
            duration: 1000
          })
          return false
        } else {
          return true
        }
      },
      _changeUserAddress () {
        let state = this.verificationMsg()
        let newAddress = {
          name: this.names,
          phone: this.phone,
          area: this.area,
          detailedAddress: this.detailAddress
        }
        if (!this.editState) {
          this.addList.unshift(newAddress)
        } else {
          this.addList.unshift(newAddress)
          this.addList.splice(this.index, 1, '')
        }
        if (state) {
          changeUserAddress({
            addressList: JSON.stringify(this.addList)
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$router.push('/addressmanage')
            }
          })
        }
      }
    },
    components: {
      picker
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #ccc;
    // font-size:0.3rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:    #ccc;
      // font-size:0.3rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:    #ccc;
      // font-size:0.3rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:    #ccc;
      // font-size:0.3rem;
  }
  .newaddress
    min-height:100vh
    background:#f3f3f3
    font-size:0.3rem
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
    .Receiving
      height:1.6rem
      background:#fff
      border-bottom:1px solid #ccc
      .Receiving_c
        line-height:1.6rem
        display:flex
        margin:auto 0.3rem
    .concet_way
      height:1.6rem
      background:#fff
      line-height:1.6rem
      border-bottom:1px solid #ccc
      .concet_con
        margin:auto 0.3rem
        display:flex
        input 
          width:4.85rem
    .region
      height:1.6rem
      background:#fff
      line-height:1.6rem
      border-bottom:1px solid #ccc
      .region_C
        margin:auto 0.3rem
        display:flex
        justify-content:space-between
        .region_title
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
          width:6.5rem
          span
            color:#ccc
          .active
            color:#333
        .icon
          display:flex
          align-items:center
        .icon
          .left_icon
            display:inline-block
            width:0.24rem
            height:0.43rem
            background-size:cover
            bg-image('img/left')
    .region_detail
      height:1.6rem
      background:#fff
      line-height:1.6rem
      .region_detail_con
        margin:auto 0.3rem
        display:flex
        input
          width:5rem
    .submit
      position:fixed
      bottom:0
      left:0
      width:100%
      height:1rem
      background:#339999
      font-size:0.3rem
      color:#fff
      text-align:center
      line-height:1rem
</style>

