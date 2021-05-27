import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/dist/client/router";
import { useState, ChangeEvent, MouseEvent } from "react";
import { PrimaryButton } from "../../components/button";
import { SecondaryButton } from "../../components/button";
import { DangerButton } from "../../components/button";
import { SlideButton } from "../../components/button";
import { AddButton } from "../../components/buttonAdd";
import { InputText, InputTextarea } from "../../components/form/formField";
import Form from "../../components/form/form";
import Layout from "../../components/layout/layout";
import { UserService, Room } from "../../services/room";
import { InputNumber } from '../../components/form/formNumber';

export default function RoomCreate() {
  const router = useRouter()
  const [formRoomName, setFormRoomName] = useState("")
  const [formTag, setFormTag] = useState("")
  const [formNumber, setFormNumber] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [errorStack, setErrorStack] = useState([])

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()

    setErrorStack(validation(formRoomName, formTag, formNumber, formDescription))
    if (errorStack.length > 0) {
      return
    }

    const newRoom: Room = {
      id: "",
      roomname: formRoomName,
      tag: formTag,
      number: formNumber,
      description: formDescription
    }
    // ↓？
    const res = UserService.getInstance().create(newRoom)
    res.then(data => {
      if (data.status && data.status !== 200) {
        setErrorStack([data.message])
        return
      }
      router.replace("/[id]")
    })
  }

  const handleNewTag = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()

    setErrorStack(validation(formRoomName, formTag, formNumber, formDescription))
    if (errorStack.length > 0) {
      return
    }

    const newTag: Tag = {
      id: "",
      tag: formTag
    }
  }


  return (
    <Layout requiredAuth={true}>
      <Form method="POST" title="Room 作成" errorStack={errorStack}>
        <InputText
          type="text"
          name="roomname"
          label="Room名"
          value={formRoomName}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormRoomName(evt.target.value)}
        />
        <FontAwesomeIcon icon={faTag} />
        <InputText
          type="text"
          name="tag"
          label="タグ"
          value={formTag}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormTag(evt.target.value)}
        />
        
        <SecondaryButton
          type="button"
          label="+"
          onClick={handleSubmit}
        />

        <DangerButton
          type="button"
          label="+"
          onClick={handleNewTag}
        />

        <InputNumber
          type="number"
          name="number"
          label="参加人数"
          value={formNumber}
          max={"50"}
          min={"1"}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormNumber(evt.target.value)}
        />

        <InputTextarea
          name="description"
          label="説明"
          value={formDescription}
          handleChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setFormDescription(evt.target.value)}
        />

        <PrimaryButton
          type="button"
          label="ok"
          onClick={handleSubmit}
        />

      </Form>
    </Layout>
  )
}


function validation(roomname: string, tag: string, number: string, description: string): Array<string> {
  let errorStack: Array<string> = []
  if (!roomname) errorStack.push("Room名は必須です")
  if (!tag) errorStack.push("tagは必須です")
  if (!number) errorStack.push("参加人数は必須です")
  if (!description) errorStack.push("説明は必須です")

  return errorStack
}