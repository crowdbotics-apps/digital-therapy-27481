import React from "react"
import { StyleSheet, View, Text } from "react-native"
import ScreenNavigation from "../Router/Screen_Navigation"
import Toast from "react-native-toast-message"
const YourApp = () => {
  return (
    <View style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />

      <ScreenNavigation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100
    // padding: 13
  },
  text: {
    fontSize: 20
  }
})

const YourAppModule = {
  title: "Digital Therapy",
  navigator: YourApp
}

const sortNavigators = (a, b) => {
  if (a.hasOwnProperty("navigator") && b.hasOwnProperty("navigator")) {
    return 0
  } else if (a.hasOwnProperty("navigator")) {
    return -1
  } else {
    return 1
  }
}

const sortMenu = (a, b) => {
  if (a.title == "App Menu") {
    return -1
  } else {
    return 0
  }
}

const validate = (mod, prop) => {
  return mod.hasOwnProperty(prop)
}

export const getModules = manifest => {
  let modules = []
  for (const [name, definition] of Object.entries(manifest)) {
    if (definition && validate(definition, "title")) {
      modules.push(definition)
    } else {
      let title = name.replace(/([A-Z])/g, " $1")
      title = title.charAt(0).toUpperCase() + title.slice(1)
      modules.push({
        title: title,
        navigator: definition
      })
    }
  }
  modules = modules.sort(sortNavigators)
  modules = modules.sort(sortMenu)
  if (!(modules.length && modules[0].hasOwnProperty("navigator"))) {
    modules.splice(0, 0, YourAppModule)
  }
  return modules
}

export function getPropertyMap(source, prop) {
  let map = {}
  source.map(mod => {
    if (mod[prop]) {
      map[mod.title] = mod[prop]
    }
  })
  return map
}
