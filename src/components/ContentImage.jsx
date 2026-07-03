import { Image as ImageIcon } from 'lucide-react'

export function ContentImage({
  src,
  label,
  ratio = 'aspect-[16/10]',
  compact = false,
  loading = 'lazy',
  fetchPriority = 'auto',
}) {
  if (src) {
    return (
      <div className={`content-image ${ratio}`}>
        <img
          src={src}
          alt={label}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
        />
      </div>
    )
  }

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
        {!compact && <small>Изображение пока не добавлено</small>}
      </div>
    </div>
  )
}
