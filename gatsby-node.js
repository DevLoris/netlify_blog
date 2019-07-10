const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter { 
                type 
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      console.log(post);

      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      if(post.node.frontmatter.type === 'blog') {
        const blogPost = path.resolve(`./src/templates/blog-post.js`)
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      }
      else {
        const blogPost = path.resolve(`./src/templates/job-post.js`);
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      }
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions


  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    //Each kind of content has slug and type
    createNodeField({ name: `slug`, node, value, })
    createNodeField({   name: `type`,  node,  value: node.frontmatter.type,  })

    //Custom fields for each
    if(node.frontmatter.type === 'blog') {
      createNodeField({   name: `thumbnail`,  node,  value: node.frontmatter.thumbnail,  })
    }
    else {
      createNodeField({   name: `name`,  node,  value: node.frontmatter.name,  })
      createNodeField({   name: `description`,  node,  value: node.frontmatter.description,  })
      createNodeField({   name: `url`,  node,  value: node.frontmatter.url,  })
      createNodeField({   name: `when`,  node,  value: node.frontmatter.when,  })
    }

  }
}
