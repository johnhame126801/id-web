<script setup lang="ts">
import { ref } from 'vue';
import { getOrderAppleIDList } from '@/api/api';
import { Modal } from 'ant-design-vue';

const id = ref<string>('');
const data = ref<string>('');
const opLoading = ref<boolean>(false);

const search = async () => {
  try {
    opLoading.value = true;
    const res = await getOrderAppleIDList(id.value);
    opLoading.value = false;
    if (res.data.code === 200) {
      Modal.success({
        title: '查询成功',
        content: `查询到${res.data.data.length}条数据`
      });
      let str = '';
      res.data.data.forEach((item: any) => {
        str += `${item.email}----${item.password}----${item.usaCard}---${item.usaCardLink}\n`;
      });
      data.value = str;
    } else {
      Modal.error({
        title: '查询失败',
        content: res.data.msg,
      });
    }
  } catch (e) {
    opLoading.value = false;
    Modal.error({
      title: '查询失败',
      content: '查询失败，请稍后重试',
    });
  }
};

</script>

<template>
  <div class="container">
    <a-typography-title :level="2" style="margin-top: 20px;">卡密查询</a-typography-title>
    <div class="operation">
      <a-input placeholder="请输入卡密" style="width: 300px;" v-model:value="id"/>
      <a-button type="primary" style="margin-left: 20px;" :loading="opLoading" @click="search">查询</a-button>
    </div>
    <a-textarea style="margin-top: 20px; margin-bottom: 40px;" :rows="1000" readonly :value="data" placeholder="查询结果将在这里显示" />
  </div>
</template>

<style scoped lang="less">
.container {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .operation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
