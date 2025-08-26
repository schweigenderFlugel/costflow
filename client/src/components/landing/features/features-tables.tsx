import React from 'react'
import { ImageIcon } from 'lucide-react'

export function FeatureTables() {
  return (
    <div>
      <div className="xl:flex items-center justify-center mx-auto xl:size-100 size-60">
        <div className="w-full h-full rounded-2xl bg-transparent border-2 border-dashed border-slate-300 flex flex-col justify-center items-center">
          <ImageIcon className="h-16 w-16 text-slate-400 mb-4" />
          <p className="text-slate-500 font-medium">Placeholder</p>
          <p className="text-slate-400 text-sm mt-1"></p>
        </div>
      </div>
    </div>
  )
}
