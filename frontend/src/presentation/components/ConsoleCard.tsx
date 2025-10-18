import type { GameConsole } from '@domain/entities/Console'

type Props = {
  item: GameConsole
  onRent: (consoleId: number) => void
}

export default function ConsoleCard({ item, onRent }: Props) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <div className="aspect-video w-full">
          <img
            src={item.imageUrl || '/images/switch.jpg'}
            alt={item.model}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{item.model}</h3>
          <p className="text-xs text-gray-500">{item.platform ? `${item.platform} • ` : ''}Kondisi: {item.condition}</p>
        </div>
        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          {item.status}
        </span>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <span className="text-xl font-bold">Rp {item.dailyPrice.toLocaleString('id-ID')}/hari</span>
        <button className="btn-brand w-full sm:w-auto" onClick={() => onRent(item.id)} disabled={item.status !== 'available'}>
          Sewa
        </button>
      </div>
    </div>
  )
}
