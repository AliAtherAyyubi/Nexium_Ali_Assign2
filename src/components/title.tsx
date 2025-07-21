import React from 'react'
import { AuroraText } from './magicui/aurora-text'

export const Title = () => {
  return (
    <div className="text-center mb-8">
          <h1 className="text-4xl mb-8  text-blue-600 font-bold md:text-8xl lg:text-8xl">
            Blog <AuroraText>Summarizer</AuroraText>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract and summarize any blog post with AI-powered analysis. Get summaries in both English and Urdu.
          </p>
        </div>
  )
}
