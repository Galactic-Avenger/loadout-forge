import { Crown, Medal, Trash2, Trophy } from 'lucide-react'
import { SUBMISSION_RARITIES } from '../data/starterTemplate'

const RARITY_ICONS = {
  common: Medal,
  rare: Trophy,
  epic: Crown,
  legendary: Crown,
}

export default function SubmissionsTable({ submissions, fieldNames, onClear }) {
  if (submissions.length === 0) {
    return (
      <section className="submissions-empty">
        <Trophy size={48} className="empty-trophy" />
        <h2>No Submissions Yet</h2>
        <p>Submit the preview form to populate the leaderboard.</p>
      </section>
    )
  }

  return (
    <section className="submissions-view">
      <div className="submissions-header">
        <div>
          <h2>
            <Trophy size={24} className="inline-icon" />
            Registration Leaderboard
          </h2>
          <p>{submissions.length} squad{submissions.length !== 1 ? 's' : ''} registered</p>
        </div>
        <button type="button" className="btn secondary danger-outline" onClick={onClear}>
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tier</th>
              <th>Time</th>
              {fieldNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => {
              const rarity = SUBMISSION_RARITIES[index % SUBMISSION_RARITIES.length]
              const Icon = RARITY_ICONS[rarity]
              return (
                <tr key={sub.id} className={`row-rarity-${rarity}`}>
                  <td className="rank-cell">{index + 1}</td>
                  <td>
                    <span className={`tier-badge tier-${rarity}`}>
                      <Icon size={14} />
                      {rarity}
                    </span>
                  </td>
                  <td className="time-cell">
                    {new Date(sub.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  {fieldNames.map((name) => (
                    <td key={name}>
                      {formatCellValue(sub.data[name])}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function formatCellValue(value) {
  if (typeof value === 'boolean') return value ? '✓ Yes' : '✗ No'
  if (value === undefined || value === null || value === '') return '—'
  return String(value)
}
