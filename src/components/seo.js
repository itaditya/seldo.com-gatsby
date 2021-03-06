/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site, images } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author,
            staticHostname
          }
        },
        images: allFile(filter: {relativeDirectory: {eq: "processed/headers"}}, sort: {fields: relativePath, order: ASC}) {
          edges {
            node {
              relativePath
              relativeDirectory
              childImageSharp {
                twitter: fixed(width:1000,height:500) {
                  src
                }
              }
            }
          }
        }  
      }
    `
  )

  let imgData = images.edges[Math.round(Math.random()*(images.edges.length-1))]

  const metaDescription = description || site.siteMetadata.description

  let easyTitle = title ? `${title} | ${site.siteMetadata.title}` : `${site.siteMetadata.title}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={easyTitle}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `twitter:image`,
          content: site.siteMetadata.staticHostname + imgData.node.childImageSharp.twitter.src
        },
        {
          property: `twitter:image:alt`,
          content: `A beautiful photograph`
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: easyTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
