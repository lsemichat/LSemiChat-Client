import { MouseEvent } from 'react'

interface ButtonProps {
  label: string,
  type: "button" | "submit" | "reset",
  onClick(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void,
}

interface SliceButtonProps {
  name: string,
  onClick(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void,
}

interface AddButtonProps {
  name: string,
  onDelete: (name: string) => void;
  //onClick(evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void,
}

export function PrimaryButton(props: ButtonProps) {
  return <button type={props.type} className="btn btn-primary" onClick={props.onClick}>{props.label}</button>
}

export function SecondaryButton(props: ButtonProps) {
  return <button type={props.type} className="btn btn-secondary" onClick={props.onClick}>{props.label}</button>
}

export function DangerButton(props: ButtonProps) {
  return <button type={props.type} className="btn btn-danger" onClick={props.onClick}>{props.label}</button>
}

export function SlideButton(props: SliceButtonProps) {
  return (
    <label className="input-switch">
      <input type="checkbox" name={props.name} onClick={props.onClick}/>
      <span className="slider round"></span>
    </label>
  )
}

export function AddButton(props: ButtonProps) {
  return <button type={props.type} className="btn btn-danger" onClick={props.onClick}>{props.label}</button>
}