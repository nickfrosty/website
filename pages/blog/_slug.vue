<template>
    <article class="max-w-5xl px-3 mx-auto">
        <header class="max-w-3xl mx-auto text-center article">
            <h1>
                <nuxt-link
                    :to="url"
                    class="text-4xl text-gray-800 no-underline  dark:text-gray-300 md:text-6xl"
                    >{{ post.title }}</nuxt-link
                >
            </h1>
            <p v-if="post.intro">{{ post.intro }}</p>

            <author-section :author="author" :post="post" :path="'/blog'" />
        </header>

        <img
            v-if="hero_image"
            class="block mb-8 rounded-xl"
            :src="hero_image"
            :alt="post.title"
        />

        <nuxt-content :document="post" class="max-w-3xl mx-auto article" />

        <!-- {{ main_content }}
				{{ if type == "text" }}
					{{ text }}
				{{ elseif type == "code_block" }}
	<pre class="language-{{ mode ?? 'php' }} rounded"><code>{{ code }}</code></pre>
				{{ elseif type == "image" }}
					<figure>
						<img src="{{ image }}" alt="{{ caption }}" />
						<figcaption>{{ caption }}</figcaption>
					</figure>
				{{ /if }}
			{{ /main_content }} -->

        <newsletter-signup-form />
    </article>
</template>

<script>
import AuthorSection from "~/components/blog/AuthorSection.vue";
import NewsletterSignupForm from "~/components/NewsletterSignupForm.vue";

export default {
    components: {
        AuthorSection,
        NewsletterSignupForm,
    },
    async asyncData({ params, error, $content }) {
        try {
            // const postPath = `/blog/${params.slug}`;
            const [post] = await $content("blog", { deep: true })
                .where({ slug: params.slug })
                .fetch();
            return { post };
        } catch (err) {
            error({
                statusCode: 404,
                message: "Page could not be found",
            });
        }
    },
    methods: {
        tag_url(tag) {
            return `/blog/tag/${tag}`;
        },
    },
    computed: {
        url() {
            return `/blog/${this.post.slug}`;
        },
        post_date() {
            let date =
                this.post.date || this.post.updatedAt || this.post.createdAt;
            return new Date(date).toLocaleString("en-US", {
                dateStyle: "medium",
            });
        },
        author() {
            return {
                name: "Nick Frostbutter",
                website: "https://frostbutter.com",
                avatar: "/img/nick.jpg",
            };
            // return false;
        },
        hero_image() {
            if (this.post.hero_image) return this.post.hero_image;
            else if (this.post.image) return this.post.image;
            else return false;
        },
    },
    head() {
        return this.$seo({
            templateTitle: this.post.template || "%title% - %name%",
            title: this.post.title || "Blog",
            description:
                this.post.description ||
                this.post.intro ||
                "Checkout this awesome blog post. As I build in public, I pour my heart and soul into these posts and my newsletter.",
            canonical: this.post.canonical || "auto",
            openGraph: {
                image: {
                    url: `https://frostbutter.com` + "/img/nick.jpg",
                    // (this.post.image || "/img/nick.jpg"),
                },
            },
            twitter: {
                card: this.post.image ? "summary_large_image" : "summary",
                // url: '/',
                // title: '<local page title>',
                // description: '<local page desc>',
                // image: '<local page image>',
            },
        });
    },
};
</script>

<style lang="postcss">
@import "~/assets/css/article.css";
</style>