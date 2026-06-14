import { Hammer, Trophy, Zap } from 'lucide-react'

export default function Header({ activeView, onViewChange }) {
  return (
    <header className="app-header">
      <div className="header-glow" aria-hidden="true" />
      <div className="header-content">
        <div className="header-brand">
          <div className="brand-icon">
            <Zap size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="brand-title">Loadout Forge</h1>
            <p className="brand-tagline">Tournament Registration Builder</p>
          </div>
        </div>

        <nav className="header-nav">
          <button
            type="button"
            className={`nav-tab ${activeView === 'builder' ? 'active' : ''}`}
            onClick={() => onViewChange('builder')}
          >
            <Hammer size={16} />
            Forge
          </button>
          <button
            type="button"
            className={`nav-tab ${activeView === 'submissions' ? 'active' : ''}`}
            onClick={() => onViewChange('submissions')}
          >
            <Trophy size={16} />
            Leaderboard
            <span className="nav-badge">Submissions</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
