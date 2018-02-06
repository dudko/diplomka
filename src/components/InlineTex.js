import React from 'react'
import KaTeX from 'katex'

export default ({ tex }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: KaTeX.renderToString(tex),
    }}
  />
)
