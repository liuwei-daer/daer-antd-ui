<template>
  <a-modal
    title="操作"
    style="top: 20px;"
    :width="700"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-spin :spinning="spinning">
      <a-form :form="form">
        <a-form-item style="display:none">
          <a-input v-decorator="['userId']"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户名"
        >
          <a-input placeholder="用户名" v-decorator="['username', {rules: [{ required: true, message: '请输入用户名' }]}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="部门"
        >
          <a-tree-select
            v-decorator="['deptId', {rules: [{ required: true, message: '请选择部门' }]}]"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="deptTree"
            placeholder="部门"
            treeDefaultExpandAll
          >
          </a-tree-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮箱地址"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: '请输入邮箱地址' }]
              }
            ]"
            placeholder="邮箱地址"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="性别"
        >
          <a-select v-decorator="['sex', {initialValue:'1'}]">
            <a-select-option :value="'1'">男</a-select-option>
            <a-select-option :value="'2'">女</a-select-option>
            <a-select-option :value="'3'">未知</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号状态"
        >
          <a-select v-decorator="['status', {initialValue:'0',rules: [{ required: true, message: '请选择状态' }]}]">
            <a-select-option :value="'0'">正常</a-select-option>
            <a-select-option :value="'1'">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户角色"
          hasFeedback
        >
          <a-select
            style="width: 100%"
            mode="multiple"
            v-decorator="['roles', {rules: [{ required: true, message: '请选择角色' }]}]"
            :allowClear="true"
          >
            <a-select-option v-for="(action) in roleAll" :key="action.id" >{{ action.roleName }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述"
        >
          <a-textarea :rows="5" placeholder="..." v-decorator="['remark']"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { saveUser, getUser, editUser } from '@/api/system/user'
import { getRoleAll } from '@/api/system/role'
import pick from 'lodash.pick'
export default {
  name: 'UserModal',
  props: {
    deptTree: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      description: '',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      roleAll: [],
      mdl: {},
      spinning: false,
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
    this.loadRoleAll()
  },
  methods: {
    add () {
      this.form.resetFields()
      this.mdl = Object.assign({}, { userId: 0, deptId: '' })
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'userId', 'username', 'deptId', 'email', 'sex', 'status', 'roles', 'remark'))
      })
    },
    edit (record) {
      if (record.userId > 0) {
        this.spinning = true
        getUser(record.userId).then(res => {
          this.mdl = Object.assign({}, res.data)
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.mdl, 'userId', 'username', 'deptId', 'email', 'sex', 'status', 'roles', 'remark'))
            this.spinning = false
          })
        })
      }
    },
    loadRoleAll () {
      getRoleAll().then(res => {
        this.roleAll = res.data
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          if (values.userId > 0) {
            console.log('修改用户：')
            this.addUser(values)
          } else {
            console.log('新增用户')
            this.addUser(values)
          }
        }
      })
    },
    addUser (values) {
      saveUser(values).then(res => {
        if (res.code === 0) {
          this.$message.success('新增用户成功')
          this.$emit('ok')
          this.visible = false
        } else {
          this.$message.success(res.msg)
        }
      }).catch(() => {
        this.$message.error('系统错误，请稍后再试')
      }).finally(() => {
        this.confirmLoading = false
      })
    }
  },
  editUser (values) {
    editUser(values).then(res => {
      if (res.code === 0) {
        this.$message.success('修改用户成功')
        this.$emit('ok')
        this.visible = false
      } else {
        this.$message.success(res.msg)
      }
    }).catch(() => {
      this.$message.error('系统错误，请稍后再试')
    }).finally(() => {
      this.confirmLoading = false
    })
  }
}
</script>
