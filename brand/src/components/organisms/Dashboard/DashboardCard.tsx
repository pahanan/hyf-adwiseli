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
    <div
      className="max-w-[450px] rounded-xl p-5 text-center shadow-sm border border-gray-200 flex flex-col justify-between min-h-[180px]"
      style={{ backgroundColor: '#FFFDFD' }}
    >
      {/* Top: label */}
      <p className="text-xl font-semibold text-[#0A0A0A]">{card.label}</p>

      {/* Middle: value centered */}
      <div className="flex-1 flex items-center justify-center mt-2">
        <p className="text-2xl font-bold text-orange-600">{card.value}</p>
      </div>

      {/* Bottom: extraInfo */}
      {card.extraInfo && (
        <p className="text-xs font-semibold text-[#0A0A0A] mt-2">{card.extraInfo}</p>
      )}
    </div>
  )
}

export default DashboardCard
