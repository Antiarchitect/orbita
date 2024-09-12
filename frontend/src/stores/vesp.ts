import {defineStore} from 'pinia'

export const useVespStore = defineStore('settings', () => {
  const settings: Ref<Record<string, string | string[]>> = ref({})
  const variables: Ref<Record<string, string>> = ref({})
  const pages: Ref<VespPage[]> = ref([])
  const levels: Ref<VespLevel[]> = ref([])
  const reactions: Ref<VespReaction[]> = ref([])
  const isMobile = ref(false)
  const sidebar = ref(false)
  const login = ref(false)
  const payment: Ref<undefined | VespTopic | VespLevel> = ref()

  useCustomFetch('web/settings', {
    onResponse({response}) {
      settings.value = response._data?.settings || {}
      variables.value = response._data?.variables || {}
    },
  })

  useCustomFetch('web/pages', {
    onResponse({response}) {
      pages.value = []
      response._data?.rows?.forEach((page: VespPage) => {
        pages.value.push(page)
      })
    },
  })

  useCustomFetch('web/levels', {
    onResponse({response}) {
      levels.value = []
      response._data?.rows?.forEach((page: VespLevel) => {
        levels.value.push(page)
      })
    },
  })

  useCustomFetch('web/reactions', {
    onResponse({response}) {
      reactions.value = []
      response._data?.rows?.forEach((reaction: VespReaction) => {
        reactions.value.push(reaction)
      })
    },
  })

  return {settings, variables, pages, levels, reactions, isMobile, sidebar, payment, login}
})
