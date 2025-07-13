<template>
  <div class="grid lg:grid-cols-2 h-screen">
    <div
      class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52"
    >
      <div class="header text-center mb-6">
        <div class="flex justify-center">
          <Logo />
        </div>

        <h1 class="font-bold text-center text-xl text-white mt-4">
          Login to your account
        </h1>

        <!-- Form  -->
        <UCard class="mt-4">
          <UForm :state="state" :schema="singinSchema" @submit="handleSignin">
            <UFormField class="mb-6" label="Email" name="email">
              <UInput type="email" v-model="state.email" class="w-full" />
            </UFormField>

            <UFormField class="mb-6" label="Password" name="password">
              <UInput type="password" v-model="state.password" class="w-full" />
            </UFormField>

            <UButton :loading="isLoading" type="submit"> Signin </UButton>
          </UForm>
        </UCard>
      </div>
    </div>
    <div class="right hidden lg:block"></div>
  </div>
</template>

<script lang="ts" setup>
import singinSchema from "./../../schemas/signin.schema";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const isLoading = ref(false);
const state = reactive({
  email: undefined,
  password: undefined,
});

const { signIn } = useAuth();

async function handleSignin(
  event: FormSubmitEvent<z.output<typeof singinSchema>>
) {
  try {
    await signIn("credentials", {
      email: event.data.email,
      password: event.data.password,
      redirect: false,
    });

    useRouter().push("/");
  } catch (error) {
  } finally {
    isLoading.value = true;
  }
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
