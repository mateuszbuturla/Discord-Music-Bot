export function assetsDir(): string {
  const dir = process.env.ASSETS_DIR;

  if (!dir) {
    throw new Error('ASSETS_DIR is not defined');
  }

  return dir.replace('__dirname', __dirname);
}
