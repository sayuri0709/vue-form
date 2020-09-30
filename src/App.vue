<template>
  <div id="app" class="wrapper">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>

</script>
<style lang="scss">
@import "@/assets/scss/reset.scss";
.wrapper {
  background: #f0eeee;
  min-height: 100vh;
  padding-top: 50px;
  .content {
    background: #fff;
    max-width: 980px;
    padding: 60px 40px;
    margin: 0 auto;
  }
  .page__ttl {
    font-size: 3.8rem;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .page__txt {
    font-size: 1.6rem;
    white-space: break-spaces;
    font-weight: 400;
    line-height: 1.7;
  }
}
</style>
