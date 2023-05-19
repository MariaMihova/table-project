<template>
  <v-dialog v-model="show" width="70%" class="popup" persistent>
    <v-card>
      <form @submit.prevent="onSubmit">
        <div v-for="(value, key) in formData" v-bind:key="key">
          <label>{{ key }}</label>
          <input type="text" v-model="formData[key]" disabled />
        </div>
        <button class="submit" id="close">Close</button>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["toEdit", "isOpen", "close"],
  methods: {
    onSubmit(e) {
      this.$emit("close", e.submitter.id === "save" ? this.formData : {});
      this.formData = {};
    },
    getEditPerson() {
      Object.assign(this.formData, this.toEdit);
    },
  },
  watch: {
    isOpen(newValue) {
      // whenever question changes, this function will run
      if (newValue === true) {
        this.getEditPerson();
      }
    },
  },

  computed: {
    show: {
      get() {
        return this.isOpen;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  data() {
    return {
      formData: {},
    };
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20 px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

.backdrop {
  top: 0;
  position: float;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
</style>
