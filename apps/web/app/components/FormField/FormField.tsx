import { ReactNode } from "react"

// ####
// #### Types
// ####

type PropsType = {
  name: string
  label: string | ReactNode
  type: string
  autoComplete?: string
  containerStyle?: string
  labelStyle?: string
  inputStyle?: string
  errorStyle?: string
  labelAfter?: boolean
  textArea?: boolean
  textAreaRows?: number
  textAreaStyle?: string
  options?: string[]
  select?: boolean
  defaultValue?: string
}

// ####
// #### Component
// ####

const FormField = ({
  name,
  label,
  type,
  autoComplete,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  labelAfter,
  textArea,
  textAreaRows,
  textAreaStyle,
  select,
  options,
  defaultValue,
}: PropsType) => {
  // Styles
  const containerStyling = containerStyle ?? "col-span-full"
  const labelStyling = labelStyle ?? "block text-sm font-medium text-gray-700"
  const inputStyling =
    inputStyle ??
    "mt-1 block w-full border-gray-300 border-b p-2 rounded shadow-sm outline-none focus:ring-blue-main focus:border-blue-main sm:text-sm"
  const errorStyling = errorStyle ?? "block text-red-main text-sm pt-2 pl-1"
  const textAreaStyling = textAreaStyle ?? inputStyling
  return (
    <>
      <div className={containerStyling}>
        {!labelAfter && (
          <label htmlFor={name} className={labelStyling}>
            {label}
          </label>
        )}
        {textArea ? (
          <textarea
            rows={textAreaRows ?? 5}
            id={name}
            name={name}
            className={textAreaStyling}
          />
        ) : select ? (
          <select
            id={name}
            name={name}
            autoComplete={autoComplete}
            className={inputStyling}
            defaultValue={defaultValue}
          >
            {options?.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            autoComplete={autoComplete}
            className={inputStyling}
          />
        )}
        {labelAfter && (
          <label htmlFor={name} className={labelStyling}>
            {label}
          </label>
        )}
      </div>
    </>
  )
}

export default FormField
