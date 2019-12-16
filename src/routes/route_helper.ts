export function getParams(props: any, paramName: string) {
  return props.match.params[paramName];
}
