import { ChangeEvent } from "react"
import { MouseEvent } from 'react'
import styles from "./form.module.scss"

import { faPaperPlane, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface TextTagProps {
  type: "text",
  name: string,
  label: string,
  value: string,
  handleChange(evt: ChangeEvent<HTMLInputElement>): void,
}

interface TextAddTagProps {
  type: "text",
  name: string,
  value: string,
  disabled: boolean,
  onChange(evt: ChangeEvent<HTMLInputElement>): void,
}

interface ADButtonProps {
  label: string,
  type: "button",
  disabled: boolean,
  onClick(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void,
}

interface TagIcon{
  removed: boolean,
}

export function InputTextTag(props: TextTagProps) {
  return (
    <span className="mb-10">
      <div>
        <label className={styles.inputLabel}>{ props.label }</label>
      </div>
      <input type={props.type} className={styles.inputTextTag} name={ props.name } value={ props.value } onChange={ props.handleChange } />
    </span>
  )
}

export function InputTextAddTag(props: TextAddTagProps) {
  return (
    <span className="mb-10">
      <FontAwesomeIcon icon={faTag} className={styles.iconfaTag} />
      <input type={props.type} className={styles.inputTextAddTag} name={ props.name } value={ props.value } disabled={ props.disabled} onChange={ props.onChange } />
    </span>
  )
}

export function ADButton(props: ADButtonProps) {
  return (
    //<FontAwesomeIcon icon={faTag} className={styles.iconfaTag} />
    //<button type={props.type} className="btn btn-danger" disabled={ props.disabled } onClick={props.onClick}>{props.label}</button>
    <button type={props.type} className="btn btn-danger" onClick={props.onClick}>{props.label}</button>

  )
  //return <button type={props.type} className="btn btn-danger" disabled={ props.disabled} onClick={props.onClick}>{props.label}</button>
}
