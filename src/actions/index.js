export const setHosts = (hosts) => ({
  type: 'SET_HOSTS',
  hosts: hosts
});

export const chooseHost = (hostInfo) => ({
  type: 'CHOOSE_HOST',
  chosenHost: hostInfo
})
