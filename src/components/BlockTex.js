import React from 'react'
import KaTeX from 'katex'

export default ({ tex }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: KaTeX.renderToString(tex, { displayMode: true }),
    }}
  />
)
