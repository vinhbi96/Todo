<template>
  <div class="form-container">
    <!-- <span class="submit submit--error">Fail to sign up</span> -->
    <!-- <div class="submit submit--success">Success</div> -->
    <form class="form" @submit.prevent="onSubmit">
      <h4 class="font-semibold mt-10 text-lg">Dashboard</h4>
      <h5 class="text-sm mb-10 tracking-wide">Sign up to your account</h5>
      <div class="h-80">
        <div class="form-row" title="user name">
          <label for="">
            <input
              type="text"
              v-model="state.userName"
              placeholder="user name"
            />
          </label>
        </div>
        <div class="form-row" title="email">
          <label for="">
            <input
              type="email"
              v-model="state.email"
              @blur="v$.email.$touch()"
              placeholder="email"
            />
          </label>
          <span
            class="errormsg"
            v-if="v$.email.required.$invalid && v$.email.$dirty"
          >
            Đây là thông tin bắt buộc
          </span>
          <span
            class="errormsg"
            v-if="v$.email.email.$invalid && v$.email.$dirty"
          >
            Địa chỉ email không hợp lệ
          </span>
        </div>
        <div class="form-row" title="password">
          <label for="">
            <input
              type="password"
              v-model="state.password"
              @blur="v$.password.$touch()"
              placeholder="password"
            />
          </label>
          <span
            class="errormsg"
            v-if="v$.password.required.$invalid && v$.password.$dirty"
          >
            Đây là thông tin bắt buộc
          </span>
          <span
            class="errormsg"
            v-if="
              v$.password.maxLength.$invalid ||
              (v$.password.minLength.$invalid && v$.password.$dirty)
            "
          >
            Vui lòng nhập mật khẩu từ 6 đến 16 kí tự
          </span>
          <!-- <span
            class="errormsg"
            v-if="
              v$.password.maxLength.$invalid && v$.password.$dirty
            "
          >
            {{ v$.password.maxLength.$message}}
          </span> -->
        </div>
        <div class="form-row" title="confirm password">
          <label for="">
            <input
              type="password"
              v-model="state.confirmPassword"
              @blur="v$.confirmPassword.$touch()"
              placeholder="confirm password"
            />
          </label>
          <span
            class="errormsg"
            v-if="
              v$.confirmPassword.sameAs.$invalid && v$.confirmPassword.$dirty
            "
          >
            Mật khẩu không trùng khớp
          </span>
        </div>
      </div>
      <button type="submit" class="btn">Sign up</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "@vuelidate/validators";

export default {
  setup() {
    const users = ref([]);
    const errmsg = ref(false);

    const state = reactive({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(16),
        },
        confirmPassword: {
          sameAs: sameAs(state.password),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    return { v$, state, users, errmsg };
  },

  methods: {
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return;
      this.errmsg = true;
      this.users.push({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      });
      this.state.userName = "";
      this.state.password = "";
      this.state.confirmPassword = "";
      this.state.email = "";
      this.v$.$reset();
      console.log(this.users);
    },
  },
};
</script>

<style scoped>
.form-container {
  @apply mt-10 left-2/4 text-center absolute text-black;
  transform: translateX(-50%);
  background-color: rgb(55, 111, 216);
  border-radius: 9px;
  border-top: 10px solid #df1eaf;
  border-bottom: 10px solid #8bd17c;
  width: 500px;
  height: 540px;
  box-shadow: 1px 1px 108.8px 19.2px rgb(25, 31, 53);
}

.form h4 {
  color: #14d1d1;
}

.form h5 {
  color: #89dbe6;
}

.submit {
  @apply flex justify-center;
  color: white;
}

.submit--error {
  background: #ff3333;
}

.submit--success {
  background: #31e466;
}

.form-row {
  @apply flex flex-col my-3 h-1/5;
}

.form-row input {
  @apply py-3.5 px-2.5 rounded outline-none;
  background-color: #e3e6f1;
  width: 320px;
  color: #2b1e1e;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
::-webkit-input-placeholder {
  color: #565f79;
}

.form-row input:focus {
  border: 1px solid #79a6fe;
}

.form-row .errormsg {
  @apply flex justify-center items-center text-sm font-semibold;
  color: #ff9766;
}

.btn {
  @apply rounded-full text-base cursor-pointer font-medium w-80 h-12 transition ease-in-out delay-100 hover:bg-indigo-500 duration-300;
  background: #471ad8;
  color: #dad7f7;
}
</style>
