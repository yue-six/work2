import React from 'react'

function LoadingSpinner({ size = 'medium', text = '加载中...', overlay = false }) {
  const sizes = {
    small: { width: '24px', height: '24px' },
    medium: { width: '40px', height: '40px' },
    large: { width: '60px', height: '60px' }
  }

  const selectedSize = sizes[size] || sizes.medium

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div 
            className="spinner"
            style={selectedSize}
          ></div>
          {text && <p className="loading-text">{text}</p>}
        </div>

        <style>{`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }

          .loading-content {
            text-align: center;
          }

          .spinner {
            border: 3px solid #f3f4f6;
            border-top: 3px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }

          .loading-text {
            margin-top: 1rem;
            color: #6b7280;
            font-size: 1rem;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="loading-inline">
      <div 
        className="spinner"
        style={selectedSize}
      ></div>
      {text && <p className="loading-text">{text}</p>}

      <style>{`
        .loading-inline {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .spinner {
          border: 3px solid #f3f4f6;
          border-top: 3px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        .loading-text {
          margin-top: 1rem;
          color: #6b7280;
          font-size: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner