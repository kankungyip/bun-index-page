import handlebars from 'handlebars';
import { resolve } from 'node:path';

export default function IndexPage({ entry, template, filename = 'index.html', ...args }) {
  return {
    name: 'bun-index-page',
    async setup({ config }) {
      const compileOption = { ...args };

      compileOption.entry = []
        .concat(entry)
        .map((filepath) => `import("/${filepath}");`)
        .join('');

      const compile = handlebars.compile(await Bun.file(template).text());
      const html = compile(compileOption);
      const outputPath = resolve(config.outdir, filename);
      await Bun.write(outputPath, html);
    },
  };
}
