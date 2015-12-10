$(function() {
  // Initialize web DB
  webDB.init();

  // Set up the blog with the raw data and render
  blog.loadArticles();

  // Add behaviors
  blog.handleAuthorFilter();
  blog.handleCategoryFilter();

  blog.handleMainNav();
});
