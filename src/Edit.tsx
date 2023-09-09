import { Button, Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

import styles from "./styles/main.module.css";
import { useState } from "react";

interface IProps {
  name: string;
  setName: (name: string) => void;
  type: JsonTypes;
  setType: (type: JsonTypes) => void;
  value: ValueTypes;
  setValue: (value: ValueTypes) => void;
  onDelete: () => void;
}

export default function Edit(props: IProps) {
  const [jsonValid, setJsonValid] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Form.Group>
        <Form.Label>Név</Form.Label>
        <Form.Control type="text" placeholder="Kulcs neve" value={props.name} onChange={(e) => props.setName(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Típus</Form.Label>
        <Form.Select value={props.type} onChange={(e) => props.setType(e.target.value as JsonTypes)}>
          <option value="str">Szöveg</option>
          <option value="num">Szám</option>
          <option value="bool">Igazhamis</option>
          <option value="misc">JSON Szöveg</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Érték</Form.Label>
        {props.type !== "bool" ? (
          <Form.Control
            as={props.type === "misc" ? "textarea" : "input"}
            type="text"
            placeholder="Érték"
            value={props.value.toString()}
            onKeyDown={(e) => {
              if (props.type === "num" && e.code !== "Backspace" && !e.code.match(/[0-9]/)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              if (props.type === "misc") {
                try {
                  JSON.parse(`{"json": ${e.target.value}}`);
                  setJsonValid(true);
                } catch (error) {
                  setJsonValid(false);
                }
              }
              props.setValue(e.target.value);
            }}
          />
        ) : (
          <Form.Select value={props.value.toString()} onChange={(e) => props.setValue(e.target.value)}>
            <option value="true">Igaz</option>
            <option value="false">Hamis</option>
          </Form.Select>
        )}
      </Form.Group>
      {!jsonValid && props.type === "misc" && <div className="text-danger">Hibás JSON</div>}

      <Button variant="danger" className={styles.addButton} onClick={props.onDelete}>
        <MdDelete />
        Törlés
      </Button>
    </div>
  );
}
