<template>
  <div class="login__wrapper">
    <div class="login__wrapper-overlay"></div>
    <div class="login__container">
      <div class="logo-wrapper">
        <div class="logo-icon"></div>
        <div class="logo-name">MOMOMUSIC</div>
      </div>
      <div class="login-area">
        <el-form
          ref="formRef"
          :model="loginForm"
          :rule="rules"
          status-icon
          label-width="0px"
          label-position="top"
        >
          <el-form-item label="" prop="phone" required>
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入网易云音乐手机号"
            />
          </el-form-item>
          <el-form-item label="" prop="password" required>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";
import { useLoginStore } from "@/stores/login";
import { useRoute, useRouter } from "vue-router";

const formRef = ref<FormInstance>();

const loginForm = reactive({
  phone: "",
  password: "",
});

const loginStore = useLoginStore();

const { query } = useRoute();
const router = useRouter();

const rules = reactive({
  phone: [{ required: true, message: "手机号都没有！", trigger: "blur" }],
  password: [{ required: true, message: "密码呢！", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { redirect = "/" } = query;
      loginStore.setLogin(loginForm.phone, loginForm.password, () => {
        router.push({ path: redirect as string });
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="less">
.login {
  &__wrapper {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9998;
    background: url(@/assets/img/login-background1.png) no-repeat 0 9999px;
    background-position: center;
    background-size: cover;

    &-overlay {
      width: 100%;
      height: 100%;
      background-color: rgb(190, 237, 199);
      opacity: 0.7;
      z-index: 9998;
    }
  }

  &__container {
    box-shadow: 1px 2px 15px rgb(0 0 0 / 30%);
    width: 300px;
    height: 440px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    // background: url(@/assets/login-area-bgi.png) no-repeat 0 9999px;
    // background-position: center;
    // background-size: cover;
   background-color: white;
    z-index: 9999;
    opacity: 1;

    .logo-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      text-align: center;
      padding-top: 40px;

      .logo-icon {
        display: inline-block;
        width: 54px;
        height: 54px;
        background: url(@/assets/img/logo.png) no-repeat 0 9999px;
        background-position: 0;
        background-size: contain;
      }
      .logo-name {
        font-family: PingFang SC, Arial, Microsoft YaHei, sans-serif;
        color: #4a4a4a;
        font-weight: 400;
      }
    }

    // .el-form{

    // }

    .login-area {
      padding-top: 40px;
      text-align: center;

      .el-form {
        width: 260px;
        display: inline-block;
      }
    }
    .el-button--primary {
      width: 260px;
      font-weight: 400;
      border-color:RGB(190, 237, 199);
      background-color: RGB(190, 237, 199);
    }
  }
}
</style>
