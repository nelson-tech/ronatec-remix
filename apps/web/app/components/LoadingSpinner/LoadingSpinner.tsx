// ####
// #### Types
// ####

type PropsType = {
  className?: string
  color?: string
  opacity?: number
  size?: number
}

// ####
// #### Component
// ####

const LoadingSpinner = ({ className, color, opacity, size }: PropsType) => {
  return (
    <>
      <div
        className={className}
        style={
          size
            ? { height: `${size / 4}rem`, width: `${size / 4}rem` }
            : undefined
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="animate-spin"
          aria-hidden
        >
          <path
            className={`${!opacity ? "opacity-80" : ""} fill-blue-main`}
            style={{
              fill: color,
              opacity: opacity ? opacity / 100 : undefined,
            }}
            d="M222.7 32.15C227.7 49.08 218.1 66.9 201.1 71.94C121.8 95.55 64 169.1 64 255.1C64 362 149.1 447.1 256 447.1C362 447.1 448 362 448 255.1C448 169.1 390.2 95.55 310.9 71.94C293.9 66.9 284.3 49.08 289.3 32.15C294.4 15.21 312.2 5.562 329.1 10.6C434.9 42.07 512 139.1 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 139.1 77.15 42.07 182.9 10.6C199.8 5.562 217.6 15.21 222.7 32.15V32.15z"
          />
        </svg>
      </div>
    </>
  )
}

export default LoadingSpinner
