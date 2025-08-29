/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { SEOConfig } from '@/lib/seo'

interface UseSEOProps extends SEOConfig {
  structuredData?: any
}

export function useSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  structuredData,
  canonical,
  noIndex = false
}: UseSEOProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title.includes('Cotzia') ? title : `${title} | Cotzia`
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      } else {
        const newMetaDescription = document.createElement('meta')
        newMetaDescription.name = 'description'
        newMetaDescription.content = description
        document.head.appendChild(newMetaDescription)
      }
    }

    // Update meta keywords
    if (keywords.length > 0) {
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords.join(', '))
      } else {
        const newMetaKeywords = document.createElement('meta')
        newMetaKeywords.name = 'keywords'
        newMetaKeywords.content = keywords.join(', ')
        document.head.appendChild(newMetaKeywords)
      }
    }

    // Update Open Graph tags
    if (title) {
      updateMetaProperty('og:title', title)
    }
    if (description) {
      updateMetaProperty('og:description', description)
    }
    if (image) {
      updateMetaProperty('og:image', image.startsWith('http') ? image : `https://cotzia.com${image}`)
    }
    if (url) {
      updateMetaProperty('og:url', url.startsWith('http') ? url : `https://cotzia.com${url}`)
    }

    // Update Twitter Card tags
    if (title) {
      updateMetaProperty('twitter:title', title)
    }
    if (description) {
      updateMetaProperty('twitter:description', description)
    }
    if (image) {
      updateMetaProperty('twitter:image', image.startsWith('http') ? image : `https://cotzia.com${image}`)
    }

    // Update canonical URL
    if (canonical) {
      updateCanonical(canonical)
    }

    // Update robots
    if (noIndex) {
      updateMetaProperty('robots', 'noindex, nofollow')
    } else {
      updateMetaProperty('robots', 'index, follow')
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(structuredData)
      script.id = 'dynamic-structured-data'

      // Remove existing dynamic structured data
      const existing = document.getElementById('dynamic-structured-data')
      if (existing) {
        document.head.removeChild(existing)
      }

      document.head.appendChild(script)
    }

    return () => {
      // Cleanup on unmount
      const dynamicScript = document.getElementById('dynamic-structured-data')
      if (dynamicScript) {
        document.head.removeChild(dynamicScript)
      }
    }
  }, [title, description, keywords, image, url, structuredData, canonical, noIndex])
}

function updateMetaProperty(property: string, content: string) {
  const selector = `meta[property="${property}"], meta[name="${property}"]`
  const meta = document.querySelector(selector)

  if (meta) {
    meta.setAttribute('content', content)
  } else {
    const newMeta = document.createElement('meta')
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      newMeta.setAttribute('property', property)
    } else {
      newMeta.setAttribute('name', property)
    }
    newMeta.content = content
    document.head.appendChild(newMeta)
  }
}

function updateCanonical(url: string) {
  const canonical = document.querySelector('link[rel="canonical"]')

  if (canonical) {
    canonical.setAttribute('href', url)
  } else {
    const newCanonical = document.createElement('link')
    newCanonical.rel = 'canonical'
    newCanonical.href = url
    document.head.appendChild(newCanonical)
  }
}
