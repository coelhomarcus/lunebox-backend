await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./build",
  target: "bun",
  minify: {
    whitespace: true,
    syntax: true,
  },
  compile: {
    target: "bun-linux-x64",
    outfile: "server",
  },
});

export {};
