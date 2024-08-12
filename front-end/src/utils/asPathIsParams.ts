export function removeParamsForAsPath(asPath: string): string {
  const positionOfSecondSlash = asPath.indexOf('/', asPath.indexOf('/') + 1)

  if (positionOfSecondSlash !== -1) {
    return asPath.substring(0, positionOfSecondSlash)
  } else {
    return asPath
  }
}
