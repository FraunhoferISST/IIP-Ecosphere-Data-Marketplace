const packageConfig = require("./package.json");
const importCustomPlugins = require("./utils/importCustomPlugins");
require("./utils/config");

/**
 * @summary Registers Reaction API plugins and then starts the app
 * @return {Promise<undefined>} undefined
 */
async function runApp() {
  const { importPluginsJSONFile, ReactionAPICore } = await import(
    "@reactioncommerce/api-core"
  );

  const api = new ReactionAPICore({
    serveStaticPaths: ["public"],
    version: packageConfig.version,
  });

  const plugins = await importPluginsJSONFile("./plugins.js");

  await api.registerPlugins(plugins);

  await importCustomPlugins(api);

  await api.start().then(() => {});
}

runApp()
  .then(() => console.log("API running"))
  .catch((error) => {
    console.error(error);
    process.exit(1); // eslint-disable-line no-process-exit
  });
