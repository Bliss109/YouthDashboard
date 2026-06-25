// ── Core attendance record (matches Excel row structure)
export interface AttendanceRecord {
  date: string              // ISO format: "2026-05-11"
  group: MinistryGroup
  men: number
  ladies: number
  total: number
  week?: number             // derived — week number of year
  month?: number            // derived — 1–12
  year?: number             // derived — 4-digit year
}

// ── Ministry groups
export type MinistryGroup =
  | 'SERVICE'
  | 'CREW'
  | 'YOUNG_LADIES'
  | 'YOUNG_MEN'
  | 'WORSHIP_TEAM'
  | 'ALL'

export const MINISTRY_GROUPS: MinistryGroup[] = [
  'SERVICE',
  'CREW',
  'YOUNG_LADIES',
  'YOUNG_MEN',
  'WORSHIP_TEAM',
]

export const GROUP_LABELS: Record<MinistryGroup, string> = {
  SERVICE:      'Service',
  CREW:         'CREW',
  YOUNG_LADIES: 'Young Ladies',
  YOUNG_MEN:    'Young Men',
  WORSHIP_TEAM: 'Worship Team',
  ALL:          'All Ministries',
}

// ── KPI summary
export interface KpiSummary {
  totalAttendance: number
  averageAttendance: number
  peakAttendance: number
  peakDate: string
  totalMen: number
  totalLadies: number
  growthRate: number          // percentage, e.g. 8.4
  ytdAttendance: number
  sessionCount: number
}

// ── Per-group summary for comparison
export interface GroupSummary {
  group: MinistryGroup
  label: string
  averageAttendance: number
  totalAttendance: number
  growthRate: number
  trend: TrendDirection
  sessionCount: number
  lastAttendance: number
}

// ── Trend direction
export type TrendDirection = 'up' | 'down' | 'stable'

// ── Monthly aggregate
export interface MonthlyAggregate {
  month: string             // "2026-05" — YYYY-MM
  label: string             // "May 2026"
  total: number
  men: number
  ladies: number
  average: number
  sessionCount: number
  growthRate: number        // vs prior month
}

// ── Demographic breakdown
export interface DemographicBreakdown {
  men: number
  ladies: number
  menPercentage: number
  ladiesPercentage: number
  ratio: string             // e.g. "45:55"
}

// ── Leadership insight
export interface Insight {
  id: string
  type: InsightType
  severity: InsightSeverity
  group?: MinistryGroup
  title: string
  body: string
  metric?: string           // supporting number, e.g. "+12.4%"
  generatedAt: string       // ISO date
}

export type InsightType =
  | 'growth'
  | 'decline'
  | 'peak'
  | 'recovery'
  | 'anomaly'
  | 'demographic'
  | 'comparison'

export type InsightSeverity = 'info' | 'positive' | 'warning' | 'critical'

// ── Upload state
export type UploadStatus =
  | 'idle'
  | 'uploading'
  | 'parsing'
  | 'success'
  | 'error'

export interface UploadResult {
  status: UploadStatus
  recordCount: number
  groups: MinistryGroup[]
  dateRange: {
    from: string
    to: string
  }
  errors: string[]
}

// ── Date range filter
export interface DateRangeFilter {
  from: string | null
  to: string | null
}

// ── Active filters used across the dashboard
export interface DashboardFilters {
  group: MinistryGroup
  dateRange: DateRangeFilter
  year: number | null
}