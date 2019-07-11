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
        <h2>Carrières</h2>
        {posts.map(({ node }) => {
          const title = node.frontmatter.name
          return (
            <div key={node.fields.slug}>
              <h3>{title}</h3>
              <strong>{ node.frontmatter.when }</strong>
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
