import { Image as ImageIcon } from 'lucide-react'

export function ImagePlaceholder({ label, ratio = 'aspect-[16/10]', compact = false }) {
  return (
    <div
      className={`image-placeholder ${ratio}`}
      role="img"
      aria-label={`Плейсхолдер изображения: ${label}`}
      data-image-slot={label}
    >
      <div className="image-placeholder__grid" />
      <div className="image-placeholder__label">
        <ImageIcon size={compact ? 18 : 24} strokeWidth={1.7} />
        <span>{label}</span>
        {!compact && <small>Замените плейсхолдер своим изображением</small>}
      </div>
    </div>
  )
}
