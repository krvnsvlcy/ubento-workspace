export function makeLocationString(
  path: string,
  params: Record<string, string> = {},
) {
  return `${path}#${JSON.stringify(params)}`;
}

export function parseLocationString(location: string) {
  const [path, params] = location.split("#");
  return {
    path,
    params: params ? JSON.parse(params) : {},
  };
}
