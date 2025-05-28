const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.setDataDeepMerge(false);
  eleventyConfig.setLiquidOptions({ strictFilters: false, dynamicPartials: false })

  // Function to apply a collection filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Function to order a collection
  function sortByOrder(values) {
    let vals = [...values];     // this *seems* to prevent collection mutation...
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  }
  eleventyConfig.addFilter("sortByOrder", sortByOrder);

  eleventyConfig.addCollection('portfoliosOrdered', function(collectionApi) {
    return collectionApi
        .getFilteredByGlob("**/portfolio/**/*.md")
        .sort((a, b) => Math.sign(a.data.order - b.data.order));
  });

  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Output formats (in order of preference)
    formats: ["avif", "webp", "jpeg"],

    // Default image widths. "auto" keeps the original width.
    // Add more widths here if needed, e.g., [300, 600, "auto"]
    widths: ["auto"],

    // Default attributes for the <img> element
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },

    // We are using the HTML Transform mode, which is generally good at
    // auto-detecting paths. We will omit urlPath and outputDir for now
    // as per documentation recommendations for this mode.
    // outputDir: "./_site/assets/images/", // Only uncomment and adjust if auto-detection fails
    // urlPath: "/assets/images/", // Only uncomment and adjust if auto-detection fails
  });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "_site",
      include: "includes",
    },
  };
};
