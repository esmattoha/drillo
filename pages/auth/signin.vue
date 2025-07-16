<template>
  <WrapperAuth title="Login to your account">
    <UForm :state="state" :schema="signinSchema" @submit="handleSignin">
      <UFormField class="mb-6" label="Email" name="email">
        <UInput type="email" v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField class="mb-6" label="Password" name="password">
        <UInput type="password" v-model="state.password" class="w-full" />
      </UFormField>

      <UButton :loading="loading" type="submit"> Signin </UButton>
    </UForm>
  </WrapperAuth>
</template>

<script lang="ts" setup>
import { z } from "zod";
import signinSchema from "~/schemas/signin.schema";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useAuth } from "~/composables/useAuth";

const state = reactive({ email: "", password: "" });
const { signin, loading } = useAuth();

async function handleSignin(
  event: FormSubmitEvent<z.infer<typeof signinSchema>>
) {
  await signin(event.data);
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
