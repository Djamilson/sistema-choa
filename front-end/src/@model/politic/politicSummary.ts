export type IPoliticSummaryItem = {
  id: string
  status: boolean
  description: string
  politic_summary_id: string
}

export type IPoliticSummary = {
  id: string
  title: string
  status: boolean
  sub_title: string
  politics_summaries_items: IPoliticSummaryItem[]
}
