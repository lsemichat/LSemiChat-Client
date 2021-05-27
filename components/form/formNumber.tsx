import { ChangeEvent } from "react"
import styles from "./form.module.scss"

interface NumberProps {
  type: "number",
  name: string,
  label: string,
  value: string,
  max: string,
  min:string
  handleChange(evt: ChangeEvent<HTMLInputElement>): void,
}

export function InputNumber(props: NumberProps) {
  return (
    <div className="mb-10">
      <div>
        <label className={styles.inputLabel}>{props.label}</label>
      </div>
      <input type={props.type} className={styles.inputNumber} name={ props.name } value={ props.value } max={props.max} min={props.min} onChange={ props.handleChange } />
    </div>
  )
}
