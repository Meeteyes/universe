<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from './NavBar.vue'
import HeroBanner from './HeroBanner.vue'
import SummarySection from './SummarySection.vue'
import ContentBanner from './ContentBanner.vue'
import ContentSliderMobile from './ContentSliderMobile.vue'
import ContentSlider from './ContentSlider.vue'
import PageFooter from './PageFooter.vue'
import { LANG_VAR_ENG, LANG_VAR_LAT, LANGUAGES } from '../assets/utils'
import IconCard from './IconCard.vue'
import { useWindowSize, useElementSize } from '@vueuse/core'

const lang = ref(LANGUAGES.english)
const displayData = computed(() => (lang.value === LANGUAGES.english ? LANG_VAR_ENG : LANG_VAR_LAT))

let episodeIndex = ref(0)
let testimonialIndex = ref(0)
const displayEpisode = computed(() => displayData.value.episodes.episodeList[episodeIndex.value])

const changeSlide = (number: number, slider: string) => {
  const isEpisodeSlider = slider === 'episodes'
  let values = isEpisodeSlider
    ? displayData.value.episodes.episodeList
    : displayData.value.testimonials.testimonialList
  let index = isEpisodeSlider ? episodeIndex.value + number : testimonialIndex.value + 1

  if (index > values.length - 1) {
    index = index % values.length
  } else if (index < 0) {
    index = values.length - 1
  }

  if (isEpisodeSlider) {
    episodeIndex.value = index
  } else {
    testimonialIndex.value = index
  }
}

const displayTestimonial = computed(
  () => displayData.value.testimonials.testimonialList[testimonialIndex.value]
)

const { width } = useWindowSize()

const isMobileView = computed(() => width.value < 769)

const bannerElement = ref(null)
const { height } = useElementSize(bannerElement)

const halfOfBannerHeight = computed(() => Math.floor(height.value / 2))
const negativeBannerOffset = computed(() => `-${halfOfBannerHeight.value}px`)
const howItWorksPadding = computed(() => `${halfOfBannerHeight.value + 30}px`)
</script>

<template>
  <div class="landing-page">
    <div class="landing-page__wrapper">
      <NavBar :menu="displayData.menu" :action-text="displayData.actionButtonOrder" />
      <HeroBanner :title="displayData.title" :action-call="displayData.actionButton" />
      <SummarySection :data="displayData" />
      <ContentBanner :title="displayData.contentBannerOne.title" :text="displayData.contentBannerOne.text"
        :action-call="displayData.contentBannerOne.actionCall" />

      <div class="landing-page__episode-section">
        <h2 class="landing-page__episode-heading">{{ displayData.episodes.title }}</h2>
        <ContentSliderMobile v-if="isMobileView" :title="displayEpisode.title" :subheading="displayEpisode.subheading"
          :description="displayEpisode.description" @change-slide="(value) => changeSlide(value, 'episodes')">
        </ContentSliderMobile>
        <ContentSlider v-else :title="displayEpisode.title" :subheading="displayEpisode.subheading"
          :description="displayEpisode.description" @change-slide="(value) => changeSlide(value, 'episodes')">
        </ContentSlider>
      </div>
    </div>

    <div class="landing-page__how-it-works-section">
      <h2 class="landing-page__how-it-works-title">{{ displayData.howItWorks.title }}</h2>
      <p class="landing-page__how-it-works-description">{{ displayData.howItWorks.description }}</p>
      <div class="landing-page__how-it-works-card-wrapper">
        <IconCard v-for="(card, index) in displayData.howItWorks.iconCards" :key="card.title"
          :title="`${index + 1}. ${card.title}`" :text="card.description" />
      </div>
    </div>
    <div class="landing-page__wrapper">
      <ContentBanner ref="bannerElement" class="landing-page__second-banner" :title="displayData.contentBannerTwo.title"
        :text="displayData.contentBannerTwo.text" :action-call="displayData.contentBannerTwo.actionCall" />
      <div class="landing-page__testimonial-section">
        <h2 class="landing-page__testimonial-heading">{{ displayData.testimonials.title }}</h2>
        <ContentSliderMobile v-if="isMobileView" :subheading="displayTestimonial.person"
          :description="displayTestimonial.feedback" :avatar="displayTestimonial.avatar" no-background
          @change-slide="(value) => changeSlide(value, 'testimonials')">
        </ContentSliderMobile>
        <ContentSlider v-else :subheading="displayTestimonial.person" :description="displayTestimonial.feedback"
          no-background @change-slide="(value) => changeSlide(value, 'testimonials')">
          <div class="landing-page__testimonial-card-wrapper">
            <div v-for="item in displayData.testimonials.testimonialList" :key="item.person"
              class="landing-page__testimonial-card">
              <img class="landing-page__testimonial-avatar" src="img/avatar.png" />
              <h3>{{ item.person }}</h3>
              <p>{{ item.feedback }}</p>
            </div>
          </div>
        </ContentSlider>
      </div>
      <div class="landing-page__video">
        <h2 class="landing-page__video-title">{{ displayData.video.title }}</h2>
        <div class="landing-page__video-wrapper">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/c6Gbqd9Ekrc?si=G8FnNZxhzKT21Uyd"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div class="landing-page__project-partners-section">
      <h2 class="landing-page__project-partners-title">{{ displayData.partners.title }}</h2>
      <div class="landing-page__project-partners-logo-wrapper">
        <img class="landing-page__project-partners-logo" :src="displayData.partners.logo1" />
        <img class="landing-page__project-partners-logo" :src="displayData.partners.logo2" />
      </div>
      <p class="landing-page__project-partners-description">
        {{ displayData.partners.description }}
      </p>
    </div>
    <div class="landing-page__wrapper landing-page__wrapper--margin">
      <ContentBanner :title="displayData.form.title" :text="displayData.form.description"
        :action-call="displayData.form.actionCall" is-orange>
        <form class="landing-page__form">
          <input v-for="input in displayData.form.placholders" :key="input.text" type="text" :placeholder="input.text"
            class="landing-page__form-input" />
        </form>
      </ContentBanner>
    </div>
    <PageFooter :menu="displayData.menu" />
  </div>
