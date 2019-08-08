<template>
  <div class="merchandise" v-loading="loading">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('diancan.Qr.smart')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('diancan.Manage.manage')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">{{$t('diancan.Manage.upload')}}</span>
        </div>
      </div>
      <div class="panel-m-body steps">
        <div>
          <p class="step">
            step
            <span>1</span>
          </p>
          <p class="step-text">{{$t('diancan.Manage.step1')}}</p>
          <a class="banner-btn" href="https://o-db.qfapi.com/meal_template/ProductManagementTemplate.xlsx">
            <i class="icon-download"></i>
            <span class="banner-btn__desc">{{$t('diancan.Manage.download')}}</span>
          </a>
        </div>
        <div>
          <p class="step">
            step
            <span>2</span>
          </p>
          <p class="step-text">{{$t('diancan.Manage.read')}}</p>
        </div>
        <div>
          <p class="step">
            step
            <span>3</span>
          </p>
          <p class="step-text">{{$t('diancan.Manage.warn')}}</p>
        </div>
        <div>
          <p class="step">
            step
            <span>4</span>
          </p>
          <p class="step-text">{{$t('diancan.Manage.remind')}}</p>
        </div>
      </div>
      <div class="panel-m-body tip" v-if="state">
        <p
          class="color-green"
          v-if="uploadInfo.no_error"
        >{{$t('diancan.Manage.uploadSuc', [uploadInfo.success])}}</p>
        <div v-else>
          <p class="color-red">{{$t('diancan.Manage.fail', [uploadInfo.fails])}}</p>
          <a class="banner-btn" :href="downloadUrl" download>
            <i class="icon-download"></i>
            <span class="banner-btn__desc">{{$t('diancan.Manage.downerr')}}</span>
          </a>
        </div>
      </div>
      <div class="panel-m-body">
        <el-upload
          class="upload-demo"
          v-loading="uploadLoading"
          :on-progress="startAvatarUpload"
          :show-file-list="false"
          :on-success="avatarSuccess"
          :before-upload="avatarBefore"
          :on-error="avatarFailed"
          drag
          :action="uploadUrl"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            {{$t('diancan.Manage.drag')}}
            <em>{{$t('diancan.Manage.clickupload')}}</em>
          </div>
        </el-upload>
      </div>
      <div class="panel-m-body">
        <div class="myform_wrapper">
          <div class="panel-select">
            <el-select
              v-model="tableLang"
              :placeholder="$t('diancan.Manage.recipe')"
              size="small"
              @change="tableLangChange"
            >
              <el-option
                v-for="(value, name) in tableLangs"
                :label="value"
                :value="name"
                :key="name"
              ></el-option>
            </el-select>
          </div>
          <div class="m-table-panel">
            <div>
              <el-table
                :empty-text="$t('diancan.Manage.emptytext')"
                :data="mList"
                style="width: 100%"
                row-class-name="el-table__row_fix"
                v-loading="loading"
              >
                <el-table-column :label="$t('diancan.Manage.name')" prop="goods_name" min-width="150"></el-table-column>
                <el-table-column :label="$t('diancan.Manage.cate')" prop="cate_name" min-width="150"></el-table-column>
                <el-table-column :label="$t('diancan.Manage.img')" min-width="150">
                  <template slot-scope="scope">
                    <img v-if="scope.row.img" :src="scope.row.img" alt width="44" height="44">
                    <el-button v-else size="small" type="primary" class="upload-img">
                      {{$t('diancan.Manage.upimg')}}
                      <input
                        type="file"
                        @change="chooseFile($event, scope.row.unionid, scope.$index)"
                        accept=".png, .jpeg, .jpg" :title="$t('diancan.Manage.uploadtitle')"
                      >
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('diancan.Manage.price')" min-width="150" prop="price">
                  <template slot-scope="scope">
                    <span class="amt-sty">{{scope.row.txamt}}</span>
                    <span class="line-th">{{scope.row.origamt}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('diancan.Manage.spec')" min-width="150" prop="spec"></el-table-column>
                <el-table-column :label="$t('diancan.Manage.attr')" min-width="150" prop="attr"></el-table-column>
                <el-table-column :label="$t('diancan.Manage.status')" min-width="150">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.available" on-text="" off-text="" on-value='1' off-value='0' @change="changeStatus(scope.row, scope.$index)" on-color="#4CA7F8" off-color="#DDDDDD"></el-switch>
                    <span>{{scope.row.available === '1' ? $t('diancan.Manage.os') : $t('diancan.Manage.fs')}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('diancan.Manage.op')" min-width="150">
                  <template slot-scope="scope">
                    <div class="dl-sty" @click="dlCtrl(scope.row.unionid)">{{$t('diancan.Manage.dl')}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination_wrapper" v-if="merchantData.count >= 10">
              <el-pagination
                ref="page"
                layout="total, sizes, prev, pager, next, jumper"
                :page-size="pageSize"
                @size-change="handleSizeChange"
                :total="merchantData.count"
                @current-change="currentChange"
                :current-page="currentPage"
              ></el-pagination>
            </div>
            <div class="table_placeholder" v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "config";
import qs from "qs";
import Http from "../../http";

export default {
  data() {
    return {
      loading: false,
      uploadLoading: false,
      index: null,
      state: false,
      pageSize: 10,
      currentPage: 1,
      merchantData: {},
      rowInfo: {},
      uploadInfo: {},
      uploadUrl: `${config.uploadUrl}?lang=${config.lang || 'en'}`,
      downloadUrl: `${config.downloadUrl}`,
      tableLangs: {
        en: "English Menu",
        "zh-CN": "中文菜谱"
      },
      tableLang: localStorage.getItem('table-lang') || "en",
      mList: []
    };
  },
  computed: {
    basicParams() {
      return {
        start: this.currentPage - 1,
        length: this.pageSize
      };
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async changeStatus (row, idx) {
      try {
        let res = await Http.post('goods/overseas_goods_modify_status', {
          'unionid': this.mList[idx].unionid,
          'available': row.available,
          'format': 'cors'
        })
        let data = res.data;
        if (data.respcd === config.code.OK) {
          this.$message.success(this.$t('diancan.Manage.statuschange'));
        } else {
          this.$message.error(data.resperr);
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    dlCtrl(uid) {
      this.$confirm(this.$t('diancan.Manage.confirm1'), {
        confirmButtonText: this.$t('diancan.Manage.confirm2'),
        cancelButtonText: this.$t('diancan.Manage.confirm3'),
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          let res = await Http.post('goods/overseas_goods_delete', {
            unionid: uid,
            'format': 'cors'
          })
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.$message.success(this.$t('diancan.Manage.delok'));
            this.getData()
          } else {
            this.$message.error(data.resperr);
          }
        } catch (e) {
          this.$message.error(this.$t('common.netError'))
        }
      })
    },
    tableLangChange() {
      localStorage.setItem('table-lang', this.tableLang)
      this.getData()
    },
    async getData() {
      let lang = this.tableLang
      if (lang === "en") {
        lang = "en-us";
      } else {
        lang = "zh-cn";
      }
      this.loading = true;
      try {
        let res = await Http.get(`/goods/overseas_list`, {
          start: this.currentPage - 1,
          length: this.pageSize,
          language: lang,
          'format': 'cors'
        });
        this.loading = false;
        let data = res.data;
        if (data.respcd === config.code.OK) {
          this.merchantData = data.data
          this.mList = [...data.data.list]
        } else {
          this.$message.error(data.resperr);
        }
      } catch (err) {
        this.loading = false;
        this.$message.error(this.$t("diancan.Manage.listfail"));
      }
    },
    // 改变size
    handleSizeChange(size = 10) {
      this.pageSize = size;
      this.currentChange(1);
    },
    // 改变当前页
    currentChange(current) {
      if (!current && this.currentPage !== 1) {
        this.currentPage = 1;
        return;
      }
      if (current) {
        this.currentPage = current;
        this.getData();
      }
    },
    // 上传之前
    avatarBefore(file) {
      // application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      if (
        !/application\/vnd\.(ms-excel|openxmlformats-officedocument.spreadsheetml.sheet)/gi.test(
          file.type
        )
      ) {
        this.$message.error(this.$t("diancan.Manage.wrongformat"));
        return false;
      }
    },
    // 开始上传
    startAvatarUpload() {
      this.state = false;
      this.uploadLoading = true;
    },
    // 上传成功
    avatarSuccess(res, file) {
      if (res.respcd === config.code.OK) {
        this.state = true;
        this.uploadLoading = false;
        this.$message({
          type: "success",
          message: this.$t("diancan.Manage.uploadOk")
        });
        this.uploadInfo = res.data;
        this.handleSizeChange();
      } else {
        this.uploadLoading = false;
        this.$message.error(res.resperr);
      }
    },
    // 上传失败
    avatarFailed(err, file) {
      this.uploadLoading = false;
      this.$message.error(err);
      console.log(file);
    },
    // 选择图片
    chooseFile(event, uid, index) {
      const { files } = event.target;
      if (files.length > 0) {
        let file = files[0];
        let file0type = file.type;
        let size = file.size
        if ((size / (1024 * 1024)) > 2.5) {
          this.$message.error(this.$t("diancan.Manage.uploadsize"));
          return
        }
        if (!file0type) {
          this.$message.error(this.$t("diancan.Manage.cannotupload"));
          return;
        }
        let re = /.\/(jpg|jpeg|png)/gi
        let retest = re.test(file0type)
        if (!retest) {
          this.$message.error(this.$t("diancan.Manage.cannotupload"));
          return;
        }
        this.index = index;
        this.uploadFile(file, uid);
      }
    },
    async uploadFile (img, uid) {
      let blobimg = new Blob([img])
      let form = new FormData()
      form.append('file', blobimg)
      form.append('category', 1)
      form.append('source', 1)
      form.append('tag', 'otherphoto')
      form.append('format', 'cors')
      form.append('mark', 0)
      form.append('enuserid', 'EPeRaNEt') // for test
      this.upLoading = true
      const url = `${config.imgUpUrl}`
      try {
        axios({
          method: 'post',
          url: url,
          data: form,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(async (_res) => {
          _res = _res.data
          if (_res.respcd === config.code.OK) {
            let imgurl = _res.data.url
            let result = await Http.post(`/goods/overseas_setimg`, qs.stringify({
              img: imgurl,
              format: 'cors',
              unionid: uid
            }))
            result = result.data
            if (result.respcd === config.code.OK) {
              this.$message.success(this.$t("diancan.Manage.addok"))
              this.merchantData.list[this.index]["img"] = imgurl
            } else {
              this.$message.error(this.$t("diancan.Manage.addfail") + result.resperr)
            }
          } else {
            this.$message.error(
              this.$t("diancan.Manage.addfail") + _res.resperr
            );
          }
        })
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    }
  }
};
</script>

<style lang="scss">
.panel-m-body{
  padding: 20px 20px 0;
}
.merchandise {
  .steps {
    display: flex;
    & > div {
      margin-right: 40px;
      flex: 1;
      &:last-child{
        margin-right: 0;
      }
    }
    .step {
      font-size: 20px;
      color: #a7a9ae;
      border-bottom: 2px solid #fe9b20;
      span {
        font-size: 34px;
        margin-left: 5px;
        color: #2f323a;
      }
    }
    .step-text {
      font-size: 15px;
      color: #262424;
      margin-top: 10px;
      line-height: 1.5;
    }
    .banner-btn {
      margin-top: 10px;
    }
  }

  .color-green {
    color: #7ed321;
  }
  .color-orange {
    color: #fe9b20;
  }
  .color-red {
    color: #ff0808;
  }
  .upload-demo {
    .el-upload {
      display: block;
    }
    .el-upload-dragger {
      width: 100%;
      border-width: 2px;
    }
  }
  .tip {
    p {
      text-align: center;
      margin: 5px 0;
    }
    a {
      margin: auto;
    }
  }
  .upload-img {
    min-width: 70px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
  .el-table img {
    border: 1px solid #dedede;
  }
}
.dl-sty{
  color: #FF8100;
  font-size: 14px;
  cursor: pointer;
}
.amt-sty{
  color: #262424;
  font-size: 14px;
}
.line-th{
  text-decoration: line-through;
  color: #8A8C92;
  font-size: 12px;
}
.m-table-panel{
  margin: 23px 0px 23px;
}
</style>
