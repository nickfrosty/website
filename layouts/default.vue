<template>
    <div
        style="font-family: Montserrat"
        class="leading-normal tracking-normal gradient font-body"
    >
        <site-header></site-header>

        <main class="px-6 py-12 mx-auto">
            <!-- py-12 lg:py-20 -->
            <nuxt />
        </main>

        <site-footer v-if="!$utils.isRoute($nuxt.$route, '/')"></site-footer>
    </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default {
    components: {
        SiteHeader,
        SiteFooter,
        // SimpleFooter,
    },
};
</script>

<style lang="postcss">
</style>