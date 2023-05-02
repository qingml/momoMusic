<template>
  <header>
    <div class="top-bar__logo" />
    <div class="top-bar__name">momoMusic</div>
    <div class="top-bar__wrapper">
      <nav>
        <RouterLink v-for="(item, index) in data" :key="index" :to="item.path">
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="top-bar__right-block">
        <div class="top-bar__search" @click="handleSearchClick">
          <i class="iconfont icon-search" />
        </div>
        <div class="top-bar__login">
          <span
            class="top-bar__login-text"
            v-if="!loginStore.loginStatus"
            @click="handleLogin"
            >登录</span
          >
          <div v-else class="top-bar__user-info">
            <img :src="loginStore.userInfo?.avatarUrl" />
            <div
              class="user-nickname"
              @click="showUserPopover = !showUserPopover"
            >
              <span>{{ loginStore.userInfo?.nickname }}</span>
              <i class="iconfont icon-jiantouxia" />
            </div>
            <div class="user-info-popover" v-if="showUserPopover">
              <div class="wrapper">
                <div @click="handleJump">
                  <i class="iconfont icon-gerenzhuye" />
                  <span>个人主页</span>
                </div>
                <div @click="handleSignOut">
                  <i class="iconfont icon-tuichudenglu" />
                  <span>退出登录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <SearchOverLay v-model:visible="searchOverlayVisible" />
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, PropType, ref, watch } from "vue";
import { useLoginStore } from "@/stores/login";
import SearchOverLay from "./components/search-overlay/index.vue";
import { logout } from "@/api/login";
import { storeToRefs } from "pinia";

interface IMenuItem {
  path: string;
  name: string;
}

defineProps({
  data: {
    type: Array as PropType<IMenuItem[]>,
    default: () => [],
  },
});

const searchOverlayVisible = ref(false);
const showUserPopover = ref(false);

const loginStore = useLoginStore();
const {loginStatus} = storeToRefs(loginStore)

const router = useRouter();
const { path } = useRoute();


const handleSearchClick = () => {
  searchOverlayVisible.value = true;
};

onMounted(async () => {
  loginStore.queryUserInfo();
});

const handleLogin = () => {
  router.push({
    path: "/login",
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  });
};

const handleSignOut = async () => {
  await logout();
  loginStore.setLoginStatus(false);
};

watch(loginStatus, (newVal) => {
  if (newVal) {
    showUserPopover.value = false;
  }
});

const handleJump = () => {
  showUserPopover.value = false;
  router.push(`/personal-info/${loginStore?.userInfo?.userId}`);
};
</script>

<style scoped lang="less">
header {
  display: flex;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  top: 0;
  align-items: center;
  vertical-align: middle;
}

.top-bar {
  &__logo {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: url(@/assets/img/logo.png) no-repeat 0 9999px;
    background-position: center;
    background-size: 90% 90%;
    margin-right: 4px;
  }

  &__name {
    font-family: fantasy;
    font-size: 18px;
    margin-right: 20px;
    line-height: 68px;
    position: relative;
    top: 2px;
  }

  &__wrapper {
    width: calc(100% - 160px);
    display: flex;
    justify-content: space-between;

    nav {
      font-size: 14px;
      text-align: center;
      line-height: 68px;

      a {
        padding: 0 16px;
      }

      a.router-link-exact-active {
        color: var(--color-text-red);
      }

      a.router-link-exact-active:hover {
        background-color: transparent;
      }

      a:first-of-type {
        border: 0;
      }
    }
  }

  &__right-block {
    display: flex;
    align-items: center;
  }

  &__search {
    i {
      font-size: 24px;
      cursor: pointer;
      margin-right: 24px;
    }
  }

  &__login {
    cursor: pointer;
    line-height: 68px;
  }

  &__user-info {
    line-height: 68px;
    font-size: 14px;
    display: flex;
    align-items: center;
    position: relative;

    img {
      margin: 0 12px 0 0;
      height: 36px;
      width: 36px;
      border-radius: 50%;
    }

    i {
      margin-left: 6px;
      font-size: small;
    }

    .user-info-popover {
      width: 110px;
      border-radius: 10px;
      position: absolute;
      top: 60px;
      left: 46px;
      background-color: #fff;
      z-index: 9999;
      box-shadow: 5px 0 12px -6px #141414;

      .wrapper {
        display: flex;
        flex-direction: column;

        div {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding-right: 6px;
          height: 40px;

          &:hover {
            color: var(--vt-c-text-light-2);
          }

          span {
            padding-left: 8px;
            line-height: 36px;
          }

          i {
            font-size: larger;
          }
        }
      }
    }
  }
}
</style>
