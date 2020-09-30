<template>
  <div class="page">
    <h1 class="page__ttl">お問い合わせ</h1>

    <div class="form">
      <validation-observer v-slot="{ invalid }">
        <div class="input" v-if="!isConfirm">
          <dl class="form-box">
            <dt class="form-box__label">お名前</dt>
            <dd>
              <validation-provider name="name" rules="required" v-slot="{ errors }">
                <input type="text" v-model="inputName" rules="required" />
                <p class="error-txt">{{ errors[0] }}</p>
              </validation-provider>
            </dd>
          </dl>
          <dl class="form-box">
            <dt class="form-box__label">メールアドレス</dt>
            <dd>
              <validation-provider name="email" rules="required|email" v-slot="{ errors }">
              <input type="email" v-model="inputEmail" />
              <p class="error-txt">{{ errors[0] }}</p>
              </validation-provider>
            </dd>
          </dl>
          <dl class="form-box">
            <dt class="form-box__label">お問い合わせ内容</dt>
            <dd>
              <validation-provider name="question" rules="required" v-slot="{ errors }">
                <textarea name="question" id="question" cols="30" rows="10" v-model="inputBody"></textarea>
                <p class="error-txt">{{ errors[0] }}</p>
              </validation-provider>
            </dd>
          </dl>

          <button type="submit" class="send-btn" :disabled="invalid" @click="toConfirm()">確認する</button>
        </div><!--/.input-->
      </validation-observer>

      <div class="confirm" v-if="isConfirm">
        <p class="confirm__txt">以下内容で間違いないかご確認いただき、送信ボタンを押してください。</p>
        <dl class="form-box">
          <dt class="form-box__label">お名前</dt>
          <dd>{{inputName}}</dd>
        </dl>
        <dl class="form-box">
          <dt class="form-box__label">メールアドレス</dt>
          <dd>{{inputEmail}}</dd>
        </dl>
        <dl class="form-box">
          <dt class="form-box__label">お問い合わせ内容</dt>
          <dd>{{inputBody}}</dd>
        </dl>

        <button type="submit" class="send-btn" @click="toSend()">送信する</button>

      </div><!--/.input-->
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import axios from "axios";

extend('email', email);
extend('required', {
  ...required,
  message: '{_field_}を入力してください'
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      inputName: "",
      inputEmail: "",
      inputBody: "",
      isConfirm: false //確認画面へ遷移
    }
  },
  methods: {
    //確認画面への移動
    toConfirm() {
      this.isConfirm = true;
    },
    //フォームの送信
    toSend() {
      const submitParams = new FormData();

      //名前の送信
      submitParams.append("entry.1688498457", this.inputName);
      //メールアドレスの送信
      submitParams.append("entry.1176192065", this.inputEmail);
      //お問い合わせ内容の送信
      submitParams.append("entry.1343054385", this.inputBody);

      // CORSエラー対策
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      // Googleフォームのaction属性値
      const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc_VKpo6S5dJITke8928T7_pD5h0z_B6Km-wVN5euOXjOQvDQ/formResponse";

      //POST通信
      axios.post(CORS_PROXY + GOOGLE_FORM_ACTION, submitParams).then(() => {

        // 画面に移動
        this.$router.push({ name: "thanks" });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  margin: 40px auto 0;
  padding: 40px 0 0;
  border-top: 1px solid #d0d0d0;
  .form-box {
    + .form-box {
      margin-top: 25px;
    }
    dt {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 5px;
    }
    input[type="text"],
    input[type="email"],
    textarea {
      border-radius: 4px;
      padding: 10px;
      border: 1px solid #d0d0d0;
      font-size: 1.6rem;
      height: 50px;
      appearance: none;
      background: #fff;
      outline: 0;
    }
    input[type="text"],
    input[type="email"] {
      width: 340px;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    }
    textarea {
      width: 100%;
      height: 160px;
      resize: none;
    }
    //error
    .error input[type="text"],
    .error input[type="email"],
    .error textarea {
      border-color: #e20006;
      background: #fff6f6;
    }
    .error input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff6f6 inset;
    }
    .error-txt {
      font-size: 1.4rem;
      font-weight: 600;
      color: #e20006;
      margin-top: 10px;
    }
  }
  .send-btn {
    width: 200px;
    margin: 40px auto 0;
    appearance: none;
    border: none;
    box-shadow: none;
    border-radius: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ca0202;
    color: #fff;
    font-size: 1.6rem;
    position: relative;
    cursor: pointer;
    transition: .3s ease;
    &:disabled {
      background: #ccc;
      cursor:default;
    }
    &:hover {
      opacity: 0.7;
    }
    svg {
      width: 6px;
      height: 9px;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      fill: #fff;
    }
  }
  //確認画面
  .confirm {
    .confirm__txt {
      font-size: 1.8rem;
      margin-bottom: 30px;
    }
    .form-box + .form-box {
      margin-top: 50px;
    }
    .form-box dd {
      font-size: 1.6rem;
      margin-top: 10px;
    }
  }
}
</style>
