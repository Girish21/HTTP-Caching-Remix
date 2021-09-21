const getEnvironmentVar = (key: string) => {
  if (!(key in process.env)) {
    throw new Error(`${key} should be exported`)
  }

  return process.env[key]
}

export { getEnvironmentVar }
