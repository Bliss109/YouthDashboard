import type { MinistryGroup } from './ministry.types'

// ── Generic chart data point
export interface ChartDataPoint {
  label: string             // x-axis label (date, month, group name)
  value: number             // primary value
  secondaryValue?: number   // e.g. ladies when value = men
  date?: string             // raw ISO date for sorting/filtering
}

// ── Trend line series (one per group)
export interface TrendSeries {
  group: MinistryGroup
  label: string
  color: string
  data: ChartDataPoint[]
}

// ── Bar chart entry
export interface BarChartEntry {
  label: string
  men: number
  ladies: number
  total: number
  date?: string
}

// ── Pie/donut slice
export interface PieSlice {
  name: string
  value: number
  color: string
  percentage: number
}

// ── Recharts-compatible tooltip payload
export interface ChartTooltipPayload {
  name: string
  value: number
  color: string
  dataKey: string
}