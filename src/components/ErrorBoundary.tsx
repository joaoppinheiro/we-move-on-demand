import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[#F3F3F1] px-6">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-6">
                We apologize for the inconvenience. Please refresh the page or try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-[#a02135] text-white text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c41e46] transition-all"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
