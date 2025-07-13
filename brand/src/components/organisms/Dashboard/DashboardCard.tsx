import React from 'react'
import { DashboardCardData } from '@/hooks/use-dashboard-data'

type Props = {
  card: DashboardCardData
}

const DashboardCard = ({ card }: Props) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-200 w-[400px] h-[200px] flex flex-col justify-between">
      <p className="text-[15px] font-semibold">{card.label}</p>

      <div
        className={`flex-1 flex items-center justify-center ${
          Array.isArray(card.value) ? 'mt-4' : 'mt-1'
        }`}
      >
        {Array.isArray(card.value) ? (
          <div className="text-orange-600 font-semibold space-y-1">
            {card.value.map((line, i) => (
              <p key={i} className="text-xl leading-tight">{line}</p>
            ))}
          </div>
        ) : (
          <p className="text-[26px] font-semibold text-orange-600">
            {card.value}
          </p>
        )}
      </div>

      {card.extraInfo && (
        <p className="text-[12px] text-black font-semibold mt-2">
          {card.extraInfo}
        </p>
      )}
    </div>
  )
}

export default DashboardCard
