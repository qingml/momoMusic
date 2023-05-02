<template>
  <div class="tag-bar__container">
    <div class="tag-bar__block">
      <div class="tag-bar__block--all" @click="handleClickAll">
        {{ currentTag || "全部" }}
      </div>
      <div class="tag-bar__block--hot-list">
        <span>热门标签：</span>
        <span
          v-for="(item, key) in hotTagList"
          :key="key"
          @click="() => handleChangeHotTag(item, key)"
          :class="[item.activity ? 'active' : '']"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="tag-bar__popover" v-if="showTagPopover" ref="popoverRef">
      <div v-for="(item, itemKey) in catgoryList" :key="itemKey">
        <p class="tag-bar__popover--title">
          {{ item.name }}
        </p>
        <div class="tag-bar__popover--tag-list">
          <span
            v-for="(tagItem, tagKey) in item.list"
            :key="tagKey"
            @click="() => handleTagClick(itemKey, tagKey)"
            :class="[tagItem.activity ? 'active' : '']"
          >
            {{ tagItem.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  hotTagList: {
    type: Array,
    default: () => [],
  },

  catgoryList: {
    type: Array,
    default: () => [],
  },
});

const { hotTagList, catgoryList } = toRefs(props);

const emit = defineEmits(["changeTag"]);

const showTagPopover = ref(false);
const popoverRef = ref(null);
const currentTag = ref();

watch(currentTag, (newTag) => {
  emit("clickTag", newTag);
});

const changeHotTagStatus = (tagIndex) => {
  emit(
    "changeStatus",
    "hotTag",
    hotTagList.value.map((it, index) => ({
      ...it,
      activity: index === tagIndex,
    }))
  );
};

const changeTagCategoryStatus = (itemKey, tagKey) => {
  const newCategoryList = catgoryList.value.map((it, index) => {
    const { list } = it;

    if (itemKey === index) {
      return {
        ...it,
        list: list.map((listItem, listIndex) => ({
          ...listItem,
          activity: listIndex === tagKey,
        })),
      };
    }

    return {
      ...it,
      list: list.map((listItem) => ({ ...listItem, activity: false })),
    };
  });

  emit("changeStatus", "catgoryList", newCategoryList);
};

const handleChangeHotTag = (tagItem, tagIndex) => {
  const currentCategory = catgoryList.value.find(
    (it) => +it.key === +tagItem.category
  );

  const curretnTagIndex = currentCategory?.list.findIndex(
    (it) => it.name === tagItem.name
  );

  if (curretnTagIndex > -1) {
    handleTagClick(tagItem.category, curretnTagIndex);
  } else {
    currentTag.value = tagItem.name;
    changeHotTagStatus(tagIndex);
    changeTagCategoryStatus(-1, -1);
  }
};

const handleClickAll = () => {
  const showStatus = !showTagPopover.value;
  showTagPopover.value = !showTagPopover.value;
  if (showStatus) {
    setTimeout(() => {
      popoverRef.value.style.top = "42px";
      popoverRef.value.style.opacity = 1;
    }, 0);
  }
};

const handleTagClick = (itemKey, tagKey) => {
  const tag = catgoryList.value[itemKey].list[tagKey];

  // change curretTag
  currentTag.value = tag.name;

  const hotTagIndex = hotTagList.value.findIndex((it) => it.name === tag.name);

  // change hot tag activity
  changeHotTagStatus(hotTagIndex);

  // change tagCatoryList tag activity
  changeTagCategoryStatus(itemKey, tagKey);

  showTagPopover.value = false;
};
</script>

<style lang="less" scoped>
.tag-bar {
  &__container {
    position: relative;
    width: 100%;
  }

  &__block {
    display: flex;
    align-items: center;
    box-shadow: 0px 5px 40px -1px rgb(2 10 18 / 10%);
    background-color: #fff;
    border-radius: 8px;
    font-size: 14px;
    overflow: hidden;

    &--all {
      padding: 8px 20px;
      background-color: red;
      color: #fff;
      min-width: 80px;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      margin-right: 20px;
    }

    &--hot-list {
      color: #4a4a4a;
      span {
        margin-right: 6px;
        padding: 6px;

        &:not(:first-child) {
          cursor: pointer;
          margin-right: 8px;
          padding: 6px 12px;

          &:hover {
            background-color: #f7f7f7;
            border-radius: 6px;
          }

          &.active {
            background-color: #f7f7f7;
            border-radius: 6px;
            color: red;
          }
        }
      }
    }
  }

  &__popover {
    position: absolute;
    top: 82px;
    margin-top: 12px;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    width: 868px;
    transition: all 1s;
    opacity: 0;
    z-index: 9;

    &--title {
      font-weight: bold;
    }

    &--tag-list {
      padding: 8px;
      span {
        display: inline-block;
        padding: 8px 16px;
        background: #f7f7f7;
        border-radius: 16px;
        margin: 0 8px 8px 0;
        cursor: pointer;
        font-size: 12px;
        color: #161e27;
        transition: all 0.4s;

        &.active {
          background-color: red;
          color: #fff;
        }

        &:hover {
          background-color: red;
          color: #fff;
        }
      }
    }
  }
}
</style>
