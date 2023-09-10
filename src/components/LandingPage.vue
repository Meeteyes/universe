<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
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
import ActionButton from './ActionButton.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import avatarImage from '../../public/img/avatar.png'

const lang = ref(LANGUAGES.latvian)

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
const howItWorksPadding = computed(() => `${halfOfBannerHeight.value + 50}px`)

const formPlaceholders = computed(() => displayData.value.form.placholders)

const formData = reactive({
  name: '',
  organisation: '',
  phone: '',
  email: ''
})

const rules = {
  name: { required },
  organisation: {},
  phone: { required },
  email: { required, email }
}

const v$ = useVuelidate(rules, formData)

const isSubmitDisabled = computed(() => {
  if (
    v$.value.$errors.length < 1 &&
    v$.value.name.$dirty &&
    v$.value.phone.$dirty &&
    v$.value.email.$dirty
  ) {
    return false
  }
  return true
})

console.log()
</script>

<template>
  <div class="landing-page" :id="displayData.menu[0]">
    <div class="landing-page__wrapper">
      <NavBar :menu="displayData.menu" :action-text="displayData.actionButtonOrder" />
      <HeroBanner :title="displayData.title" :action-call="displayData.actionButton" :is-mobile="isMobileView"
        :menu="displayData.menu" />
      <SummarySection :id="displayData.menu[1]" :data="displayData" :isMobile="isMobileView" />
      <ContentBanner :title="displayData.contentBannerOne.title" :text="displayData.contentBannerOne.text"
        :action-call="displayData.contentBannerOne.actionCall" :isDesktop="!isMobileView" :link="displayData.menu[4]" />

      <div :id="displayData.menu[2]" class="landing-page__episode-section">
        <h1 class="landing-page__episode-heading">{{ displayData.episodes.title }}</h1>
        <ContentSliderMobile v-if="isMobileView" :title="displayEpisode.title" :subheading="displayEpisode.subheading"
          :description="displayEpisode.description" :image="displayEpisode.image"
          @change-slide="(value) => changeSlide(value, 'episodes')">
        </ContentSliderMobile>
        <ContentSlider v-else :title="displayEpisode.title" :subheading="displayEpisode.subheading"
          :description="displayEpisode.description" :image="displayEpisode.image" :hide-nav="false"
          @change-slide="(value) => changeSlide(value, 'episodes')">
        </ContentSlider>
      </div>
    </div>

    <div :id="displayData.menu[3]" class="landing-page__how-it-works-section">
      <h1 class="landing-page__how-it-works-title">{{ displayData.howItWorks.title }}</h1>
      <p class="landing-page__how-it-works-description">{{ displayData.howItWorks.description }}</p>
      <div class="landing-page__how-it-works-card-wrapper">
        <IconCard v-for="(card, index) in displayData.howItWorks.iconCards" :key="card.title"
          :title="`${index + 1}. ${card.title}`" :text="card.description" :icon="card.icon" />
      </div>
    </div>
    <div class="landing-page__wrapper">
      <ContentBanner ref="bannerElement" class="landing-page__second-banner" :title="displayData.contentBannerTwo.title"
        :text="displayData.contentBannerTwo.text" :action-call="displayData.contentBannerTwo.actionCall" without-image
        :link="displayData.menu[4]" />
      <div class="landing-page__testimonial-section">
        <h1 class="landing-page__testimonial-heading">{{ displayData.testimonials.title }}</h1>
        <ContentSliderMobile v-if="isMobileView" :subheading="displayTestimonial.person"
          :description="displayTestimonial.feedback" :image="displayTestimonial.avatar" no-background
          @change-slide="(value) => changeSlide(value, 'testimonials')"><img
            class="landing-page__testimonial-avatar content-slider__carousel-image" :src="avatarImage" />
        </ContentSliderMobile>
        <ContentSlider v-else :subheading="displayTestimonial.person" :description="displayTestimonial.feedback"
          :hide-nav="displayData.testimonials.testimonialList.length <= 3" no-background
          @change-slide="(value) => changeSlide(value, 'testimonials')">
          <div class="landing-page__testimonial-card-wrapper">
            <div v-for="item in displayData.testimonials.testimonialList" :key="item.person"
              class="landing-page__testimonial-card">
              <img class="landing-page__testimonial-avatar" :src="avatarImage" />
              <h3 class="landing-page__testimonial-author">{{ item.person }}</h3>
              <p>{{ item.feedback }}</p>
            </div>
          </div>
        </ContentSlider>
      </div>
      <div class="landing-page__video">
        <h1 class="landing-page__video-title">{{ displayData.video.title }}</h1>
        <div class="landing-page__video-wrapper">
          <iframe class="landing-page__video-frame" width="560" height="315"
            src="https://www.youtube.com/embed/c6Gbqd9Ekrc?si=G8FnNZxhzKT21Uyd?vq=hd720" title="Binoklis video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div class="landing-page__project-partners-section">
      <h1 class="landing-page__project-partners-title">{{ displayData.partners.title }}</h1>
      <div class="landing-page__project-partners-logo-wrapper">
        <img class="landing-page__project-partners-logo" :src="displayData.partners.logo1" />
        <img class="landing-page__project-partners-logo" :src="displayData.partners.logo2" />
      </div>
      <p class="landing-page__project-partners-description">
        {{ displayData.partners.description }}
      </p>
    </div>
    <div class="landing-page__wrapper landing-page__wrapper--margin">
      <ContentBanner :id="displayData.menu[4]" :title="displayData.form.title" :text="displayData.form.description"
        :action-call="displayData.form.actionCall" is-orange without-button>
        <form action="https://binoklis.us20.list-manage.com/subscribe/post" method="post" class="landing-page__form">
          <input type="hidden" name="u" value="441949f044e9ca56f5c666d2b" />
          <input type="hidden" name="id" value="d468e1bb57" />
          <input type="text" :placeholder="formPlaceholders[0].text" class="landing-page__form-input"
            :name="formPlaceholders[0].id" :id="formPlaceholders[0].id" v-model="formData.name" @input="v$.name.$touch" />
          <input type="text" :placeholder="formPlaceholders[1].text" class="landing-page__form-input"
            :name="formPlaceholders[1].id" :id="formPlaceholders[1].id" v-model="formData.organisation"
            @input="v$.organisation.$touch" />
          <input type="text" :placeholder="formPlaceholders[2].text" class="landing-page__form-input"
            :name="formPlaceholders[2].id" :id="formPlaceholders[2].id" v-model="formData.phone"
            @input="v$.phone.$touch" />
          <input type="text" :placeholder="formPlaceholders[3].text" class="landing-page__form-input"
            :name="formPlaceholders[3].id" :id="formPlaceholders[3].id" v-model="formData.email"
            @input="v$.email.$touch" />
          <ActionButton :text="displayData.form.actionCall" is-submit :is-disabled="isSubmitDisabled" />
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

  &__banner-one-image {
    width: 180px;
    position: relative;
    top: 40px;
    // right: 30px;

    &--desktop {
      position: absolute;
    }
  }

  &__episode-section {
    margin-top: 70px;
    padding: 0 30px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }

  &__testimonial-section {
    margin-top: 70px;
    padding: 0 30px;
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

  &__testimonial-heading {
    padding: 0 30px;
    text-align: center;
  }

  &__testimonial-avatar {
    width: 80px;
  }

  &__video {
    padding: 40px 0;

    &-title {
      padding: 20px 40px;
      text-align: center;
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
      min-width: 321px;
    }
  }

  &__project-partners-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 40px;
    gap: 30px;
    background-color: var(--grey);
  }

  &__project-partners-title {
    max-width: 60%;
    text-align: center;
    font-size: 3rem;
  }

  &__project-partners-logo-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 60px;
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
    padding-bottom: 30px;

    &-input {
      width: 300px;
      height: 50px;
      border-radius: 5px;
      padding-left: 15px;
    }
  }

  @media (min-width: 768px) {
    --font-size-heading: 3.5rem;

    &__wrapper {
      width: 100%;
      margin: 0 auto;
      max-width: 90%;

      &--margin {
        margin-bottom: 120px;
      }
    }

    &__how-it-works-section {
      padding: 20px 5vw v-bind(howItWorksPadding) 5vw;
      gap: 50px;
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
      gap: 35px;
      justify-content: space-evenly;
    }

    &__testimonial-card {
      max-width: 33%;
      display: flex;
      gap: 15px;
      flex-direction: column;
      align-items: center;
    }

    &__testimonial-author {
      font-weight: 700;
    }

    &__project-partners-logo-wrapper {
      justify-content: center;
      gap: 150px;
    }

    &__project-partners-logo {
      width: 150px;
    }

    &__form-wrapper {
      align-items: center;
    }
  }
}
</style>
