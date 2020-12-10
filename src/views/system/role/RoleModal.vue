<template>
  <a-modal
    title="操作"
    style="top: 20px;"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">

      <a-form-item style="display:none">
        <a-input v-decorator="['roleId']"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="角色名称"
      >
        <a-input
          v-decorator="[
            'roleName',
            {
              rules: [{ required: true, message: '请输入角色名称' }]
            }
          ]"
          placeholder="起一个名字"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="权限字符"
      >
        <a-input
          v-decorator="['roleKey',{rules: [{ required: true, message: '请输入权限字符' }]}]"
          placeholder="权限字符"/>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="状态"
      >
        <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: '请选择状态' }]}]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">禁用</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>

  </a-modal>
</template>

<script>
import { saveRole } from '@/api/system/role'
import pick from 'lodash.pick'

export default {
  name: 'RoleModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
  },
  methods: {
    add () {
      this.form.resetFields()
      this.edit({ })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'roleId', 'roleName', 'status', 'roleKey'))
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk (e) {
      const _this = this
      // 如果没有check过，半选节点是拿不到的，只能通过预先设置的pidSet获取
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          _this.confirmLoading = true
          saveRole(Object.assign(values)).then(res => {
            if (res.code === 0) {
              _this.$message.success('保存成功')
              _this.$emit('ok')
              _this.visible = false
            } else {
              _this.$message.success(res.msg)
            }
          }).catch(() => {
            _this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            _this.confirmLoading = false
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
    }

  }
}
</script>
