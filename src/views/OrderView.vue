<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from 'ant-design-vue';
import { getAllOrder, createOrder, deleteOrder } from '@/api/api';
import { clearEmailApi, clearCardApi, clearIdApi, clearOrderApi, getStatisticInfoApi } from '@/api/api';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const unusedEmailCount = ref<number>(0);
const usaCardCount = ref<number>(0);
const unbindIdCount = ref<number>(0);
const unassignIdCount = ref<number>(0);

const idCount = ref<string>();
const priority = ref<string>('0');
const orderNum = ref<string>('1');
const remark = ref<string>('');

const opLoading = ref(false);

const data = ref([]);

const columns = ref([
  {
    title: '卡密号',
    dataIndex: 'id',
    key: 'id',
    width: 300
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    width: 80
  },
  {
    title: '生成时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '发放数量',
    dataIndex: 'idCount',
    key: 'idCount',
    width: 100
  },
  {
    title: '已分配数量',
    dataIndex: 'assignNum',
    key: 'assignNum',
    width: 100
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  }
]);

const selectedRowKeys = ref<any>([]);

const handleSelectChange = (keys: any[]) => {
  selectedRowKeys.value = keys;
};

const reloadOrderList = async () => {
  try {
    const res = await getAllOrder();
    if (res.data.code === 200) {
      data.value = res.data.data;
      data.value.forEach((item: any) => {
        item.key = item.id;
      });
    } else {
      Modal.error({
        title: '加载失败',
        content: res.data.msg,
      });
    }
  } catch (error) {
    Modal.error({
      title: '加载失败',
      content: '加载订单数据失败',
    });
  }
}

onMounted(async () => {
  reloadOrderList();
  reloadStatistic();
});

const requestCreateOrder = async () => {
  if (!idCount.value || idCount.value === '') {
    Modal.warning({
      title: '提示',
      content: '请填写发放数量',
    });
    return;
  }

  if (!orderNum.value || orderNum.value === '') {
    Modal.warning({
      title: '提示',
      content: '请填写生成数量',
    });
    return;
  }

  try {
    opLoading.value = true;
    const res = await createOrder({
      idCount: idCount.value,
      priority: priority.value,
      orderNum: orderNum.value,
      remark: remark.value
    });
    opLoading.value = false;
    if (res.data.code === 200) {
      Modal.success({
        title: '成功',
        content: '生成卡密成功',
      });
      reloadOrderList();
    } else {
      Modal.error({
        title: '失败',
        content: res.data.msg,
      });
    }
  } catch (error) {
    opLoading.value = false;
    Modal.error({
      title: '失败',
      content: '生成卡密失败',
    });
  }
}

const requestDeleteOrder = () => {
  if (selectedRowKeys.value.length === 0) {
    Modal.warning({
      title: '提示',
      content: '请选择要删除的卡密',
    });
    return;
  }

  Modal.confirm({
    title: '提示',
    content: '确认删除选中的卡密吗？',
    onOk: async () => {
      try {
        opLoading.value = true;
        const res = await deleteOrder(selectedRowKeys.value);
        opLoading.value = false;
        if (res.data.code === 200) {
          Modal.success({
            title: '成功',
            content: '删除卡密成功',
          });
          reloadOrderList();
        } else {
          Modal.error({
            title: '失败',
            content: res.data.msg,
          });
        }
      } catch (error) {
        opLoading.value = false;
        Modal.error({
          title: '失败',
          content: '删除卡密失败',
        });
      }
    }
  });
}

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

</script>

<template>
  <div class="container">
    <a-typography-title :level="2" style="margin-top: 20px;">卡密管理</a-typography-title>
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
    <div class="operation">
      <div class="item">
        <a-typography-title :level="5" style="text-align: left;">发放数量</a-typography-title>
        <a-tooltip title="卡密能提取的账号数量" :color="'rgba(0, 0, 0, 0.7)'" placement="bottom">
          <a-input-number style="width: 150px;" v-model:value="idCount" :min="1" :max="100000" placeholder="请输入"/>
        </a-tooltip>
      </div>
      <div class="item">
        <a-typography-title :level="5" style="text-align: left;">优先级</a-typography-title>
        <a-tooltip title="0优先级最高，优先发放优先级高的卡密" :color="'rgba(0, 0, 0, 0.7)'" placement="bottom">
          <a-select style="width: 150px; text-align: left;" v-model:value="priority">
            <a-select-option value="0">0</a-select-option>
            <a-select-option value="1">1</a-select-option>
          </a-select>
        </a-tooltip>
      </div>
      <div class="item">
        <a-typography-title :level="5" style="text-align: left;">生成数量</a-typography-title>
        <a-tooltip title="生成卡密的数量" :color="'rgba(0, 0, 0, 0.7)'" placement="bottom">
          <a-input-number style="width: 150px;" :value="orderNum" :min="1" :max="100000" placeholder="请输入"/>
        </a-tooltip>
      </div>
      <div class="item">
        <a-typography-title :level="5" style="text-align: left;">备注</a-typography-title>
        <a-input style="width: 150px;" placeholder="请输入" v-model:value="remark"></a-input>
      </div>
      <div class="item-operate">
        <a-button type="primary" :loading="opLoading" @click="requestCreateOrder">生成卡密</a-button>
        <a-button style="margin-left: 20px;" type="primary" danger :loading="opLoading" @click="requestDeleteOrder">删除选中卡密</a-button>
      </div>
    </div>
    <div class="main">
      <a-table :columns="columns" :data-source="data" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelectChange }" :pagination="false" size="middle">
        
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="less">

.container {
  width: 1000px;
  text-align: center;
  .operation {
    display: flex;
    margin-top: 20px;
    .item {
      width: 20%;
      display: flex;
      flex-direction: column;
    }
    .item-operate {
      width: 20%;
      display: flex;
      align-items: center;
    }
  }

  .main {
    margin-top: 14px;
  }
}

</style>
