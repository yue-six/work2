import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // 可以在这里发送错误报告到服务端
    // this.reportErrorToService(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h1>哎呀，出错了！</h1>
            <p>页面加载时遇到了问题，请尝试以下操作：</p>
            
            <div className="error-actions">
              <button onClick={this.handleRetry} className="btn btn-primary">
                重新加载页面
              </button>
              <button onClick={this.handleGoHome} className="btn btn-secondary">
                返回首页
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>错误详情 (开发模式)</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  \n\n{this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>

          <style>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #f8fafc;
              padding: 2rem;
            }

            .error-container {
              text-align: center;
              max-width: 500px;
              background: white;
              padding: 3rem;
              border-radius: 12px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }

            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }

            .error-container h1 {
              font-size: 2rem;
              color: #1f2937;
              margin-bottom: 1rem;
              font-weight: bold;
            }

            .error-container p {
              color: #6b7280;
              margin-bottom: 2rem;
              line-height: 1.6;
            }

            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }

            .error-details {
              margin-top: 2rem;
              text-align: left;
            }

            .error-details summary {
              cursor: pointer;
              color: #6b7280;
              font-weight: 500;
              margin-bottom: 1rem;
            }

            .error-stack {
              background: #1f2937;
              color: #10b981;
              padding: 1rem;
              border-radius: 8px;
              font-size: 0.8rem;
              overflow-x: auto;
              white-space: pre-wrap;
            }

            @media (max-width: 768px) {
              .error-boundary {
                padding: 1rem;
              }
              
              .error-container {
                padding: 2rem;
              }
              
              .error-actions {
                flex-direction: column;
                align-items: center;
              }
              
              .btn {
                width: 100%;
                max-width: 200px;
              }
            }
          `}</style>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary