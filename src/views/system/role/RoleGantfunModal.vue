<template>
  <a-modal
    title="角色授权"
    style="top: 20px;"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['roleId']"/>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="20">
          <a-col :span="19">
            <a-card style="height: 500px;overflow:auto;">
              <a-tree
                v-model="checkedKeys"
                checkable
                showLine
                autoExpandParent
                :tree-data="treeData"
              />
            </a-card>
          </a-col>
          <a-col :span="4">
            <br/><br/><br/><br/>
            <a-button type="primary">全选</a-button><br/><br/>
            <a-button type="primary" @click="cancelGantfun()">取消</a-button><br/><br/>
            <a-button type="primary" @click="resetGantfun()">重置</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { getPermsSelTree } from '@/api/system/perms'
export default {
  name: 'RoleGantfunModal',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      checkedKeys: [],
      treeData: [{ key: 0, value: '0', title: '无' }],
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.loadTreeData()
  },
  methods: {
    gantfun (roleId) {
      console.log('角色id：', roleId)
      this.checkedKeys = ['A01B01', 'A01B03']
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ roleId: roleId, permsCodeList: [] })
      })
    },
    resetGantfun () {
      this.checkedKeys = ['A01B01', 'A01B03']
    },
    cancelGantfun () {
      this.checkedKeys = []
    },
    handleOk (e) {
      e.preventDefault()
      console.log('授权提交：', this.checkedKeys)
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          values.permsCodeList = this.checkedKeys
          console.log('提交的值：', values)
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    loadTreeData () {
      getPermsSelTree({}).then(res => {
        this.treeData = res.data
        console.log(this.treeData)
      })
    }
  }
}
</script>
