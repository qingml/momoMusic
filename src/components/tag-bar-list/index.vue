<template>
  <div class="tag-bar-list__container">
    <div class="tag-bar-list-area">
      <span
        v-for="(item, index) in areaData"
        :key="index"
        @click="() => handelChangeTag(index, 'area', item.key)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="tag-bar-list-type">
      <span
        v-for="(item, index) in typeData"
        :key="index"
        @click="() => handelChangeTag(index, 'type', item.key)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
    <div
      :class="[
        isMV ? 'tag-bar-list-initial' : 'tag-bar-list-initial artist',
      ]"
    >
      <span
        v-for="(item, index) in initialData"
        :key="index"
        @click="() => handelChangeTag(index, 'initial', item.key)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  areaData: {
    type: Array,
    default: () => [],
  },
  typeData: {
    type: Array,
    default: () => [],
  },
  initialData: {
    type: Array,
    default: () => [],
  },
  isMV: {
    type: Boolean,
    default: false,
  },
});

const { areaData, typeData, initialData } = toRefs(props);

const emit = defineEmits(["changeData"]);

const handelChangeTag = (index, type, val) => {
  if (type === "area") {
    handelChangeTagStatus(index, "area", val, areaData);
  } else if (type === "type") {
    handelChangeTagStatus(index, "type", val, typeData);
  } else {
    handelChangeTagStatus(index, "initial", val, initialData);
  }
};

const handelChangeTagStatus = (dataIndex, type, val, data) => {
  emit(
    "changeData",
    type,
    val,
    data.value.map((it, index) => ({
      ...it,
      activity: index === dataIndex,
    }))
  );
};
</script>

<style lang="less" scoped>
.tag-bar-list {
  &__container {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
  }

  &-area,
  &-type,
  &-initial {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    span {
      height: 28px;
      width: auto;
      padding: 0 15px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      // background-color: red;
      margin-right: 5px;
      vertical-align: center;
      line-height: 29px;

      &:hover {
        color: var(--vt-c-text-light-2);
      }

      &.active {
        background-color: red;
        color: #fff;
        font-weight: 700;
      }
    }
  }

  &-initial.artist {
    :not(:first-child) {
      width: 28px;
      height: 28px;
      padding: 0;
      margin-right: 12px;
      text-align: center;
      border-radius: 50%;
    }
  }
}
</style>
