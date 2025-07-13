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
  const isImage =
    typeof card.value === 'string' && card.value.trim().endsWith('.png')

  const isMultiLine =
    typeof card.value === 'string' && card.value.includes(',')

  const isSimpleText = !isImage && !isMultiLine

  return (
    <div
      className="max-w-[450px] rounded-xl p-5 text-center shadow-sm border border-gray-200 flex flex-col justify-between min-h-[180px]"
      style={{ backgroundColor: '#FFFDFD' }}
    >
      {/* Top - label */}
      <p className="text-xl font-semibold text-[#0A0A0A]">{card.label}</p>

      {/* Middle - value block */}
      <div className="flex-1 flex items-center justify-center mt-2">
        {isImage && (
          <img
            src={card.value as string}
            alt={card.label}
            className="mx-auto max-h-40 object-contain"
          />
        )}

        {isMultiLine && (
          <div className="text-orange-600 font-bold space-y-1">
            {(card.value as string).split(',').map((line, i) => (
              <p key={i} className="text-xl leading-tight">
                {line.trim()}
              </p>
            ))}
          </div>
        )}

        {isSimpleText && (
          <p className="text-2xl font-bold text-orange-600">
            {card.value}
          </p>
        )}
      </div>

      {/* Bottom - extraInfo */}
      {card.extraInfo && (
        <p className="text-xs font-semibold text-[#0A0A0A] mt-2">
          {card.extraInfo}
        </p>
      )}
    </div>
  )
}

export default DashboardCard
