<template>
    <div class="">
        <!-- <p class="mt-8 text-lg font-medium">Building in public, sharing as I go →</p> -->
        <!-- <hr class="mb-12 md" /> -->
        
        <div class="card">
            <p class="font-medium sm:text-2xl">
                Want more dev articles like these?
            </p>   
            <p class="mx-6 my-3 text-center sm:mx-0 lg:text-left">Subscribe and get them delivered direclty to your inbox  →</p>
            
            <form class="items-center justify-between my-2 space-y-2 md:space-y-0 md:space-x-3 md:flex validate" action="https://frostbutter.us2.list-manage.com/subscribe/post?u=ff54f64a9c7c22ff1cd77bb2c&id=6778f6294a" method="post" novalidate>
                <input type="email" value="" class="w-full" name="EMAIL" placeholder="Your best email address" required>
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="email" class="mx-auto" name="b_ff54f64a9c7c22ff1cd77bb2c_6778f6294a" tabindex="-1" value="" required=""></div>
                <input type="submit" class="mx-auto text-center" value="👈 subscribers.push(this.email);" name="subscribe" />
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
.card{
    @apply max-w-xl mx-auto;
    @apply border-0 md:border md:border-indigo-200;
    @apply md:dark:border-indigo-500 md:shadow;
    @apply md:hover:-top-2 md:hover:shadow-lg;
    @apply px-0 py-2 md:px-8 md:py-6;
}
</style>