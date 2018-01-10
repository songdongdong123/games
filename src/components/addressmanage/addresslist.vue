<template>
  <div class="addresslist">
    <ul class="list">
      <li class="item" @click="chooseItem(index)" v-for="(list, index) in addresslist">
        <div class="container">
          <div class="left">
            <input type="radio" :checked="index===ind" name="" id="">
            <label for=""></label>
          </div>
          <div class="center">
            <p class="name">
              <span class="people_name">{{list.name}}</span>
              <span class="people_num">{{list.phone}}</span>
            </p>
            <p class="address_detail">
              {{list.area + list.detailedAddress}}
            </p>
          </div>
          <div class="full_in" @click="toEditAddress(list, index)">
            <span class="full_in_icon"></span>
          </div>
        </div>
      </li>
    </ul>
    <div class="submit" @click="toNewAddress">
      <p>
        <span class="adds_icon"></span>
        <span>新建地址</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { getUserAddressList } from 'api/address'
  export default {
    data () {
      return {
        addresslist: [],
        ind: 0
      }
    },
    created () {
      this._getUserAddressList()
    },
    methods: {
      chooseItem (index) {
        this.ind = index
      },
      toNewAddress () {
        this.$router.push('/newaddress')
      },
      _getUserAddressList () {
        getUserAddressList({
          isAll: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.addresslist = res.data.data
          }
        })
      },
      toEditAddress (list, index) {
        // 进入编辑页面
        this.$router.push({path: '/newaddress', query: {name: list.name, phone: list.phone, area: list.area, detailedAddress: list.detailedAddress, index: index}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .addresslist
    min-height:100vh
    width:100%
    background:#f3f3f3
    position:relative
    .list
      position:absolute
      width:100%
      .item
        margin-top:0.1rem
        height:1.6rem
        background:#fff
        .container
          margin:auto 0.3rem
          display:flex
          align-items:center
          justify-content:space-between
          height:1.6rem
          .left
            font-size:0
            input[type='radio']
              display:none
              margin-left: 2px
              margin-right:2px
              // display: none
            input[type='radio']+label:before
              content: ''
              display:inline-block
              width:0.4rem
              height:0.4rem
              border-radius: 100%
              border: 2px solid #E4E4E4
              vertical-align: middle
            input[type='radio']:checked+label:before
              background: #339999
          .center
            margin-right:1rem
            .name
              font-size:0.36rem
              font-weight:bold
              color:#333
            .address_detail
              width:4.4rem
              font-size:0.24rem
              color:#b6b6b6
              margin-top:0.2rem
              line-height:0.34rem
          .full_in
            font-size:0
            .full_in_icon
              display:inline-block
              width:0.46rem
              height:0.44rem
              background-size: cover
              bg-image('img/full_in')
    .submit
      position:fixed
      bottom:0
      left:0
      height:1rem
      width:100%
      background:#339999
      color:#fff
      font-size:0.3rem
      p
        display:flex
        align-items:center
        justify-content:center
        height:1rem
        .adds_icon
          display:inline-block
          background-size:cover
          width:0.4rem
          height:0.4rem
          bg-image('img/adds')
          margin-right:0.2rem
</style>
