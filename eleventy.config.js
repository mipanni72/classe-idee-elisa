export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"css": "css"});
  eleventyConfig.addPassthroughCopy({"uploads": "uploads"});
  eleventyConfig.addPassthroughCopy({"src/admin": "admin"});
  eleventyConfig.addPassthroughCopy({"vacanze": "vacanze"});
  eleventyConfig.addPassthroughCopy({"astroepix": "astroepix"});

  const posts = c => c.getFilteredByGlob("content/attivita/*.md")
    .sort((a,b) => new Date(b.data.data) - new Date(a.data.data));

  eleventyConfig.addCollection("attivita", posts);

  const materie = {
    italiano: "Italiano",
    matematica: "Matematica",
    storia: "Storia",
    geografia: "Geografia",
    scienze: "Scienze",
    geometria: "Geometria",
    grammatica: "Grammatica",
    lettura: "Storie e lettura",
    giochi: "Giochi"
  };

  Object.entries(materie).forEach(([nome, etichetta]) => {
    eleventyConfig.addCollection(nome, c =>
      posts(c).filter(x => x.data.materia === etichetta)
    );
  });

  return {
    dir: { input: ".", includes: "src/_includes", output: "_site" },
    templateFormats: ["njk","md","html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
