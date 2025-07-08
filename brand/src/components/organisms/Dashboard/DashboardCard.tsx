import React from 'react'

type DashboardCardData = {
  label: string
  value: string | number
  extraInfo?: string
}

type Props = {
  card: DashboardCardData
}

const DashboardCard = ({ card }: Props) => {
  return (
    <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-600">{card.label}</p>
      <p className="text-2xl font-semibold text-orange-600 mt-2">{card.value}</p>
      {card.extraInfo && (
        <p className="text-xs text-gray-500 mt-2">{card.extraInfo}</p>
      )}
    </div>
  )
}

export default DashboardCard
