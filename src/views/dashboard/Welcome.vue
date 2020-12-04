<template>
  <page-header-wrapper :title="false">
    <div>
      <a-card :bordered="false">
        欢迎进入首页
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper
  }
}
</script>

<style lang="less" scoped>
@import './Workplace.less';
.changList {
  margin-top: -14px;
}
.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}
</style>
