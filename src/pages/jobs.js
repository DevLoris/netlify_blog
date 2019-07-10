import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Website" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.name
          return (
            <div key={node.fields.slug}>
              <h2>{title}</h2>
              <h3>{ node.frontmatter.when }</h3>
              <p>{ node.frontmatter.description }</p>
              <a target="_blank" href={ node.frontmatter.url } class="btn">Voir l'annonce</a>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: {type: { eq: "job" }}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            name,
            description,
            url,
            when
          }
        }
      }
    }
  }
`
