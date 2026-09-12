export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"css": "css"});
  eleventyConfig.addPassthroughCopy({"uploads": "uploads"});
  eleventyConfig.addPassthroughCopy({"src/admin": "admin"});

  eleventyConfig.addCollection("attivita", c =>
    c.getFilteredByGlob("content/attivita/*.md")
      .sort((a,b) => new Date(b.data.data) - new Date(a.data.data))
  );
  eleventyConfig.addCollection("matematica", c =>
    c.getFilteredByGlob("content/attivita/*.md")
      .filter(x => x.data.materia === "Matematica")
      .sort((a,b) => new Date(b.data.data) - new Date(a.data.data))
  );
  eleventyConfig.addCollection("scienze", c =>
    c.getFilteredByGlob("content/attivita/*.md")
      .filter(x => x.data.materia === "Scienze")
      .sort((a,b) => new Date(b.data.data) - new Date(a.data.data))
  );

  return {
    dir: { input: ".", includes: "src/_includes", output: "_site" },
    templateFormats: ["njk","md","html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
