<script lang="ts" setup>
import { NuxtLink, UDropdownMenu } from "#components";

const { user, signout } = useAuth();

const dropdownItems = ref([
  [
    {
      label: "Profile",
      slot: "profie",
      disable: true,
    },
  ],
  [
    {
      label: "Billing",
      icon: "i-heroicons-credit-card",
      click: () => {},
    },
  ],
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: handleSignout,
    },
  ],
]);

async function handleSignout() {
  await signout();
}
</script>

<template>
  <div>
    <header class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="flex justify-between">
          <NuxtLink to="/"><UIcon name="" class="w-8 h-8" /></NuxtLink>
          <div class="inline-flex justify-end gap-4 item-center">
            <slot name="action" />

            <ColorSwitcher />
            <UDropdownMenu :items="dropdownItems">
              <UIcon name="i-heroicon-user-circle" class="w-6 h-6" />
            </UDropdownMenu>
          </div>
        </div>
      </UContainer>
    </header>
    <main class="my-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style></style>
