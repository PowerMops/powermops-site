const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy({"public": "/"});

  // add plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  // human readable date filter YYYY-MM-DD
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10);
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slug")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  function numericSort(collectionApi, tag) {
    let col = collectionApi.getFilteredByTag(tag);
    let re = /.*_(\d+)$/;
    col.sort(function(a, b) {
      a = parseInt(a.fileSlug.replace(re, '$1'), 10);
      b = parseInt(b.fileSlug.replace(re, '$1'), 10);
      return a-b;
    });
    return col;
  }

  eleventyConfig.addCollection("tutorialsSorted", function(collectionApi) {
    return numericSort(collectionApi, "tutorial");
  });
  eleventyConfig.addCollection("referencesSorted", function(collectionApi) {
    return numericSort(collectionApi, "reference");
  });
  eleventyConfig.addCollection("classesSorted", function(collectionApi) {
    return numericSort(collectionApi, "classes");
  });

  // process .html as nunjucks
  return {
    dir: {
      input: "src",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

