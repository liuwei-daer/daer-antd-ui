<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="7" :sm="15">
            <a-form-item label="角色名称">
              <a-input placeholder="请输入" v-model="queryParam.roleName"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParam.status" default-value="0">
                <a-select-option :value="''">全部</a-select-option>
                <a-select-option :value="0">正常</a-select-option>
                <a-select-option :value="1">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
    </div>
    <s-table
      size="default"
      ref="table"
      rowKey="roleId"
      :columns="columns"
      :data="loadData"
      defaultSort="createTime"
    >
      <span slot="status" slot-scope="text,record">
        <a-popconfirm
          v-if="removeEnable"
          :title="record.status === '0' ? '是否禁用' : '是否启用'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="onChangeStatus(record)"
        >
          <a-switch checked-children="启用" un-checked-children="禁用" :checked="record.status=='0'" />
        </a-popconfirm>
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="editEnabel" @click="handleScope(record)">授权</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delRoleById([record.roleId])">删除</a>
      </span>
    </s-table>
    <role-modal ref="modal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, delRole, changRoleStatus } from '@/api/system/role'
import RoleModal from './RoleModal.vue'
import pick from 'lodash.pick'
import { checkPermission } from '@/utils/permissions'
export default {
  name: 'RoleList',
  components: {
    STable,
    RoleModal
  },
  data () {
    return {
      description: '角色管理',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '角色编号',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '权限字符',
          dataIndex: 'roleKey'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('system:role:add'),
      editEnabel: checkPermission('system:role:edit'),
      removeEnable: checkPermission('system:role:remove')
    }
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleScope (record) {
      this.$refs.scopemodal.edit(record)
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delRoleById (id) {
      delRole(id).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onChangeStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      changRoleStatus(pick(record, 'roleId', 'status'))
    }
  }
}
</script>
