export const setHosts = (hosts) => ({
  type: 'SET_HOSTS',
  hosts: hosts
});

export const chooseHost = (hostInfo) => ({
  type: 'CHOOSE_HOST',
  chosenHost: hostInfo
})

export const setCategories = (categoriesInfo) => ({
  type: 'SET_CATEGORIES',
  categories: categoriesInfo
})

export const setAllColors = (colors) => ({
  type: 'SET_ALL_COLORS',
  colors: colors
})

export const setSeasons = (seasons) => ({
  type: 'SET_SEASONS',
  seasons: seasons
})
