<template>
  <div class="settlementInvoice">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('invoice.crumbs.L1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('invoice.crumbs.L2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel" v-if="!trnStatus">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <h2 class="panel-header__desc">{{$t('invoice.title.t1')}}</h2>
        </div>
      </div>
      <div class="panel-body panel-body_inputsrn">
        <div class="add-trn-desc">
          <div class="add-trn-desc_item">{{$t('invoice.tip.m1')}}</div>
          <div class="add-trn-desc_item">{{$t('invoice.tip.m2')}}</div>
        </div>
        <el-form :model="trnForm" ref="trn-form" :rules="formrules">
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('invoice.panel.merchantTrn')}}</span>
              <el-form-item prop="tax_no">
                <el-input v-model="trnForm.tax_no" type="number" :placeholder="$t('invoice.msg.m1')" size="small" class="panel-select-input__fix panel-select-input-220"></el-input>
              </el-form-item>
            </div>
            <div class="panel-header-btn panel-header-btn__fill" @click="addRrnno()">
              <span>{{$t('invoice.panel.btn.save')}}</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="panel" v-else>
      <div class="panel-header panel-header__auto">
        <el-form :model="searchForm" ref="search-form">
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('invoice.panel.invoice')}}</span>
              <el-form-item prop="dateValue">
                <el-date-picker
                  v-model="searchForm.dateValue"
                  type="month"
                  format="MM/yyyy"
                  :editable="false"
                  size="small"
                  :clearable="false">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('invoice.panel.shopList')}}</span>
              <el-form-item prop="selectShopUid">
                <el-select v-model="searchForm.selectShopUid" :placeholder="$t('common.all')" size="small" filterable>
                  <el-option v-for="store in shopData.list" :label="store.shop_name" :value="store.id" :key="store.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="panel-header-btn panel-header-btn__fill" @click="getInvoiceData">
              <span class="el-icon-loading" v-if="loading"></span>
              <span v-else>{{$t('invoice.panel.btn.query')}}</span>
            </div>
            <div class="panel-header-btn panel-btn-download-green" @click="downAll">
              <span class="icon-download"></span>
              <span>{{ $t('invoice.panel.btn.downAll') }}</span>
            </div>
          </div>
        </el-form>
      </div>
      <div class="panel-body">
        <el-table
          :data="invoiceData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column :label="$t('invoice.table.invoiceNo')" min-width="60">
            <template slot-scope="scope">
              <div>{{ scope.row.report_date }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('invoice.table.sid')">
            <template slot-scope="scope">{{ scope.row.userid }}</template>
          </el-table-column>
          <el-table-column prop="sub_merchant_name" min-width="170" :label="$t('invoice.table.shopName')">
          </el-table-column>
          <el-table-column prop="merchant_trn_no" :label="$t('invoice.table.trnNo')">
            <template slot-scope="scope">{{ scope.row.merchant_trn_no }}</template>
          </el-table-column>
          <el-table-column
            :label="$t('invoice.table.invoiceDate')" >
            <template slot-scope="scope" >
              <div class="table-title">{{ scope.row.ctime }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('invoice.table.op')" label-class-name="toolShow">
            <template slot-scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click="downloadInvoice(scope.row)">{{$t('invoice.table.downloadInvoice')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="invoiceData.total >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="invoiceData.total"
          @current-change="currentChange"
          :current-page="currentPage">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
      <div style="text-align:center;overflow-y:auto;display: none;" v-for="(currentInvioceData, index) in reportList">
        <svg width="595px" height="840px" viewBox="0 0 595 840" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svgs">
            <title>img_invoice</title>
            <defs>
                <polygon id="path-1" points="1.74475862 0.684 16.8130345 0.684 16.8130345 16.5517241 1.74475862 16.5517241"></polygon>
                <polygon id="path-3" points="1.48075862 0.683586207 14.2152414 0.683586207 14.2152414 16.5517241 1.48075862 16.5517241"></polygon>
                <polygon id="path-5" points="0.666551724 0.683586207 14.062069 0.683586207 14.062069 16.5517241 0.666551724 16.5517241"></polygon>
                <polygon id="path-7" points="0 0.126 12.7402759 0.126 12.7402759 16.0011724 0 16.0011724"></polygon>
                <polygon id="path-9" points="1.94793103 1.78758621 29.0493103 1.78758621 29.0493103 18.5747586 1.94793103 18.5747586"></polygon>
            </defs>
            <g id="全英文设计图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="settlement-mgmt_download-invoice_invoice">
                    <rect fill="#F3F3F4" x="0" y="0" width="594" height="840"></rect>
                    <g id="form">
                        <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="594" height="840"></rect>
                        <rect id="Rectangle" fill="#FAF8F0" x="379" y="247" width="87" height="68"></rect>
                        <rect id="Rectangle" stroke="#606470" fill="#FAF8F0" x="44.5" y="315.5" width="506" height="59"></rect>
                        <rect id="Rectangle" stroke="#606470" fill="#FAF8F0" x="44.5" y="495.5" width="506" height="60"></rect>
                        <rect id="矩形" fill="#606470" x="379" y="247" width="1" height="249"></rect>
                        <rect id="矩形" fill="#606470" x="309" y="316" width="1" height="180"></rect>
                        <rect id="矩形" fill="#606470" x="414" y="316" width="1" height="180"></rect>
                        <rect id="矩形" fill="#606470" x="229" y="316" width="1" height="180"></rect>
                        <rect id="矩形" fill="#606470" x="465" y="247" width="1" height="308"></rect>
                        <text id="Note：-Bank-Fees-and" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="45" y="596">Note:</tspan>
                            <tspan x="78.5102539" y="596" :font-family="fontFamily" font-weight="normal"></tspan>
                            <tspan x="45" y="617" :font-family="fontFamilyItalic" font-weight="normal">Bank Fees and Charges are subject to VAT under UAE VAT Law, as applicable. Banks are required by Law to issue </tspan>
                            <tspan x="45" y="630" :font-family="fontFamilyItalic" font-weight="normal">tax invoices to its customers. In line with Central Bank directives, all fees and charges where VAT is applicable are </tspan>
                            <tspan x="45" y="643" :font-family="fontFamilyItalic" font-weight="normal">inclusive of VAT and related VAT will be borne by Noor Bank. This is subject to change as per regulatory directive.</tspan>
                        </text>
                        <g transform="translate(44.000000, 90.000000)" id="Rectangle" stroke="#606470">
                            <rect x="0.5" y="0.5" width="506" height="405"></rect>
                        </g>
                        <rect id="Rectangle" stroke="#606470" fill="#FAF8F0" x="44.5" y="170.5" width="506" height="39"></rect>
                        <text id="Tax-Invoice-For-The" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="270.72937" y="187">Tax Invoice</tspan>
                            <tspan x="222.146362" y="201">{{currentInvioceData.tax_invoice}}</tspan>
                        </text>
                        <text id="NOOR-BANK" :font-family="fontFamilyBold" font-size="11.5" fill="#000000">
                            <tspan x="267.258911" y="111">NOOR BANK</tspan>
                        </text>
                        <text id="Building-1,-Level-8," :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="194.877197" y="127">Building 1, Level 8, Emaar Square, Downtown,</tspan>
                            <tspan x="200.138184" y="140">Dubai P.O. Box 8822, United Arab Emirates.</tspan>
                        </text>
                        <text id="Al-Saaha,-Doha-Stree" :font-family="fontFamily" font-size="10" font-weight="normal" fill="#2F323A">
                            <tspan x="54" y="273">{{currentInvioceData.merchant_addr}}</tspan>
                        </text>
                        <text id="Invoice-No:" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="390" y="261">Invoice No:</tspan>
                        </text>
                        <text id="Invoice-Date:" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="390" y="284">Invoice Date:</tspan>
                        </text>
                        <text id="Department:" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="390" y="307">Department:</tspan>
                        </text>
                        <text id="10/2019" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="475" y="262">{{currentInvioceData.report_date}}</tspan>
                        </text>
                        <text id="05/11/2019" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="475" y="284">{{currentInvioceData.ctime}}</tspan>
                        </text>
                        <text id="Accounts" :font-family="fontFamily" font-size="11" font-weight="normal" fill="#2F323A">
                            <tspan x="475" y="307">Accounts</tspan>
                        </text>
                        <text id="Merchant-TRN-No:-100" :font-family="fontFamily" font-size="10" font-weight="normal" fill="#2F323A">
                            <tspan x="54" y="307">Merchant TRN No: {{currentInvioceData.merchant_trn_no}}</tspan>
                        </text>
                        <g id="编组-2" v-if="currentInvioceData.merchant_name.length > 30 || currentInvioceData.relation_merchant_name.length > 42" transform="translate(54.000000, 222.000000)" fill="#2F323A" font-size="11">
                            <text id="Al-Mana-Retail-LLC" :font-family="fontFamily" font-weight="normal">
                                <tspan x="82" y="6">{{strSlice(currentInvioceData.merchant_name, 30)[0]}}</tspan>
                                <tspan x="82" y="18">{{strSlice(currentInvioceData.merchant_name, 30)[1]}}</tspan>
                            </text>
                            <text id="Merchant-Name:" :font-family="fontFamilyBold">
                                <tspan x="0" y="6">Merchant Name:</tspan>
                            </text>
                            <text id="2490547-–-Hermes-The" :font-family="fontFamily" font-weight="normal">
                              <tspan x="278" y="6">{{strSlice(currentInvioceData.relation_merchant_name, 42)[0]}}</tspan>
                              <tspan x="278" y="18">{{strSlice(currentInvioceData.relation_merchant_name, 42)[1]}}</tspan>
                            </text>
                            <text id="-Ref" :font-family="fontFamilyBold">
                                <tspan x="256" y="6">-Ref </tspan>
                            </text>
                        </g>
                        <g id="编组-2备份" v-else transform="translate(54.000000, 222.000000)" fill="#2F323A" font-size="11">
                          <text id="Al-Mana-Retail-LLC" :font-family="fontFamily" font-weight="normal">
                              <tspan x="82" y="10">{{currentInvioceData.merchant_name}}</tspan>
                          </text>
                          <text id="Merchant-Name:" :font-family="fontFamilyBold">
                              <tspan x="0" y="10">Merchant Name:</tspan>
                          </text>
                          <text id="2490547-–-Hermes-The" :font-family="fontFamily" font-weight="normal">
                            <tspan x="278" y="10">{{currentInvioceData.relation_merchant_name}}</tspan>
                          </text>
                          <text id="-Ref" :font-family="fontFamilyBold">
                              <tspan x="256" y="10">-Ref </tspan>
                          </text>
                        </g>
                        <text id="TRN：10007176900003" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="241.078125" y="161">TRN: 10007176900003</tspan>
                        </text>
                        <g id="Noor-bank-logo" transform="translate(42.000000, 30.000000)">
                            <g id="编组" transform="translate(0.000000, 20.971862)" fill="#142C8D">
                                <path d="M8.04724138,13.952069 C8.59551724,13.952069 9.05068966,13.9024138 9.41482759,13.7968966 C9.77689655,13.6934483 10.0706897,13.5424138 10.292069,13.3417241 C10.5134483,13.1410345 10.6686207,12.9072414 10.7596552,12.6403448 C10.8465517,12.3734483 10.892069,12.0713793 10.892069,11.73 C10.892069,11.0493103 10.7058621,10.53 10.3355172,10.1741379 C9.96517241,9.81827586 9.31344828,9.64034483 8.38034483,9.64034483 L5.29344828,9.64034483 L5.29344828,13.952069 L8.04724138,13.952069 Z M8.15689655,6.97344828 C9.03206897,6.97344828 9.63206897,6.81 9.95689655,6.48517241 C10.2837931,6.15827586 10.4472414,5.69275862 10.4472414,5.08448276 C10.4472414,4.43275862 10.2362069,3.96931034 9.81413793,3.6962069 C9.39206897,3.42103448 8.6762069,3.28448276 7.66862069,3.28448276 L5.29344828,3.28448276 L5.29344828,6.97344828 L8.15689655,6.97344828 Z M2.06793103,0.683793103 L7.78034483,0.683793103 C8.95137931,0.683793103 9.91758621,0.797586207 10.6810345,1.01689655 C11.4424138,1.23827586 12.0465517,1.54448276 12.4913793,1.92931034 C12.9362069,2.31413793 13.2424138,2.76724138 13.4141379,3.28448276 C13.5837931,3.8037931 13.6686207,4.36448276 13.6686207,4.97275862 C13.6686207,5.59551724 13.5362069,6.18103448 13.2693103,6.72931034 C13.0044828,7.27758621 12.4975862,7.74310345 11.7589655,8.13 C12.2327586,8.38241379 12.6196552,8.64517241 12.9237931,8.91827586 C13.227931,9.19137931 13.4658621,9.48517241 13.6355172,9.79551724 C13.8072414,10.107931 13.9251724,10.4265517 13.9913793,10.7513793 C14.0575862,11.0782759 14.0906897,11.4051724 14.0906897,11.73 C14.0906897,12.3941379 13.9913793,13.0272414 13.7906897,13.6189655 C13.592069,14.2106897 13.2589655,14.7237931 12.7913793,15.152069 C12.3237931,15.5803448 11.7134483,15.9217241 10.9582759,16.1741379 C10.2031034,16.4244828 9.27,16.5527586 8.15689655,16.5527586 L2.06793103,16.5527586 L2.06793103,0.683793103 Z" id="Fill-1"></path>
                            </g>
                            <g id="编组" transform="translate(12.413793, 20.971862)">
                                <mask id="mask-2" fill="white">
                                    <use xlink:href="#path-1"></use>
                                </mask>
                                <g id="Clip-4"></g>
                                <path d="M11.1233793,10.1515862 L9.19096552,4.46193103 L7.27924138,10.1515862 L11.1233793,10.1515862 Z M7.70131034,0.684 L10.8564828,0.684 L16.8130345,16.5529655 L13.2585517,16.5529655 L11.9902759,12.8846897 L6.43510345,12.8846897 L5.16889655,16.5529655 L1.74475862,16.5529655 L7.70131034,0.684 Z" id="Fill-3" fill="#142C8D" mask="url(#mask-2)"></path>
                            </g>
                            <g id="编组" transform="translate(28.965517, 20.971862)">
                                <mask id="mask-4" fill="white">
                                    <use xlink:href="#path-3"></use>
                                </mask>
                                <g id="Clip-6"></g>
                                <polygon id="Fill-5" fill="#142C8D" mask="url(#mask-4)" points="1.48075862 0.683586207 4.458 0.683586207 10.9917931 11.0842759 10.9917931 0.683586207 14.2152414 0.683586207 14.2152414 16.5525517 11.2586897 16.5525517 4.7042069 6.24082759 4.7042069 16.5525517 1.48075862 16.5525517"></polygon>
                            </g>
                            <g id="编组" transform="translate(44.448276, 20.971862)">
                                <mask id="mask-6" fill="white">
                                    <use xlink:href="#path-5"></use>
                                </mask>
                                <g id="Clip-8"></g>
                                <polygon id="Fill-7" fill="#142C8D" mask="url(#mask-6)" points="0.666551724 0.683586207 3.99965517 0.683586207 3.99965517 7.03944828 9.85689655 0.683586207 13.4858621 0.683586207 8.20172414 6.64013793 14.0631034 16.5525517 10.372069 16.5525517 5.88862069 8.796 3.99965517 10.7284138 3.99965517 16.5525517 0.666551724 16.5525517"></polygon>
                            </g>
                            <g id="编组" transform="translate(2.068966, 2.351172)">
                                <mask id="mask-8" fill="white">
                                    <use xlink:href="#path-7"></use>
                                </mask>
                                <g id="Clip-10"></g>
                                <polygon id="Fill-9" fill="#3A3A3A" mask="url(#mask-8)" points="-0.000413793103 0.126 2.97889655 0.126 9.51682759 10.5308276 9.51682759 0.126 12.7402759 0.126 12.7402759 16.0011724 9.78372414 16.0011724 3.22510345 5.68531034 3.22510345 16.0011724 -0.000413793103 16.0011724"></polygon>
                            </g>
                            <path d="M50.9975172,9.63558621 C51.5147586,9.63558621 51.9451034,9.5817931 52.2864828,9.468 C52.6257931,9.35834483 52.8968276,9.20317241 53.0975172,9.00041379 C53.2961379,8.80386207 53.4347586,8.55972414 53.5071724,8.28041379 C53.5837241,7.99696552 53.6209655,7.68868966 53.6209655,7.34731034 C53.6209655,7.06386207 53.5775172,6.79489655 53.4864828,6.5342069 C53.3975172,6.27558621 53.2464828,6.04593103 53.0313103,5.84524138 C52.8161379,5.64455172 52.5202759,5.48937931 52.1416552,5.37765517 C51.7651034,5.268 51.2851034,5.21006897 50.7057931,5.21006897 L48.374069,5.21006897 L48.374069,9.63558621 L50.9975172,9.63558621 Z M45.1485517,2.47696552 L50.774069,2.47696552 C52.0195862,2.47696552 53.0457931,2.61972414 53.8526897,2.91144828 C54.6616552,3.19903448 55.2947586,3.57765517 55.754069,4.04317241 C56.2133793,4.50868966 56.532,5.028 56.712,5.60110345 C56.8878621,6.17006897 56.9768276,6.73282759 56.9768276,7.27903448 C56.9768276,8.30110345 56.7926897,9.1617931 56.4223448,9.85696552 C56.049931,10.5542069 55.4292414,11.1438621 54.554069,11.6155862 L57.7775172,18.3521379 L54.1982069,18.3521379 L51.5313103,12.3935172 L48.4154483,12.3935172 L48.4154483,18.3521379 L45.1485517,18.3521379 L45.1485517,2.47696552 Z" id="Fill-11" fill="#3A3A3A"></path>
                            <g id="编组" transform="translate(14.482759, 0.282207)">
                                <mask id="mask-10" fill="white">
                                    <use xlink:href="#path-9"></use>
                                </mask>
                                <g id="Clip-14"></g>
                                <path d="M28.5237931,6.68855172 C28.1741379,5.6582069 27.6693103,4.77889655 27.0134483,4.04855172 C26.3575862,3.31613793 25.5568966,2.75751724 24.6175862,2.36855172 C23.6782759,1.98165517 22.6106897,1.78717241 21.4168966,1.78717241 C20.2086207,1.78717241 19.1327586,1.98165517 18.1934483,2.36855172 C17.6017241,2.61268966 17.067931,2.92510345 16.592069,3.30372414 L16.7803448,3.73613793 L18.0072414,6.4982069 C18.0651724,6.42993103 18.8513793,5.01062069 21.4396552,5.01062069 C22.9003448,5.01062069 24.0796552,5.53406897 24.6589655,6.28303448 C25.4286207,7.27613793 25.8010345,8.40372414 25.8072414,10.1788966 C25.8113793,12.0161379 25.3148276,13.3278621 24.5224138,14.2071724 C23.907931,14.892 22.8403448,15.3513103 21.4396552,15.3513103 C20.2562069,15.3513103 18.807931,14.9913103 18.0796552,13.9361379 C17.5582759,13.1809655 17.1010345,12.0823448 17.1031034,10.2451034 L17.1031034,10.092 L17.1010345,10.092 C17.1010345,10.0402759 17.1010345,9.99268966 17.0989655,9.94096552 C17.0803448,8.73682759 16.9768966,7.65475862 16.6541379,6.68855172 C16.3106897,5.6582069 15.8162069,4.77682759 15.1665517,4.04855172 C14.5168966,3.31613793 13.7224138,2.75751724 12.7831034,2.36648276 C11.8417241,1.97958621 10.7741379,1.78717241 9.58241379,1.78717241 C8.40103448,1.78717241 7.3437931,1.97958621 6.40448276,2.36648276 C5.46310345,2.75751724 4.66034483,3.31613793 3.9962069,4.04855172 C3.33206897,4.77682759 2.82517241,5.6582069 2.47344828,6.68855172 C2.1237931,7.71889655 1.94793103,8.88372414 1.94793103,10.1788966 C1.94793103,11.4782069 2.1237931,12.6430345 2.47344828,13.6713103 C2.82517241,14.7016552 3.33,15.5830345 3.98586207,16.3133793 C4.64172414,17.0437241 5.44034483,17.6044138 6.37965517,17.9933793 C7.31896552,18.3802759 8.38655172,18.5747586 9.58241379,18.5747586 C10.7886207,18.5747586 11.8644828,18.3802759 12.8037931,17.9933793 C13.3955172,17.7492414 13.9293103,17.4368276 14.4072414,17.0582069 L14.2168966,16.6257931 L12.992069,13.8616552 C12.932069,13.932 12.1458621,15.3513103 9.55965517,15.3513103 C8.09689655,15.3513103 6.91758621,14.8278621 6.33827586,14.0788966 C5.57068966,13.0857931 5.19827586,11.9582069 5.19206897,10.1788966 C5.18586207,8.34372414 5.68241379,7.03406897 6.47482759,6.15475862 C7.09137931,5.46993103 8.15689655,5.01062069 9.55965517,5.01062069 C10.7410345,5.01062069 12.1893103,5.36855172 12.9196552,6.42786207 C13.4410345,7.18096552 13.8693103,8.27958621 13.8672414,10.1168276 L13.8693103,10.1168276 L13.8693103,10.2864828 C13.8713793,10.332 13.8713793,10.3754483 13.8713793,10.4209655 C13.892069,11.6230345 14.0224138,12.7071724 14.3431034,13.6733793 C14.6865517,14.7016552 15.1831034,15.5851034 15.8306897,16.3133793 C16.4824138,17.0437241 17.2748276,17.6044138 18.2162069,17.9933793 C19.1575862,18.3802759 20.2231034,18.5747586 21.4168966,18.5747586 C22.5962069,18.5747586 23.6534483,18.3802759 24.5948276,17.9933793 C25.5362069,17.6044138 26.3389655,17.0437241 27.0031034,16.3133793 C27.6651724,15.5851034 28.1741379,14.7016552 28.5237931,13.6733793 C28.8755172,12.6430345 29.0493103,11.4782069 29.0493103,10.1788966 C29.0493103,8.88372414 28.8755172,7.71889655 28.5237931,6.68855172" id="Fill-13" fill="#3A3A3A" mask="url(#mask-10)"></path>
                            </g>
                        </g>
                        <rect id="line" fill="#606470" x="44" y="246" width="507" height="1"></rect>
                        <rect id="line备份" fill="#606470" x="44" y="292" width="507" height="1"></rect>
                        <rect id="line备份" fill="#606470" x="44" y="435" width="507" height="1"></rect>
                        <text id="Description" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="109.195923" y="349">Description</tspan>
                        </text>
                        <text id="MDR-for-the-Month-of" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="50" y="408">{{currentInvioceData.description}}</tspan>
                        </text>
                        <text id="VAT:-5%-VAT-is-inclu" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="54" y="530">VAT: 5% VAT is inclusive in MDR.</tspan>
                        </text>
                        <text id="725,702.00" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="244.312256" y="408">{{currentInvioceData.amt | formatCurrency}}</tspan>
                        </text>
                        <text id="10,522.68" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="322.099854" y="408">{{currentInvioceData.fee | formatCurrency}}</tspan>
                        </text>
                        <text id="5%" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="382.202881" y="408">{{currentInvioceData.feeratio}}</tspan>
                        </text>
                        <text id="501.08" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="424.593018" y="408">{{currentInvioceData.vat_fee | formatCurrency}}</tspan>
                        </text>
                        <text id="715,179.32" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="483.812256" y="408">{{currentInvioceData.settle_amt | formatCurrency}}</tspan>
                        </text>
                        <text id="715,179.32" :font-family="fontFamilyBold" font-size="11" fill="#2F323A">
                            <tspan x="483.812256" y="529">{{currentInvioceData.settle_amt | formatCurrency}}</tspan>
                        </text>
                        <text id="Transaction-Amount-(" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="241.603516" y="334">Transaction</tspan>
                            <tspan x="250.08252" y="348">Amount</tspan>
                            <tspan x="256.003784" y="362">(AED)</tspan>
                        </text>
                        <text id="MDR-(VAT-Inclusive)" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="332.612549" y="334">MDR</tspan>
                            <tspan x="332.977539" y="348">(VAT</tspan>
                            <tspan x="321.86499" y="362">Inclusive)</tspan>
                        </text>
                        <text id="VAT-Rate-(%)" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="384.768799" y="334">MDR</tspan>
                            <tspan x="385.536255" y="348">Rate</tspan>
                            <tspan x="388.725708" y="362">(%)</tspan>
                        </text>
                        <text id="VAT-Amount-(AED)" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="429.768799" y="334">VAT</tspan>
                            <tspan x="420.08252" y="348">Amount</tspan>
                            <tspan x="426.003784" y="362">(AED)</tspan>
                        </text>
                        <text id="Gross-Amount-(AED)" :font-family="fontFamilyBold" font-size="11.5" fill="#2F323A">
                            <tspan x="495.113281" y="334">Gross</tspan>
                            <tspan x="489.08252" y="348">Amount</tspan>
                            <tspan x="495.003784" y="362">(AED)</tspan>
                        </text>
                        <rect id="line备份-2" fill="#606470" transform="translate(464.500000, 269.500000) scale(1, -1) translate(-464.500000, -269.500000) " x="379" y="269" width="171" height="1"></rect>
                    </g>
                </g>
            </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import Store from '../../common/js/store';
  import {formatDate, formatData} from '../../common/js/util';
  import { tai, carb, cari } from "./gen_font";
  const fn = function() {
    this.addFileToVFS("calibri.ttf", tai);
    this.addFileToVFS("calibri bold.ttf", carb);
    this.addFileToVFS("calibri italic.ttf", cari);
    this.addFont("calibri.ttf", "Calibri", "normal");
    this.addFont("calibri bold.ttf", "Calibri-bold", "normal");
    this.addFont("calibri italic.ttf", "Calibri-italic", "normal");
  };

  export default {
    data() {
      const checkTaxNo = (rule, val, cb) => {
        if(val && !/^\d{15}$/.test(val)) {
          cb(this.$t('invoice.msg.m2'))
        } else {
          cb()
        }
      }
      return {
        loading: false,
        trnStatus: false,
        svg2pdf: {},
        JSPDF: {},
        trnForm: {},
        searchForm: {
          dateValue: this.getBeforeMonth()
        },
        shopList: [],
        invoiceData: {},
        reportList: [],
        pageSize: 10,
        currentPage: 1,
        fontFamily: "Calibri",
        fontFamilyBold: 'Calibri-bold',
        fontFamilyItalic: 'Calibri-italic',
        formrules: {
          tax_no: [
            {required: true, message: this.$t('invoice.msg.m2')},
            {validator: checkTaxNo, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      if (Store.get('role').taxNo) {
        this.trnStatus = true
        this.getInvoiceData()
      }
    },
    mounted() {
      setTimeout(() => {
        this.createDialog();
      }, 2000);

      require.config({
        baseUrl: "../../../node_modules"
      });
      require(["zworks/dist/svg2pdf.min", "jspdf-yworks/dist/jspdf.min"], (
        svg2pdf,
        jsPDF
      ) => {
        this.svg2pdf = svg2pdf;
        this.JSPDF = jsPDF;
        jsPDF.API.events.push(["addFonts", fn]);
      });
    },
    computed: {
      shopData() {
        return this.$store.state.shopData;
      },
      basicParams() {
        let str = 'yyyy-MM';
        return {
          date: typeof this.searchForm.dateValue === 'string' ? this.searchForm.dateValue : formatDate(this.searchForm.dateValue, str),
          userid: this.searchForm.selectShopUid,
          page: this.currentPage - 1,
          size: this.pageSize,
          format: 'cors'
        }
      }
    },
    methods: {
      strSlice(str, num) {
        let length = str.length
        let resArr = []
        if (str.split('')[num] == ' ') {
          resArr.push(str.slice(0, num).trim(), str.slice(num).trim())
        } else {
          let index = str.slice(0, num).lastIndexOf(' ')
          resArr.push(str.slice(0, index).trim(), str.slice(index).trim())
        }
        return resArr
      },
      addRrnno() {
        this.$refs['trn-form'].validate((valid) => {
          if (valid) {
            axios.post(`${config.host}/merchant/user/add/tax`, {
              tax_no: this.trnForm.tax_no,
              format: 'cors'
            }).then((res) => {
              let data = res.data;
              if(data.respcd === config.code.OK) {
                let role = JSON.parse(localStorage.getItem('role'))
                localStorage.setItem('role', JSON.stringify(Object.assign({}, role, {taxNo: data.data.tax_no})))
                this.trnStatus = true
                this.getInvoiceData()
              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.$message.error(this.$t('common.netError'));
            })

          }
        })

      },
      getInvoiceData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.oHost}/fund/v1/find/vat/records`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.invoiceData = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          });
        }
      },
      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      },
      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }

        this.getInvoiceData();
      },
      generatePDF(type, no) {
        let width,
        height,
        pdf,
        margin = 10;
        document.querySelectorAll('.svgs').forEach((svgElement, index) => {
          if (index == 0) {
            width = svgElement.width.baseVal.value + 2 * margin;
            height = svgElement.height.baseVal.value + 2 * margin;
            pdf = new this.JSPDF("p", "pt", [width, height]);
            pdf.addFont("calibri.ttf", "Calibri", "normal");
            pdf.addFont("calibri bold.ttf", "Calibri-bold", "normal");
            pdf.addFont("calibri italic.ttf", "Calibri-italic", "normal");
          }
          pdf.addPage("a4", "p");
          this.svg2pdf(svgElement, pdf, {
            xOffset: 0,
            yOffset: 0,
            scale: 1
          });
          if (index == 0) {
            pdf.deletePage(1);
          }
        })
        pdf && type === 'single' ? pdf.save(`Invoice No_${no}_TRN.pdf`) : pdf.save(`Invoice No.pdf`);
        this.reportList = []
      },
      downAll() { // 下载全部
        this.getReportList()
      },
      downloadInvoice(row) { // 单个发票下载
        this.getReportInfo(row)
      },
      getReportList() {
        // ${config.oHost}
        axios.get(`${config.oHost}/fund/v1/download/all/vat/report`, {
          params: this.basicParams
        }).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.reportList = data.data.data
            if (data.data.data.length > 0) {
              this.$nextTick(() => {
                this.generatePDF('all');
              })
            }
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getReportInfo(row) {
        // ${config.oHost}
        if (row.id) {
          axios.get(`${config.oHost}/fund/v1/download/vat/report`, {
            params: {
              id: row.id,
              format: 'cors'
            }
          }).then((res) => {
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.reportList.push(data.data)
              this.$nextTick(() => {
                this.generatePDF('single', row.userid);
              })
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.$message.error(this.$t('common.netError'));
          });
        }
      },
      getBeforeMonth() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        if(month == 0) {
           year = year - 1;
           month = 11;
        } else {
          month--
        }
        return formatDate(new Date(year, month), 'yyyy-MM');
      },
      createDialog() {
        let tool = document.querySelector("#toolShow");
        if(!tool) {
          let toolShow = document.querySelector(".toolShow");
          // 创建弹框节点
          let el = document.createElement("div");
          el.innerHTML = this.$t('invoice.tip.m3');
          el.setAttribute('id', 'toolShow');
          if (toolShow) { // 由于是定时触发 当快速切换菜单后当前组件内容被销毁 toolShow 为null
            toolShow.appendChild(el);
            toolShow.addEventListener('mouseenter', function () {
              el.style.display = 'block';
            }, false);
            toolShow.addEventListener('mouseleave', function () {
              el.style.display = 'none';
            }, false);
          }
        }
      }
    }
  };
</script>

<style lang="scss">
.settlementInvoice {
  .panel-header {
    background-color: #FFFFFF;
  }
  .panel-body_inputsrn {
    padding: 28px 28px 30px;
  }
  .add-trn-desc {
    margin-bottom: 20px;
  }
  .add-trn-desc_item {
    line-height: 1.8;
    color: #FF8100;
  }
  .el-table {
    overflow: visible;
  }
  .el-table__header-wrapper {
    overflow: visible;
  }
  th.toolShow {
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: visible;
    .cell.toolShow:after {
      content: "?";
      font-size: 13px;
      color: #fff;
      border: 1px solid transparent;
      border-radius: 50%;
      background: #c2c2c2;
      padding: 0 4px;
      margin-left: 5px;
    }
  }
  #toolShow {
    position: absolute;
    display: none;
    z-index: 1000;
    max-width: 180px;
    background: #fff;
    font-size: 13px;
    color: #262424;
    left: -80px;
    top: 34px;
    padding: 15px;
    line-height: 22px;
    white-space: normal;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
}
</style>
