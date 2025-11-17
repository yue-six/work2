import React, { useState, useRef, useEffect } from 'react'

function LazyImage({ src, alt, className, placeholder = '数据加载中...', ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // 提前50px开始加载
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    console.error(`图片加载失败: ${src}`)
    // 使用简单的SVG占位符作为回退
    if (imgRef.current && imgRef.current.tagName === 'IMG') {
      const svgPlaceholder = `data:image/svg+xml,${encodeURIComponent(
        `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#f3f4f6"/>
          <rect x="150" y="100" width="100" height="100" fill="#e1e2e3"/>
          <text x="200" y="120" text-anchor="middle" fill="#999" font-family="Arial" font-size="16">${alt || '商品图片'}</text>
          <text x="200" y="140" text-anchor="middle" fill="#999" font-family="Arial" font-size="14">图片加载失败</text>
        </svg>`
      )}`
      imgRef.current.src = svgPlaceholder
    }
    setIsLoaded(true) // 即使加载失败也标记为已加载，避免无限重试
  }

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`}>
      {!isLoaded && (
        <div className="lazy-image-placeholder">
          <div className="placeholder-content">
            <div className="loading-spinner-small"></div>
            <span className="placeholder-text">{placeholder}</span>
          </div>
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ 
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          {...props}
        />
      )}

      <style>{`
        .lazy-image-container {
          position: relative;
          overflow: hidden;
        }

        .lazy-image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .placeholder-content {
          text-align: center;
        }

        .loading-spinner-small {
          width: 24px;
          height: 24px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 0.5rem;
        }

        .placeholder-text {
          color: #6b7280;
          font-size: 0.8rem;
        }

        .lazy-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .lazy-image.loaded {
          position: relative;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lazy-image {
            transition: none;
          }
          
          .loading-spinner-small {
            animation: none;
            border: 2px solid #e5e7eb;
          }
        }
      `}</style>
    </div>
  )}

export default LazyImage