import useRootData from "~/lib/hooks/useRootData"

const Logo = () => {
  const {
    settings: {
      logos: { main },
    },
  } = useRootData()
  return (
    <>
      <div className={`w-10 h-10 text-center text-accent relative`}>
        <img
          src={typeof main === "object" ? main.url : ""}
          alt={typeof main === "object" ? main.alt : ""}
        />
      </div>
    </>
  )
}

export default Logo
