<template>
<transition name="slide">
  <div class="pickers">
    <div class="title">
      <p @click="closeAddress">取消</p>
      <p @click="submitAddress">确定</p>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
  </div>
</transition>
</template>

<script>
  import areaData from '../../../static/format.json'
  export default {
    props: {
      pickerState: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        slots: [
          {
            flex: 1,
            values: Object.keys(areaData), // 会根据当前对象的键值返回一个数组，这里会返回所有省份的数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            flex: 1,
            values: Object.keys(areaData['北京']),
            className: 'slot2',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: areaData['北京']['北京市'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    },
    methods: {
      closeAddress () {
        // 取消地址选择
        this.$emit('hidePicker')
      },
      submitAddress () {
        // 确定地址
        this.$emit('hidePicker')
        this.$emit('getAddress', this.addressStr)
      },
      onValuesChange (picker, values) {
        this.addressStr = `${values[0]}${values[1]}${values[2]}`
        if (areaData[values[0]]) {
          if (Object.keys(areaData[values[0]])) {
            picker.setSlotValues(1, Object.keys(areaData[values[0]]))
            picker.setSlotValues(2, areaData[values[0]][values[1]])
          } else {
            picker.setSlotValues(1, [])
          }
        }
      }
    }
  }
</script>
<style>
  .picker{
    background:#f3f3f3
  }
  .picker-slot{
    font-size:0.24rem
  }
  .picker-item{
    white-space: wrap !important;
  }
</style>


<style lang="stylus" scoped>
.slide-enter-active,.slide-leave-active
  transition: all .5s
.slide-enter
  transform:translateY(100%)
.slide-leave-to
  transform:translateY(100%)
.pickers
  background:#fff
  position:absolute
  width:100%
  height:3.5rem
  bottom:0
  left:0
  transition:all .5s
  .title
    font-size:0.3rem
    color:#339999
    display:flex
    // height:0.5rem
    line-height:0.5rem
    justify-content:space-between
    // margin:auto 0.3rem
    p
      padding:0.1rem 0.3rem 0.1rem 0.3rem
</style>
