<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <search-tree
          :treeData="deptTree"
          :dataList="dataList"
          :expandedKeys="expandedKeys"
          :holderText="holderText"
          @select="handleSelect"
        >
        </search-tree>
      </a-col>
      <a-col :span="19">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="7" d:sm="15">
                <a-form-item label="用户名">
                  <a-input placeholder="请输入" v-model="queryParam.userName"/>
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <a-form-item label="状态">
                  <a-select placeholder="请选择" v-model="queryParam.status" >
                    <a-select-option :value="''">全部</a-select-option>
                    <a-select-option :value="'0'">正常</a-select-option>
                    <a-select-option :value="'1'">禁用</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
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
          rowKey="userId"
          :columns="columns"
          :data="loadData"
        >
          <span slot="sex" slot-scope="text">
            {{ text | sexFilter }}
          </span>
          <span slot="status" slot-scope="text,record">
            <a-switch checked-children="启用" un-checked-children="禁用" :checked="record.status=='0'" @change="onChangeStatus(record)"/>
          </span>
          <span slot="action" slot-scope="text, record">
            <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a v-if="removeEnable" @click="delById([record.userId])">删除</a>
            <a-divider type="vertical" />
            <a v-if="resetPwdEnabel" @click="resetPwd(record)">重置密码</a>
          </span>
        </s-table>
      </a-col>
    </a-row>
    <user-modal ref="modal" @ok="handleOk" :deptTree="deptTree"/>
    <user-pwd-modal ref="pwdmodal"/>
  </a-card>
</template>

<script>
import { STable, SearchTree } from '@/components'
import { getUserList, delUser, changUserStatus } from '@/api/system/user'
import { getDeptTree } from '@/api/system/dept'
import UserModal from './UserModal'
import UserPwdModal from './UserPwdModal'
import pick from 'lodash.pick'
import { checkPermission } from '@/utils/permissions'
export default {
  name: 'UserList',
  components: {
    SearchTree,
    STable,
    UserModal,
    UserPwdModal
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: 'indexNum',
          customRender: (text, record, index) => index + 1
        },
        {
          title: '用户名',
          dataIndex: 'userName'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          scopedSlots: { customRender: 'sex' }
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
        return getUserList(Object.assign(parameter, this.queryParam))
      },
      deptTree: [],
      expandedKeys: [],
      dataList: [],
      holderText: '搜索部门',
      addEnable: checkPermission('system:user:add'),
      editEnabel: checkPermission('system:user:edit'),
      resetPwdEnabel: checkPermission('system:user:resetPwd'),
      removeEnable: checkPermission('system:user:remove')
    }
  },
  filters: {
    sexFilter (sex) {
      const menuMap = {
        '1': '男',
        '2': '女',
        '3': '未知'
      }
      return menuMap[sex]
    }
  },
  created () {
    getDeptTree().then(res => {
      const data = res.data
      if (data.length > 0) {
        const min = Math.min(...data.map(m => m.parentId))
        this.buildtree(data, this.deptTree, min)
        this.expandedKeys = data.map(m => m.parentId)
        this.dataList = data.map(m => {
          return { key: m.deptId, title: m.deptName }
        })
      }
    })
  },
  methods: {
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    resetPwd (record) {
      this.$refs.pwdmodal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    delById (userId) {
      delUser(userId).then(res => {
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
      changUserStatus(pick(record, 'id', 'status')).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.id,
            value: item.id, // value是给modal的select用的，2者属性不一样
            title: item.name,
            scopedSlots: { title: 'title' },
            children: []
          }
          this.buildtree(list, child.children, item.id)
          if (child.children.length === 0) { delete child.children }
          arr.push(child)
        }
      })
    },
    // 下面是树相关方法
    handleSelect (selectedKeys, info) {
      this.queryParam = {
        deptId: selectedKeys[0]
      }
      this.$refs.table.refresh(true)
    }
  }
}
</script>
