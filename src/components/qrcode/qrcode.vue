<template>
  <div v-loading="isLoading1 || isLoading2" element-loading-text="拼命加载中">
    <div class="warpper">
      <div class="banner_wrapper">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>{{$t('diancan.Qr.smart')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('diancan.Qr.qr')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div class="panel-select-group">
            <span class="panel-header__desc">{{$t('diancan.Qr.tableinfo')}}</span>
          </div>
        </div>
        <div class="panel-body">
          <el-row class="qr-body-wrap">
            <el-col :span="10" class="qr-form-wrap">
              <el-form label-position="top" label-width="80px" :model="tabelForm" ref="tabelForm" :rules="rules">
                <el-form-item :label="$t('diancan.Qr.area')" class="qr-in-label">
                  <el-form-item prop="areaName" style="margin-bottom: 25px">
                    <el-input v-model="tabelForm.areaName" :placeholder="$t('diancan.Qr.example')"></el-input>
                  </el-form-item>
                  <div class="explain">{{$t('diancan.Qr.content')}}</div>
                </el-form-item>
                <el-form-item :label="$t('diancan.Qr.range')" prop="startNum" class="qr-in-label" style="margin-bottom: 25px">
                  <el-input type="startNum" v-model="tabelForm.startNum" :placeholder="$t('diancan.Qr.start')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('diancan.Qr.to')" class="qr-in-label">
                  <el-form-item prop="endNum" style="margin-bottom: 25px">
                    <el-input v-model="tabelForm.endNum" :placeholder="$t('diancan.Qr.end')"></el-input>
                  </el-form-item>
                  <div class="explain">{{$t('diancan.Qr.input')}}</div>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" :disabled="createBtnDisabled" @click="submitForm('tabelForm')">{{createBtnDisabled ? $t('diancan.Qr.qrgenerate') : $t('diancan.Qr.generate')}}</el-button>
                  <el-button @click="reset()">{{$t('diancan.Qr.reset')}}</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="14" style="text-align:center;border-left:1px solid #e7eaec;">
              <figure id="dq" v-show="isPreview">
                <canvas id="demo-qr" width="350" height="433"></canvas>
                <p class="prev-indi">{{$t('diancan.Qr.qrpreview')}}</p>
              </figure>
              <div v-show="!isPreview" class="realQrcode">
                <div class="qr-t-w">
                  <figure id="tablePreview">
                    <canvas></canvas>
                  </figure>
                  <p v-if="imgNo > 1">{{$t('diancan.Qr.stickergot1')}}<em>{{imgNo}}</em>{{$t('diancan.Qr.stickergot2')}}</p>
                  <p v-else>{{$t('diancan.Qr.stickergot1')}}<em>{{imgNo}}</em>{{$t('diancan.Qr.stickergotsingle')}}</p>
                  <a :class="['d-btn', downloadTabelBtnDisabled?'d-btn-dis':'']" :href="downloadTabelBtnDisabled ? 'javascript:void(0)': downzipUrl+'?img_kind=2&random_str='+randomStr" @click="donwloadQrCtrl(2)">
                    {{finished ? $t('diancan.Qr.downloadtable') : $t('diancan.Qr.qrgenerate')}}
                  </a>
                </div>
                <div>
                  <figure id="qrcodePreview">
                    <canvas></canvas>
                  </figure>
                  <p v-if="imgNo > 1">{{$t('diancan.Qr.qrgot1')}}<em>{{imgNo}}</em>{{$t('diancan.Qr.qrgot2')}}</p>
                  <p v-else>{{$t('diancan.Qr.qrgot1')}}<em>{{imgNo}}</em>{{$t('diancan.Qr.qrgotsingle')}}</p>
                  <a :class="['d-btn', downloadQrcodeBtnDisabled?'d-btn-dis':'']" :href="downloadQrcodeBtnDisabled ? 'javascript:void(0)': downzipUrl+'?img_kind=1&random_str='+randomStr" @click="donwloadQrCtrl(1)">
                    {{finished ? $t('diancan.Qr.downloadqr') : $t('diancan.Qr.qrgenerate')}}
                  </a>
                </div>
              </div>
            </el-col>
          </el-row>
          <img id="bg" src="/static/img/bgnew.png" style="display:none">
          <!-- <img id="demobg" src="/static/img/demobg.png" style="display:none"> -->
          <div id="tableQrcodeContainer" style="display:none"></div>
          <div id="qrcodeContainer" style="display:none"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import config from 'config'
import QRCode from 'qrcode'
// import Store from '../../common/js/store'
import Http from '../../http';
export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.reset()
    })
  },
  data () {
    return {
      downzipUrl: `${config.downzipUrl}`,
      isLoading1: false,
      isLoading2: false,
      hasPublic: false,
      tabelForm: {
        areaName: '',
        startNum: '',
        endNum: ''
      },
      tab: '',
      isPreview: true,
      createBtnDisabled: false,
      downloadTabelBtnDisabled: false,
      downloadQrcodeBtnDisabled: false,
      // uid: Store.get('uid'),
      uid: '',
      rules: {
        'areaName': [
          {pattern: /^[\s\S]{0,10}$/, message: this.$t('diancan.Qr.rule4')}
        ],
        'startNum': [
          {required: true, message: this.$t('diancan.Qr.rule1')},
          {required: true, pattern: /^[1-9]\d{0,3}$/g, message: this.$t('diancan.Qr.rule5'), trigger: 'change'}
        ],
        'endNum': [
          {pattern: /^[1-9][0-9]{0,3}$/g, message: this.$t('diancan.Qr.rule5')}
        ]
      },
      randomStr: '',
      imgNo: 0,
      finished: false
    }
  },
  created () {
    this.fetchMerchantIds()
  },
  watch: {
    'uid': function (val) {
      if (val) {
        this.urlToQrcode()
      }
    }
  },
  methods: {
    reset() {
      this.imgNo = 0
      this.finished = false
      this.$refs['tabelForm'].resetFields()
      this.isPreview = true
      this.createBtnDisabled = false
      this.downloadTabelBtnDisabled = false
      this.downloadQrcodeBtnDisabled = false
      let tableNode = document.getElementById('tableQrcodeContainer')
      while (tableNode.firstChild) {
        tableNode.removeChild(tableNode.firstChild)
      }
      let qrcodeNode = document.getElementById('qrcodeContainer')
      while (qrcodeNode.firstChild) {
        qrcodeNode.removeChild(qrcodeNode.firstChild)
      }
    },
    async fetchMerchantIds () {
      try {
        this.isLoading2 = true
        let res = await Http.get(`/merchant/ids`, {
          format: 'cors'
        })
        this.isLoading2 = false
        let data = res.data
        if (data.respcd === config.code.OK) {
          let uid = data.data.uid
          this.uid = uid
          // Store.set('uid', uid)
        } else {
          this.$message.error(this.$t('diancan.Qr.idermsg'))
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    async fetchStatus () {
      try {
        let res = await Http.get(`/goods/overseas_downlaod_QRcode`, {
          img_kind: 3,
          random_str: this.randomStr,
          format: 'cors'
        })
        let data = res.data
        if (data.respcd === config.code.OK) {
          this.imgNo = data.data.finish_num
          this.finished = data.data.finished === 'yes' ? true : false
        } else {
          this.$message.error(data.resperr)
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    submitForm (formName) {
      this.createBtnDisabled = true
      let areaName = this.tabelForm.areaName
      let startNum = Number(this.tabelForm.startNum)
      let endNum = Number(this.tabelForm.endNum)
      let length = endNum ? endNum - startNum : 0 // 桌号数组长度
      if (areaName.length > 16) {
        this.$message(this.$t('diancan.Qr.rule4'))
        this.createBtnDisabled = false
        return
      }
      if (endNum && startNum > endNum) {
        this.$message(this.$t('diancan.Qr.rule2'))
        this.createBtnDisabled = false
        return false
      } else if (length > 49) {
        this.$message(this.$t('diancan.Qr.rule3'))
        this.createBtnDisabled = false
        return false
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            if (length >= 19) {
              this.$message(this.$t('diancan.Qr.generalert'))
            }
            let res = await Http.post(`/goods/overseas_generate_QRcode`, {
              order_url: `${config.oHost}/dc/#/?mchntid=%s&table=%s`,
              area: areaName,
              start_no: startNum,
              end_no: endNum,
              format: 'cors'
            })
            let data = res.data
            if (data.respcd === config.code.OK) {
              this.isPreview = false
              this.urlToQrcode(startNum)
              this.randomStr = data.data.random_str
              let count = 0
              this.downloadTabelBtnDisabled = true
              this.downloadQrcodeBtnDisabled = true
              let tervalId = setInterval(async () => {
                count++
                if (this.finished || count >= 30) {
                  this.downloadTabelBtnDisabled = false
                  this.downloadQrcodeBtnDisabled = false
                  clearInterval(tervalId)
                  return
                }
                await this.fetchStatus()
              }, 2000)
            } else {
              this.$message.error(data.resperr)
            }
          } catch (e) {
            this.$message.error(this.$t('common.netError'))
          }
        } else {
          this.createBtnDisabled = false
          return false
        }
      })
    },
    qrcodeText (areaName, tableNumber) {
      let qrcodeText = ''
      if (areaName) {
        qrcodeText = tableNumber ? `${areaName}-${tableNumber}` : `${areaName}`
      } else {
        qrcodeText = `${tableNumber}`
      }
      return qrcodeText
    },
    drawDemoCanvas (qrcode) {
      let canvas = document.getElementById('demo-qr')
      let ctx = canvas.getContext('2d')
      let bg = new Image()
      bg.src = '/static/img/demobg.png'
      bg.onload = () => {
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
        ctx.fill()
        let qw = qrcode.width
        let qh = qrcode.height
        let x = 78
        let y = 122
        this.drawRoundRectPath(ctx, x+qw, y+qh + 20, 5, x,y)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        let qrcodeCtx = qrcode.getContext("2d")
        let imgData = qrcodeCtx.getImageData(5, 5, qw-5, qh-5)
        ctx.putImageData(imgData, x+5, y+5)
        ctx.fillStyle = '#282B2D'
        ctx.font = 'bold 12px 黑体'
        ctx.textAlign = 'center'
        let text = 'Table No.1'
        ctx.fillText(text, x + qw / 2, y + qh + 10)
      }
    },
    drawPreviewCanvas (qrcode, hasFrame, tableNumber) {
      let domName = hasFrame ? 'tablePreview' : 'qrcodePreview'
      let canvas = document.getElementById(domName).firstElementChild
      canvas.setAttribute('name', tableNumber)
      let ctx = canvas.getContext('2d')
      let w = qrcode.width
      let h = qrcode.height
      canvas.width = w
      canvas.height = h + 20
      ctx.rect(0, 0, w, h + 20)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      ctx.fillStyle = '#282B2D'
      ctx.font = 'bold 12px 黑体'
      ctx.textAlign = 'center'
      let text = this.qrcodeText(this.tabelForm.areaName, tableNumber)
      ctx.fillText(text, w / 2, h + 10)

      let qrcodeCtx = qrcode.getContext("2d")
      let imgData = qrcodeCtx.getImageData(0, 0, w, h)
      ctx.putImageData(imgData, 0, 0)
    },
    urlToQrcode (tableNumber) {
      let text = this.qrcodeText(this.tabelForm.areaName, tableNumber)
      let _qrcodeUrl = `${config.oHost}/dc/#/?mchntid=${this.uid}&table=${encodeURIComponent(text)}`
      let qrcode = document.createElement('canvas')
      if (this.isPreview) {
        QRCode.toCanvas(qrcode, _qrcodeUrl, {errorCorrectionLevel: 'H', margin: 2}, function (err) {
          if (err) throw err
        })
        this.drawDemoCanvas(qrcode)
      } else {
        QRCode.toCanvas(qrcode, _qrcodeUrl, {margin: 2, errorCorrectionLevel: 'L'}, function (err) {
          if (err) throw err
        })
        this.drawPreviewCanvas(qrcode, true, tableNumber)
        this.drawPreviewCanvas(qrcode, false, tableNumber)
      }
    },
    drawRoundRectPath (cxt,width,height,radius, x,y) {  
      cxt.beginPath();  
      //从右下角顺时针绘制，弧度从0到1/2PI  
      cxt.arc(width-radius,height-radius,radius,0,Math.PI/2);  
    
      //矩形下边线  
      cxt.lineTo(radius,height);  
    
      //左下角圆弧，弧度从1/2PI到PI  
      cxt.arc(x+radius,height-radius,radius,Math.PI/2,Math.PI);  
    
      //矩形左边线  
      cxt.lineTo(x,y+radius);  
    
      //左上角圆弧，弧度从PI到3/2PI  
      cxt.arc(x+radius,y+radius,radius,Math.PI,Math.PI*3/2);  
    
      //上边线  
      cxt.lineTo(width-radius,y);  
    
      //右上角圆弧  
      cxt.arc(width-radius,y+radius,radius,Math.PI*3/2,Math.PI*2);  
    
      //右边线  
      cxt.lineTo(width,height-radius);  
      cxt.closePath();  
    },
    // 绘制第一张真实桌牌
    drawTableCanvas (qrcode, tableNumber) {
      let canvas = document.createElement('canvas')
      canvas.setAttribute('name', tableNumber)
      let ctx = canvas.getContext('2d')
      let w = 250
      let h = 364
      let qw = qrcode.width
      let qh = qrcode.height
      let x = 51
      let y = 84
      canvas.width = w
      canvas.height = h

      let bg = document.getElementById('bg')
      ctx.drawImage(bg, 0, 0, w, h)

      this.drawRoundRectPath(ctx, x+qw, y+qh + 20, 5, x,y)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      let qrcodeCtx = qrcode.getContext("2d")
      let imgData = qrcodeCtx.getImageData(5, 5, qw-5, qh-5)
      ctx.putImageData(imgData, x+5, y+5)

      ctx.fillStyle = '#282B2D'
      ctx.font = 'bold 12px 黑体'
      ctx.textAlign = 'center'
      let text = this.qrcodeText(this.tabelForm.areaName, tableNumber)
      ctx.fillText(text, x + qw / 2, y + qh + 10)

      document.getElementById('tableQrcodeContainer').append(canvas)
    },
    drawQrcodeCanvas (qrcode, tableNumber) {
      let canvas = document.createElement('canvas')
      canvas.setAttribute('name', tableNumber)
      let ctx = canvas.getContext('2d')
      let w = qrcode.width
      let h = qrcode.height + 20
      canvas.width = w
      canvas.height = h
      ctx.rect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      ctx.fillStyle = '#282B2D'
      ctx.font = 'bold 12px 黑体'
      ctx.textAlign = 'center'
      let text = this.qrcodeText(this.tabelForm.areaName, tableNumber)
      ctx.fillText(text, qrcode.width / 2, qrcode.height + 10)

      let qrcodeCtx = qrcode.getContext("2d")
      let imgData = qrcodeCtx.getImageData(0, 0, qrcode.width, qrcode.height)
      ctx.putImageData(imgData, 0, 0)
      document.getElementById('qrcodeContainer').append(canvas)
    },
    downloadFile(fileName, canvas) {
      let a = document.createElement('a')
      a.setAttribute('download', fileName)
      a.setAttribute('href', canvas.toDataURL())
      a.click()
    },
    downloadTabel () {
      this.downloadTabelBtnDisabled = true
      let tables = document.getElementById('tableQrcodeContainer').childNodes
      for (let i = 0; i < tables.length; i++) {
        this.downloadFile(tables[i].getAttribute('name'), tables[i])
      }
    },
    downloadQrcode (e) {
      this.downloadQrcodeBtnDisabled = true
      let qrcodes = document.getElementById('qrcodeContainer').childNodes
      for (let i = 0; i < qrcodes.length; i++) {
        this.downloadFile(qrcodes[i].getAttribute('name'), qrcodes[i])
      }
    },
    donwloadQrCtrl (kd) {
      if (kd === 1) {
        setTimeout(() => {
          this.downloadQrcodeBtnDisabled = true
        }, 0)
      } else {
        setTimeout(() => {
          this.downloadTabelBtnDisabled = true
        }, 0)
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .el-form-item {
    margin-bottom: 22px;
  }

  // .el-form-item__label {
  //   font-size: 20px;
  //   color: #262424;
  // }

  .explain {
    color: #98989e;
    line-height: 20px;
    font-size: 15px;
  }

  .realQrcode {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    p {
      margin: 20px auto;
    }
    em {
      color: #fe9b20;
      margin: 0 8px;
    }
  }
  #tablePreview {
    background: url('/static/img/bgnew.png') no-repeat;
    background-size: 100% auto;
    width: 250px;
    height: 350px;
    box-shadow: 0 0 2px 1px #F3F3F4;
    canvas{
      margin-top: 84px;
      border-radius: 5px;
    }
  }
  #qrcodePreview {
    background: url('./img/qr-2.png') no-repeat;
    background-size: 100% auto;
    width: 190px;
    height: 200px;
    margin-bottom: 80px;
    canvas{
      margin-top: 30px;
      margin-right: 20px;
      box-shadow: 0 1px 2px 1px #F3F3F4;
    }
  }
  .prev-img{
    width: 350px;
  }
  .prev-indi{
    margin-top: 20px;
  }
  .qr-body-wrap{
    display: flex;
    align-items: center;
    padding: 60px 0;
  }
  .qr-form-wrap{
    padding: 0 40px;
  }
  .qr-t-w{
    margin-right: 2rem;
  }
  .d-btn{
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #FE9B20;
    border-color: #FE9B20;
  }
  .d-btn-dis{
    color: rgb(217, 208, 191);
    cursor: not-allowed;
    background-image: none;
    background-color: rgb(246, 244, 238);
    border-color: rgb(229, 222, 209);
  }
</style>
