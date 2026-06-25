import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { AttendanceState } from '../types/store.types'
import type { AttendanceRecord, DashboardFilters, UploadStatus } from '../types/ministry.types'
import { computeKpi } from '../utils/dataTransformers'
import { computeGroupSummaries } from '../utils/dataTransformers'
import { computeMonthlyAggregates } from '../utils/dataTransformers'
import { generateInsights } from '../utils/insightsEngine'

const defaultFilters: DashboardFilters = {
  group: 'ALL',
  dateRange: { from: null, to: null },
  year: null,
}

export const useAttendanceStore = create<AttendanceState>()(
  devtools(
    (set, get) => ({
      // ── State
      records: [],
      uploadStatus: 'idle',
      uploadError: null,
      filters: defaultFilters,
      kpi: null,
      groupSummaries: [],
      monthlyAggregates: [],
      insights: [],

      // ── Actions
      setRecords: (records: AttendanceRecord[]) => {
        const kpi              = computeKpi(records)
        const groupSummaries   = computeGroupSummaries(records)
        const monthlyAggregates = computeMonthlyAggregates(records)
        const insights         = generateInsights(records, groupSummaries, monthlyAggregates)

        set(
          {
            records,
            kpi,
            groupSummaries,
            monthlyAggregates,
            insights,
            uploadStatus: 'success',
            uploadError: null,
          },
          false,
          'setRecords'
        )
      },

      setUploadStatus: (status: UploadStatus, error?: string) => {
        set(
          {
            uploadStatus: status,
            uploadError: error ?? null,
          },
          false,
          'setUploadStatus'
        )
      },

      setFilters: (partial: Partial<DashboardFilters>) => {
        const current = get().filters
        const updated = { ...current, ...partial }

        // Re-derive computed state when filters change
        const records           = get().records
        const filtered          = applyFilters(records, updated)
        const kpi               = computeKpi(filtered)
        const groupSummaries    = computeGroupSummaries(filtered)
        const monthlyAggregates = computeMonthlyAggregates(filtered)
        const insights          = generateInsights(filtered, groupSummaries, monthlyAggregates)

        set(
          {
            filters: updated,
            kpi,
            groupSummaries,
            monthlyAggregates,
            insights,
          },
          false,
          'setFilters'
        )
      },

      clearData: () => {
        set(
          {
            records: [],
            uploadStatus: 'idle',
            uploadError: null,
            filters: defaultFilters,
            kpi: null,
            groupSummaries: [],
            monthlyAggregates: [],
            insights: [],
          },
          false,
          'clearData'
        )
      },
    }),
    { name: 'AttendanceStore' }
  )
)

// ── Pure filter helper (not exposed on store)
function applyFilters(
  records: AttendanceRecord[],
  filters: DashboardFilters
): AttendanceRecord[] {
  return records.filter(record => {
    if (filters.group !== 'ALL' && record.group !== filters.group) return false
    if (filters.year && record.year !== filters.year) return false
    if (filters.dateRange.from && record.date < filters.dateRange.from) return false
    if (filters.dateRange.to && record.date > filters.dateRange.to) return false
    return true
  })
}