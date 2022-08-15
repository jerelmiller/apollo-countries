// In real life, this might do more than just stringify the query, such as
// AST validation or pulling out metadata from the query. For the purpose of this
// exercise, this is provided to allow developer tools to more nicely work with
// query strings. For example, prettier can nicely format the query and your
// text editor can provide nice syntax highlighting.

const graphql = (query: TemplateStringsArray, _replacements?: any) => {
  return query.join('').trim();
};

export default graphql;
