import React from 'react'
import { DashboardCardData } from '@/hooks/use-dashboard-data'

type Props = {
  card: DashboardCardData
}

const DashboardCard = ({ card }: Props) => {
  return (
   <div className="bg-#FFFDFD rounded-xl p-5 text-center border border-gray-200 w-[400px] h-[150px] flex flex-col justify-between">
  <p className="text-[14px] font-semibold">{card.label}</p>

  <div className={`flex-1 flex items-center justify-center ${Array.isArray(card.value) ? 'mt-3' : 'mt-0'}`}>
    {Array.isArray(card.value) ? (
      <div className="text-orange-600 font-semibold space-y-1">
        {card.value.map((line, i) => (
          <p key={i} className="text-xl leading-tight">{line}</p>
        ))}
      </div>
    ) : (
      <p className="text-2xl font-semibold text-orange-600">{card.value}</p>
    )}
  </div>

  {card.extraInfo && (
    <p className="text-[12px] text-black font-semibold">{card.extraInfo}</p>
  )}
</div>

  )
}

export default DashboardCard
