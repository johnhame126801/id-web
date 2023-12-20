<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from 'ant-design-vue';
import { clearEmailApi, clearCardApi, clearIdApi, clearOrderApi, getStatisticInfoApi } from '@/api/api';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const unusedEmailCount = ref<number>(0);
const usaCardCount = ref<number>(0);
const unbindIdCount = ref<number>(0);
const unassignIdCount = ref<number>(0);

const clearEmail = () => {
  Modal.confirm({
    title: '确认清理邮箱？',
    content: '清理邮箱将会删除所有邮箱数据，此操作不可逆，请谨慎操作',
    onOk: async () => {
      try {
        const res = await clearEmailApi();
        if (res.data.code === 200) {
          Modal.success({
            title: '清理成功',
            content: '清理邮箱成功',
          });
        } else {
          Modal.error({
            title: '清理失败',
            content: res.data.msg,
          });
        }
      } catch (e) {
        Modal.error({
          title: '清理失败',
          content: '清理失败，请稍后重试',
        });
      }
    }
  });
}

const clearCard = () => {
  Modal.confirm({
    title: '确认清理美卡？',
    content: '清理美卡将会删除所有美卡数据，此操作不可逆，请谨慎操作',
    onOk: async () => {
      try {
        const res = await clearCardApi();
        if (res.data.code === 200) {
          Modal.success({
            title: '清理成功',
            content: '清理美卡成功',
          });
        } else {
          Modal.error({
            title: '清理失败',
            content: res.data.msg,
          });
        }
      } catch (e) {
        Modal.error({
          title: '清理失败',
          content: '清理失败，请稍后重试',
        });
      }
    }
  });
}

const clearId = () => {
  Modal.confirm({
    title: '确认清理ID？',
    content: '清理ID将会删除所有ID数据，此操作不可逆，请谨慎操作',
    onOk: async () => {
      try {
        const res = await clearIdApi();
        if (res.data.code === 200) {
          Modal.success({
            title: '清理成功',
            content: '清理ID成功',
          });
        } else {
          Modal.error({
            title: '清理失败',
            content: res.data.msg,
          });
        }
      } catch (e) {
        Modal.error({
          title: '清理失败',
          content: '清理失败，请稍后重试',
        });
      }
    }
  });
}

const clearOrder = () => {
  Modal.confirm({
    title: '确认清理卡密？',
    content: '清理卡密将会删除所有卡密数据，此操作不可逆，请谨慎操作',
    onOk: async () => {
      try {
        const res = await clearOrderApi();
        if (res.data.code === 200) {
          Modal.success({
            title: '清理成功',
            content: '清理卡密成功',
          });
        } else {
          Modal.error({
            title: '清理失败',
            content: res.data.msg,
          });
        }
      } catch (e) {
        Modal.error({
          title: '清理失败',
          content: '清理失败，请稍后重试',
        });
      }
    }
  });
}

const reloadStatistic = async () => {
  try {
    const res = await getStatisticInfoApi();
    if (res.data.code === 200) {
      unusedEmailCount.value = res.data.data.unbindEmailCount;
      usaCardCount.value = res.data.data.usaCardCount;
      unbindIdCount.value = res.data.data.unbindIdCount;
      unassignIdCount.value = res.data.data.unAssignIdCount;
    }
  } catch (e) {
    console.log('加载统计信息失败' + e);
  }
}

onMounted(() => {
  reloadStatistic();
});

</script>

<template>
  <div class="container">
    <a-typography-title :level="2" style="margin-top: 20px;">数据管理</a-typography-title>
    <div style="color: red; font-weight: bold;">
      *本页面所有操作均不可逆，请慎重操作
    </div>
    <div class="operation">
      <a-card style="width: 300px; margin-right: 20px;">
        <p slot="title">未使用邮箱</p>
        <a-statistic :value="unusedEmailCount" :precision="0"></a-statistic>
      </a-card>
      <a-card style="width: 300px; margin-right: 20px;">
        <p slot="title">美卡数量</p>
        <a-statistic :value="usaCardCount" :precision="0"></a-statistic>
      </a-card>
      <a-card style="width: 300px; margin-right: 20px;">
        <p slot="title">未绑定ID</p>
        <a-statistic :value="unbindIdCount" :precision="0"></a-statistic>
      </a-card>
      <a-card style="width: 300px; margin-right: 20px;">
        <p slot="title">未分配ID</p>
        <a-statistic :value="unassignIdCount" :precision="0"></a-statistic>
      </a-card>
    </div>
    <div class="operation">
      <a-upload
        name="file"
        :action="baseUrl + '/email/upload'"
      >
        <a-button type="primary">
          上传邮箱
        </a-button>
      </a-upload>
      <a-upload
        style="margin-left: 30px;"
        name="file"
        :action="baseUrl + '/card/upload'"
      >
        <a-button type="primary">
          上传美卡
        </a-button>
      </a-upload>
    </div>
    <div class="operation">
      <a-button type="primary" danger @click="clearEmail">清理邮箱</a-button>
      <a-button style="margin-left: 20px;" type="primary" danger @click="clearCard">清理美卡</a-button>
      <a-button style="margin-left: 20px;" type="primary" danger @click="clearId">清理ID</a-button>
      <a-button style="margin-left: 20px;" type="primary" danger @click="clearOrder">清理卡密</a-button>
    </div>
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
