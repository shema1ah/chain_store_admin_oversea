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
                  <el-button type="primary" :disabled="createBtnDisabled" @click="submitForm('tabelForm')">{{$t('diancan.Qr.generate')}}</el-button>
                  <el-button @click="reset()">{{$t('diancan.Qr.reset')}}</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="14" style="text-align:center;border-left:1px solid #e7eaec;">
              <figure v-show="isPreview">
                <img class="prev-img" src="/static/img/demo.png" :alt="$t('diancan.Qr.qrpreview')">
                <p class="prev-indi">{{$t('diancan.Qr.qrpreview')}}</p>
              </figure>
              <div v-show="!isPreview" class="realQrcode">
                <div class="qr-t-w">
                  <figure id="tablePreview">
                    <canvas></canvas>
                  </figure>
                  <p v-if="tabelNumbers.length > 1">{{$t('diancan.Qr.stickergot1')}}<em>{{tabelNumbers.length}}</em>{{$t('diancan.Qr.stickergot2')}}</p>
                  <p v-else>{{$t('diancan.Qr.stickergot1')}}<em>{{tabelNumbers.length}}</em>{{$t('diancan.Qr.stickergotsingle')}}</p>
                  <el-button type="primary" :disabled="downloadTabelBtnDisabled" @click="downloadTabel()">{{$t('diancan.Qr.downloadtable')}}</el-button>
                </div>
                <div>
                  <figure id="qrcodePreview">
                    <canvas></canvas>
                  </figure>
                  <p v-if="tabelNumbers.length > 1">{{$t('diancan.Qr.qrgot1')}}<em>{{tabelNumbers.length}}</em>{{$t('diancan.Qr.qrgot2')}}</p>
                  <p v-else>{{$t('diancan.Qr.qrgot1')}}<em>{{tabelNumbers.length}}</em>{{$t('diancan.Qr.qrgotsingle')}}</p>
                  <el-button type="primary" :disabled="downloadQrcodeBtnDisabled" @click="downloadQrcode()">{{$t('diancan.Qr.downloadqr')}}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <img id="bg" src="/static/img/bgnew.png" style="display:none">
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
  // import qs from 'qs'
  import QRCode from 'qrcode'
  import Store from '../../common/js/store'
  
  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.reset()
      })
    },

    data () {
      return {
        isLoading1: false,
        isLoading2: false,
        hasPublic: false,
        tabelForm: {
          areaName: '',
          startNum: '',
          endNum: ''
        },
        tab: '',
        tabelNumbers: [],
        isPreview: true,
        createBtnDisabled: false,
        downloadTabelBtnDisabled: false,
        downloadQrcodeBtnDisabled: false,
        uid: Store.get('uid'),
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
        }
      }
    },
    created () {
      if (!this.uid) {
        this.fetchMerchantIds()
      }
    },
    methods: {
      reset() {
        this.tabelNumbers = []
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
      fetchMerchantIds () {
        this.isLoading2 = true
        axios.get(`${config.host}/merchant/ids`)
          .then((res) => {
            this.isLoading2 = false
            let data = res.data
            if (data.respcd === config.code.OK) {
              let uid = data.data.uid
              this.uid = uid
              Store.set('uid', uid)
            } else {
              this.$message.error(data.resperr)
            }
          })
          .catch(() => {
            this.isLoading2 = false
            this.$message.error('获取商户id失败')
          })
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (let i = 0; i < length + 1; i++) {
              this.tabelNumbers[i] = i === 0 ? startNum : this.tabelNumbers[i - 1] + 1
              this.urlToQrcode(this.tabelNumbers[i])
            }
            this.isPreview = false
            // if (this.$route.params.hasPublic === 'no') {
            //   for (let i = 0; i < length + 1; i++) {
            //     this.tabelNumbers[i] = i === 0 ? startNum : this.tabelNumbers[i - 1] + 1
            //     this.urlToQrcode(this.tabelNumbers[i])
            //   }
            //   this.isPreview = false
            // } else {
            //   this.fetchWxofficialQrcode(startNum, endNum, length)
            // }
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
      urlToQrcode (tableNumber, qrcodeUrl) {
        let text = this.qrcodeText(this.tabelForm.areaName, tableNumber)
        text = encodeURIComponent(text)
        let _qrcodeUrl = !qrcodeUrl ? `${config.oHost}/dc/#/?mchntid=${this.uid}&table=${text}` : qrcodeUrl
        let qrcode = document.createElement('canvas')
        qrcode.style.width = 150
        qrcode.style.height = 150
        QRCode.toCanvas(qrcode, _qrcodeUrl, {margin: 2, errorCorrectionLevel: 'L'}, function (err) {
          if (err) throw err
        })
        this.drawTableCanvas(qrcode, tableNumber)
        this.drawQrcodeCanvas(qrcode, tableNumber)
        if (tableNumber === Number(this.tabelForm.startNum)) {
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
  
</style>
