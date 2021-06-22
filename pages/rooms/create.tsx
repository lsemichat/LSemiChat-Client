import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/dist/client/router";
import { useState, ChangeEvent, MouseEvent } from "react";
import { PrimaryButton } from "../../components/button";
import { DangerButton } from "../../components/button";
import { SlideButton } from "../../components/button";
import { InputText, InputTextarea } from "../../components/form/formField";
import Form from "../../components/form/form";
import Layout from "../../components/layout/layout";
import { RoomCreate, Room } from "../../services/room";
import { InputNumber } from '../../components/form/formNumber';
import { toUnicode } from 'punycode';

import styles from './create.module.scss'


/*これはいらないかも formTag.tsx にかいた*/
interface Tag{
  value: string,
  id: number,
  removed: boolean
}

export default function RoomCreateFoom() {
  const router = useRouter()
  const [formRoomName, setFormRoomName] = useState("")

  /*tagtragtagtag*/ 
  const [formTag, setFormTag] = useState("")
  //追加+
  const [tags,setTags] = useState<Tag[]>([])
  
  const [formNumber, setFormNumber] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [errorStack, setErrorStack] = useState([])

  const handleonSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()

    if(!formTag) return

    const newTag: Tag = {
      value: formTag,
      id: new Date().getTime(),
      removed: false
    }

    setTags([newTag, ...tags])
    setFormTag('')

  }

  const handleOnEdit = (id: number, value: string) => {
    const newTags = tags.map((tag) => {
      if (tag.id === id) {
        tag.value = value;
      }
      return tag;
    });

    // tags ステートを更新
    setTags(newTags);
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTags = tags.map((tag) => {
      if (tag.id === id) {
        tag.removed = !removed;
      }
      return tag;
    });

    setTags(newTags);
  };
  /*tag end*/ 

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
    const res = RoomCreate.getInstance().create(newRoom)
    res.then(data => {
      if (data.status && data.status !== 200) {
        setErrorStack([data.message])
        return
      }
      router.replace("/[id]")
    })
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

        
        
        <form onSubmit={(e) => e.preventDefault()}>
          <InputText
            type="text"
            name="tag"
            label="タグ"
            value={formTag}
            handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormTag(evt.target.value)}
          />
        
          <DangerButton
            type="button"
            label="+"
            onClick={handleonSubmit}
          />
        </form>
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag.id}>
                <FontAwesomeIcon icon={faTag} />
                <input
                  disabled={tag.removed}
                  value={tag.value}
                  onChange={(e) => handleOnEdit(tag.id, e.target.value)}
                />
                <DangerButton
                  type="reset"
                  label="-"
                  disabled={tag.removed}
                  onClick={() => handleOnRemove(tag.id,tag.removed)}
                />
              </li>
            )
          })}
        </ul>

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