<template>
  <WrapperAuth title="Create you account">
    <UForm :state="state" :schema="signupSchema" @submit="handleSignup">
      <UFormField class="mb-6" label="Name" name="name">
        <UInput type="text" v-model="state.name" class="w-full" />
      </UFormField>

      <UFormField class="mb-6" label="Email" name="email">
        <UInput type="email" v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField class="mb-6" label="Password" name="password">
        <UInput type="password" v-model="state.password" class="w-full" />
      </UFormField>

      <UFormField class="mb-6" label="Password Confirm" name="password-confirm">
        <UInput
          type="password"
          v-model="state.passwordConfirm"
          class="w-full"
        />
      </UFormField>

      <UButton :loading="loading" type="submit"> Signup </UButton>
    </UForm>
  </WrapperAuth>
</template>

<script lang="ts" setup>
import { WrapperAuth } from "#components";
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";
import { useAuth } from "~/composables/useAuth";
import signupSchema from "~/schemas/signup.schema";

const state = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});
const { signup, loading } = useAuth();

async function handleSignup(
  event: FormSubmitEvent<z.infer<typeof signupSchema>>
) {
  await signup(event.data);
  await navigateTo("/");
}
</script>

<style scoped>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
