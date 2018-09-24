module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/index.tsx"],
  coverageDirectory: "coverage",
  setupFiles: [
    "./src/helpers/tests.js",
    "./node_modules/mutationobserver-shim/dist/mutationobserver.min.js"
  ]
};
