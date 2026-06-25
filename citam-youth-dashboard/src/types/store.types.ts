import type {
  AttendanceRecord,
  DashboardFilters,
  Insight,
  KpiSummary,
  GroupSummary,
  MonthlyAggregate,
  UploadStatus,
} from './ministry.types'

// ── Attendance store shape
export interface AttendanceState {
  records: AttendanceRecord[]
  uploadStatus: UploadStatus
  uploadError: string | null
  filters: DashboardFilters
  kpi: KpiSummary | null
  groupSummaries: GroupSummary[]
  monthlyAggregates: MonthlyAggregate[]
  insights: Insight[]

  // Actions
  setRecords: (records: AttendanceRecord[]) => void
  setUploadStatus: (status: UploadStatus, error?: string) => void
  setFilters: (filters: Partial<DashboardFilters>) => void
  clearData: () => void
}

// ── UI store shape
export interface UiState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  activeSection: string

  // Actions
  toggleTheme: () => void
  toggleSidebar: () => void
  setActiveSection: (section: string) => void
}