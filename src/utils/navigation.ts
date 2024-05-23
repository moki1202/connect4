export let navigator: any

export const set_navigator = (navigatorRef: any) => {
  navigator = navigatorRef
}

export const push_or_navigate = (
  navigation: any,
  route_name: string,
  param2 = {}
) => {
  if (navigation.push) {
    navigation.push(route_name, param2)
    return
  }

  navigation.navigate(route_name, param2)
}

export const replace_or_navigate = (
  navigation: any,
  route_name: string,
  param2 = {}
) => {
  if (navigation.replace) {
    navigation.replace(route_name, param2)
    return
  }

  navigation.navigate(route_name, param2)
}
