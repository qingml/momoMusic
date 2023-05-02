<template>
  <div class="singer-detail-info__container">
    <div class="singer-detail-info__block">
      <img :src="data.img1v1Url" class="singer-detail-info__block-img" />
      <p class="singer-detail-info__block-singername">{{ data.name }}</p>
      <div class="singer-detail-info__block-follow">
        <i class="iconfont icon-add"></i>
        关注TA
      </div>
      <div class="singer-detail-info__block-brefdescrip ellipsis-two">
        {{ data.briefDesc }}
      </div>
      <div class="singer-detail-info__block-worknumeber">
        <div class="singer-detail-info__block-worknumeber-songnum">
          <span class="num">{{ data.musicSize }}</span>
          <span class="itemname">单曲数</span>
        </div>
        <div class="singer-detail-info__block-worknumeber-ablumnum">
          <span class="num">{{ data.albumSize }}</span>
          <span class="itemname">专辑数</span>
        </div>
        <div class="singer-detail-info__block-worknumeber-mvnum">
          <span class="num">{{ data.mvSize }}</span>
          <span class="itemname">MV数</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less">
.singer-detail-info {
  &__container {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    position: relative;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
  }

  &__block {
    height: 370px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #fff;
      border: 3px solid rgba(255, 255, 255, 0.6);
      &:hover {
        box-shadow: 0px 5px 20px 0px rgb(255 255 255 / 80%);
      }
    }

    &-follow {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      width: 96px;
      line-height: 36px;
      font-size: 12px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.6);
      cursor: pointer;
      border-radius: 18px;
    }

    &-singername {
      padding-top: 15px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }

    &-brefdescrip {
      width: 730px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.6);
      line-height: 24px;
      margin-bottom: 24px;
    }
    &-worknumeber {
      width: 370px;
      height: 46px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;

        .num {
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 24px;
          color: #fff;
        }
        .itemname {
          font-size: 14px;
          line-height: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
