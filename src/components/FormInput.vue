<template>
  <div class="form-container">
    <!-- <span v-if="errmsg" class="submit submit--error">Fail to sign up</span> -->
    <div v-if="errmsg" class="submit submit--success">Success</div>
    <form class="form" @submit.prevent="onSubmit">
      <h4>Dashboard</h4>
      <h5>Sign up to your account</h5>
      <div class="form-group">
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
            {{ v$.email.required.$message }}
          </span>
          <span
            class="errormsg"
            v-if="v$.email.email.$invalid && v$.email.$dirty"
          >
            {{ v$.email.email.$message }}
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
            Đây là trường bắt buộc
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
            {{ v$.confirmPassword.sameAs.$message }}
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
  margin-top: 40px;
  position: absolute;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  background-color: rgb(55, 111, 216);
  border-radius: 9px;
  border-top: 10px solid #79a6fe;
  border-bottom: 10px solid #8bd17c;
  width: 500px;
  height: 540px;
  box-shadow: 1px 1px 108.8px 19.2px rgb(25, 31, 53);
  color: black;
}

.form h4 {
  color: #14d1d1;
  font-size: 18px;
  margin-top: 40px;
  font-weight: 600;
}

.form h5 {
  font-size: 13px;
  color: #89dbe6;
  letter-spacing: 1.5px;
  margin-bottom: 40px;
}

.submit {
  min-width: 200px;
  padding: 2px;
  border: 0;
  margin: 0 auto 10px;
  color: white;
}

.submit--error {
  background: #ff3333;
}

.submit--success {
  background: #31e466;
}

.form-group {
  height: 300px;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  height: 20%;
}

.form-row input {
  background: #e3e6f1;
  border: 0;
  border-radius: 5px;
  padding: 14px 10px;
  width: 320px;
  outline: none;
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
  color: red;
  font-size: 14px;
  /* background-color: rgba(0,0,0,0.2); */
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  border: 0;
  background: #471ad8;
  color: #dad7f7;
  border-radius: 100px;
  width: 340px;
  height: 49px;
  font-size: 16px;
  transition: 0.3s;
  cursor: pointer;
  font-weight: 500;
}

.btn:hover {
  background: #5d33e6;
}
</style>