</template>

<style scoped lang="scss">
.landing-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  &__banner-wrapper {
    display: flex;
    justify-content: center;
  }

  &__episode-section,
  &__testimonial-section {
    margin-top: 70px;
    padding: 0 30px 70px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }

  &__episode-heading {
    text-align: center;
    margin-bottom: 30px;
  }

  &__how-it-works-section {
    background-color: var(--grey);
    padding: 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__how-it-works-title,
  &__how-it-works-description {
    width: 80%;
    text-align: center;
  }

  &__how-it-works-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__testimonial-avatar {
    width: 80px;
  }

  &__video {
    padding: 40px 0;

    &-title {
      padding: 20px 40px;
      text-align: center;
      font-size: 2rem;
    }

    &-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      height: 0;
    }

    &-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__project-partners-section {
    display: flex;
    flex-direction: column;
    padding: 70px 40px;
    gap: 30px;
    background-color: var(--grey);
  }

  &__project-partners-title {
    text-align: center;
    font-size: 3rem;
  }

  &__project-partners-logo-wrapper {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
  }

  &__project-partners-logo {
    width: 100px;
  }

  &__project-partners-description {
    text-align: center;
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    &-input {
      width: 300px;
      height: 50px;
      border-radius: 5px;
      padding-left: 15px;
    }
  }

  @media (min-width: 768px) {
    --font-size-heading: 5rem;

    &__wrapper {
      width: 100%;
      margin: 0 auto;
      max-width: 90%;

      &--margin {
        margin-bottom: 120px;
      }
    }

    &__how-it-works-section {
      padding-bottom: v-bind(howItWorksPadding);
    }

    &__how-it-works-card-wrapper {
      flex-direction: row;
    }

    &__second-banner {
      position: relative;
      top: v-bind(negativeBannerOffset);
    }

    &__testimonial-card-wrapper {
      display: flex;
      gap: 15px;
      justify-content: space-evenly;
    }

    &__testimonial-card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__project-partners-logo-wrapper {
      justify-content: center;
      gap: 150px;
    }

    &__form-wrapper {
      align-items: center;
    }
  }
}
</style>
