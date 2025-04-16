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
