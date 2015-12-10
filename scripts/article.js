/*global Handlebars */

//opt is object - defining constuctor function for article
//arguement opts is an object
function Article (opts) {
  //method that returns an array of strings - just the keys: "author", "title"
  //.forEach = anon. callback function is called forEach, passing into the element from array, the index of the element and the arrray of keys
  //all we're really using is the e = element from array which is key
  Object.keys(opts).forEach(function(propName, index, keys) {
    //reference of property of key of the this object
    //get the value = set the value
    this[propName] = opts[propName];
    //second parameter of .forEach (this "current" context, which is new Article)
    //specifying Article object so as not to assign as window property 
  },this);

  this.body = opts.body || marked(this.markdown);
}

Article.prototype.template = '';

Article.prototype.toHtml = function() {
  if (!blog.isAdmin() && !this.publishedOn) {
    return '';
  }
  this.daysAgo =
    parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.authorSlug = util.slug(this.author);
  this.categorySlug = util.slug(this.category);

  return this.template(this);
};


Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    //code from review in class
    //passing an array of objects
    [
      {
        sql: "INSERT INTO articles (title, category, author, authorUrl, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?)",
        //properties of the instance of the context of our data
        data: [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.markdown]
      },
    ],
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    // TODO: Add SQL here...
    ,
    callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    // TODO: Add SQL here...
    ,
    callback
  );
};

Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute(
    // TODO: Add SQL here...
    ,
    callback
  );
};
